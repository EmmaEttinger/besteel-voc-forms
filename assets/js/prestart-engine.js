// ============================================================
// PRE-START CHECKLIST — engine
// One engine, many data files (window.PRESTART_DATA), same
// pattern as the VOC quiz engine. Renders a Pass/Fail/N-A
// checklist + final verification section, validates, and
// submits (SharePoint via Power Automate, with a JSON-download
// fallback so a completed checklist is never silently lost).
// A "Print / Save as PDF" button uses the browser's print
// dialog against a print-only stylesheet in prestart.css so a
// completed checklist can be kept as a PDF or printed record
// without any server-side PDF generation.
// ============================================================

window.PrestartEngine = (function () {
  const config = window.PRESTART_CONFIG || {};

  function el(tag, attrs, ...children) {
    const e = document.createElement(tag);
    if (attrs) {
      for (const [k, v] of Object.entries(attrs)) {
        if (k === "text") e.textContent = v;
        else e.setAttribute(k, v);
      }
    }
    children.flat().forEach((c) => {
      if (c) e.appendChild(c);
    });
    return e;
  }

  function nowLocalDatetime() {
    const d = new Date();
    const off = d.getTimezoneOffset();
    return new Date(d.getTime() - off * 60000).toISOString().slice(0, 16);
  }

  function init(data) {
    const root = document.getElementById("ps-root");
    root.innerHTML = "";

    // Internal item values are always "Pass" / "Fail" / "N/A" (scoring,
    // fail-styling and print all key off these) — resultLabels only swaps
    // what's shown on the buttons, e.g. Okay / Needs Attention / Not
    // Applicable for the Equipment checklist.
    const resultLabels = data.resultLabels || { Pass: "Pass", Fail: "Fail", "N/A": "N/A" };
    const isNotesFinal = data.finalVerification && data.finalVerification.type === "notes";
    const siteFieldLabel = data.siteFieldLabel || "Site conducted";
    const personCompletingLabel = data.personCompletingLabel || "Person Completing Pre Start Inspection";

    const state = {
      site: "",
      conductedOn: nowLocalDatetime(),
      preparedBy: "",
      items: {}, // key "s0-i0" -> "Pass" | "Fail" | "N/A"
      defectsIdentified: "",
      safeToOperate: "",
      photoDataUrl: null,
      photoName: null,
      correctiveActionRequired: "",
      correctiveActionDetails: "",
      notifyPeople: [],
      personCompleting: "",
      submitted: false
    };

    let submitBtn, printBtn, fatalBanner;

    function totalItems() {
      return data.sections.reduce((sum, s) => sum + s.items.length, 0);
    }
    function answeredItems() {
      return Object.keys(state.items).length;
    }
    function hasFail() {
      return Object.values(state.items).some((v) => v === "Fail");
    }

    function buildHeader() {
      return el(
        "div",
        { class: "ps-header" },
        config.logoUrl ? el("img", { src: config.logoUrl, alt: config.companyName || "Besteel" }) : null,
        el(
          "div",
          {},
          el("h1", { text: data.title }),
          el("p", { text: config.companyName || "Besteel Frames" })
        )
      );
    }

    function buildDetailsCard() {
      const siteSelect = el(
        "select",
        { id: "ps-site", required: "required" },
        el("option", { value: "", text: "Select a site…" }),
        ...(data.sites || []).map((s) => el("option", { value: s, text: s }))
      );
      const dateInput = el("input", {
        type: "datetime-local",
        id: "ps-date",
        required: "required",
        value: state.conductedOn
      });
      const preparedInput = el("input", { type: "text", id: "ps-prepared", required: "required" });

      siteSelect.addEventListener("change", () => {
        state.site = siteSelect.value;
        validate();
      });
      dateInput.addEventListener("input", () => {
        state.conductedOn = dateInput.value;
        validate();
      });
      preparedInput.addEventListener("input", () => {
        state.preparedBy = preparedInput.value;
        validate();
      });

      const equipmentField = (data.equipmentOptions || []).length
        ? el(
            "div",
            { class: "ps-field" },
            el("label", { for: "ps-equipment", text: "Equipment" }),
            el(
              "select",
              { id: "ps-equipment" },
              el("option", { value: "", text: "Select equipment…" }),
              ...data.equipmentOptions.map((e) => el("option", { value: e, text: e }))
            )
          )
        : el(
            "div",
            { class: "ps-field" },
            el("label", { text: "Equipment / Asset" }),
            el("input", { type: "text", id: "ps-equipment", placeholder: "e.g. rego or fleet number (optional)" })
          );

      return el(
        "div",
        { class: "ps-card" },
        el("h2", { text: "Inspection Details" }),
        el(
          "div",
          { class: "ps-field-row" },
          el(
            "div",
            { class: "ps-field" },
            el("label", { for: "ps-site", text: siteFieldLabel }),
            siteSelect
          ),
          el(
            "div",
            { class: "ps-field" },
            el("label", { for: "ps-date", text: "Conducted on" }),
            dateInput
          )
        ),
        el(
          "div",
          { class: "ps-field" },
          el("label", { for: "ps-prepared", text: "Prepared by" }),
          preparedInput
        ),
        equipmentField
      );
    }

    const progressLabel = el("span", { class: "ps-progress" });

    function buildItemRow(sectionIdx, itemIdx, label) {
      const key = "s" + sectionIdx + "-i" + itemIdx;
      const seg = el("div", { class: "ps-seg", "data-item": key });
      const row = el(
        "div",
        { class: "ps-item" },
        el("div", { class: "ps-item-label", text: label }),
        seg
      );

      ["Pass", "Fail", "N/A"].forEach((val) => {
        const btn = el("button", { type: "button", "data-val": val, text: resultLabels[val] || val });
        btn.addEventListener("click", () => {
          state.items[key] = val;
          seg.querySelectorAll("button").forEach((b) => b.classList.remove("ps-active"));
          btn.classList.add("ps-active");
          seg.setAttribute("data-print-value", resultLabels[val] || val);
          row.classList.add("ps-answered");
          row.classList.toggle("ps-fail", val === "Fail");
          row.classList.toggle("ps-pass", val === "Pass");
          updateProgress();
          updateFailBanner();
          validate();
        });
        seg.appendChild(btn);
      });

      return row;
    }

    function buildChecklistCard() {
      const sections = data.sections.map((section, si) =>
        el(
          "div",
          { class: "ps-section" },
          el("div", { class: "ps-section-title", text: section.name }),
          ...section.items.map((item, ii) => buildItemRow(si, ii, item))
        )
      );
      const h2 = el("h2", {}, document.createTextNode("Pre Start Checklist"), progressLabel);
      return el("div", { class: "ps-card" }, h2, ...sections);
    }

    function updateProgress() {
      progressLabel.textContent = answeredItems() + " of " + totalItems() + " items checked";
    }

    function updateFailBanner() {
      if (!fatalBanner) return;
      fatalBanner.classList.toggle("hidden", !hasFail());
    }

    function buildRadioRow(idPrefix, options, onSelect, warnOnNo) {
      const rowEl = el("div", { class: "ps-radio-row" });
      options.forEach((opt) => {
        const btn = el("button", { type: "button", "data-val": opt, text: opt });
        if (warnOnNo) btn.setAttribute("data-warn", opt === "No" ? "true" : "false");
        btn.addEventListener("click", () => {
          rowEl.querySelectorAll("button").forEach((b) => b.classList.remove("ps-active"));
          btn.classList.add("ps-active");
          rowEl.setAttribute("data-print-value", opt);
          onSelect(opt);
        });
        rowEl.appendChild(btn);
      });
      return rowEl;
    }

    function buildNotesFinalCard() {
      const notesInput = el("textarea", {
        id: "ps-notes",
        placeholder: "Describe any defect and, if useful, mention any photo attached below"
      });
      notesInput.addEventListener("input", () => {
        state.correctiveActionDetails = notesInput.value;
      });

      const photoInput = el("input", { type: "file", id: "ps-photo", accept: "image/*" });
      const photoPreviewWrap = el("div", { class: "ps-photo-preview hidden" });
      photoInput.addEventListener("change", () => {
        const file = photoInput.files && photoInput.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          state.photoDataUrl = reader.result;
          state.photoName = file.name;
          renderPhotoPreview();
        };
        reader.readAsDataURL(file);
      });

      function renderPhotoPreview() {
        photoPreviewWrap.innerHTML = "";
        if (!state.photoDataUrl) {
          photoPreviewWrap.classList.add("hidden");
          return;
        }
        photoPreviewWrap.classList.remove("hidden");
        const img = el("img", { src: state.photoDataUrl, alt: "Defect photo" });
        const removeBtn = el("button", { type: "button", class: "ps-photo-remove", text: "Remove photo" });
        removeBtn.addEventListener("click", () => {
          state.photoDataUrl = null;
          state.photoName = null;
          photoInput.value = "";
          renderPhotoPreview();
        });
        photoPreviewWrap.appendChild(img);
        photoPreviewWrap.appendChild(removeBtn);
      }

      const personInput = el("input", { type: "text", id: "ps-person-completing", required: "required" });
      personInput.addEventListener("input", () => {
        state.personCompleting = personInput.value;
        validate();
      });

      return el(
        "div",
        { class: "ps-card" },
        el("h2", { text: "Notes / Defect Identified" }),
        el(
          "div",
          { class: "ps-field" },
          el("label", { for: "ps-notes", text: "Provide information (include photos if necessary)" }),
          notesInput
        ),
        el(
          "div",
          { class: "ps-field" },
          el("label", { for: "ps-photo", text: "Photos" }),
          photoInput,
          photoPreviewWrap
        ),
        el(
          "div",
          { class: "ps-field" },
          el("label", { for: "ps-person-completing", text: personCompletingLabel }),
          personInput
        )
      );
    }

    function buildFinalCard() {
      if (isNotesFinal) return buildNotesFinalCard();

      const defectsField = el(
        "div",
        { class: "ps-field" },
        el("label", { text: "Defects Identified" }),
        buildRadioRow("ps-defects", ["Yes", "No"], (v) => {
          state.defectsIdentified = v;
          validate();
        })
      );

      const safeField = el(
        "div",
        { class: "ps-field" },
        el("label", { text: "Is the Equipment safe to operate?" }),
        buildRadioRow(
          "ps-safe",
          ["Yes", "No"],
          (v) => {
            state.safeToOperate = v;
            validate();
          },
          true
        )
      );

      const photoInput = el("input", { type: "file", id: "ps-photo", accept: "image/*" });
      const photoPreviewWrap = el("div", { class: "ps-photo-preview hidden" });
      photoInput.addEventListener("change", () => {
        const file = photoInput.files && photoInput.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => {
          state.photoDataUrl = reader.result;
          state.photoName = file.name;
          renderPhotoPreview();
        };
        reader.readAsDataURL(file);
      });

      function renderPhotoPreview() {
        photoPreviewWrap.innerHTML = "";
        if (!state.photoDataUrl) {
          photoPreviewWrap.classList.add("hidden");
          return;
        }
        photoPreviewWrap.classList.remove("hidden");
        const img = el("img", { src: state.photoDataUrl, alt: "Defect photo" });
        const removeBtn = el("button", { type: "button", class: "ps-photo-remove", text: "Remove photo" });
        removeBtn.addEventListener("click", () => {
          state.photoDataUrl = null;
          state.photoName = null;
          photoInput.value = "";
          renderPhotoPreview();
        });
        photoPreviewWrap.appendChild(img);
        photoPreviewWrap.appendChild(removeBtn);
      }

      const photoField = el(
        "div",
        { class: "ps-field" },
        el("label", { for: "ps-photo", text: "Photo of defects (if applicable)" }),
        photoInput,
        photoPreviewWrap
      );

      const conditional = el("div", { class: "ps-conditional hidden" });
      const detailsInput = el("textarea", {
        id: "ps-corrective-details",
        placeholder: "Describe the corrective action / evidence"
      });
      detailsInput.addEventListener("input", () => {
        state.correctiveActionDetails = detailsInput.value;
        validate();
      });

      const notifyOptions = data.notifyPeople || [];
      const notifyRow = el("div", { class: "ps-checkbox-row" });
      notifyOptions.forEach((person) => {
        const cb = el("input", { type: "checkbox", value: person });
        cb.addEventListener("change", () => {
          if (cb.checked) {
            if (!state.notifyPeople.includes(person)) state.notifyPeople.push(person);
          } else {
            state.notifyPeople = state.notifyPeople.filter((p) => p !== person);
          }
        });
        const label = el("label", {}, cb, document.createTextNode(person));
        notifyRow.appendChild(label);
      });

      conditional.appendChild(
        el("div", { class: "ps-field" }, el("label", { text: "Corrective action details / evidence" }), detailsInput)
      );
      if (notifyOptions.length) {
        conditional.appendChild(
          el("div", { class: "ps-field" }, el("label", { text: "Notify Person(s)/Group(s)" }), notifyRow)
        );
      }

      const correctiveField = el(
        "div",
        { class: "ps-field" },
        el("label", { text: "Corrective Action Required" }),
        buildRadioRow("ps-corrective", ["Yes", "No", "N/A"], (v) => {
          state.correctiveActionRequired = v;
          conditional.classList.toggle("hidden", v !== "Yes");
          validate();
        })
      );

      const personInput = el("input", { type: "text", id: "ps-person-completing", required: "required" });
      personInput.addEventListener("input", () => {
        state.personCompleting = personInput.value;
        validate();
      });
      const personField = el(
        "div",
        { class: "ps-field" },
        el("label", { for: "ps-person-completing", text: personCompletingLabel }),
        personInput
      );

      return el(
        "div",
        { class: "ps-card" },
        el("h2", { text: "Final Verification" }),
        defectsField,
        safeField,
        photoField,
        correctiveField,
        conditional,
        personField
      );
    }

    function validate() {
      const allItemsAnswered = answeredItems() === totalItems();
      const baseOk = Boolean(
        state.site && state.conductedOn && state.preparedBy.trim() && allItemsAnswered && state.personCompleting.trim()
      );
      const ok = isNotesFinal
        ? baseOk
        : baseOk &&
          Boolean(
            state.defectsIdentified &&
              state.safeToOperate &&
              state.correctiveActionRequired &&
              (state.correctiveActionRequired !== "Yes" || state.correctiveActionDetails.trim())
          );
      if (submitBtn) submitBtn.disabled = !ok || state.submitted;
      return ok;
    }

    function showToast(message, isError) {
      const existing = document.querySelector(".ps-toast");
      if (existing) existing.remove();
      const toast = el("div", { class: "ps-toast" + (isError ? " error" : ""), text: message });
      document.body.appendChild(toast);
      setTimeout(() => toast.remove(), 6000);
    }

    function buildPayload() {
      const equipmentEl = document.getElementById("ps-equipment");
      const sectionsOut = data.sections.map((section, si) => ({
        name: section.name,
        items: section.items.map((label, ii) => ({
          label: label,
          result: state.items["s" + si + "-i" + ii] || null
        }))
      }));
      return {
        formId: data.meta.formId,
        title: data.title,
        equipmentType: data.meta.equipmentType || "",
        equipmentAsset: equipmentEl ? equipmentEl.value.trim() : "",
        site: state.site,
        conductedOn: state.conductedOn,
        preparedBy: state.preparedBy.trim(),
        sections: sectionsOut,
        anyFail: hasFail(),
        defectsIdentified: state.defectsIdentified,
        safeToOperate: state.safeToOperate,
        photoDataUrl: state.photoDataUrl,
        photoName: state.photoName,
        correctiveActionRequired: state.correctiveActionRequired,
        correctiveActionDetails: state.correctiveActionDetails.trim(),
        notifyPeople: state.notifyPeople,
        personCompleting: state.personCompleting.trim(),
        submittedAt: new Date().toISOString()
      };
    }

    // Builds a real, text-searchable PDF client-side (no server round
    // trip) so a copy can be auto-attached to the SharePoint item on
    // every submission, not just when someone clicks Print / Save as
    // PDF. Returns a data: URI string, or null if generation fails for
    // any reason (missing jsPDF, unsupported browser, bad image data) —
    // callers must treat that as "no PDF this time," never block submit.
    async function buildPdfDataUrl(payload) {
      if (!window.jspdf || !window.jspdf.jsPDF) return null;
      try {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF({ unit: "pt", format: "a4" });
        const marginX = 40;
        const pageBottom = 780;
        let y = 50;

        if (config.logoUrl) {
          try {
            const logoDataUrl = await loadScaledImageDataUrl(config.logoUrl, 120, "image/png");
            if (logoDataUrl) doc.addImage(logoDataUrl, "PNG", marginX, y - 24, 26, 26);
          } catch (e) {
            /* logo is a nice-to-have, never block the PDF over it */
          }
        }

        doc.setFontSize(15);
        doc.setTextColor(56, 68, 85);
        doc.text(payload.title, marginX + 34, y);
        y += 16;
        doc.setFontSize(9);
        doc.setTextColor(120, 128, 138);
        doc.text(config.companyName || "Besteel Frames", marginX + 34, y);
        y += 26;

        const details = [
          [siteFieldLabel, payload.site],
          ["Conducted on", payload.conductedOn],
          ["Prepared by", payload.preparedBy],
          ["Equipment", payload.equipmentAsset || payload.equipmentType || ""]
        ].filter(([, v]) => v);

        doc.setFontSize(10);
        details.forEach(([label, value]) => {
          doc.setTextColor(56, 68, 85);
          doc.setFont(undefined, "bold");
          doc.text(label + ":", marginX, y);
          doc.setTextColor(35, 43, 53);
          doc.setFont(undefined, "normal");
          doc.text(String(value), marginX + 110, y);
          y += 15;
        });
        y += 10;

        payload.sections.forEach((section) => {
          if (y > pageBottom - 60) {
            doc.addPage();
            y = 50;
          }
          doc.setFontSize(10);
          doc.setFont(undefined, "bold");
          doc.setTextColor(161, 139, 103);
          doc.text(section.name, marginX, y);
          y += 8;

          doc.autoTable({
            startY: y,
            margin: { left: marginX, right: marginX },
            head: [["Item", "Result"]],
            body: section.items.map((it) => [it.label, resultLabels[it.result] || it.result || "—"]),
            styles: { fontSize: 9, cellPadding: 4 },
            headStyles: { fillColor: [56, 68, 85], textColor: 255 },
            didParseCell: (cellData) => {
              if (cellData.section !== "body" || cellData.column.index !== 1) return;
              const raw = section.items[cellData.row.index].result;
              if (raw === "Fail") {
                cellData.cell.styles.textColor = [197, 34, 31];
                cellData.cell.styles.fontStyle = "bold";
              } else if (raw === "Pass") {
                cellData.cell.styles.textColor = [30, 142, 62];
              }
            }
          });
          y = doc.lastAutoTable.finalY + 18;
        });

        if (y > pageBottom - 100) {
          doc.addPage();
          y = 50;
        }
        doc.setFontSize(10);
        doc.setFont(undefined, "bold");
        doc.setTextColor(56, 68, 85);
        doc.text(isNotesFinal ? "Notes / Defect Identified" : "Final Verification", marginX, y);
        y += 16;

        const finalRows = [];
        if (payload.defectsIdentified) finalRows.push(["Defects Identified", payload.defectsIdentified]);
        if (payload.safeToOperate) finalRows.push(["Safe to operate", payload.safeToOperate]);
        if (payload.correctiveActionRequired) finalRows.push(["Corrective action required", payload.correctiveActionRequired]);
        if (payload.correctiveActionDetails) {
          finalRows.push([isNotesFinal ? "Notes" : "Details / evidence", payload.correctiveActionDetails]);
        }
        if (payload.notifyPeople && payload.notifyPeople.length) finalRows.push(["Notified", payload.notifyPeople.join(", ")]);
        finalRows.push([personCompletingLabel, payload.personCompleting]);
        finalRows.push(["Submitted at", new Date(payload.submittedAt).toLocaleString()]);

        doc.setFontSize(10);
        finalRows.forEach(([label, value]) => {
          const lines = doc.splitTextToSize(String(value), 370);
          if (y + lines.length * 13 > pageBottom) {
            doc.addPage();
            y = 50;
          }
          doc.setFont(undefined, "bold");
          doc.setTextColor(56, 68, 85);
          doc.text(label + ":", marginX, y);
          doc.setFont(undefined, "normal");
          doc.setTextColor(35, 43, 53);
          doc.text(lines, marginX + 150, y);
          y += 13 * lines.length + 4;
        });

        if (payload.photoDataUrl) {
          try {
            const scaledPhoto = await loadScaledImageDataUrl(payload.photoDataUrl, 900, "image/jpeg");
            if (scaledPhoto) {
              if (y > pageBottom - 160) {
                doc.addPage();
                y = 50;
              }
              y += 6;
              doc.setFont(undefined, "bold");
              doc.text("Photo:", marginX, y);
              y += 8;
              doc.addImage(scaledPhoto, "JPEG", marginX, y, 220, 165);
            }
          } catch (e) {
            /* unsupported image encoding — skip embedding, PDF still valid */
          }
        }

        return doc.output("datauristring");
      } catch (e) {
        return null;
      }
    }

    // Downscales an image (from a URL or an existing data: URL) via an
    // offscreen canvas before jsPDF ever sees it. Source images can be
    // far larger than they need to be for a PDF — the brand logo here
    // is 4501x4501px despite showing at 34px on screen, and a phone
    // camera defect photo can be similarly huge — and jsPDF embeds
    // pixel data close to 1:1 rather than re-compressing, so skipping
    // this step once produced a 100MB+ "PDF" from a 300KB logo.
    // Resolves to null (never rejects) so a bad/unreachable image just
    // means no image in the PDF, not a broken submit.
    function loadScaledImageDataUrl(src, maxDim, mime) {
      return new Promise((resolve) => {
        if (!src) {
          resolve(null);
          return;
        }
        const img = new Image();
        img.onload = () => {
          try {
            const scale = Math.min(1, maxDim / Math.max(img.naturalWidth, img.naturalHeight));
            const w = Math.max(1, Math.round(img.naturalWidth * scale));
            const h = Math.max(1, Math.round(img.naturalHeight * scale));
            const canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;
            canvas.getContext("2d").drawImage(img, 0, 0, w, h);
            resolve(canvas.toDataURL(mime, 0.85));
          } catch (e) {
            resolve(null);
          }
        };
        img.onerror = () => resolve(null);
        img.src = src;
      });
    }

    function downloadJson(payload) {
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const fname = "prestart-" + payload.formId + "-" + payload.submittedAt.slice(0, 10) + ".json";
      const a = el("a", { href: url, download: fname });
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    }

    async function submitChecklist() {
      if (!validate()) return;
      const payload = buildPayload();

      submitBtn.disabled = true;
      submitBtn.textContent = "Submitting…";

      payload.pdfDataUrl = await buildPdfDataUrl(payload);
      payload.pdfFileName = data.meta.formId + "-" + payload.submittedAt.slice(0, 10) + ".pdf";

      let success = false;
      if (config.submitUrl) {
        try {
          const res = await fetch(config.submitUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
          });
          success = res.ok;
        } catch (e) {
          success = false;
        }
      }

      state.submitted = true;

      if (success) {
        showToast("Checklist submitted — thank you.");
        successBanner.classList.remove("hidden");
        submitBtn.textContent = "Submitted";
      } else {
        downloadJson(payload);
        showToast(
          config.submitUrl
            ? "Couldn't reach the server — your checklist was downloaded as a file instead. Please send it to your supervisor."
            : "Submission isn't wired up yet — your checklist was downloaded as a file instead.",
          true
        );
        successBanner.classList.remove("hidden");
        submitBtn.textContent = "Submitted";
      }
      printBtn.classList.remove("hidden");
    }

    let successBanner;

    function build() {
      root.appendChild(buildHeader());
      const container = el("div", { class: "ps-container" });

      fatalBanner = el("div", {
        class: "ps-banner hidden",
        text: isNotesFinal
          ? "One or more items need attention — describe the details in Notes / Defect Identified below."
          : "One or more items failed — make sure Defects Identified, Is the Equipment safe to operate?, and Corrective Action Required are completed below."
      });
      successBanner = el("div", {
        class: "ps-banner ps-success hidden",
        text: "Checklist submitted. Use “Print / Save as PDF” below to keep a copy for your records."
      });

      container.appendChild(fatalBanner);
      container.appendChild(successBanner);
      container.appendChild(buildDetailsCard());
      container.appendChild(buildChecklistCard());
      container.appendChild(buildFinalCard());
      root.appendChild(container);

      submitBtn = el("button", {
        class: "ps-submit-btn",
        type: "button",
        text: "Submit Checklist",
        disabled: "disabled"
      });
      submitBtn.addEventListener("click", submitChecklist);

      printBtn = el("button", {
        class: "ps-print-btn hidden",
        type: "button",
        text: "Print / Save as PDF"
      });
      printBtn.addEventListener("click", () => window.print());

      root.appendChild(
        el(
          "div",
          { class: "ps-submit-bar" },
          submitBtn,
          printBtn,
          el("div", {
            class: "ps-submit-hint",
            text: "Complete every item and the Final Verification section to enable Submit."
          })
        )
      );

      updateProgress();
      validate();
    }

    build();
  }

  return { init: init };
})();
