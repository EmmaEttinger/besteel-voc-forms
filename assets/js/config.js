// ============================================================
// VOC SYSTEM CONFIG
// One place to point every VOC form at your Power Automate flow.
// See SETUP-GUIDE.md for how to create this flow in 10 minutes.
// ============================================================

window.VOC_CONFIG = {
  // This tool has moved to its own repo/site (besteel-voc) with a
  // real submission URL. This copy is legacy/unused, so it's left
  // blank on purpose -- an empty value here just falls back to
  // downloading a JSON file, which is the safe behaviour for a page
  // nobody should be visiting anymore.
  submitUrl: "",

  // Optional: shown in the header of every VOC form.
  companyName: "Besteel Frames",
  logoUrl: "assets/img/besteel-icon.png"
};

// ============================================================
// STATIONERY ORDER CONFIG
// submitUrl is injected at deploy time from a GitHub Actions
// secret -- never commit the real Power Automate URL here.
// ============================================================
window.STATIONERY_CONFIG = {
  submitUrl: "__STATIONERY_SUBMIT_URL__",
  companyName: "Besteel Frames",
  logoUrl: "assets/img/besteel-icon.png"
};

// ============================================================
// PRE-START CHECKLIST CONFIG
// submitUrl is injected at deploy time -- see above.
// ============================================================
window.PRESTART_CONFIG = {
  submitUrl: "__PRESTART_SUBMIT_URL__",
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
  // readUrl/writeUrl are injected at deploy time from GitHub Actions
  // secrets -- never commit the real Power Automate URLs here.
  readUrl: "__ASSET_READ_URL__",
  writeUrl: "__ASSET_WRITE_URL__",
  listUrl: "https://besteel.sharepoint.com/sites/SafetyandTrainingManagement/Lists/Besteel%20Group%20Asset%20Register/AllItems.aspx",
  itemUrlBase: "https://besteel.sharepoint.com/sites/SafetyandTrainingManagement/Lists/Besteel%20Group%20Asset%20Register/DispForm.aspx?ID=",
  companyName: "Besteel Frames",
  logoUrl: "assets/img/besteel-icon.png"
};
