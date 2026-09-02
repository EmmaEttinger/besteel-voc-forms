// ============================================================
// STATIONERY ORDER — engine
// Renders the order form from STATIONERY_ITEMS, tracks quantities,
// validates, and submits (SharePoint via Power Automate, with a
// JSON-download fallback so an order is never silently lost).
// ============================================================

(function () {
  const SITES = ["Caloundra", "Coolum", "Yandina", "Other"];
  const config = window.STATIONERY_CONFIG || {};
  const catalogue = window.STATIONERY_ITEMS || [];

  // qty state keyed by "categoryIndex:itemIndex"
  const qty = {};

  // free-text "not on the list" rows: { descInput, qtyInput }
  const customRows = [];

  const root = document.getElementById("st-app");

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

  function todayISO() {
    const d = new Date();
    const off = d.getTimezoneOffset();
    return new Date(d.getTime() - off * 60000).toISOString().slice(0, 10);
  }

  function buildHeader() {
    return el(
      "div",
      { class: "st-header" },
      config.logoUrl ? el("img", { src: config.logoUrl, alt: config.companyName || "Besteel" }) : null,
      el(
        "div",
        {},
        el("h1", { text: "Stationery Order" }),
        el("p", { text: config.companyName || "Besteel Frames" })
      )
    );
  }

  function buildDetailsCard() {
    const nameInput = el("input", { type: "text", id: "st-name", required: "required" });
    const siteSelect = el(
      "select",
      { id: "st-site", required: "required" },
      el("option", { value: "", text: "Select a site…" }),
      ...SITES.map((s) => el("option", { value: s, text: s }))
    );
    const otherSiteInput = el("input", {
      type: "text",
      id: "st-site-other",
      placeholder: "Enter site name"
    });
    const otherSiteField = el(
      "div",
      { class: "st-field hidden", id: "st-site-other-field" },
      el("label", { for: "st-site-other", text: "Site name" }),
      otherSiteInput
    );
    const dateInput = el("input", { type: "date", id: "st-date", required: "required", value: todayISO() });

    siteSelect.addEventListener("change", () => {
      otherSiteField.classList.toggle("hidden", siteSelect.value !== "Other");
      validate();
    });
    nameInput.addEventListener("input", validate);
    otherSiteInput.addEventListener("input", validate);
    dateInput.addEventListener("input", validate);

    return el(
      "div",
      { class: "st-card" },
      el("h2", { text: "Order Details" }),
      el(
        "div",
        { class: "st-field" },
        el("label", { for: "st-name", text: "Ordered by" }),
        nameInput
      ),
      el(
        "div",
        { class: "st-field-row" },
        el(
          "div",
          { class: "st-field" },
          el("label", { for: "st-site", text: "Site" }),
          siteSelect
        ),
        el(
          "div",
          { class: "st-field" },
          el("label", { for: "st-date", text: "Order date" }),
          dateInput
        )
      ),
      otherSiteField
    );
  }

  function buildItemsCard() {
    const categories = catalogue.map((cat, ci) => {
      const rows = cat.items.map((item, ii) => buildItemRow(cat, ci, item, ii));
      return el(
        "div",
        { class: "st-category" },
        el("h3", { text: cat.category }),
        ...rows
      );
    });
    return el("div", { class: "st-card" }, el("h2", { text: "Items" }), ...categories);
  }

  function buildItemRow(cat, ci, item, ii) {
    const key = ci + ":" + ii;
    qty[key] = 0;

    const numInput = el("input", { type: "text", inputmode: "numeric", value: "0" });
    const minusBtn = el("button", { type: "button", text: "−", "aria-label": "Decrease" });
    const plusBtn = el("button", { type: "button", text: "+", "aria-label": "Increase" });
    const row = el(
      "div",
      { class: "st-item" },
      el(
        "div",
        { class: "st-item-info" },
        el("div", { class: "st-item-name", text: item.name }),
        el("div", { class: "st-item-code", text: item.code })
      ),
      el("div", { class: "st-qty" }, minusBtn, numInput, plusBtn)
    );

    function setQty(n) {
      n = Math.max(0, Math.floor(Number(n) || 0));
      qty[key] = n;
      numInput.value = String(n);
      minusBtn.disabled = n === 0;
      row.classList.toggle("has-qty", n > 0);
      updateSummary();
      validate();
    }

    minusBtn.addEventListener("click", () => setQty(qty[key] - 1));
    plusBtn.addEventListener("click", () => setQty(qty[key] + 1));
    numInput.addEventListener("change", () => setQty(numInput.value));

    setQty(0);
    return row;
  }

  function selectedItems() {
    const result = [];
    catalogue.forEach((cat, ci) => {
      cat.items.forEach((item, ii) => {
        const n = qty[ci + ":" + ii] || 0;
        if (n > 0) result.push({ category: cat.category, name: item.name, code: item.code, quantity: n });
      });
    });
    return result;
  }

  // ------- "Anything else?" free-text rows (not on the catalogue) -------
  let otherRowsContainer = null;

  function buildOtherItemsCard() {
    otherRowsContainer = el("div", { id: "st-other-rows" });
    const addBtn = el("button", { type: "button", class: "st-add-other-btn", text: "+ Add another item" });
    addBtn.addEventListener("click", () => addCustomRow(otherRowsContainer));

    addCustomRow(otherRowsContainer);

    return el(
      "div",
      { class: "st-card" },
      el("h2", { text: "Anything Else?" }),
      el("p", {
        class: "st-other-hint",
        text: "Need something that's not on the list above? Paste an Officeworks link or describe it, and how many."
      }),
      otherRowsContainer,
      addBtn
    );
  }

  function addCustomRow(container) {
    const descInput = el("input", { type: "text", placeholder: "Description or Officeworks link" });
    const qtyInput = el("input", { type: "text", inputmode: "numeric", value: "1", class: "st-other-qty" });
    const removeBtn = el("button", { type: "button", class: "st-other-remove", text: "×", "aria-label": "Remove item" });

    const row = el("div", { class: "st-other-row" }, descInput, qtyInput, removeBtn);
    const entry = { row: row, descInput: descInput, qtyInput: qtyInput };
    customRows.push(entry);

    descInput.addEventListener("input", () => {
      updateSummary();
      validate();
    });
    qtyInput.addEventListener("change", () => {
      const n = Math.max(1, Math.floor(Number(qtyInput.value) || 1));
      qtyInput.value = String(n);
      updateSummary();
      validate();
    });
    removeBtn.addEventListener("click", () => {
      const idx = customRows.indexOf(entry);
      if (idx > -1) customRows.splice(idx, 1);
      row.remove();
      updateSummary();
      validate();
    });

    container.appendChild(row);
  }

  function selectedCustomItems() {
    return customRows
      .filter((r) => r.descInput.value.trim() !== "")
      .map((r) => ({
        description: r.descInput.value.trim(),
        quantity: Math.max(1, Math.floor(Number(r.qtyInput.value) || 1))
      }));
  }

  function buildSummaryCard() {
    const body = el("div", { id: "st-summary-body" });
    return el("div", { class: "st-card" }, el("h2", { text: "Order Summary" }), body);
  }

  function updateSummary() {
    const body = document.getElementById("st-summary-body");
    if (!body) return;
    const items = selectedItems();
    const custom = selectedCustomItems();
    body.innerHTML = "";
    if (items.length === 0 && custom.length === 0) {
      body.appendChild(el("div", { class: "st-summary-empty", text: "No items selected yet." }));
      return;
    }
    items.forEach((it) => {
      body.appendChild(
        el(
          "div",
          { class: "st-summary-row" },
          el("span", { text: it.name }),
          el("span", { text: "× " + it.quantity })
        )
      );
    });
    custom.forEach((it) => {
      body.appendChild(
        el(
          "div",
          { class: "st-summary-row" },
          el("span", { text: it.description + " (not on list)" }),
          el("span", { text: "× " + it.quantity })
        )
      );
    });
    const totalLines = items.length + custom.length;
    const totalQty = items.reduce((s, it) => s + it.quantity, 0) + custom.reduce((s, it) => s + it.quantity, 0);
    body.appendChild(
      el(
        "div",
        { class: "st-summary-total" },
        el("span", { text: totalLines + " item line" + (totalLines === 1 ? "" : "s") }),
        el("span", { text: totalQty + " total" })
      )
    );
  }

  function currentSite() {
    const select = document.getElementById("st-site");
    if (!select) return "";
    if (select.value === "Other") {
      return (document.getElementById("st-site-other").value || "").trim();
    }
    return select.value;
  }

  function validate() {
    const nameEl = document.getElementById("st-name");
    const dateEl = document.getElementById("st-date");
    const submitBtn = document.getElementById("st-submit-btn");
    if (!nameEl || !dateEl || !submitBtn) return false;
    const name = nameEl.value.trim();
    const site = currentSite();
    const date = dateEl.value;
    const hasItems = selectedItems().length > 0 || selectedCustomItems().length > 0;
    const ok = Boolean(name && site && date && hasItems);
    submitBtn.disabled = !ok;
    return ok;
  }

  function showToast(message, isError) {
    const existing = document.querySelector(".st-toast");
    if (existing) existing.remove();
    const toast = el("div", { class: "st-toast" + (isError ? " error" : ""), text: message });
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
  }

  function downloadJson(payload) {
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = el("a", { href: url, download: "stationery-order-" + payload.orderDate + ".json" });
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function submitOrder() {
    if (!validate()) return;
    const items = selectedItems();
    const customItems = selectedCustomItems();
    const payload = {
      requestedBy: document.getElementById("st-name").value.trim(),
      site: currentSite(),
      orderDate: document.getElementById("st-date").value,
      submittedAt: new Date().toISOString(),
      items: items,
      customItems: customItems,
      totalLines: items.length + customItems.length,
      totalQuantity:
        items.reduce((s, it) => s + it.quantity, 0) + customItems.reduce((s, it) => s + it.quantity, 0)
    };

    const btn = document.getElementById("st-submit-btn");
    btn.disabled = true;
    btn.textContent = "Submitting…";

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

    if (success) {
      showToast("Order submitted — thank you.");
      resetForm();
    } else {
      downloadJson(payload);
      showToast(
        config.submitUrl
          ? "Couldn't reach the server — your order was downloaded as a file instead. Please send it to the office."
          : "Submission isn't wired up yet — your order was downloaded as a file. Please send it to the office.",
        true
      );
      btn.disabled = false;
    }
    btn.textContent = "Submit Order";
  }

  function resetForm() {
    document.getElementById("st-name").value = "";
    document.getElementById("st-site").value = "";
    document.getElementById("st-site-other").value = "";
    document.getElementById("st-site-other-field").classList.add("hidden");
    document.getElementById("st-date").value = todayISO();
    Object.keys(qty).forEach((k) => (qty[k] = 0));
    document.querySelectorAll(".st-item").forEach((row) => {
      row.classList.remove("has-qty");
      const input = row.querySelector(".st-qty input");
      const minus = row.querySelector(".st-qty button");
      if (input) input.value = "0";
      if (minus) minus.disabled = true;
    });
    customRows.slice().forEach((r) => r.row.remove());
    customRows.length = 0;
    if (otherRowsContainer) addCustomRow(otherRowsContainer);
    updateSummary();
    validate();
  }

  function build() {
    root.appendChild(buildHeader());
    const container = el("div", { class: "st-container" });
    container.appendChild(buildDetailsCard());
    container.appendChild(buildItemsCard());
    container.appendChild(buildOtherItemsCard());
    container.appendChild(buildSummaryCard());
    root.appendChild(container);

    const submitBtn = el("button", { class: "st-submit-btn", id: "st-submit-btn", type: "button", text: "Submit Order", disabled: "disabled" });
    submitBtn.addEventListener("click", submitOrder);
    root.appendChild(
      el(
        "div",
        { class: "st-submit-bar" },
        submitBtn,
        el("div", { class: "st-submit-hint", text: "Fill in your name, site and date, and select at least one item." })
      )
    );

    updateSummary();
    validate();
  }

  build();
})();
