# VOC HTML — Besteel Verification of Competency system

Interactive Verification of Competency (VOC) forms for Besteel employees,
replacing a Microsoft Forms setup that couldn't do retry-until-correct
quizzing. Static HTML/CSS/JS — no build step, no framework, no dependencies.

Full setup/operations doc: [SETUP-GUIDE.md](SETUP-GUIDE.md). Read that first
for hosting, SharePoint/Power Automate wiring, and the branding rationale.

## How it's built

One shared **engine** renders every VOC from a small **data file** — a new
VOC is a new file in `/data`, not new code.

```
index.html              landing page listing all VOCs
voc.html                generic form shell; loads a VOC via ?form=<id>
assets/css/voc-engine.css   all styling, incl. Besteel brand palette as CSS vars
assets/js/voc-engine.js     all interactive logic (retry popups, scoring,
                             practical section, signature pad, submit)
assets/js/config.js         SharePoint submission URL + logo/company name —
                             the one file to edit per deployment
assets/img/besteel-icon.png the brand icon used in the header
data/angle-grinder.js       first VOC, fully built — use as the reference example
data/_template.js           copy this to start a new VOC
BeSteel_Guidelines2024_R2-08.pdf   source of the colour palette / typography
```

## Key behaviour (don't regress this)

- Personal fields (name/date/site/etc.) + optional pre-questions (e.g. "have
  you read the SOP") + N graded multiple-choice questions + optional
  supervisor-led practical section.
- Wrong answer on a question: flash red, popup bubble "That answer is
  incorrect. Try again," question stays open, does **not** advance.
- Correct answer: locks the question green, records attempt count, can't be
  changed afterward.
- Submit button stays disabled until every required field is filled and
  every question is answered correctly (and, if the practical gate is
  answered "Yes", supervisor name + all ratings + overall outcome +
  signature are present too).
- On submit: POSTs JSON to `VOC_CONFIG.submitUrl` (a Power Automate flow that
  writes to a SharePoint list — see SETUP-GUIDE.md). If that URL is blank or
  the request fails, it downloads the response as `.json` instead of losing
  data — never let a submit path silently discard an employee's answers.

## Adding a new VOC

Fastest path: the user pastes raw VOC text (questions, options, which one is
marked "Correct", practical steps) into chat — turn that directly into a new
`data/<slug>.js` file following the shape in `data/_template.js` /
`data/angle-grinder.js`, then add a link to it in `index.html`. Don't touch
`voc-engine.js` or the CSS for a routine new VOC — if a VOC genuinely needs
new *behaviour* (not just new content), that's the signal to extend the
engine instead of special-casing it in a data file.

## Branding

Colours/type come from `BeSteel_Guidelines2024_R2-08.pdf` — see the
"Branding" section in SETUP-GUIDE.md for the full palette-to-CSS-variable
mapping and why Open Sans (not the licensed Trade Gothic Next LT) is the
current body/heading font. Green/red are semantic (correct/incorrect,
competent/not competent) and intentionally **not** brand colours — don't
reassign them to match the accent palette even if it looks more "on brand."

## Status / what's outstanding

- Angle Grinder VOC: content + branding done, reviewed by the user.
- ~20 more VOCs still to add — same pattern, just new data files.
- SharePoint submission: `assets/js/config.js` → `submitUrl` is still blank.
  Needs the Power Automate flow described in SETUP-GUIDE.md before this goes
  live; until then, submissions download as JSON instead of posting anywhere.
- No test suite / build tooling — this is intentionally plain static files.
  Verify changes by opening `index.html` directly in a browser (or serving
  the folder over any static HTTP server) and clicking through a VOC.
