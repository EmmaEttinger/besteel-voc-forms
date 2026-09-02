// ============================================================
// PRE-START CHECKLIST DATA — Truck / Semi-Trailer
// Sourced from "Pre Start Checklist - Truck / Semi-Trailer.pdf"
// (SafetyCulture export). Loaded by prestart-checklist.html via
// ?form=truck-semi-trailer
// ============================================================

window.PRESTART_DATA = {
  title: "Pre Start Checklist – Truck / Semi-Trailer",

  meta: {
    formId: "truck-semi-trailer",
    equipmentType: "Truck / Semi-Trailer",
    version: "1.0"
  },

  sites: ["Caloundra", "Coolum", "Crestmead", "Yandina"],

  sections: [
    {
      name: "General",
      items: ["No visible damage", "Registration / identification visible", "Vehicle clean and safe"]
    },
    {
      name: "Wheels / Running gear",
      items: ["Tyres in good condition", "Wheel nuts secure", "Suspension condition acceptable"]
    },
    {
      name: "Safety / Restraints",
      items: [
        "Guards / handrails secure",
        "Chains / straps serviceable",
        "Load restraints secure",
        "Lockdowns / doors secure",
        "Turntable / hitch condition acceptable",
        "Hooks / connections acceptable"
      ]
    },
    {
      name: "Mechanical",
      items: [
        "No hydraulic leaks",
        "No air leaks",
        "Fluid levels acceptable",
        "Lubrication levels acceptable",
        "Fire extinguisher present",
        "First aid kit present"
      ]
    },
    {
      name: "Startup / Controls",
      items: [
        "Logbook present",
        "Logbook current",
        "Seat and seatbelt functioning",
        "Mirrors / visibility clear",
        "Windscreen condition acceptable",
        "Dust control functioning (if fitted)",
        "Horn operational",
        "Reversing alarm operational",
        "Fuel level adequate",
        "Gauges / warning lights normal",
        "Pedals functioning",
        "Brakes functioning",
        "Lights operational",
        "No unusual noises",
        "No unusual vibrations",
        "No unusual smells",
        "Two-way radio operational (if fitted)"
      ]
    }
  ],

  // "Notify Person(s)/Group(s)" checkboxes shown when Corrective
  // Action Required = Yes (from the source SafetyCulture form).
  notifyPeople: ["Jeffrey Miller"]
};
