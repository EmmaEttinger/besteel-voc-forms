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

**Gotcha hit and fixed:** the `personal.*` source fields above (EmployeeName,
ConductedOn, Site, Location) are nested inside a `personal` object in the
payload, not top-level fields — unlike Stationery Order/Pre-Start, whose
person-detail fields are flat. Power Automate's dynamic-content picker
doesn't reliably drill into that nesting, so mapping these "the easy way"
can silently wire the column to the *whole* `personal` object — Power
Automate then stringifies it, and the column ends up showing something like
`{"preparedBy":"Darth Vader","conductedOn":"2026-09-08T13:26","siteConducted":"Yandina",...}`
instead of just the name. Fix: map each of these fields via **Expression**,
not dynamic content:

| Column | Expression |
|---|---|
| EmployeeName | `triggerBody()?['personal']?['preparedBy']` |
| ConductedOn | `triggerBody()?['personal']?['conductedOn']` |
| Site | `triggerBody()?['personal']?['siteConducted']` |
| Location | `triggerBody()?['personal']?['location']` |

(Same pattern for `siteReference` if you add a column for it.) Worth
checking all four columns if you hit this on any one of them — they're all
equally exposed to the same nested-object issue. Any row already saved with
the raw-JSON value needs a manual edit (or delete) in the list itself;
there's no way to bulk-fix existing rows from the flow.

Keeping the per-question detail as JSON in one column is the pragmatic choice
for 10+ questions across 20+ different VOCs with different questions — trying
to give every question its own column doesn't scale. If you want to report on
individual question performance, add a second flow step that also writes each
answer as its own row into a separate "VOC Answers" list (Compose a "Select"
action over the `questions` array). Ask me for this if/when you want it — it's
a small addition.

**Signatures:** `signatureDataUrl` is a base64 PNG. You don't need to do
anything with it directly — it's already embedded in the auto-generated PDF
described below, which is the better place for an auditor to see it anyway
(next to the questions it belongs to, not floating in its own column). Only
store it separately if you specifically want the raw signature image
outside the PDF too.

**Keeping an audit-ready copy — the PDF.** Every submission also builds a
real PDF client-side (via jsPDF, loaded from cdnjs — see the `<script>` tags
in `voc.html`) with the person's details, every question and the answer
given, the practical section table and overall outcome (if applicable), and
the signature — laid out as a single signed, dated record. It's sent as
`pdfDataUrl` (a base64 data URI) + `pdfFileName` alongside the rest of the
JSON payload. **This needs one addition to the Power Automate flow** to
actually land as a SharePoint attachment — the payload field exists
already, but nothing writes it anywhere until you add this step (identical
to the one already built for Pre-Start Checklists — see section 3c below
for the same recipe in that context):

- **+ New step → Condition**: `pdfDataUrl` (from trigger dynamic content)
  **is not equal to** *(leave the value blank)* — skips cleanly on the rare
  submission where PDF generation failed client-side (missing image,
  unsupported browser, etc.) rather than erroring the whole flow.
- Inside the **Yes** branch, **+ New step → SharePoint → Add attachment**:
  - Site Address / List Name: same as the "Create item" step above.
  - Id: the **ID** from the "Create item" step's output (dynamic content)
    — this is why Add attachment must come *after* Create item, not before.
  - File Name: `pdfFileName` (dynamic content).
  - File Content: switch to **Expression** and enter
    `base64ToBinary(substring(triggerBody()?['pdfDataUrl'], add(indexOf(triggerBody()?['pdfDataUrl'], ','), 1)))`
    — `pdfDataUrl` arrives as `data:application/pdf;filename=generated.pdf;base64,<data>`,
    so this strips everything up to and including the comma before decoding.
- No new SharePoint column needed — attachments are a built-in list item
  feature, already on by default.

Same image-downscaling approach as Pre-Start's PDF (see section 3c) is
already built in for the logo, so there's no equivalent "100MB PDF" gotcha
to worry about here.

## 3b. Stationery Order — SharePoint list + emailed order

