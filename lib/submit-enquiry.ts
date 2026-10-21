// The browser only talks to our own server. Keep the same ID after a network error.
export async function submitEnquiry(data: Record<string, unknown>, submissionId: string, website: string) {
  const response = await fetch('/api/enquiries', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...data, submissionId, website }),
  });
  const result = await response.json();
  if (!response.ok || result.result !== 'success') {
    throw new Error(result.error || 'Unable to submit. Please try again shortly.');
  }
}
