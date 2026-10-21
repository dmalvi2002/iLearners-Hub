# Website enquiry receiver

Spreadsheet: https://docs.google.com/spreadsheets/d/1MV7_vN_fNNKAWYlDCfV2LoUOk5KWqrGSp51nYCbrnZQ/edit

Apps Script: https://script.google.com/u/7/home/projects/1BqQLxCTLQeTHXquaUtQyLc0GaG9X2g3-gxDCj4MgEVUSmW200ZoeJfgV/edit

Deployed receiver (version 1): https://script.google.com/macros/s/AKfycbxhHc9uJSW9a10RGueizKHGtQKlUFfu74hTAmgVqjxeXeiLOfs7saCwTNZZL3k0OSKjkQ/exec

Both were created under `realonlinebump@gmail.com`, the account selected by the requested Sheets `/u/7/` link. Keep spreadsheet sharing Restricted; do not publish it to the web.

## Activate

1. Save `Code.gs` in the Apps Script editor. Run `setupIntegration` and authorize spreadsheet access, sending email, and managing this script's scheduled trigger. The script never reads the inbox. Setup initializes the Enquiries tab, creates a five-minute retry trigger, and generates `ENQUIRY_SECRET` privately in Script Properties. Running setup again preserves the credential and rows.
2. Copy `ENQUIRY_SECRET` from Project Settings → Script properties into `GOOGLE_SCRIPT_SECRET` in the website's server environment. Do not paste it into source code, client variables, or this README.
3. Deploy → New deployment → Web app. Execute as the owner and allow Anyone to reach the receiver. This exposes the receiver endpoint, not the spreadsheet. Every submission requires an HMAC signature using the private server credential. `doGet` returns only a service label and never enquiry data.
4. Set `GOOGLE_SCRIPT_URL` to the `/exec` deployment URL and configure `ENQUIRY_ALLOWED_ORIGINS` for the website and any intended preview domains. Remove the old `NEXT_PUBLIC_GOOGLE_SCRIPT_URL`. Use `.env.local` for local development and the hosting provider's private environment variables for production. Redeploy the website after setting them.
5. Submit a clearly labelled synthetic registration and subscription. Verify the spreadsheet row and a notification at `info@ilearnershub.co.uk`; repeat the same payload to confirm duplicate prevention. Verify the five-minute trigger exists. Inbox receipt must be checked separately from a successful MailApp send.

## Protections and operation

- Both browser forms call `/api/enquiries`. Only the server signs timestamped requests; the receiver rejects invalid signatures and requests older than five minutes.
- Body sizes, field lengths/types, email, phone, required fields, levels, subjects and homework choices are checked. Hidden honeypot fields reject basic bots. Formula-like spreadsheet input is stored as text. Request logs do not include form contents or credentials.
- A Google script lock serializes duplicate checks, durable limits and writes across website instances. IDs are checked against all stored rows; matching normalized content within ten minutes is also treated as a duplicate. Limits are five submissions per email/hour, 100 total/hour and 500/day. Global limits bound abuse across rotating email addresses; this is not a CAPTCHA or a full DDoS service.
- The spreadsheet stores the enquiry before email delivery. Delivery status, attempts, next attempt and a generic failure reason remain visible. Pending mail retries every five minutes with exponential backoff, up to twelve attempts. A failed row needs operator attention; after correcting quota/permissions, set status to `pending`, attempts to `0` and next attempt to a past timestamp to retry.
- Email is at-least-once: a process crash after Google accepts a message but before status is saved can repeat a notification. The stable submission ID identifies it. Enquiry rows remain deduplicated. Google's quota and downstream delivery policies still apply.
- Google uses broad spreadsheet OAuth scope for this standalone script; restrict editors on the script project. If the credential is compromised, rotate Script Properties and the server environment together. Spreadsheet data grows over time; archive older records with an appropriate retention policy as lookup cost increases.

## Maintenance and tests

`lib/enquiry-validation.js` is shared validation source. After editing it, replace the final `validateEnquiry` function in `Code.gs` with the same function without `export`, then update the Apps Script deployment to a new version.

Run `node --test integrations/google-apps-script/*.test.cjs` and `npx tsc --noEmit`. Tests mock Google services; they verify signatures, expiry, validation, formula safety, duplicates, limits, persisted email retries, endpoint body limits, origins, and upstream retries. They do not replace a live end-to-end test.

Current setup status: Google authorization and `setupIntegration` completed successfully. The private Enquiries tab is initialized, `retryPendingEmails` has a time-based trigger, and the generated credential and deployed URL are saved in ignored `.env.local` as `GOOGLE_SCRIPT_SECRET` and `GOOGLE_SCRIPT_URL`. The old public client URL was removed. The receiver was deployed after explicit approval of `Anyone` endpoint access.

Live verification on 2026-10-21: the local production server submitted a synthetic registration and the browser subscription form submitted a synthetic subscription. Exactly two rows were read back from Google Sheets, each with email status `sent` and one delivery attempt. Repeating the registration ID and its content with a fresh ID produced no extra row. Invalid fields returned HTTP 400; a foreign origin returned HTTP 403; a direct unsigned request to the deployed Google receiver returned `AUTH`. Both test notifications were addressed to `info@ilearnershub.co.uk`; inbox receipt was not independently checked.

Production website deployment is still outstanding: add the same private server variables to the live hosting project and deploy this codebase. The local verification uses port 3107, which is included only in the local allowed origins. The hosting service/project has not yet been supplied.