`stationery-order.html` is a separate tool (not a VOC) for staff to order
from a pre-approved Officeworks stationery list. It's a shopping-list style
form: name, site, order date, and a quantity stepper per item, grouped by
category, plus a free-text "Anything Else?" box for items not in the
catalogue. Same static-files, no-build approach as the VOC engine, but it's
its own set of files so a VOC change never risks this tool and vice versa:

```
stationery-order.html        the form page
assets/css/stationery.css    its styling (palette duplicated from voc-engine.css)
assets/js/stationery-engine.js   rendering, quantity state, validation, submit
data/stationery-items.js     the item catalogue — edit this to add/remove/reorder items
```

**Where this actually lives:** SharePoint document libraries can't execute
`.html`/JS files (confirmed — SharePoint forces them to download, or offers
only "Open in Text Editor"), and the SharePoint "Embed" web part is blocked
tenant-wide for external domains. So the real, running copy of these files
is hosted on **GitHub Pages** at
`https://emmaettinger.github.io/besteel-stationery-order/stationery-order.html`
(repo: `EmmaEttinger/besteel-stationery-order`). Staff reach it via the
**"Updated Stationery Order Form"** card on the SharePoint Dashboard
(`https://besteel.sharepoint.com/sites/Office/SitePages/Dashboard.aspx`),
which just links out to that URL. A backup copy also sits in
`Office Forms/Stationery Order` on the Office SharePoint site, but that copy
is inert — it can't run, it's there for reference/version history only.

**`STATIONERY_CONFIG.submitUrl` lives in *two* places** — this repo's
`assets/js/config.js` (local copy) and the live `assets/js/config.js` on
GitHub Pages (edit directly via GitHub's web editor, or re-upload the
file). **The GitHub Pages copy is the one that actually matters** — that's
what real users hit. If you ever change the submit URL again (e.g. the flow
gets recreated), update it there, not just locally, or Submit will silently
keep downloading `.json` files instead of posting anywhere (the same safety
net as the VOC forms, but it means a stale URL fails quietly rather than
loudly — worth remembering if orders stop showing up).

**SharePoint list — already built.** `Stationery Orders - Updated v2` exists
on the Office site (`Site contents` → the list) with these columns:

| Column | Type |
|---|---|
| Title | Single line of text (required — default SharePoint column) |
| RequestedBy | Single line of text |
| Site | Single line of text |
| OrderDate | Date and Time |
| SubmittedAt | Date and Time |
| TotalLines | Number |
| TotalQuantity | Number |
| ItemsJSON | Multiple lines of text |
| CustomItemsJSON | Multiple lines of text |

One row per order. Line items are stored as JSON in `ItemsJSON` /
`CustomItemsJSON` rather than split into a second list — same pragmatic
call as the VOC engine's per-question JSON columns (see step 3 above):
simpler to build and maintain, at the cost of not being able to easily sum
"how many reams of A4 paper this quarter" without opening the JSON. If that
kind of reporting becomes worth it later, a second list with one row per
item is a small addition — ask for it then.

**Flow status: built and live**, confirmed working end-to-end (test order
submitted, landed correctly in `Stationery Orders - Updated v2`, test row
cleaned up). The steps below are kept as reference — for troubleshooting,
or if the flow ever needs rebuilding.

**One important gotcha, already hit once:** on the trigger card, **"Who can
trigger the flow?" must be set to "Anyone"**, not the default "Any user in
my tenant." "Any user in my tenant" forces every caller to present a
Microsoft OAuth token, which a public static webpage can't do — it fails
with a `DirectApiAuthorizationRequired` error and the form shows "couldn't
reach the server." Switching to "Anyone" regenerates the HTTP POST URL with
a `sig=...` signature at the end, which *is* callable anonymously (same
pattern the VOC forms rely on). If submissions ever start failing again,
check this setting first before anything else.

**Building the flow, step by step:**

1. Go to [make.powerautomate.com](https://make.powerautomate.com) and sign
   in. **Create → Instant cloud flow.** Name it something like "Stationery
   Order Submission". Choose trigger **"When an HTTP request is received"**,
   then click Create. On the trigger card, set **"Who can trigger the
   flow?" to "Anyone"** (see gotcha above — the default will silently break
   submissions).
