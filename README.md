# Temple Gideon portfolio revamp

Original implementation taking editorial direction from Kern. This is the current portfolio on `main`; the former site is retained in Git history.

## Local preview

Run `npm ci`, then `npm run dev`. Run `npm run build` for the production site in `dist`, and `npm run preview` to inspect it.

## Content

Homepage: `index.html`. Case studies: `projects.js` and `case-study.html`. Shared styling: `revamp.css`. Browser behavior: `revamp.js`.

The four project illustrations are authored in HTML/CSS and explicitly labeled as illustrations. They are not actual screenshots, customer transcripts or live telemetry. No private source files or credentials are bundled. The owner authorized publishing this version to main.

Notebook results are recorded outputs, not reproduced benchmarks. Learning-resource attribution is displayed in the foundations section. Graduation and internship completion reflect the user's corrections; precise unconfirmed dates are omitted.

External fonts load from Google Fonts, with system fallbacks. Contact includes an AJAX form using the original site's FormSubmit recipient, email and clipboard options, and a WhatsApp click-to-chat link to +2348129240412. The form sends name, email and message to FormSubmit. First use may require recipient activation. Browser tests mock provider responses; actual inbox delivery and recipient activation are not verified. No test messages were sent. Form handling includes validation, a honeypot, duplicate-submit protection and a 20-second timeout. Errors preserve the draft.

Only `dist` should be deployed. Build with `npm run build`; Vercel build and output settings are included in `vercel.json`. Previous legacy pages and scripts were removed. Git history preserves the former site.

Run `npx playwright install chromium` and `npx playwright test` for browser checks. On Windows, tests can use Chrome at its standard installation path when available. Form tests intercept requests and do not send messages.
