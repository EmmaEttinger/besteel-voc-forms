# VOC HTML — Besteel Verification of Competency system

Interactive Verification of Competency (VOC) forms for Besteel employees,
replacing a Microsoft Forms setup that couldn't do retry-until-correct
quizzing. Static HTML/CSS/JS — no build step, no framework, and no
dependencies except one deliberate exception: both the VOC engine
(`voc.html`) and the Pre-Start Checklists tool (`prestart-checklist.html`)
load **jsPDF + jspdf-autotable from cdnjs** to generate a real PDF
client-side for every submission, auto-attached to the SharePoint item —
an audit-ready signed/dated record instead of raw JSON in a column. Same
library, same versions, loaded independently in each tool's own HTML file
(no shared script) since each tool keeps its own files. Nothing else in
the repo needs a build step or a library.

Full setup/operations doc: [SETUP-GUIDE.md](SETUP-GUIDE.md). Read that first
for hosting, SharePoint/Power Automate wiring, and the branding rationale.

## Hosting

This whole repo (VOC engine + Stationery Order + Pre-Start Checklists, all
of it) is pushed to **github.com/EmmaEttinger/besteel-voc-forms** (public
repo, branch `main`) with **GitHub Pages** turned on, serving from
`main` / root. Live site: `https://emmaettinger.github.io/besteel-voc-forms/`
— every file in this folder is reachable there under the same relative path
once pushed. Local `master` branch maps to GitHub's `main`; push with
`git push origin master:main`. Unlike Stationery Order's original setup
(a second, manually-synced repo — see SETUP-GUIDE.md section 3b), this is
the single copy: edit here, commit, push, and the live site updates —
no second repo to keep in sync.

**Caching gotcha:** GitHub Pages caches JS/CSS assets for 10 minutes
(`Cache-Control: max-age=600`), and a browser that already loaded a page
this session may keep using its own cached copy of `.js`/`.css` files even
across full page reloads, independent of that 10-minute window. So right
after pushing a change, a browser tab that visited the site earlier in the
same session can show stale behaviour. A hard refresh (Ctrl+F5) or a wait
of a few minutes resolves it — don't mistake this for a broken deploy.

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
- On submit: builds a real PDF client-side (jsPDF — see the dependency note
  above) of the completed VOC (person's details, every question with the
  answer given, the practical table and outcome if applicable, signature),
  attaches it as `pdfDataUrl`/`pdfFileName` on the payload, then POSTs the
  whole thing to `VOC_CONFIG.submitUrl` (a Power Automate flow that writes
  to a SharePoint list and attaches the PDF to the item — see SETUP-GUIDE.md
  section 3). If that URL is blank or the request fails, it downloads the
  response as `.json` (PDF included, base64-embedded) instead of losing
  data — never let a submit path silently discard an employee's answers.
- **`_collectPayload()` must never send `null` for `practicalRequired`,
  `overallOutcome`, or `signatureDataUrl`** — coalesce to `""` (see the
  `|| ""` in that function). The Power Automate trigger's schema expects
  a string for these and hard-rejects `null` with
  `TriggerInputSchemaMismatch` (HTTP 400), which every VOC *without* a
  practical section hits by default since those three fields only get a
  real value if the practical section actually rendered. Found when Emma
  tested Plasma Cutter's submission and got the generic
  "couldn't reach the submission service" error — the real cause wasn't
  connectivity, it was this schema mismatch, and it affected every VOC
  without a practical section (i.e. most of them) until fixed. If a
  similar "unreachable" error shows up again, check the browser's network
  tab / actually inspect the fetch response body first — the on-screen
  message is generic and can mask a specific, fixable server-side reason
  like this one.

## Adding a new VOC