2. On the trigger card, click **"Use sample payload to generate schema"**
   and paste this in:
   ```json
   {
     "requestedBy": "Jane Smith",
     "site": "Caloundra",
     "orderDate": "2026-08-10",
     "submittedAt": "2026-08-10T04:12:00.000Z",
     "items": [
       { "category": "Paper & Notebooks", "name": "J.Burrows 80gsm Premium A4 Copy Paper Carton", "code": "JBCNCPA4CT", "quantity": 2 }
     ],
     "customItems": [
       { "description": "Whiteboard eraser, magnetic", "quantity": 1 }
     ],
     "totalLines": 2,
     "totalQuantity": 3
   }
   ```
   This gives you dynamic-content fields for `requestedBy`, `site`,
   `orderDate`, `submittedAt`, `totalLines`, `totalQuantity`, and the raw
   `items` / `customItems` arrays. `customItems` is always present, possibly
   `[]` — it comes from the "Anything Else?" box on the form.
3. **+ New step → SharePoint → Create item.**
   - Site Address: the Office site (`https://besteel.sharepoint.com/sites/Office`)
   - List Name: **Stationery Orders - Updated v2**
   - Map fields from the trigger's dynamic content:
     - Title → `requestedBy` (or combine with `orderDate` if you want more
       unique-looking titles, e.g. `concat(triggerBody()?['requestedBy'], ' - ', triggerBody()?['orderDate'])`)
     - RequestedBy → `requestedBy`
     - Site → `site`
     - OrderDate → `orderDate`
     - SubmittedAt → `submittedAt`
     - TotalLines → `totalLines`
     - TotalQuantity → `totalQuantity`
     - ItemsJSON → click the field, switch to **Expression**, enter
       `string(triggerBody()?['items'])`
     - CustomItemsJSON → same, `string(triggerBody()?['customItems'])`
4. **+ New step → Outlook → Send an email (V2)**, addressed to yourself.
   - **+ New step → Data Operations → Create HTML table**, "From" = the
     `items` array (dynamic content), Columns: Automatic. Do this *before*
     the email step (drag it above, or just add it first) so its output is
     available to reference.
   - Add a second **Create HTML table** over `customItems`.
   - In the email body, write something like:
     ```
     New stationery order from [RequestedBy] — [Site], [OrderDate]

     Catalogue items:
     [output of first Create HTML table]

     Anything else requested:
     [output of second Create HTML table]
     ```
     dragging each "Create HTML table" action's Output into place as
     dynamic content. Power Automate renders these as real HTML tables in
     the sent email — that's the "well presented email" with minimal effort.
5. **Save** the flow. Click the trigger card again to reveal the **HTTP POST
   URL** — copy it.
