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
  // Every item gets a Pass / Fail / N-A control — no other item
  // type is currently supported (that's the whole point of this
  // checklist shape; if you need a different kind of question,
  // that belongs in a VOC instead — see data/_template.js).
  sections: [
    {
      name: "Section name",
      items: ["Item one", "Item two", "Item three"]
    }
    // ...repeat for each section
  ],

  // Optional: checkbox list shown under "Notify Person(s)/Group(s)"
  // when Corrective Action Required = Yes. Leave as [] if not needed.
  notifyPeople: []
};
