// Shared by the Next.js endpoint and the Apps Script deployment (copied verbatim).
export function validateEnquiry(input) {
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