Fastest path: the user pastes raw VOC text into chat, or drops a Word doc
in the sibling `VOC Content for Claude/` folder — either is fine, and two
source formats have shown up so far: inline `- Correct` after the right
option (Angle Grinder-style), and lettered `A) B) C) D)` options with a
separate `Correct Answer: X) ...` line underneath each question
(Bandsaw-style). Both parse into the exact same data shape, so don't ask
the user to pick one — just handle whichever they send. Turn it directly
into a new `data/<slug>.js` file following the shape in `data/_template.js`
/ `data/angle-grinder.js`, then add a link to it in `index.html`. Before
writing the file, verify every question has exactly one clearly marked
correct answer — flag anything missing/ambiguous to the user rather than
guessing, this is safety content. Don't touch `voc-engine.js` or the CSS
for a routine new VOC — if a VOC genuinely needs new *behaviour* (not just
new content), that's the signal to extend the engine instead of
special-casing it in a data file, but check with the user first (see the
Arc Welding rating-scale example in Status below — normalizing to match
the existing pattern is often the right call, but it's the user's call).

## Branding

Colours/type come from `BeSteel_Guidelines2024_R2-08.pdf` — see the
"Branding" section in SETUP-GUIDE.md for the full palette-to-CSS-variable
mapping and why Open Sans (not the licensed Trade Gothic Next LT) is the
current body/heading font. Green/red are semantic (correct/incorrect,
competent/not competent) and intentionally **not** brand colours — don't
reassign them to match the accent palette even if it looks more "on brand."

## Stationery Order — a separate tool in this same repo

`stationery-order.html` is not a VOC — it's a shopping-list style form for
staff to order pre-approved Officeworks stationery, built as its own
standalone set of files (`assets/css/stationery.css`,
`assets/js/stationery-engine.js`, `data/stationery-items.js`) so it can
never regress the VOC engine and vice versa. Full details — including where
it's actually hosted (not this repo's normal deployment path) and how to
add items to the catalogue — are in SETUP-GUIDE.md section **"3b.
Stationery Order."** Status: **live and working end-to-end** as of
2026-08-19 (hosted on GitHub Pages, linked from a SharePoint Dashboard
card, submissions flow into a SharePoint list via Power Automate).

## Pre-Start Checklists — a third separate tool in this same repo

`prestart-checklist.html` is also not a VOC — it's a Pass/Fail/N-A equipment
pre-start inspection (Truck/Semi-Trailer, Forklift, Gantry Crane, Vehicle
Loading Crane, general Equipment — sourced from SafetyCulture PDF exports),
built as its own standalone set of files (`assets/css/prestart.css`,
`assets/js/prestart-engine.js`, `data/prestart-*.js`) for the same reason
Stationery Order got its own files: so it can never regress the VOC quiz
engine and vice versa. One engine, many data files, loaded via
`prestart-checklist.html?form=<id>` — same pattern as `voc.html`. Full
details are in SETUP-GUIDE.md section **"3c. Pre-Start Checklists."**
Status: **all 5 checklists built** (Truck/Semi-Trailer, Forklift, Gantry
Crane, Vehicle Loading Crane, Equipment) as of 2026-09-02, hosted on GitHub
Pages (see "Hosting" above). Truck/Semi-Trailer is **live and working
end-to-end**: SharePoint list + Power Automate flow built and confirmed
via test submissions (including the `AnyFail` Yes/No column, which needed
an explicit `equals(triggerBody()?['anyFail'], true)` expression rather
than plain dynamic content — plain mapping left it blank). The other 4
submit to the same flow/list and should work the same way, but haven't
each been individually test-submitted yet. Still need the SharePoint
button/card wired up (Emma is doing this directly).

The Equipment checklist (`data/prestart-equipment.js`) is a different
shape from the other 4 — sourced from a differently-structured PDF
("Equipment Pre-Start Inspection Checklist.pdf") that covers several
equipment types with Okay/Needs Attention/N-A responses and a simple
notes+photo close instead of the full defect workflow. Rather than
special-case it, `prestart-engine.js` gained optional config support for
this: `resultLabels` (relabel the per-item buttons — internal
Pass/Fail/N-A values are unchanged, so scoring/fail-styling/print all
keep working), `equipmentOptions` (swap the free-text Equipment/Asset
field for a dropdown), `siteFieldLabel` / `personCompletingLabel`
(relabel those fields), and `finalVerification: { type: "notes" }` (swap
the Defects Identified/Safe to Operate/Corrective Action Required
workflow for Notes + Photos). See `data/_prestart-template.js` for how to
use these on a future checklist. Notes-type submissions reuse the
existing `correctiveActionDetails` payload field for the note text, so no
Power Automate/SharePoint changes were needed to capture it.

