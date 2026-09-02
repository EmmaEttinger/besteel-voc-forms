// ============================================================
// TEMPLATE — copy this file to data/prestart-your-equipment.js
// and fill in. Then add a link to it in index.html.
//
// Fastest path: paste the raw checklist text (section headings
// and item labels — Pass/Fail/N-A is assumed for every item) to
// Claude and ask it to turn it into a file like this one.
// ============================================================

window.PRESTART_DATA = {
  title: "Pre Start Checklist – [Equipment Name]",

  meta: {
    formId: "your-equipment-name", // must match the filename: data/prestart-<formId>.js
    equipmentType: "[Equipment Name]",
    version: "1.0"
  },

  sites: ["Caloundra", "Coolum", "Crestmead", "Yandina"],

  // Each section renders as a heading with its items underneath.
  // Every item gets a Pass / Fail / N-A control (relabel the
  // buttons with resultLabels below if your source PDF uses
  // different wording — the values stored/scored are always
  // Pass/Fail/N-A regardless of the button text shown).
  sections: [
    {
      name: "Section name",
      items: ["Item one", "Item two", "Item three"]
    }
    // ...repeat for each section
  ],

  // Optional: checkbox list shown under "Notify Person(s)/Group(s)"
  // when Corrective Action Required = Yes. Leave as [] if not needed.
  notifyPeople: [],

  // ---- Optional engine config — delete any of these you don't need ----

  // Relabel the per-item buttons (e.g. a checklist that uses
  // Okay/Needs Attention/Not Applicable instead of Pass/Fail/N-A —
  // see data/prestart-equipment.js for a real example).
  // resultLabels: { Pass: "Okay", Fail: "Needs Attention", "N/A": "Not Applicable" },

  // If the checklist covers several different pieces of equipment
  // rather than one fixed type, this swaps the free-text
  // "Equipment / Asset" field for a dropdown.
  // equipmentOptions: ["Asset A", "Asset B"],

  // Override the "Site conducted" field label (e.g. "Location").
  // siteFieldLabel: "Site conducted",

  // Override the final sign-off name field's label.
  // personCompletingLabel: "Person Completing Pre Start Inspection",

  // Swap the full Defects Identified / Safe to Operate / Corrective
  // Action Required workflow for a simpler Notes + Photos close —
  // see data/prestart-equipment.js. Omit this whole block for the
  // standard workflow (used by every other checklist so far).
  // finalVerification: { type: "notes" }
};
