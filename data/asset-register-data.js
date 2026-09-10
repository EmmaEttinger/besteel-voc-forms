// ============================================================
// ASSET REGISTER — SAMPLE / FALLBACK SNAPSHOT
// A one-time snapshot pulled from the "Besteel Group Asset Register"
// SharePoint list (Safety and Training Management site), taken
// 2026-09-09. asset-calendar.js uses this ONLY when
// ASSET_DASHBOARD_CONFIG.readUrl isn't configured yet, or the live
// fetch to it fails — so the dashboard is still demoable/previewable
// before the Power Automate read flow exists (see SETUP-GUIDE.md,
// "3d. Asset Register Dashboard"), and never shows a blank page if the
// flow is briefly unreachable. When running on this fallback data the
// dashboard shows a "sample data" banner and disables editing — there's
// no live item to safely write back to.
//
// This file is NOT kept in sync with the real list day to day — once
// the read flow is live, this data is stale by definition. Don't treat
// it as current; it exists purely as a demo/offline fallback.
//
// Every date below is already shifted +1 day from the raw UTC value
// SharePoint's REST API returns, to match the local (Brisbane, UTC+10,
// no DST) date actually shown in the SharePoint UI. Confirmed against
// VEH001's Registration/Certification Expiry: the API reported
// "2025-08-07T14:00:00Z" but SharePoint's own item form displays
// "8/8/2025" — every date-only column in this list is stored the same
// way. asset-calendar.js applies this same +1 day correction to live
// data pulled through the read flow too (see `shiftUtcToLocalDate` in
// assets/js/asset-calendar.js) — don't double-correct dates already in
// this file if it's ever re-generated.
//
// Only columns that represent a "due"/"expiry" date are included here
// (Next Inspection Due, Registration/Certification Expiry, Service -
// Next Due, COI - Next Due, Wheel Rotation - Next Due, Crane Service -
// Next Due, Gas Certification - Next Due). "Last" dates (Last Inspection,
// Service - Last, etc.) aren't shown — they're historical, not something
// due or coming up. Items with no due-date columns populated (e.g. First
// Aid Kits, Electrical Tag & Test at time of writing) don't appear.
// ============================================================