## Status / what's outstanding

- 25 VOCs done: Abrasive Cut-Off Saw, Angle Grinder, Arc Welding, Bandsaw,
  Bench Grinder, Guillotine, Overhead Crane, Operation of Oxy Acetylene
  Set, Operation of Plasma Cutter, Operation of a Truck with Hi-Ab, Steel
  Erection, MIG Welding, Drill Press, Storage & Handling of Steel in
  Warehouse Racking, Blower, Brake Press, Coil Change, Drop Saw, EWP
  Scissor Lift, Linisher, Loading and Unloading Truck (Non-Site
  Specific), Operation of Power Tools, Operation of Punch & Shear
  Machine, Truck Loading and Unloading (Yandina), Use of Air Compressor
  and Pneumatic Tools. Past the original ~21 estimate now — Emma keeps
  sending more, same pattern each time. 12 of those were built from Word
  docs in `VOC Content for
  Claude/` (2026-09-09) — extracted via a one-off PowerShell docx→text
  script (no pandoc/python in this environment; see scratchpad if that
  script is ever needed again) and cross-checked programmatically (every
  question has exactly one "- Correct" marker, every practical item's
  rating scale matches its source) before writing any data file,
  specifically so a missing/ambiguous answer never gets guessed into a
  safety quiz. That check caught two things, both since resolved with
  Emma: Loading and Unloading's question 8 had no marked correct answer
  (she fixed the source doc, rebuilt same day), and Arc Welding's source
  doc rated practical items Compliant/Non-Compliant/N/A (three options)
  where every other VOC uses two-option Competent/Not Competent — Emma
  chose to normalize the wording rather than add engine support for a
  per-VOC rating scale, so Arc Welding's practical section now uses the
  same Competent/Not Competent buttons (with no N/A choice) as everyone
  else. If a future VOC genuinely needs a 3-option or differently-labelled
  practical rating, that's the point to actually build the configurable
  version (à la Pre-Start's `resultLabels`) — don't silently normalize a
  second time without asking, since this one only went one way because
  Emma chose it.
- The `VOC Content for Claude/` folder (outside this repo, a sibling
  working directory) is where Emma drops source Word docs for new VOCs —
  everything in it as of 2026-09-09 is now built. Same fastest-path as
  ever for anything added there later: read it, cross-check every
  question has exactly one marked correct answer before writing the data
  file, flag anything ambiguous instead of guessing.
- SharePoint submission: **wired up and live** as of 2026-09-08.
  `VOC_CONFIG.submitUrl` in `assets/js/config.js` points at Emma's own
  Power Automate flow (its own flow/list, separate from Stationery Order
  and Pre-Start Checklists); confirmed via a test submission (Angle
  Grinder, success screen shown, not the JSON-download fallback) — worth
  double-checking the test row landed in the SharePoint list and deleting
  it. Note: this URL replaced a placeholder that had accidentally been a
  duplicate of `STATIONERY_CONFIG`'s URL — if old VOC test submissions are
  missing, that's why; anything submitted from now on goes to the right
  place.
- VOC PDF generation: **built**, same pattern as Pre-Start's (see the
  dependency note and "Key behaviour" above). Verified locally (correct
  layout, correct colours on Competent/Not Competent, correct field
  spacing, signature embeds correctly — the one real bug found in testing,
  long personal-field labels overlapping their values, is fixed). Not yet
  attached to the SharePoint item, though — that needs the same Condition +
  "Add attachment" steps added to Emma's VOC flow that Pre-Start's flow has
  (see SETUP-GUIDE.md section 3); the payload field already exists, the
  flow just doesn't do anything with it yet.
- Stationery Order tool: complete and live — see above, no outstanding work
  unless the catalogue needs new items or reporting gets requested later.
- Pre-Start Checklists: all 5 built — see above. Truck/Semi-Trailer
  confirmed live end-to-end; the other 4 share the same flow/list but
  haven't each been individually test-submitted. Still need: the
  SharePoint button/card actually pointed at the live URL.
- No test suite / build tooling — this is intentionally plain static files.
  Verify changes by opening `index.html` directly in a browser (or serving
  the folder over any static HTTP server) and clicking through a VOC.
