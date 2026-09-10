// ============================================================
// VOC SYSTEM CONFIG
// One place to point every VOC form at your Power Automate flow.
// See SETUP-GUIDE.md for how to create this flow in 10 minutes.
// ============================================================

window.VOC_CONFIG = {
  // Paste the "HTTP POST URL" from your Power Automate
  // "When an HTTP request is received" trigger here once you've built it.
  // Leave blank while testing locally — the form will fall back to
  // downloading a JSON file instead of submitting, so no data is lost.
  submitUrl: "https://default7bf668ccdb6040b8ba089102336e87.a3.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/19/workflows/c94f91bf84eb4d978a338a2c2b8372f1/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6qHBjb1DmrsVRTF_Fauw-hVCA8zl-jeeyyP2OoHr6bM",

  // Optional: shown in the header of every VOC form.
  companyName: "Besteel Frames",
  logoUrl: "assets/img/besteel-icon.png"
};

// ============================================================
// STATIONERY ORDER CONFIG
// Separate Power Automate flow from the VOC one above — see
// SETUP-GUIDE.md for the suggested SharePoint list + email setup.
// ============================================================
window.STATIONERY_CONFIG = {
  submitUrl: "https://default7bf668ccdb6040b8ba089102336e87.a3.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/21/workflows/0f8f24a9e01d45a88b1f39ba0b8be87f/triggers/manual/paths/invoke?api-version=1",
  companyName: "Besteel Frames",
  logoUrl: "assets/img/besteel-icon.png"
};

// ============================================================
// PRE-START CHECKLIST CONFIG
// Separate Power Automate flow again — needs its own SharePoint
// list (see SETUP-GUIDE.md, section "3c. Pre-Start Checklists").
// Blank until that flow is built: forms fall back to downloading
// a JSON file so a completed checklist is never silently lost,
// and "Print / Save as PDF" always works regardless.
// ============================================================
window.PRESTART_CONFIG = {
  submitUrl: "https://default7bf668ccdb6040b8ba089102336e87.a3.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/19/workflows/f70a3c420d044c4dafe25beda46bd884/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=OZhrv3NfyAfWWVQBRXmT9Ozj8L5smEpb8geIcBFi8ns",
  companyName: "Besteel Frames",
  logoUrl: "assets/img/besteel-icon.png"
};

// ============================================================
// ASSET REGISTER DASHBOARD CONFIG
// Two separate Power Automate flows — one to read the "Besteel Group
// Asset Register" SharePoint list live, one to write updates back to
// it (mark a service/inspection/cert done, change a due date). See
// SETUP-GUIDE.md, section "3d. Asset Register Dashboard" for exact
// build steps for both.
//
// No sign-in gate on either flow, same trust model as every other
// tool in this repo (anyone with the link can view and edit) — a
// deliberate choice, not an oversight; see SETUP-GUIDE.md if that
// ever needs revisiting.
//
// Both blank until built: the dashboard falls back to the bundled
// sample snapshot in data/asset-register-data.js (read-only, clearly
// labelled as sample data) so it's still demoable/previewable before
// the flows exist.
// ============================================================
window.ASSET_DASHBOARD_CONFIG = {
  readUrl: "https://default7bf668ccdb6040b8ba089102336e87.a3.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/00/workflows/35aa6ac401db401d8a3e54f6e38fa531/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=tI4FMy39HjvWGo9dGOKWbPvdBvV1T5RSUM6-tKplSLo",
  writeUrl: "https://default7bf668ccdb6040b8ba089102336e87.a3.environment.api.powerplatform.com:443/powerautomate/automations/direct/cu/11/workflows/04cd54d648c54abb9374fe7dd032cd22/triggers/manual/paths/invoke?api-version=1&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=B3ThrYMurYy9unJWJKBMWkAxYYUOyn-2W8X2rCoQvfU",
  listUrl: "https://besteel.sharepoint.com/sites/SafetyandTrainingManagement/Lists/Besteel%20Group%20Asset%20Register/AllItems.aspx",
  itemUrlBase: "https://besteel.sharepoint.com/sites/SafetyandTrainingManagement/Lists/Besteel%20Group%20Asset%20Register/DispForm.aspx?ID=",
  companyName: "Besteel Frames",
  logoUrl: "assets/img/besteel-icon.png"
};
