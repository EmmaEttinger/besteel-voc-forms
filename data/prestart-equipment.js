// ============================================================
// PRE-START CHECKLIST DATA — General Equipment
// Sourced from "Equipment Pre-Start Inspection Checklist.pdf"
// (SafetyCulture export). Loaded by prestart-checklist.html via
// ?form=equipment
//
// Different shape from the other 4 checklists, all handled via
// engine config rather than special-casing:
//  - Okay / Needs Attention / Not Applicable instead of Pass/Fail/N-A
//    (resultLabels — the engine still tracks Pass/Fail/N-A internally)
//  - covers several pieces of equipment, so an "Equipment" picker
//    (equipmentOptions) replaces the free-text Equipment/Asset field
//  - closes with a simple Notes/Defect + Photos section instead of
//    the full Defects Identified / Safe to Operate / Corrective
//    Action Required workflow (finalVerification.type = "notes")
// ============================================================

window.PRESTART_DATA = {
  title: "Equipment Pre-Start Inspection Checklist",

  meta: {
    formId: "equipment",
    equipmentType: "Equipment",
    version: "1.0"
  },

  sites: ["Caloundra", "Coolum", "Crestmead", "Yandina"],
  siteFieldLabel: "Location",
  personCompletingLabel: "Person Completing Inspection",

  equipmentOptions: [
    "Ace crane",
    "JDN crane",
    "Mitsubishi forklift",
    "CAT forklift",
    "Trade pack truck",
    "Hino truck",
    "UD truck",
    "HI-AB crane on UD truck"
  ],

  resultLabels: { Pass: "Okay", Fail: "Needs Attention", "N/A": "Not Applicable" },

  finalVerification: { type: "notes" },

  sections: [
    {
      name: "1. Equipment / Asset Verification",
      items: ["Identify and record equipment ID, model, and asset tag.", "Confirm correct equipment for the task."]
    },
    {
      name: "2. Visual Inspection",
      items: [
        "Check for visible damage, wear, corrosion, or missing components.",
        "Check fluid levels (fuel, oil, coolant) — top up if needed.",
        "Inspect for leaks or abnormal fluid accumulation.",
        "Check tyres/tracks/wheels: inflation, tread, and condition.",
        "Verify safety labels, warning signs, and filters are clean and legible."
      ]
    },
    {
      name: "3. Supplies & Materials",
      items: [
        "Confirm required materials, accessories, and attachments are available.",
        "Check inventory; restock as needed. Verify hazardous material storage."
      ]
    },
    {
      name: "4. Safety",
      items: [
        "Conduct a risk assessment; identify and mitigate hazards.",
        "Confirm safety guards, PPE, first aid kit, and fire extinguisher are in place.",
        "Safety belt / harness condition checked. Safety briefing completed."
      ]
    },
    {
      name: "5. Environment & Surroundings",
      items: [
        "Assess environmental conditions (weather, lighting, temperature).",
        "Secure work area; remove obstacles. Verify ground stability."
      ]
    },
    {
      name: "6. Communication",
      items: ["Confirm communication devices are functional and channels are established."]
    },
    {
      name: "7. Documentation & Permits",
      items: [
        "Confirm permits, licences, and certificates are valid and accessible.",
        "Ensure manuals, maintenance records, and paperwork are complete."
      ]
    },
    {
      name: "8. Training",
      items: ["Confirm all operators are trained and competent for this equipment/task."]
    },
    {
      name: "9. Functional Tests (After Start-Up)",
      items: [
        "Start equipment; check for abnormal noises, vibrations, or warning lights.",
        "Test all operational functions (lifting, steering, braking, etc.).",
        "Verify all controls, switches, and buttons are functional.",
        "Confirm safety interlocks and emergency shut-off mechanisms operate correctly.",
        "Check safety features: lights, alarms, mirrors — all in working order.",
        "Verify gauges, meters, and indicators are accurate and readable.",
        "Confirm no fluid leaks after start-up. Check battery/power connections.",
        "Conduct a brief test run to confirm overall performance."
      ]
    }
  ]
};
