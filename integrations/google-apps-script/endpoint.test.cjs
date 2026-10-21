const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const ts = require('typescript');
const crypto = require('node:crypto');

function endpoint(fetchImpl) {
  const exports = {};
  const validation = {};
  vm.runInNewContext(ts.transpile(fs.readFileSync('lib/enquiry-validation.js', 'utf8'), { module: ts.ModuleKind.CommonJS }), { exports: validation });
  const source = ts.transpile(fs.readFileSync('app/api/enquiries/route.ts', 'utf8'), { module: ts.ModuleKind.CommonJS });
  vm.runInNewContext(source, {
    exports, Buffer, AbortSignal, fetch: fetchImpl,
    process: { env: { GOOGLE_SCRIPT_URL: 'https://script.google.com/macros/s/test/exec', GOOGLE_SCRIPT_SECRET: 'test-secret' } },
    require: name => name === 'node:crypto' ? crypto : name === 'next/server' ? { NextResponse: { json: (body, opts) => ({ body, ...opts }) } } : validation,
  });
  return exports.POST;
}
const input = { type: 'subscription', name: 'Test', email: 'test@example.com', submissionId: crypto.randomUUID() };
function request(body = input, origin = 'https://ilearnershub.co.uk') {
  return new Request('https://ilearnershub.co.uk/api/enquiries', { method: 'POST', headers: { origin, 'Content-Type': 'application/json' }, body: typeof body === 'string' ? body : JSON.stringify(body) });
}
test('rejects foreign origins, honeypots, malformed JSON and oversized bodies before calling Google', async () => {
  const post = endpoint(() => { throw Error('Should not call Google'); });
  assert.equal((await post(request(input, 'https://attacker.example'))).status, 403);
  assert.equal((await post(request({ ...input, website: 'spam' }))).status, 400);
  assert.equal((await post(request('{broken'))).status, 400);
  assert.equal((await post(request('x'.repeat(16001)))).status, 413);
});
test('signs requests on the server, retries with the same payload and exposes no secrets', async () => {
  let calls = 0, previous;
  const post = endpoint(async (_, options) => {
    calls++;
    const envelope = JSON.parse(options.body);
    assert.equal(envelope.signature, crypto.createHmac('sha256', 'test-secret').update(envelope.payload).digest('hex'));
    if (previous) assert.equal(envelope.payload, previous);
    previous = envelope.payload;
    if (calls === 1) throw Error('Network interruption');
    return { ok: true, json: async () => ({ result: 'success', internal: 'private' }) };
  });
  const result = await post(request());
  assert.equal(result.status, 200);
  assert.equal(JSON.stringify(result.body), '{"result":"success"}');
  assert.equal(calls, 2);
});
test('propagates limits without retrying and reports failure when delivery cannot be confirmed', async () => {
  let calls = 0;
  const limited = endpoint(async () => { calls++; return { ok: true, json: async () => ({ code: 'RATE_LIMIT' }) }; });
  assert.equal((await limited(request())).status, 429);
  assert.equal(calls, 1);
  const unavailable = endpoint(async () => { throw Error('Private upstream details'); });
  const result = await unavailable(request());
  assert.equal(result.status, 502);
  assert.ok(!JSON.stringify(result.body).includes('Private upstream'));
});
