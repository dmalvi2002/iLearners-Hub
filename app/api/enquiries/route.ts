import { createHmac } from 'node:crypto';
import { NextResponse } from 'next/server';
import { validateEnquiry } from '@/lib/enquiry-validation';

export const runtime = 'nodejs';
export const maxDuration = 60;
const MAX_BODY = 16000;
const reply = (body: object, status = 200) => NextResponse.json(body, { status, headers: { 'Cache-Control': 'no-store' } });

export async function POST(request: Request) {
  const url = process.env.GOOGLE_SCRIPT_URL;
  const secret = process.env.GOOGLE_SCRIPT_SECRET;
  if (!url || !secret || !/^https:\/\/script\.google\.com\/macros\/s\/[\w-]+\/exec$/.test(url)) {
    return reply({ error: 'The form is temporarily unavailable. Please contact info@ilearnershub.co.uk.' }, 503);
  }
  const origin = request.headers.get('origin');
  const allowed = (process.env.ENQUIRY_ALLOWED_ORIGINS || 'https://ilearnershub.co.uk,https://www.ilearnershub.co.uk,http://localhost:3000').split(',').map(s => s.trim());
  if (!origin || !allowed.includes(origin)) return reply({ error: 'Invalid request origin.' }, 403);
  if (!request.headers.get('content-type')?.startsWith('application/json')) return reply({ error: 'Invalid content type.' }, 415);
  if (Number(request.headers.get('content-length') || 0) > MAX_BODY) return reply({ error: 'Form is too large.' }, 413);
  let input;
  try {
    const reader = request.body?.getReader();
    if (!reader) throw new Error('Missing body');
    const chunks: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY) { await reader.cancel(); return reply({ error: 'Form is too large.' }, 413); }
      chunks.push(value);
    }
    input = JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch { return reply({ error: 'Invalid form data.' }, 400); }
  if (input?.website) return reply({ error: 'Unable to accept this submission.' }, 400);
  let data;
  try { data = validateEnquiry(input); } catch (error) { return reply({ error: error instanceof Error ? error.message : 'Invalid form data.' }, 400); }
  if (typeof input.submissionId !== 'string' || !/^[a-f0-9-]{36}$/i.test(input.submissionId)) return reply({ error: 'Invalid submission ID.' }, 400);
  // Durable, cross-instance email limits are enforced in Apps Script under a script lock.
  // Raw IP addresses are never sent to Google or stored in the spreadsheet.
  const payload = JSON.stringify({ data, submissionId: input.submissionId, timestamp: Date.now() });
  const signature = createHmac('sha256', secret).update(payload).digest('hex');
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const upstream = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ payload, signature }), redirect: 'follow', cache: 'no-store', signal: AbortSignal.timeout(25000) });
      if (!upstream.ok) throw new Error('Upstream unavailable');
      const result = await upstream.json();
      if (result.result === 'success') return reply({ result: 'success' });
      if (result.code === 'RATE_LIMIT') return reply({ error: 'Too many submissions. Please try again in an hour.' }, 429);
      if (result.code === 'INVALID') return reply({ error: 'Invalid form data.' }, 400);
      throw new Error('Upstream rejected submission');
    } catch {
      if (attempt === 1) return reply({ error: 'Unable to confirm your submission. Please try again shortly.' }, 502);
    }
  }
}