window.ASSET_REGISTER_DATA = {
  generatedAt: "2026-09-09",
  listUrl: "https://besteel.sharepoint.com/sites/SafetyandTrainingManagement/Lists/Besteel%20Group%20Asset%20Register/AllItems.aspx",
  itemUrlBase: "https://besteel.sharepoint.com/sites/SafetyandTrainingManagement/Lists/Besteel%20Group%20Asset%20Register/DispForm.aspx?ID=",

  events: [
    { id: 29, uid: "VEH001", title: "Besteel Truck - Mitsubishi Fuso", category: "Vehicles", site: "Yandina", type: "Registration/Certification Expiry", date: "2025-08-08", provider: "" },
    { id: 29, uid: "VEH001", title: "Besteel Truck - Mitsubishi Fuso", category: "Vehicles", site: "Yandina", type: "Service Due", date: "2025-08-30", provider: "All Onsite Diesel" },
    { id: 29, uid: "VEH001", title: "Besteel Truck - Mitsubishi Fuso", category: "Vehicles", site: "Yandina", type: "COI Due", date: "2025-08-30", provider: "All Fix Diesel" },
    { id: 30, uid: "VEH002", title: "Besteel Ute - Toyota Hilux 118BJ4", category: "Vehicles", site: "Yandina", type: "Registration/Certification Expiry", date: "2025-03-28", provider: "" },
    { id: 31, uid: "VEH003", title: "D Max Dual Cab - Isuzu 570IE3", category: "Vehicles", site: "Coolum", type: "Registration/Certification Expiry", date: "2026-08-13", provider: "" },
    { id: 32, uid: "VEH004", title: "D Max Single Cab - Isuzu 726ZWW", category: "Vehicles", site: "Coolum", type: "Registration/Certification Expiry", date: "2025-07-09", provider: "" },
    { id: 32, uid: "VEH004", title: "D Max Single Cab - Isuzu 726ZWW", category: "Vehicles", site: "Coolum", type: "Service Due", date: "2025-05-28", provider: "North Coast Mechanical" },
    { id: 38, uid: "VEH005", title: "Hino Truck - Hino 694TFV", category: "Vehicles", site: "Coolum", type: "Registration/Certification Expiry", date: "2025-09-08", provider: "" },
    { id: 38, uid: "VEH005", title: "Hino Truck - Hino 694TFV", category: "Vehicles", site: "Coolum", type: "Service Due", date: "2026-05-01", provider: "All On Site Diesel" },
    { id: 38, uid: "VEH005", title: "Hino Truck - Hino 694TFV", category: "Vehicles", site: "Coolum", type: "COI Due", date: "2026-08-24", provider: "All Fix Diesel" },
    { id: 39, uid: "VEH006", title: "Hyundai i30 - 362AW7", category: "Vehicles", site: "Coolum", type: "Registration/Certification Expiry", date: "2026-10-09", provider: "" },
    { id: 40, uid: "CHE001", title: "Isopar G", category: "Chemical", site: "Yandina", type: "Registration/Certification Expiry", date: "2025-04-03", provider: "" },
    { id: 43, uid: "VEH007", title: "Little Truck - Isuzu 699WYT", category: "Vehicles", site: "Caloundra", type: "Registration/Certification Expiry", date: "2025-08-09", provider: "" },
    { id: 43, uid: "VEH007", title: "Little Truck - Isuzu 699WYT", category: "Vehicles", site: "Caloundra", type: "Service Due", date: "2025-01-08", provider: "Caloundra Reliable Truck" },
    { id: 44, uid: "CHE002", title: "Pacer - All Purpose Thinner", category: "Chemical", site: "Yandina", type: "Registration/Certification Expiry", date: "2025-04-03", provider: "" },
    { id: 45, uid: "CHE003", title: "RecoChem - Mineral Turpentine", category: "Chemical", site: "Yandina", type: "Registration/Certification Expiry", date: "2025-04-03", provider: "" },
    { id: 47, uid: "CHE004", title: "SCP-700A Black (FD) Ink", category: "Chemical", site: "Yandina", type: "Registration/Certification Expiry", date: "2025-04-03", provider: "" },
    { id: 48, uid: "CHE005", title: "SCP-700C (FD) Cleaner", category: "Chemical", site: "Yandina", type: "Registration/Certification Expiry", date: "2025-04-03", provider: "" },
    { id: 49, uid: "VEH008", title: "Site Truck - Isuzu 513ZCH", category: "Vehicles", site: "Coolum", type: "Registration/Certification Expiry", date: "2026-08-11", provider: "" },
    { id: 49, uid: "VEH008", title: "Site Truck - Isuzu 513ZCH", category: "Vehicles", site: "Coolum", type: "Service Due", date: "2024-10-03", provider: "North Coast Mechanical" },
    { id: 50, uid: "VEH009", title: "UD Truck - Nissan XQ63CB", category: "Vehicles", site: "Coolum", type: "Registration/Certification Expiry", date: "2025-11-13", provider: "" },
    { id: 50, uid: "VEH009", title: "UD Truck - Nissan XQ63CB", category: "Vehicles", site: "Coolum", type: "Service Due", date: "2024-06-18", provider: "All On Site Diesel" },
    { id: 50, uid: "VEH009", title: "UD Truck - Nissan XQ63CB", category: "Vehicles", site: "Coolum", type: "COI Due", date: "2025-11-05", provider: "All On Site Diesel" },
    { id: 50, uid: "VEH009", title: "UD Truck - Nissan XQ63CB", category: "Vehicles", site: "Coolum", type: "Wheel Rotation Due", date: "2024-11-05", provider: "Big Wheel" },
    { id: 51, uid: "CHE006", title: "Wurth - Brake Cleaner Plus", category: "Chemical", site: "Yandina", type: "Registration/Certification Expiry", date: "2025-04-03", provider: "" },
    { id: 52, uid: "CHE007", title: "Wurth - IPA Cleaner", category: "Chemical", site: "Yandina", type: "Registration/Certification Expiry", date: "2025-04-03", provider: "" },
    { id: 53, uid: "CHE008", title: "Wurth - Ultra 2040", category: "Chemical", site: "Yandina", type: "Registration/Certification Expiry", date: "2025-04-03", provider: "" },
    { id: 54, uid: "PEQ003", title: "UD Truck Crane - Coolum", category: "Plant & Equipment", site: "Coolum", type: "Crane Service Due", date: "2026-01-20", provider: "" },
    { id: 56, uid: "PEQ005", title: "Crane - Coolum", category: "Plant & Equipment", site: "Coolum", type: "Service Due", date: "2026-06-18", provider: "" },
    { id: 57, uid: "FKL002", title: "Fork Cat - Coolum", category: "Forklift", site: "Coolum", type: "Registration/Certification Expiry", date: "2026-01-18", provider: "" },
    { id: 57, uid: "FKL002", title: "Fork Cat - Coolum", category: "Forklift", site: "Coolum", type: "Gas Certification Due", date: "2025-01-23", provider: "" },
    { id: 58, uid: "FKL003", title: "Fork Mitsubishi - Coolum", category: "Forklift", site: "Coolum", type: "Service Due", date: "2025-11-02", provider: "Forklogic" },
    { id: 58, uid: "FKL003", title: "Fork Mitsubishi - Coolum", category: "Forklift", site: "Coolum", type: "Gas Certification Due", date: "2025-01-23", provider: "" },
    { id: 59, uid: "FKL004", title: "Fork Combi - Caloundra", category: "Forklift", site: "Caloundra", type: "Service Due", date: "2025-06-20", provider: "" },
    { id: 59, uid: "FKL004", title: "Fork Combi - Caloundra", category: "Forklift", site: "Caloundra", type: "Gas Certification Due", date: "2025-01-15", provider: "" },
    { id: 60, uid: "FKL005", title: "Fork Heli Electric - Yandina", category: "Forklift", site: "Yandina", type: "Service Due", date: "2025-01-24", provider: "" },
    { id: 61, uid: "FKL006", title: "Fork Toyota - Yandina", category: "Forklift", site: "Yandina", type: "Service Due", date: "2025-01-24", provider: "" },
    { id: 61, uid: "FKL006", title: "Fork Toyota - Yandina", category: "Forklift", site: "Yandina", type: "Gas Certification Due", date: "2023-07-25", provider: "" },
    { id: 67, uid: "PEQ011", title: "Genie Scissor Lift - Coolum", category: "Plant & Equipment", site: "Coolum", type: "COI Due", date: "2025-01-15", provider: "" },
    { id: 74, uid: "PEQ018", title: "Miller Genset - Coolum", category: "Plant & Equipment", site: "Coolum", type: "Next Inspection Due", date: "2024-02-05", provider: "" },
    { id: 75, uid: "RIG004", title: "Lifting Inspection - Coolum", category: "Rigging", site: "Coolum", type: "Next Inspection Due", date: "2025-02-19", provider: "" }
  ]
};
