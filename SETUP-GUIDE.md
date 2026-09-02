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

**Where this will be hosted.** Like Stationery Order, SharePoint document
libraries can't execute `.html`/JS files directly, so this almost certainly
needs the same GitHub Pages arrangement (see section 3b above) rather than
living as a file *inside* SharePoint — a SharePoint page/button then links
out to the GitHub Pages URL. Send me the URL of the button/card you want it
linked from on SharePoint once you're ready, and I'll confirm the hosting
approach and get the live URL wired up to it.

**Getting responses into a SharePoint list.** Same Power Automate pattern
as the VOC engine (section 3 above) — the form POSTs JSON to a flow, the
flow writes to a list — but needs its **own** flow and its **own** list
(don't reuse the VOC or Stationery ones, the shape of the data is
different). Once built, paste the HTTP POST URL into
`PRESTART_CONFIG.submitUrl` in `assets/js/config.js` (and, once this is
hosted on GitHub Pages, into the live copy there too — same two-places
gotcha as Stationery Order in section 3b).

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

**Keeping a copy / PDF export.** There's no server-side PDF generation —
after Submit, a **"Print / Save as PDF"** button appears, which opens the
browser's own print dialog against a print-specific stylesheet that hides
all the interactive buttons and shows a clean pass/fail record instead;
choosing "Save as PDF" as the destination in that dialog is how staff (or
you) get a PDF copy. This works even before `PRESTART_CONFIG.submitUrl` is
configured, and independently of whether the SharePoint submission
succeeds — so a completed checklist can always be kept as a PDF or referred
back to on-screen, regardless of connectivity. If you want every submission
automatically archived as a PDF in a SharePoint document library (not just
available on request from whoever filled it in), that needs a small
addition to the Power Automate flow (e.g. a "Convert to PDF" / HTML-to-PDF
step) — a reasonable follow-up once the base flow is live, not something to
build speculatively now.

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
