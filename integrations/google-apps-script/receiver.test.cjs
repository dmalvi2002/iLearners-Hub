const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const crypto = require('node:crypto');

function receiver() {
  const rows = [['headers']];
  let failMail = false, sent = 0;
  const sheet = {
    getLastRow: () => rows.length,
    appendRow: row => rows.push(row),
    getRange: (r, c, n = 1, width = 1) => ({
      getValues: () => rows.slice(r - 1, r - 1 + n).map(row => row.slice(c - 1, c - 1 + width)),
      setValues: values => values.forEach((row, i) => row.forEach((v, j) => { rows[r - 1 + i][c - 1 + j] = v; })),
    }),
  };
  const context = vm.createContext({
    Date, JSON, Set,
    ContentService: { MimeType: { JSON: 'json' }, createTextOutput: s => ({ setMimeType: () => JSON.parse(s) }) },
    PropertiesService: { getScriptProperties: () => ({ getProperty: () => 'test-secret' }) },
    Utilities: { Charset: { UTF_8: 'utf8' }, DigestAlgorithm: { SHA_256: 'sha256' }, computeDigest: (_, s) => [...crypto.createHash('sha256').update(s).digest()], computeHmacSha256Signature: (s, key) => [...crypto.createHmac('sha256', key).update(s).digest()] },
    LockService: { getScriptLock: () => ({ tryLock: () => true, releaseLock() {} }) },
    SpreadsheetApp: { openById: () => ({ getSheetByName: () => sheet }), flush() {} },
    MailApp: { getRemainingDailyQuota: () => 100, sendEmail: () => { if (failMail) throw Error('Mail unavailable'); sent++; } },
  });
  vm.runInContext(fs.readFileSync(__dirname + '/Code.gs', 'utf8'), context);
  const post = (data, id = crypto.randomUUID(), timestamp = Date.now(), signature) => {
    const payload = JSON.stringify({ data, submissionId: id, timestamp });
    return context.doPost({ postData: { contents: JSON.stringify({ payload, signature: signature || crypto.createHmac('sha256', 'test-secret').update(payload).digest('hex') }) } });
  };
  return { rows, post, context, setFail: value => { failMail = value; }, sent: () => sent };
}
const subscription = { type: 'subscription', name: 'Integration test', email: 'test@example.com' };

test('rejects unsigned, expired and invalid requests without storing or mailing', () => {
  const r = receiver();
  assert.equal(r.post(subscription, undefined, Date.now(), '0'.repeat(64)).code, 'AUTH');
  assert.equal(r.post(subscription, undefined, Date.now() - 360000).code, 'INVALID');
  assert.equal(r.post({ ...subscription, email: 'bad' }).code, 'INVALID');
  assert.equal(r.post({ ...subscription, name: 'x'.repeat(121) }).code, 'INVALID');
  assert.equal(r.rows.length, 1);
  assert.equal(r.sent(), 0);
});
test('stores once for the same ID or same content and neutralizes formulas', () => {
  const r = receiver(), id = crypto.randomUUID();
  const data = { ...subscription, name: '=IMPORTXML("evil")' };
  assert.equal(r.post(data, id).result, 'success');
  assert.equal(r.post(data, id).duplicate, true);
  assert.equal(r.post(data).duplicate, true);
  assert.equal(r.rows.length, 2);
  assert.equal(r.rows[1][4][0], "'");
  assert.equal(r.sent(), 1);
});
test('enforces durable per-email limits across different submissions', () => {
  const r = receiver();
  for (let i = 0; i < 5; i++) assert.equal(r.post({ ...subscription, name: 'Test ' + i }).result, 'success');
  assert.equal(r.post({ ...subscription, name: 'Sixth' }).code, 'RATE_LIMIT');
  assert.equal(r.rows.length, 6);
});
test('persists enquiry on mail failure and retries without another row', () => {
  const r = receiver(); r.setFail(true);
  assert.equal(r.post(subscription).result, 'success');
  assert.equal(r.rows[1][18], 'pending');
  assert.equal(r.rows[1][19], 1);
  r.rows[1][20] = new Date(0); r.setFail(false);
  r.context.retryPendingEmails();
  assert.equal(r.rows[1][18], 'sent');
  assert.equal(r.rows[1][19], 2);
  assert.equal(r.rows.length, 2);
  assert.equal(r.sent(), 1);
});
test('validates registration fields, level-dependent subjects and club choices', () => {
  const r = receiver();
  const data = { type: 'registration', studentName: 'Test Student', institutionName: 'Test School', studyYear: 'P5', parentName: 'Test Parent', address: 'Test address', postalCode: 'G1 1AA', phone: '+44 7123 456789', email: 'test@example.com', level: 'Primary', levelDetail: 'P5', subjects: ['Mathematics'] };
  assert.equal(r.post({ ...data, subjects: ['Physics'] }).code, 'INVALID');
  assert.equal(r.post({ ...data, levelDetail: '' }).code, 'INVALID');
  assert.equal(r.post({ ...data, level: 'Homework Club', homeworkClubOption: '' }).code, 'INVALID');
  assert.equal(r.post(data).result, 'success');
});
