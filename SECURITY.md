# Security

## What has been secured

- Vercel responses include security headers for CSP, clickjacking protection, MIME sniffing protection, referrer handling, and disabled browser permissions for camera, microphone, geolocation, and clipboard access.
- The SPA rewrite is preserved so `/`, `/resume`, `/projects`, and `/contact` continue to load the React app.
- EmailJS service ID, template ID, and public key are read from Vite environment variables instead of hardcoded source values.
- The contact form checks for missing EmailJS configuration before sending and shows a safe user-facing fallback instead of crashing.
- Contact form values are trimmed before sending, required fields reject whitespace-only input, and name, subject, and message fields reject obvious HTML/script injection patterns.
- Basic static-site anti-spam controls are in place: a hidden honeypot field, minimum form-fill time, in-memory submit cooldown, and disabled submit state while sending.

## Frontend-only limitations

This is a static portfolio, so browser-side controls can reduce casual abuse but cannot fully prevent automated spam. Attackers can inspect bundled JavaScript, bypass client validation, replay EmailJS requests, or call EmailJS directly if dashboard restrictions are weak.

## EmailJS public key

The EmailJS public key is designed to be used in browser code, so it is not a secret in the same way a server API key is. It still identifies the EmailJS account for client-side sending, so abuse prevention must rely on EmailJS dashboard restrictions, quotas, monitoring, and optional CAPTCHA.

## Required EmailJS dashboard settings

- Restrict allowed domains to `taha-khan.vercel.app`.
- Enable CAPTCHA if it is available for the EmailJS plan/template.
- Monitor quota and usage regularly for spikes.
- Rotate the EmailJS public key if the previous hardcoded key may have been abused.

## EmailJS configuration

The contact form first checks these Vite variables:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

If they are present, they are used for EmailJS. If they are missing, the app falls back to the same-origin public runtime config at `/emailjs-config.json`. This file contains only EmailJS browser client identifiers, not server secrets.

For deployments that use Vercel environment variables, add the same keys in the Vercel project environment variables for the environments you use. Vite reads env files when the dev server starts, so restart `npm run dev` after adding or editing local env values.

If the contact form says it is temporarily unavailable in local development, open the browser console. The app logs which `VITE_EMAILJS_*` key is missing or still using an example placeholder, without printing any credential values.

## Recommended next step

For stronger abuse prevention, move email sending behind a Vercel serverless function. The browser would submit to your own endpoint, and the function would validate input, rate-limit requests, verify CAPTCHA, and keep provider credentials server-side.
