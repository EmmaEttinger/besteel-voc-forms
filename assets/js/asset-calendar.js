// ============================================================
// ASSET REGISTER DASHBOARD ENGINE
// Reads live from the "Besteel Group Asset Register" SharePoint list
// via a Power Automate flow (ASSET_DASHBOARD_CONFIG.readUrl), lets
// staff mark inspections/services/certs done or change a due date via
// a second flow (ASSET_DASHBOARD_CONFIG.writeUrl), and falls back to
// the bundled sample snapshot (data/asset-register-data.js) when the
// read flow isn't configured yet or isn't reachable — see the header
// comment in that file, and SETUP-GUIDE.md section "3d. Asset Register
// Dashboard", for the full picture.
// ============================================================

(function () {
  "use strict";

  const SOON_DAYS = 30;
  const UPCOMING_DAYS = 90;

  // Every "due" column on the list, and how to edit it. `dateField`/
  // `lastField`/`providerField` are the SharePoint internal column
  // names (confirmed against the live list's /fields endpoint,
  // 2026-09-09 — see data/asset-register-data.js header for how).
  // `candidates` covers small serialization variations between the
  // raw REST API and Power Automate's "Get items" connector action,
  // so a live read still works even if a key comes back slightly
  // differently than expected.
  const DUE_TYPES = [
    {
      updateType: "rego",
      label: "Registration/Certification Expiry",
      dateField: "Registration_x002f_Certification",
      lastField: null,
      providerField: null
    },
    {
      updateType: "service",
      label: "Service Due",
      dateField: "Service_x0020__x002d__x0020_Next",
      lastField: "Service_x0020__x002d__x0020_Last",
      providerField: "Service_x0020__x002d__x0020_Prov"
    },
    {
      updateType: "coi",
      label: "COI Due",
      dateField: "COI_x0020__x002d__x0020_Next_x00",
      lastField: "COI_x0020__x002d__x0020_Last_x00",
      providerField: "COI_x0020__x002d__x0020_Provider"
    },
    {
      updateType: "wheel",
      label: "Wheel Rotation Due",
      dateField: "Wheel_x0020_Rotation_x0020__x0020",
      lastField: "Wheel_x0020_Rotation_x0020__x002",
      providerField: "Wheel_x0020_Rotation_x0020__x0021"
    },
    {
      updateType: "crane",
      label: "Crane Service Due",
      dateField: "Crane_x0020_Service_x0020__x002d0",
      lastField: "Crane_x0020_Service_x0020__x002d",
      providerField: null
    },
    {
      updateType: "gas",
      label: "Gas Certification Due",
      dateField: "Gas_x0020_Certification_x0020__x0",
      lastField: "Gas_x0020_Certification_x0020__x",
      providerField: null
    },
    {
      updateType: "inspection",
      label: "Next Inspection Due",
      dateField: "Next_x0020_Inspection_x0020_Due_",
      lastField: "field_4",
      providerField: null
    }
  ];

  const cfg = window.ASSET_DASHBOARD_CONFIG || {};

  const state = {
    events: [],
    isSample: false,
    loadError: "",
    lastUpdated: null,
    filterCategory: "",
    filterSite: "",
    filterSearch: "",
    filterUpdateType: "",
    filterUrgency: "",
    activeTab: "calendar",
    calCursor: startOfMonth(new Date()),
    selectedDay: null
  };

  let els = {};

  document.addEventListener("DOMContentLoaded", init);

  function init() {
    els = {
      banner: document.getElementById("ac-banner"),
      updatedNote: document.getElementById("ac-updated-note"),
      refreshBtn: document.getElementById("ac-refresh-btn"),
      statOverdue: document.getElementById("stat-overdue"),
      statSoon: document.getElementById("stat-soon"),
      statUpcoming: document.getElementById("stat-upcoming"),
      statTotal: document.getElementById("stat-total"),
      reminderGridBody: document.getElementById("ac-reminder-body"),
      categoryGrid: document.getElementById("ac-category-grid"),
      search: document.getElementById("filter-search"),
      category: document.getElementById("filter-category"),
      site: document.getElementById("filter-site"),
      tabs: document.querySelectorAll(".ac-tab"),
      panelCalendar: document.getElementById("panel-calendar"),
      panelList: document.getElementById("panel-list"),
      calMonthLabel: document.getElementById("cal-month-label"),
      calGrid: document.getElementById("cal-grid"),
      dayAgenda: document.getElementById("day-agenda"),
      listContent: document.getElementById("list-content"),
      spListLink: document.getElementById("sp-list-link")
    };

    if (els.spListLink && cfg.listUrl) els.spListLink.href = cfg.listUrl;

    els.refreshBtn.addEventListener("click", function () { loadData(); });
    els.search.addEventListener("input", function () {
      state.filterSearch = els.search.value.trim().toLowerCase();
      renderFiltered();
    });
    els.category.addEventListener("change", function () {
      state.filterCategory = els.category.value;
      renderFiltered();
    });
    els.site.addEventListener("change", function () {
      state.filterSite = els.site.value;
      renderFiltered();
    });
    els.tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        state.activeTab = tab.dataset.tab;
        els.tabs.forEach(function (t) { t.classList.toggle("active", t === tab); });
        els.panelCalendar.hidden = state.activeTab !== "calendar";
        els.panelList.hidden = state.activeTab !== "list";
      });
    });
    document.getElementById("cal-prev").addEventListener("click", function () {
      state.calCursor = addMonths(state.calCursor, -1);
      state.selectedDay = null;
      renderCalendar();
    });
    document.getElementById("cal-next").addEventListener("click", function () {
      state.calCursor = addMonths(state.calCursor, 1);
      state.selectedDay = null;
      renderCalendar();
    });
    document.getElementById("cal-today").addEventListener("click", function () {
      state.calCursor = startOfMonth(new Date());
      state.selectedDay = todayStr();
      renderCalendar();
    });

    loadData();
  }

  // ---------- Data loading ----------

  function loadData() {
    els.refreshBtn.disabled = true;
    els.refreshBtn.textContent = "Refreshing...";

    const go = cfg.readUrl
      ? fetch(cfg.readUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: "{}"
        }).then(function (res) {
          if (!res.ok) throw new Error("HTTP_" + res.status);
          return res.json();
        }).then(function (data) {
          const items = Array.isArray(data) ? data : (data.value || []);
          state.events = expandItemsToEvents(items);
          state.isSample = false;
          state.loadError = "";
        }).catch(function (err) {
          state.events = expandSampleToEvents();
          state.isSample = true;
          state.loadError = "Couldn't reach the live Asset Register feed (" + err.message + ") — showing the bundled sample snapshot instead.";
        })
      : Promise.resolve().then(function () {
          state.events = expandSampleToEvents();
          state.isSample = true;
          state.loadError = "";
        });

    go.then(function () {
      state.lastUpdated = new Date();
      els.refreshBtn.disabled = false;
      els.refreshBtn.textContent = "Refresh";
      populateFilterOptions();
      renderAll();
    });
  }

  function expandItemsToEvents(items) {
    const events = [];
    items.forEach(function (item) {
      const id = pick(item, ["ID", "Id", "id"]);
      const uid = pick(item, ["Unique_x0020_ID", "UniqueID"]) || "";
      const title = pick(item, ["Title"]) || "(untitled asset)";
      const category = pickChoice(item, ["Category"]) || "";
      const site = pickChoice(item, ["field_2", "Site"]) || "";
      DUE_TYPES.forEach(function (dt) {
        const rawDate = pick(item, [dt.dateField]);
        if (!rawDate) return;
        events.push({
          id: id,
          uid: uid,
          title: title,
          category: category,
          site: site,
          updateType: dt.updateType,
          type: dt.label,
          date: utcToLocalDateStr(rawDate),
          lastDate: dt.lastField ? utcToLocalDateStr(pick(item, [dt.lastField])) : null,
          provider: (dt.providerField && pick(item, [dt.providerField])) || ""
        });
      });
    });
    return events;
  }

  function expandSampleToEvents() {
    const sample = (window.ASSET_REGISTER_DATA && window.ASSET_REGISTER_DATA.events) || [];
    return sample.map(function (e) {
      const dt = DUE_TYPES.find(function (d) { return d.label === e.type; });
      return Object.assign({}, e, {
        updateType: dt ? dt.updateType : "",
        lastDate: null
      });
    });
  }

  function pick(obj, keys) {
    for (let i = 0; i < keys.length; i++) {
      if (obj[keys[i]] !== undefined && obj[keys[i]] !== null && obj[keys[i]] !== "") return obj[keys[i]];
    }
    return null;
  }

  // Power Automate's SharePoint "Get items" action returns Choice
  // columns (Category, Site) as { Id, Value } objects, not plain
  // strings like the raw REST API does — confirmed 2026-09-10 against
  // the live read flow. This unwraps either shape to a plain string.
  function pickChoice(obj, keys) {
    const v = pick(obj, keys);
    if (v && typeof v === "object" && "Value" in v) return v.Value;
    return v;
  }

  // Brisbane (Besteel Frames) is UTC+10 year-round, no daylight saving,
  // but SharePoint's REST API returns date-only columns as UTC
  // datetimes. Converting via a fixed +10h offset (rather than trusting
  // the date component of the raw string) gives the same local calendar
  // date SharePoint's own UI shows, confirmed against VEH001's
  // Registration/Certification Expiry (API: 2025-08-07T14:00:00Z, UI:
  // 8/8/2025) — see data/asset-register-data.js for the full note.
  function utcToLocalDateStr(utcIso) {
    if (!utcIso) return null;
    const d = new Date(utcIso);
    if (isNaN(d.getTime())) return null;
    const local = new Date(d.getTime() + 10 * 60 * 60 * 1000);
    const y = local.getUTCFullYear();
    const m = String(local.getUTCMonth() + 1).padStart(2, "0");
    const day = String(local.getUTCDate()).padStart(2, "0");
    return y + "-" + m + "-" + day;
  }

  // ---------- Date helpers ----------

  function todayStr() { return dateToStr(new Date()); }
  function dateToStr(d) {
    return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0");
  }
  function parseLocalDate(str) {
    const parts = str.split("-").map(Number);
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  function daysUntil(dateStr) {
    const today = parseLocalDate(todayStr());
    const target = parseLocalDate(dateStr);
    return Math.round((target - today) / 86400000);
  }
  function urgencyOf(days) {
    if (days < 0) return "overdue";
    if (days <= SOON_DAYS) return "soon";
    if (days <= UPCOMING_DAYS) return "upcoming";
    return "later";
  }
  function urgencyLabel(u) {
    return { overdue: "Overdue", soon: "Due soon", upcoming: "Upcoming", later: "Later" }[u] || "";
  }
  function daysLabel(days) {
    if (days < 0) return Math.abs(days) + " day" + (Math.abs(days) === 1 ? "" : "s") + " overdue";
    if (days === 0) return "Due today";
    return "Due in " + days + " day" + (days === 1 ? "" : "s");
  }
  function startOfMonth(d) { return new Date(d.getFullYear(), d.getMonth(), 1); }
  function addMonths(d, n) { return new Date(d.getFullYear(), d.getMonth() + n, 1); }
  function fmtDate(dateStr) {
    if (!dateStr) return "—";
    const d = parseLocalDate(dateStr);
    return d.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
  }

  // ---------- Filters ----------

  function populateFilterOptions() {
    const categories = uniqueSorted(state.events.map(function (e) { return e.category; }));
    const sites = uniqueSorted(state.events.map(function (e) { return e.site; }));
    fillSelect(els.category, categories, state.filterCategory);
    fillSelect(els.site, sites, state.filterSite);
  }

  function uniqueSorted(arr) {
    return Array.from(new Set(arr.filter(Boolean))).sort();
  }

  function fillSelect(select, values, currentValue) {
    const allLabel = select === els.category ? "All categories" : "All sites";
    select.innerHTML = '<option value="">' + allLabel + "</option>" +
      values.map(function (v) { return '<option value="' + escapeAttr(v) + '">' + escapeHtml(v) + "</option>"; }).join("");
    select.value = currentValue;
  }

  // `skip` lists filter keys to ignore — used by renderCategoryTiles so
  // picking a category doesn't make every other category's tile vanish
  // (each tile's count should reflect every filter EXCEPT category).
  function getFilteredEvents(skip) {
    skip = skip || [];
    return state.events.filter(function (e) {
      if (skip.indexOf("category") === -1 && state.filterCategory && e.category !== state.filterCategory) return false;
      if (skip.indexOf("site") === -1 && state.filterSite && e.site !== state.filterSite) return false;
      if (skip.indexOf("updateType") === -1 && state.filterUpdateType && e.updateType !== state.filterUpdateType) return false;
      if (skip.indexOf("urgency") === -1 && state.filterUrgency && urgencyOf(daysUntil(e.date)) !== state.filterUrgency) return false;
      if (state.filterSearch) {
        const hay = (e.title + " " + e.uid + " " + e.category + " " + e.site).toLowerCase();
        if (hay.indexOf(state.filterSearch) === -1) return false;
      }
      return true;
    });
  }

  // ---------- Render orchestration ----------

  function renderAll() {
    renderBanner();
    renderUpdatedNote();
    renderFiltered();
  }

  // Re-renders everything that depends on the current filter state
  // (but not the parts of the header that don't, like the banner).
  function renderFiltered() {
    renderStats();
    renderReminderGrid();
    renderCategoryTiles();
    renderCalendar();
    renderList();
  }

  function renderBanner() {
    if (state.loadError) {
      els.banner.hidden = false;
      els.banner.className = "ac-banner ac-banner-error";
      els.banner.textContent = state.loadError;
    } else if (state.isSample) {
      els.banner.hidden = false;
      els.banner.className = "ac-banner ac-banner-sample";
      els.banner.textContent = cfg.readUrl
        ? "Showing sample data."
        : "Showing bundled sample data — the live Asset Register feed isn't connected yet (ASSET_DASHBOARD_CONFIG.readUrl is blank). Editing is disabled until it's connected. See SETUP-GUIDE.md, \"3d. Asset Register Dashboard\".";
    } else {
      els.banner.hidden = true;
    }
  }

  function renderUpdatedNote() {
    if (!state.lastUpdated) { els.updatedNote.textContent = ""; return; }
    els.updatedNote.textContent = "Updated " + state.lastUpdated.toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit" });
  }

  function renderStats() {
    const all = getFilteredEvents();
    let overdue = 0, soon = 0, upcoming = 0;
    all.forEach(function (e) {
      const u = urgencyOf(daysUntil(e.date));
      if (u === "overdue") overdue++;
      else if (u === "soon") soon++;
      else if (u === "upcoming") upcoming++;
    });
    els.statOverdue.textContent = overdue;
    els.statSoon.textContent = soon;
    els.statUpcoming.textContent = upcoming;
    els.statTotal.textContent = all.length;
  }

  function renderReminderGrid() {
    const filtered = getFilteredEvents(["updateType", "urgency"]);
    const rows = DUE_TYPES.map(function (dt) {
      const forType = filtered.filter(function (e) { return e.updateType === dt.updateType; });
      const counts = { overdue: 0, soon: 0, upcoming: 0 };
      forType.forEach(function (e) {
        const u = urgencyOf(daysUntil(e.date));
        if (counts[u] !== undefined) counts[u]++;
      });
      if (forType.length === 0) return "";
      return (
        "<tr>" +
        "<td>" + escapeHtml(dt.label) + "</td>" +
        ["overdue", "soon", "upcoming"].map(function (u) {
          const isActive = state.filterUpdateType === dt.updateType && state.filterUrgency === u;
          return '<td><button type="button" class="ac-reminder-count ' + u + (counts[u] ? " clickable" : "") + (isActive ? " active" : "") + '" data-updatetype="' + dt.updateType + '" data-urgency="' + u + '"' + (counts[u] ? "" : " disabled") + ">" + counts[u] + "</button></td>";
        }).join("") +
        "</tr>"
      );
    }).join("");
    els.reminderGridBody.innerHTML = rows || '<tr><td colspan="4" class="ac-empty-state">No due dates match the current filters.</td></tr>';
    els.reminderGridBody.querySelectorAll(".ac-reminder-count.clickable").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const ut = btn.dataset.updatetype, ur = btn.dataset.urgency;
        const isActive = state.filterUpdateType === ut && state.filterUrgency === ur;
        state.filterUpdateType = isActive ? "" : ut;
        state.filterUrgency = isActive ? "" : ur;
        state.activeTab = "list";
        els.tabs.forEach(function (t) { t.classList.toggle("active", t.dataset.tab === "list"); });
        els.panelCalendar.hidden = true;
        els.panelList.hidden = false;
        renderFiltered();
      });
    });
  }

  function renderCategoryTiles() {
    const filtered = getFilteredEvents(["category"]);
    const byCategory = {};
    filtered.forEach(function (e) {
      byCategory[e.category] = (byCategory[e.category] || 0) + 1;
    });
    const cats = Object.keys(byCategory).sort();
    els.categoryGrid.innerHTML = cats.map(function (c) {
      const active = state.filterCategory === c;
      return '<button type="button" class="ac-category-tile' + (active ? " active" : "") + '" data-cat="' + escapeAttr(c) + '">' +
        '<span class="ac-cat-num">' + byCategory[c] + '</span>' +
        '<span class="ac-cat-label">' + escapeHtml(c) + '</span></button>';
    }).join("");
    els.categoryGrid.querySelectorAll(".ac-category-tile").forEach(function (tile) {
      tile.addEventListener("click", function () {
        const c = tile.dataset.cat;
        state.filterCategory = state.filterCategory === c ? "" : c;
        els.category.value = state.filterCategory;
        renderFiltered();
      });
    });
  }

  // ---------- Calendar view ----------

  function renderCalendar() {
    const filtered = getFilteredEvents();
    const cursor = state.calCursor;
    els.calMonthLabel.textContent = cursor.toLocaleDateString("en-AU", { month: "long", year: "numeric" });

    const byDate = {};
    filtered.forEach(function (e) {
      (byDate[e.date] = byDate[e.date] || []).push(e);
    });

    const firstOfMonth = new Date(cursor.getFullYear(), cursor.getMonth(), 1);
    const startWeekday = (firstOfMonth.getDay() + 6) % 7; // Monday = 0
    const gridStart = new Date(firstOfMonth);
    gridStart.setDate(gridStart.getDate() - startWeekday);

    const dow = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    let html = dow.map(function (d) { return '<div class="ac-cal-dow">' + d + "</div>"; }).join("");

    const today = todayStr();
    for (let i = 0; i < 42; i++) {
      const day = new Date(gridStart);
      day.setDate(gridStart.getDate() + i);
      const dStr = dateToStr(day);
      const dayEvents = byDate[dStr] || [];
      const outOfMonth = day.getMonth() !== cursor.getMonth();
      const classes = ["ac-cal-day"];
      if (outOfMonth) classes.push("out-of-month");
      if (dStr === today) classes.push("is-today");
      if (dStr === state.selectedDay) classes.push("is-selected");
      if (dayEvents.length) classes.push("has-events");

      const urgencies = Array.from(new Set(dayEvents.map(function (e) { return urgencyOf(daysUntil(e.date)); })));
      const order = { overdue: 0, soon: 1, upcoming: 2, later: 3 };
      urgencies.sort(function (a, b) { return order[a] - order[b]; });
      const dots = urgencies.slice(0, 4).map(function (u) { return '<span class="ac-dot ' + u + '"></span>'; }).join("");

      html += '<div class="' + classes.join(" ") + '" data-date="' + dStr + '">' +
        '<span class="ac-cal-daynum">' + day.getDate() + '</span>' +
        '<span class="ac-cal-dots">' + dots + '</span>' +
        (dayEvents.length > 4 ? '<span class="ac-cal-more">' + dayEvents.length + '</span>' : "") +
        "</div>";
    }
    els.calGrid.innerHTML = html;

    els.calGrid.querySelectorAll(".ac-cal-day.has-events").forEach(function (cell) {
      cell.addEventListener("click", function () {
        state.selectedDay = state.selectedDay === cell.dataset.date ? null : cell.dataset.date;
        renderCalendar();
      });
    });

    renderDayAgenda(byDate);
  }

  function renderDayAgenda(byDate) {
    if (!state.selectedDay) { els.dayAgenda.hidden = true; els.dayAgenda.innerHTML = ""; return; }
    const dayEvents = byDate[state.selectedDay] || [];
    els.dayAgenda.hidden = false;
    els.dayAgenda.innerHTML =
      '<p class="ac-agenda-title">' + fmtDate(state.selectedDay) + "</p>" +
      (dayEvents.length ? dayEvents.map(renderEventCard).join("") : '<p class="ac-empty-state">Nothing due this day.</p>');
    wireEventCardButtons(els.dayAgenda);
  }

  // ---------- List view ----------

  function renderList() {
    const filtered = getFilteredEvents().slice().sort(function (a, b) { return daysUntil(a.date) - daysUntil(b.date); });
    if (!filtered.length) {
      els.listContent.innerHTML = '<p class="ac-empty-state">Nothing matches the current filters.</p>';
      return;
    }
    let html = "";
    let currentMonth = "";
    filtered.forEach(function (e) {
      const d = parseLocalDate(e.date);
      const label = daysUntil(e.date) < 0 ? "Overdue" : d.toLocaleDateString("en-AU", { month: "long", year: "numeric" });
      if (label !== currentMonth) {
        currentMonth = label;
        html += '<p class="ac-month-heading">' + label + "</p>";
      }
      html += renderEventCard(e);
    });
    els.listContent.innerHTML = html;
    wireEventCardButtons(els.listContent);
  }

  function renderEventCard(e) {
    const days = daysUntil(e.date);
    const urgency = urgencyOf(days);
    const itemLink = cfg.itemUrlBase ? cfg.itemUrlBase + e.id : "#";
    return (
      '<div class="ac-event-card ' + urgency + '" data-id="' + e.id + '" data-updatetype="' + e.updateType + '">' +
      '<div class="ac-event-main">' +
      '<p class="ac-event-title">' + escapeHtml(e.title) + "</p>" +
      '<p class="ac-event-type">' + escapeHtml(e.type) + (e.provider ? " · " + escapeHtml(e.provider) : "") + "</p>" +
      '<div class="ac-event-badges">' +
      '<span class="ac-badge">' + escapeHtml(e.uid) + "</span>" +
      '<span class="ac-badge">' + escapeHtml(e.category) + "</span>" +
      '<span class="ac-badge">' + escapeHtml(e.site) + "</span>" +
      "</div></div>" +
      '<div class="ac-event-date-block">' +
      '<div class="ac-event-date">' + fmtDate(e.date) + "</div>" +
      '<div class="ac-event-days ' + urgency + '">' + daysLabel(days) + "</div>" +
      "</div>" +
      '<button type="button" class="ac-event-edit-btn" data-action="edit">Update</button>' +
      '<a class="ac-event-link" href="' + itemLink + '" target="_blank" rel="noopener">Open in SharePoint ↗</a>' +
      "</div>"
    );
  }

  function wireEventCardButtons(container) {
    container.querySelectorAll('.ac-event-edit-btn').forEach(function (btn) {
      btn.addEventListener("click", function () {
        const card = btn.closest(".ac-event-card");
        const id = card.dataset.id;
        const updateType = card.dataset.updatetype;
        const event = state.events.find(function (e) { return String(e.id) === id && e.updateType === updateType; });
        if (event) openEditModal(event);
      });
    });
  }

  // ---------- Edit modal ----------

  function openEditModal(event) {
    const isRego = event.updateType === "rego";
    const canEdit = !!cfg.writeUrl && !state.isSample;

    const overlay = document.createElement("div");
    overlay.className = "ac-modal-overlay";
    overlay.innerHTML =
      '<div class="ac-modal">' +
      "<h3>" + escapeHtml(event.title) + "</h3>" +
      '<p class="ac-modal-sub">' + escapeHtml(event.type) + "</p>" +
      (canEdit ? "" : '<p class="ac-modal-error">' + (state.isSample ? "Editing is disabled while showing sample data — connect ASSET_DASHBOARD_CONFIG.readUrl and writeUrl first." : "Editing isn't set up yet — ASSET_DASHBOARD_CONFIG.writeUrl is blank. See SETUP-GUIDE.md.") + "</p>") +
      (canEdit ? (
        isRego
          ? '<div class="ac-modal-field"><label for="ac-f-expiry">New expiry date</label><input type="date" id="ac-f-expiry" value="' + (event.date || "") + '" /></div>'
          : '<div class="ac-modal-field"><label for="ac-f-last">Completed on</label><input type="date" id="ac-f-last" value="' + (event.lastDate || todayStr()) + '" /></div>' +
            '<div class="ac-modal-field"><label for="ac-f-next">Next due</label><input type="date" id="ac-f-next" value="' + (event.date || "") + '" /></div>'
      ) : "") +
      '<div class="ac-modal-error" id="ac-modal-err" hidden></div>' +
      '<div class="ac-modal-actions">' +
      '<button type="button" class="ac-modal-btn cancel" id="ac-modal-cancel">Cancel</button>' +
      (canEdit ? '<button type="button" class="ac-modal-btn save" id="ac-modal-save">Save</button>' : "") +
      "</div></div>";

    document.body.appendChild(overlay);
    overlay.addEventListener("click", function (ev) { if (ev.target === overlay) close(); });
    document.getElementById("ac-modal-cancel").addEventListener("click", close);

    if (canEdit) {
      document.getElementById("ac-modal-save").addEventListener("click", function () {
        const payload = { itemId: event.id, updateType: event.updateType };
        const errEl = document.getElementById("ac-modal-err");
        if (isRego) {
          const v = document.getElementById("ac-f-expiry").value;
          if (!v) { showErr("Pick a date."); return; }
          payload.expiryDate = v;
        } else {
          const last = document.getElementById("ac-f-last").value;
          const next = document.getElementById("ac-f-next").value;
          if (!last || !next) { showErr("Pick both dates."); return; }
          payload.lastDate = last;
          payload.nextDate = next;
        }
        submitUpdate(payload, close, showErr);

        function showErr(msg) { errEl.hidden = false; errEl.textContent = msg; }
      });
    }

    function close() { overlay.remove(); }
  }

  function submitUpdate(payload, onSuccess, onError) {
    const saveBtn = document.getElementById("ac-modal-save");
    saveBtn.disabled = true;
    saveBtn.textContent = "Saving...";
    fetch(cfg.writeUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    }).then(function (res) {
      if (!res.ok) throw new Error("HTTP_" + res.status);
      onSuccess();
      loadData();
    }).catch(function (err) {
      saveBtn.disabled = false;
      saveBtn.textContent = "Save";
      onError("Couldn't save (" + err.message + "). Please try again.");
    });
  }

  // ---------- Small utils ----------

  function escapeHtml(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function escapeAttr(str) { return escapeHtml(str); }
})();
