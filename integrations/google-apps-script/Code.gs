const SPREADSHEET_ID = '1MV7_vN_fNNKAWYlDCfV2LoUOk5KWqrGSp51nYCbrnZQ';
const RECIPIENT = 'info@ilearnershub.co.uk';
const HEADERS = ['Received (UTC)', 'Submission ID', 'Fingerprint', 'Form', 'Name', 'Email', 'Student', 'Institution', 'Study year', 'Parent', 'Address', 'Post code', 'Phone', 'Level', 'Primary level', 'Subjects', 'Homework club', 'Message', 'Email status', 'Attempts', 'Next attempt (UTC)', 'Last error'];

// Run once in the editor. Generates a credential privately in Script Properties.
function setupIntegration() {
  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty('ENQUIRY_SECRET')) props.setProperty('ENQUIRY_SECRET', Utilities.getUuid() + Utilities.getUuid());
  const book = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = book.getSheetByName('Enquiries');
  if (!sheet) {
    const initial = book.getSheets()[0];
    sheet = initial.getLastRow() === 0 ? initial.setName('Enquiries') : book.insertSheet('Enquiries');
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#115e59').setFontColor('#ffffff');
    sheet.setFrozenRows(1);
    sheet.getRange('A:A').setNumberFormat('yyyy-mm-dd hh:mm:ss');
    sheet.getRange('U:U').setNumberFormat('yyyy-mm-dd hh:mm:ss');
    sheet.setColumnWidths(1, HEADERS.length, 160);
    sheet.setColumnWidth(18, 360);
  }
  if (!ScriptApp.getProjectTriggers().some(t => t.getHandlerFunction() === 'retryPendingEmails')) {
    ScriptApp.newTrigger('retryPendingEmails').timeBased().everyMinutes(5).create();
  }
  // Request only outbound email access; no inbox access.
  MailApp.getRemainingDailyQuota();
}

function json_(value) { return ContentService.createTextOutput(JSON.stringify(value)).setMimeType(ContentService.MimeType.JSON); }
function doGet() { return json_({ service: 'iLearners enquiry receiver' }); }
function hex_(bytes) { return bytes.map(b => ('0' + ((b + 256) % 256).toString(16)).slice(-2)).join(''); }
function safeCell_(value) { const s = String(value || ''); return /^[\s]*[=+\-@]/.test(s) ? "'" + s : s; }

function doPost(e) {
  const lock = LockService.getScriptLock();
  let locked = false;
  try {
    if (!e || !e.postData || e.postData.contents.length > 22000) return json_({ code: 'INVALID' });
    const envelope = JSON.parse(e.postData.contents);
    const secret = PropertiesService.getScriptProperties().getProperty('ENQUIRY_SECRET');
    if (!secret || typeof envelope.payload !== 'string' || !/^[a-f0-9]{64}$/.test(envelope.signature || '')) return json_({ code: 'AUTH' });
    const expected = hex_(Utilities.computeHmacSha256Signature(envelope.payload, secret, Utilities.Charset.UTF_8));
    let mismatch = 0;
    for (let i = 0; i < expected.length; i++) mismatch |= expected.charCodeAt(i) ^ envelope.signature.charCodeAt(i);
    if (mismatch) return json_({ code: 'AUTH' });
    const payload = JSON.parse(envelope.payload);
    if (typeof payload.timestamp !== 'number' || Math.abs(Date.now() - payload.timestamp) > 300000 || !/^[a-f0-9-]{36}$/i.test(payload.submissionId || '')) return json_({ code: 'INVALID' });
    let data;
    try { data = validateEnquiry(payload.data); } catch (_) { return json_({ code: 'INVALID' }); }
    if (!lock.tryLock(10000)) return json_({ code: 'BUSY' });
    locked = true;
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Enquiries');
    if (!sheet) return json_({ code: 'SETUP_REQUIRED' });
    const fingerprint = hex_(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, JSON.stringify(data), Utilities.Charset.UTF_8));
    // The sheet is the durable source of truth, including after cold starts and retries.
    const rows = sheet.getLastRow() > 1 ? sheet.getRange(2, 1, sheet.getLastRow() - 1, 6).getValues() : [];
    const now = Date.now();
    if (rows.some(row => row[1] === payload.submissionId || (row[2] === fingerprint && now - new Date(row[0]).getTime() < 600000))) return json_({ result: 'success', duplicate: true });
    const recent = rows.filter(row => now - new Date(row[0]).getTime() < 3600000);
    // Shared durable limits: 5 per email/hour, 100 total/hour, 500/day.
    if (recent.filter(row => row[5] === safeCell_(data.email)).length >= 5 || recent.length >= 100 || rows.filter(row => now - new Date(row[0]).getTime() < 86400000).length >= 500) return json_({ code: 'RATE_LIMIT' });
    const cells = [data.type, data.name, data.email, data.studentName, data.institutionName, data.studyYear, data.parentName, data.address, data.postalCode, data.phone, data.level, data.levelDetail, data.subjects.join(', '), data.homeworkClubOption, data.message].map(safeCell_);
    sheet.appendRow([new Date(), payload.submissionId, fingerprint].concat(cells, ['pending', 0, new Date(), '']));
    SpreadsheetApp.flush();
    sendRow_(sheet, sheet.getLastRow());
    return json_({ result: 'success' });
  } catch (_) {
    // Do not return enquiry data, stack traces, or credentials to callers.
    return json_({ code: 'UNAVAILABLE' });
  } finally { if (locked) lock.releaseLock(); }
}

