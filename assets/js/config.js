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
  submitUrl: "",

  // Optional: shown in the header of every VOC form.
  companyName: "Besteel Frames",
  logoUrl: "assets/img/besteel-icon.png"
};