6. Paste that URL into `STATIONERY_CONFIG.submitUrl` in two places (see
   above): this repo's `assets/js/config.js`, and the live copy on
   `github.com/EmmaEttinger/besteel-stationery-order` (edit `assets/js/config.js`
   there directly via GitHub's web editor, or re-upload the file).
7. Test it: open the live form, fill in a test order, submit, and confirm a
   new item lands in `Stationery Orders - Updated v2` and the email arrives.

**Adding items to the standard catalogue.** Staff use the "Anything Else?"
free-text box for anything not already on the list — if the same item
keeps showing up there, that's the signal to add it properly. The
catalogue is `data/stationery-items.js`, an array of categories each with
an `items` list of `{ name, code }` objects:

```js
{
  category: "Pens, Markers & Highlighters",
  items: [
    { name: "Sharpie Ultra Fine Permanent Markers Black 12 Pack", code: "SHS37001BK" },
    // add a new item here, or a new { category: "...", items: [...] } block for a new category
  ]
}
```

Two ways to update it:
- **Paste the item details to me in chat** (name, Officeworks product code,
  which category it belongs in) and I'll edit the file and redeploy it —
  fastest, and I'll keep the formatting/ordering consistent.
- **Edit it yourself on GitHub**: `github.com/EmmaEttinger/besteel-stationery-order`
  → `data/stationery-items.js` → pencil/edit icon → add the item in the
  same `{ name: "...", code: "..." }` shape → commit to `main`. Live
  within a few minutes (GitHub Pages' CDN needs a short moment to catch up,
  same as the config.js delay you hit earlier).

Either way, only `data/stationery-items.js` needs to change — nothing else
about the form, engine, or flow depends on the specific item list.

**Spotting what's being asked for repeatedly:** there's no automatic
tally yet — free-text requests land in the `CustomItemsJSON` column of
`Stationery Orders - Updated v2`, one order at a time, with no aggregation
across orders. For now, that means periodically skimming that column (or
the emailed orders) for repeats. If this becomes a regular enough task to
be worth automating — e.g. a monthly summary of the most-requested
non-catalogue items — that's a reasonable small addition to the Power
Automate flow or a follow-up ask later, not something built in from the
start.

## 3c. Pre-Start Checklists — SharePoint list, optional PDF copy

`prestart-checklist.html` is a Pass/Fail/N-A equipment pre-start inspection
— content sourced from SafetyCulture PDF exports (Truck/Semi-Trailer,
Forklift, Gantry Crane, Vehicle Loading Crane, general Equipment). Same
static-files, no-build approach, but its own set of files so it can never
regress the VOC quiz engine or the Stationery Order tool:

```
prestart-checklist.html          generic form shell; loads a checklist via ?form=<id>
assets/css/prestart.css          its styling (palette duplicated from voc-engine.css)
assets/js/prestart-engine.js     rendering, Pass/Fail/N-A state, validation, submit, print
data/prestart-truck-semi-trailer.js   first checklist, fully built
data/_prestart-template.js       copy this to add the next equipment type
```

One engine, many data files — same pattern as the VOC quiz engine. Each
data file is just section headings with a list of item labels; every item
gets a Pass/Fail/N-A control (that's the one interaction this tool
supports — a different kind of question belongs in a VOC instead).

**Where this is hosted — confirmed, live.** Unlike Stationery Order's
separate manually-synced repo, this whole "VOC HTML" folder (VOC engine +
Stationery Order + Pre-Start Checklists together) is pushed straight to
**github.com/EmmaEttinger/besteel-voc-forms** with GitHub Pages turned on.
Live URL for this checklist:
`https://emmaettinger.github.io/besteel-voc-forms/prestart-checklist.html?form=truck-semi-trailer`
— that's the URL to put on the SharePoint button/card. There's only one
copy of every file to edit (this folder) — commit and `git push origin
master:main` here and the live site updates, no second repo to keep in
sync. See "Hosting" in CLAUDE.md for the short version.

**Getting responses into a SharePoint list — done and verified.** Same
Power Automate pattern as the VOC engine (section 3 above) — the form
POSTs JSON to a flow, the flow writes to a list — with its own flow and
its own list (**Pre-Start Checklists**, separate from the VOC and
Stationery ones since the data shape is different). `PRESTART_CONFIG.submitUrl`
in `assets/js/config.js` is set and confirmed working via test
submissions (both a normal all-Pass one and a Fail one, to check
`AnyFail` in both states).

**Gotcha hit and fixed:** mapping the `AnyFail` field into a SharePoint
Yes/No column using plain dynamic content left it blank — Power Automate
doesn't reliably coerce a JSON boolean into a Yes/No column that way. Fix:
in the SharePoint "Create item" step, set the AnyFail field via
**Expression** instead of dynamic content:
`equals(triggerBody()?['anyFail'], true)`. Worth remembering if you ever
add another true/false field to this flow (or the VOC/Stationery ones).

Suggested SharePoint list columns:

| Column | Type | Source field |
|---|---|---|
| Title | Text | `title` |
| EquipmentType | Text | `equipmentType` |
| EquipmentAsset | Text | `equipmentAsset` |
| Site | Text | `site` |
| ConductedOn | Date and Time | `conductedOn` |
| PreparedBy | Text | `preparedBy` |
| PersonCompleting | Text | `personCompleting` |
| AnyFail | Yes/No | `anyFail` |
| DefectsIdentified | Choice (Yes/No) | `defectsIdentified` |
| SafeToOperate | Choice (Yes/No) | `safeToOperate` |
| CorrectiveActionRequired | Choice (Yes/No/N-A) | `correctiveActionRequired` |
| CorrectiveActionDetails | Multiple lines of text | `correctiveActionDetails` |
| NotifyPeople | Multiple lines of text | `JSON.stringify(notifyPeople)` |
| ChecklistJSON | Multiple lines of text | `JSON.stringify(sections)` (add a Compose action) |
| SubmittedAt | Date and Time | `submittedAt` |

Same pragmatic call as the other two tools: individual checklist items are
kept as JSON in one column rather than one column per item — 35 items per
equipment type across 5 checklists doesn't scale as columns. Ask if you
want a second "Pre-Start Answers" list with one row per item later.

**Defect photo:** `photoDataUrl` is an optional base64 image (only present
if someone attaches one) — same handling as the VOC signature pad. Store it
as-is in a "Multiple lines of text" column, or add a Power Automate step
that decodes it into a SharePoint attachment.

**Keeping a copy / PDF export.** Two ways, both without any server-side PDF
service:

1. **On-screen, on demand** — after Submit, a **"Print / Save as PDF"**
   button appears, which opens the browser's own print dialog against a
   print-specific stylesheet that hides the interactive buttons and shows
   a clean pass/fail record; choosing "Save as PDF" as the destination is
   how anyone with the link gets a copy. Works even without
   `PRESTART_CONFIG.submitUrl` configured, and independently of whether the
   SharePoint submission succeeds.
2. **Automatic, attached to the SharePoint item** — every submission also
   builds a real PDF client-side (via jsPDF, loaded from cdnjs — see the
   `<script>` tags in `prestart-checklist.html`) and sends it as
   `pdfDataUrl` (a base64 data URI) + `pdfFileName` alongside the rest of
   the JSON payload. **This needs one addition to the Power Automate flow**
   to actually land as a SharePoint attachment — the payload field exists
   already, but nothing writes it anywhere until you add this step:
   - **+ New step → Condition**: `pdfDataUrl` (from trigger dynamic
     content) **is not equal to** *(leave the value blank)* — skips
     cleanly on the rare submission where PDF generation failed
     client-side (missing image, unsupported browser, etc.) rather than
     erroring the whole flow.
   - Inside the **Yes** branch, **+ New step → SharePoint → Add
     attachment**:
     - Site Address / List Name: same as the "Create item" step above.
     - Id: the **ID** from the "Create item" step's output (dynamic
       content) — this is why Add attachment must come *after* Create
       item, not before.
     - File Name: `pdfFileName` (dynamic content).
     - File Content: switch to **Expression** and enter
       `base64ToBinary(substring(triggerBody()?['pdfDataUrl'], add(indexOf(triggerBody()?['pdfDataUrl'], ','), 1)))`
       — `pdfDataUrl` arrives as `data:application/pdf;base64,<data>`,
       so this strips everything up to and including the comma before
       decoding.
   - No new SharePoint column needed — attachments are a built-in list
     item feature, already on by default.

   **Gotcha already hit and fixed:** the first version of this feature fed
   the brand logo (a 4501×4501px source PNG, shown at 34px on screen)
   straight into jsPDF's `addImage()`, which embeds pixel data close to
   1:1 rather than re-compressing — that produced a **100MB+ "PDF"** from
   a 300KB logo file. Fixed by downscaling every image (logo and any
   attached defect photo) through an offscreen `<canvas>` before handing
   it to jsPDF — see `loadScaledImageDataUrl` in `prestart-engine.js`. If
   you ever add another image to the PDF, reuse that helper rather than
   calling `addImage()` on a raw source image.

**Adding the remaining checklists** (Forklift, Gantry Crane, Vehicle
Loading Crane, general Equipment). Same fastest-path as VOCs: paste the raw
checklist text (section headings + item labels) into chat and I'll turn it
into `data/prestart-<slug>.js` and add a link to it in `index.html`. The
PDFs for all four are already sitting in the Safety Culture Content
Downloads folder.

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
