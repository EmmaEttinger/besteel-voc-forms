# VOC System — Setup Guide

## What's in this folder

```
index.html              -> landing page listing all VOCs
voc.html                -> the generic form (loads any VOC via ?form=name)
assets/css/voc-engine.css
assets/js/voc-engine.js -> all the interactive logic (retry popups, scoring, signature pad, submit)
assets/js/config.js     -> your SharePoint submission URL goes here
data/angle-grinder.js   -> the Angle Grinder VOC content (your example, already built)
data/_template.js       -> copy this to add a new VOC
```

One engine, many data files. Every VOC after this one is just a new file in `/data`.

## 1. Try it locally right now

Open `index.html` in a browser (double-click it, or right-click → Open with → your
browser). Click "Angle Grinder" and try answering incorrectly — you'll see the
popup bubble. Get all 10 correct, and the Submit button unlocks. Since
`config.js` has no submission URL yet, Submit will download a `.json` file
instead of failing silently — that's expected until step 3 is done.

## 2. Hosting it on your website

These are plain static files — no server-side code, no build step. Upload the
whole folder (keeping the same structure) to wherever your website is hosted
(same place you'd upload any HTML page). Link to `index.html`, or link
directly to a specific VOC, e.g. `https://yoursite.com/voc/voc.html?form=angle-grinder`.

## 3. Getting responses into a SharePoint list

Static HTML can't write to SharePoint directly without exposing credentials in
the page, which isn't safe. The standard, safe pattern is: **Power Automate
sits in the middle.** The form POSTs JSON to a Power Automate flow; the flow
writes it into a SharePoint list. Setup is one-time, about 10 minutes:

1. In [Power Automate](https://make.powerautomate.com), create an **Instant
   cloud flow** → trigger: **"When an HTTP request is received"**.
2. Leave the request body schema blank for now (or click "Use sample payload"
   and paste a submitted `.json` file from step 1 to auto-generate it).
3. Add a **SharePoint → "Create item"** action, pointing at the list you want
   (create the list first — see column suggestions below).
4. Map each SharePoint column to the matching field from the trigger's
   dynamic content (`personal.preparedBy`, `overallOutcome`, etc.).
5. Save the flow. Copy the **HTTP POST URL** shown on the trigger step.
6. Paste that URL into `assets/js/config.js` as `submitUrl`. One config file
   controls every VOC, since they all share this engine.

### Suggested SharePoint list columns

| Column | Type | Source field |
|---|---|---|
| Title | Text | `formTitle` |
| EmployeeName | Text | `personal.preparedBy` |
| ConductedOn | Date and Time | `personal.conductedOn` |
| Site | Text | `personal.siteConducted` |
| Location | Text | `personal.location` |
| FormId | Text | `formId` |
| SubmittedAt | Date and Time | `submittedAt` |
| PracticalRequired | Choice (Yes/No/N/A) | `practicalRequired` |
| SupervisorName | Text | `supervisorName` |
| OverallOutcome | Choice (Competent/Not Competent) | `overallOutcome` |
| QuestionAnswersJSON | Multiple lines of text | `JSON.stringify(questions)` (add a Compose action) |
| PracticalItemsJSON | Multiple lines of text | `JSON.stringify(practicalItems)` (add a Compose action) |

Keeping the per-question detail as JSON in one column is the pragmatic choice
for 10+ questions across 20+ different VOCs with different questions — trying
to give every question its own column doesn't scale. If you want to report on
individual question performance, add a second flow step that also writes each
answer as its own row into a separate "VOC Answers" list (Compose a "Select"
action over the `questions` array). Ask me for this if/when you want it — it's
a small addition.

**Signatures:** `signatureDataUrl` is a base64 PNG. Either store it in a
"Multiple lines of text" column as-is, or (nicer) add a Power Automate step
that decodes it and adds it as an attachment to the SharePoint item.

## 4. Adding your other 20+ VOCs

By far the fastest way: **paste the raw VOC text to me** (exactly like you did
for the Angle Grinder one — questions, options, which one is marked
"Correct", and the practical steps) and I'll generate the `data/*.js` file
and add its link to `index.html`. A few seconds per VOC once we're doing this
in a Claude Code project, since I can batch them.

If you ever want to write one yourself, copy `data/_template.js` to
`data/your-voc-name.js`, fill in the fields, and add a link to it in
`index.html`.

## 5. Moving this into a Claude Code project

This folder is already structured to become a Claude Code project as-is —
nothing needs to change. When you're ready:

1. Open this folder (`VOC HTML`) as a Claude Code project.
2. Send me the remaining VOC documents (batches are fine).
3. I'll generate each `data/*.js` file and wire up `index.html`.
4. If you want per-question SharePoint reporting, a supervisor dashboard, or
   PDF export of completed VOCs, those are natural next additions once the
   base system is live — just ask.

## Branding

Colours and type are pulled from `BeSteel_Guidelines2024_R2-08.pdf` (April
2024), core palette section, and applied as CSS variables at the top of
`assets/css/voc-engine.css`:

| Role in the form | Guideline colour | Hex |
|---|---|---|
| Header background, headings, primary text | Deep Ocean | `#384455` |
| Submit button, progress bar (main brand accent) | Sunset Yellow | `#fdb515` |
| Input focus ring, option hover border | Blue Spark | `#54bdeb` |
| "Questions" / "Practical Verification" eyebrow labels, safety-note box | Khaki Brown | `#a18b67` |
| Card/field borders (light neutral tint) | Blue Steel (tinted) | `#92a5b0`-derived |

Green (correct/competent) and red (incorrect) are deliberately **not** brand
colours — they're kept as universal pass/fail signals so they read
consistently regardless of theme.

Typography: the guidelines' primary face, Trade Gothic Next LT, is a licensed
Adobe font — not something that can be legally embedded in a public webpage
without your Adobe Fonts/Typekit subscription. The guidelines name **Open
Sans** (a free Google Font) as the approved substitute when Trade Gothic
isn't available, so that's what's wired into `voc.html` and `index.html` via
Google Fonts. If you do have an Adobe Fonts kit ID for Trade Gothic Next LT
that's licensed for web use, send it over and I'll swap the `<link>` tags to
use it instead — the rest of the styling (uppercase headings, letter-spacing)
was already set up to match Trade Gothic's hierarchy rules from the
guidelines, so it'll drop straight in.

**Logo:** applied. Using `BeSteel Logos_2024_Icon-Colour_rgb.png` (copied into
`assets/img/besteel-icon.png`), referenced from every VOC page via `logoUrl`
in `assets/js/config.js`. Per the guidelines ("For digital interfaces where
legibility of the Besteel spread logo can not be ensured, the Besteel Icon
should be used instead"), the icon-only colour mark was the right pick for
this header's limited space — the yellow circle sits on its own, so it reads
clearly against the dark Deep Ocean header without needing a separate
reversed/white variant. If you'd rather use the full horizontal or stacked
wordmark logo instead, send that file and I'll swap it in the same way.

## Notes on the interactive behaviour

- Wrong answers never advance — the option flashes red, a popup says "That
  answer is incorrect. Try again," and the question stays open until the
  correct option is clicked.
- Once correct, a question locks in green and can't be changed.
- The number of attempts per question is recorded and submitted (useful for
  spotting questions people struggle with).
- The Submit button stays disabled until every required field is filled,
  every question is correct, and — if the practical gate is answered "Yes" —
  the supervisor name, every practical rating, an overall outcome, and a
  signature are all present.
- If the SharePoint submission URL isn't configured yet, or the network
  request fails, the form automatically downloads the response as a `.json`
  file instead of losing the data.