function sendRow_(sheet, rowIndex) {
  const row = sheet.getRange(rowIndex, 1, 1, HEADERS.length).getValues()[0];
  const attempts = Number(row[19] || 0) + 1;
  // Persist before sending. A rare process crash after send can cause a repeated email,
  // but never a repeated enquiry row. The submission ID identifies repeated notifications.
  sheet.getRange(rowIndex, 19, 1, 4).setValues([['sending', attempts, new Date(Date.now() + 600000), '']]);
  SpreadsheetApp.flush();
  try {
    if (MailApp.getRemainingDailyQuota() < 1) throw new Error('Quota');
    const body = HEADERS.slice(0, 18).map((label, i) => label + ': ' + row[i]).join('\n') + '\n\nPrivate spreadsheet: https://docs.google.com/spreadsheets/d/' + SPREADSHEET_ID + '/edit';
    MailApp.sendEmail({ to: RECIPIENT, subject: 'iLearners Hub: new ' + row[3] + ' [' + row[1] + ']', body, replyTo: String(row[5]).replace(/^'/, ''), name: 'iLearners Hub enquiries' });
    sheet.getRange(rowIndex, 19, 1, 4).setValues([['sent', attempts, '', '']]);
  } catch (_) {
    sheet.getRange(rowIndex, 19, 1, 4).setValues([[attempts >= 12 ? 'failed' : 'pending', attempts, new Date(Date.now() + Math.min(360, Math.pow(2, attempts) * 5) * 60000), 'Email delivery failed; check mail quota/permissions.']]);
  }
}

function retryPendingEmails() {
  const lock = LockService.getScriptLock();
  if (!lock.tryLock(1000)) return;
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName('Enquiries');
    if (!sheet || sheet.getLastRow() < 2) return;
    const rows = sheet.getRange(2, 19, sheet.getLastRow() - 1, 4).getValues();
    let processed = 0;
    for (let i = 0; i < rows.length && processed < 20; i++) {
      if (['pending', 'sending'].includes(rows[i][0]) && Number(rows[i][1]) < 12 && new Date(rows[i][2]).getTime() <= Date.now()) { sendRow_(sheet, i + 2); processed++; }
    }
  } finally { lock.releaseLock(); }
}

// Shared by the Next.js endpoint and the Apps Script deployment (copied verbatim).
function validateEnquiry(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('Invalid form data.');
  const type = input.type;
  if (!['registration', 'subscription'].includes(type)) throw new Error('Invalid form type.');
  const limits = { name: 120, studentName: 120, institutionName: 200, studyYear: 40, parentName: 120, address: 400, postalCode: 20, email: 254, phone: 17, level: 40, levelDetail: 10, homeworkClubOption: 40, message: 4000 };
  const required = type === 'subscription' ? ['name', 'email'] : ['studentName', 'institutionName', 'studyYear', 'parentName', 'address', 'postalCode', 'email', 'phone', 'level'];
  const data = { type };
  for (const [key, max] of Object.entries(limits)) {
    const value = input[key] == null ? '' : input[key];
    if (typeof value !== 'string' || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)) throw new Error('Invalid ' + key + '.');
    data[key] = value.trim();
    if (required.includes(key) && !data[key]) throw new Error('Please complete ' + key + '.');
  }
  data.email = data.email.toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) throw new Error('Please enter a valid email address.');
  data.subjects = [];
  if (type === 'registration') {
    const subjectsByLevel = { Primary: ['Mathematics', 'English', 'Science'], S1: ['Mathematics', 'Science'], S2: ['Mathematics', 'Science'], S3: ['Mathematics', 'Physics', 'Chemistry', 'Biology'], 'National 5': ['Mathematics', 'Physics', 'Chemistry', 'Biology'], Highers: ['Mathematics', 'Physics', 'Chemistry', 'Biology'], 'Advanced Highers': ['Mathematics', 'Physics', 'Chemistry', 'Biology'], 'Homework Club': [] };
    if (!Object.prototype.hasOwnProperty.call(subjectsByLevel, data.level)) throw new Error('Please select a valid level.');
    if (!/^[\d+\s]{7,17}$/.test(data.phone) || data.phone.replace(/\D/g, '').length < 7) throw new Error('Please enter a valid phone number.');
    if (data.level === 'Primary' && !['P3', 'P4', 'P5', 'P6', 'P7'].includes(data.levelDetail)) throw new Error('Please select a primary level.');
    if (data.level !== 'Primary') data.levelDetail = '';
    if (data.level === 'Homework Club') {
      if (!['per-hour-inquiry', 'subscription-inquiry'].includes(data.homeworkClubOption)) throw new Error('Please select a homework club option.');
    } else {
      if (!Array.isArray(input.subjects) || input.subjects.length < 1 || input.subjects.length > 4 || input.subjects.some(s => !subjectsByLevel[data.level].includes(s))) throw new Error('Please select valid subjects.');
      data.subjects = [...new Set(input.subjects)].sort();
      data.homeworkClubOption = '';
    }
  }
  return data;
}
