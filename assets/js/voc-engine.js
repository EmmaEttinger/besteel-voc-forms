// ============================================================
// VOC ENGINE
// Generic renderer + logic for all Verification of Competency forms.
// A specific VOC only needs a data file (see /data/_template.js).
// ============================================================

(function () {
  "use strict";

  const VOCEngine = {
    data: null,
    state: null,
    bubbleEl: null,
    root: null,

    init(data) {
      this.data = data;
      this.root = document.getElementById("voc-root");
      this.state = {
        personal: {},
        pre: {},
        questions: {}, // id -> { attempts, correct, selectedText }
        practicalGate: null,
        supervisorName: "",
        practicalRatings: {}, // id -> 'competent' | 'not-competent'
        overallOutcome: null,
        signatureDataUrl: null,
        signatureDate: this._todayDate(),
        conductedOn: this._nowLocal()
      };
      (data.questions || []).forEach((q) => {
        this.state.questions[q.id] = { attempts: 0, correct: false, selectedText: "" };
      });

      this._injectBubble();
      this._render();
      this._checkValidity();
    },

    // ---------- helpers ----------
    _todayDate() {
      const d = new Date();
      return d.toISOString().slice(0, 10);
    },
    _nowLocal() {
      const d = new Date();
      d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
      return d.toISOString().slice(0, 16);
    },
    _el(tag, cls, html) {
      const e = document.createElement(tag);
      if (cls) e.className = cls;
      if (html !== undefined) e.innerHTML = html;
      return e;
    },
    _injectBubble() {
      this.bubbleEl = this._el("div", "voc-bubble");
      document.body.appendChild(this.bubbleEl);
    },
    _showBubble(targetEl, message, tone) {
      const rect = targetEl.getBoundingClientRect();
      this.bubbleEl.textContent = message;
      this.bubbleEl.className = "voc-bubble" + (tone === "error" ? " bubble-red" : "");
      this.bubbleEl.style.left = Math.max(10, rect.left) + "px";
      this.bubbleEl.style.top = rect.bottom + 10 + window.scrollY + "px";
      requestAnimationFrame(() => this.bubbleEl.classList.add("show"));
      clearTimeout(this._bubbleTimer);
      this._bubbleTimer = setTimeout(() => {
        this.bubbleEl.classList.remove("show");
      }, 1600);
    },

    // ---------- render ----------
    _render() {
      const d = this.data;
      const cfg = window.VOC_CONFIG || {};
      this.root.innerHTML = "";

      // Header
      const header = this._el("div", "voc-header");
      if (cfg.logoUrl) {
        const img = this._el("img");
        img.src = cfg.logoUrl;
        img.className = "voc-logo";
        img.alt = cfg.companyName || "";
        header.appendChild(img);
      }
      header.appendChild(this._el("h1", null, d.title || "Verification of Competency"));
      header.appendChild(this._el("p", null, cfg.companyName || ""));
      document.body.insertBefore(header, this.root);

      const container = this._el("div", "voc-container");

      // Progress bar
      const progWrap = this._el("div", "voc-progress-wrap");
      progWrap.innerHTML =
        '<div class="voc-progress-bar"><div class="voc-progress-fill" id="voc-progress-fill"></div></div>' +
        '<div class="voc-progress-label" id="voc-progress-label"></div>';
      container.appendChild(progWrap);

      // Personal details
      if (d.personalFields && d.personalFields.length) {
        const card = this._el("div", "voc-card");
        card.appendChild(this._el("h2", null, "Person's Details"));
        d.personalFields.forEach((f) => card.appendChild(this._renderField(f)));
        container.appendChild(card);
      }

      // Pre-questions (e.g. "have you read the SOP")
      if (d.preQuestions && d.preQuestions.length) {
        d.preQuestions.forEach((pq) => container.appendChild(this._renderPreQuestion(pq)));
      }

      // Graded questions
      if (d.questions && d.questions.length) {
        container.appendChild(this._el("div", "voc-section-title", "Questions"));
        d.questions.forEach((q, idx) => container.appendChild(this._renderQuestion(q, idx)));
      }

      // Practical section
      if (d.practical) {
        container.appendChild(this._el("div", "voc-section-title", "Practical Verification"));
        container.appendChild(this._renderPracticalGate(d.practical));
        this._practicalBody = this._el("div", "voc-practical-body");
        container.appendChild(this._practicalBody);
      }

      // Note
      if (d.note) {
        const note = this._el("div", "voc-note");
        note.innerHTML = "<strong>Important:</strong> " + d.note;
        container.appendChild(note);
      }

      // Submit bar
      const submitBar = this._el("div", "voc-submit-bar");
      submitBar.innerHTML =
        '<button class="voc-submit-btn" id="voc-submit-btn" disabled>Submit VOC</button>' +
        '<div class="voc-submit-hint" id="voc-submit-hint">Answer every question correctly to unlock submission.</div>' +
        '<div class="voc-error-msg voc-hidden" id="voc-error-msg"></div>';
      container.appendChild(submitBar);

      this.root.appendChild(container);

      document.getElementById("voc-submit-btn").addEventListener("click", () => this._submit());
      this._updateProgress();
    },

    _renderField(f) {
      const wrap = this._el("div", "voc-field");
      const label = this._el("label", null, f.label + (f.required ? ' <span class="req">*</span>' : ""));
      wrap.appendChild(label);
      const input = document.createElement("input");
      input.type = f.type === "datetime" ? "datetime-local" : f.type === "date" ? "date" : "text";
      input.id = "voc-field-" + f.id;
      if (f.type === "datetime") input.value = this.state.conductedOn;
      input.addEventListener("input", () => {
        this.state.personal[f.id] = input.value;
        this._checkValidity();
      });
      // seed default
      this.state.personal[f.id] = input.value || "";
      wrap.appendChild(input);
      return wrap;
    },

    _renderPreQuestion(pq) {
      const card = this._el("div", "voc-question");
      const head = this._el("div", "voc-question-head");
      head.appendChild(this._el("div", "voc-question-text", pq.question + (pq.required ? ' <span class="req">*</span>' : "")));
      card.appendChild(head);
      const opts = this._el("div", "voc-options");
      pq.options.forEach((optText) => {
        const btn = this._el("button", "voc-option", '<span class="voc-opt-dot"></span><span>' + optText + "</span>");
        btn.type = "button";
        btn.addEventListener("click", () => {
          [...opts.children].forEach((b) => b.classList.remove("correct"));
          btn.classList.add("correct");
          this.state.pre[pq.id] = optText;
          this._checkValidity();
        });
        opts.appendChild(btn);
      });
      card.appendChild(opts);
      return card;
    },

    _renderQuestion(q, idx) {
      const card = this._el("div", "voc-question");
      card.id = "voc-q-" + q.id;
      const head = this._el("div", "voc-question-head");
      head.appendChild(this._el("div", "voc-qnum", String(idx + 1)));
      head.appendChild(this._el("div", "voc-question-text", q.question));
      card.appendChild(head);

      const opts = this._el("div", "voc-options");
      q.options.forEach((optText, optIdx) => {
        const btn = this._el("button", "voc-option", '<span class="voc-opt-dot"></span><span>' + optText + "</span>");
        btn.type = "button";
        btn.addEventListener("click", () => this._handleAnswer(q, optIdx, optText, btn, opts, card));
        opts.appendChild(btn);
      });
      card.appendChild(opts);

      const attemptsLine = this._el("div", "voc-attempts");
      attemptsLine.id = "voc-attempts-" + q.id;
      attemptsLine.style.display = "none";
      card.appendChild(attemptsLine);

      return card;
    },

    _handleAnswer(q, optIdx, optText, btn, optsWrap, card) {
      const st = this.state.questions[q.id];
      if (st.correct) return; // already locked in

      if (optIdx === q.correctIndex) {
        st.correct = true;
        st.selectedText = optText;
        [...optsWrap.children].forEach((b) => (b.disabled = true));
        btn.classList.add("correct");
        card.classList.add("is-correct");
        const line = document.getElementById("voc-attempts-" + q.id);
        line.style.display = "block";
        line.textContent =
          st.attempts === 0 ? "Correct on first try." : "Correct after " + (st.attempts + 1) + " attempt" + (st.attempts + 1 === 1 ? "" : "s") + ".";
        this._updateProgress();
        this._checkValidity();
      } else {
        st.attempts += 1;
        btn.classList.add("wrong-flash");
        this._showBubble(btn, "That answer is incorrect. Try again.", "error");
        setTimeout(() => btn.classList.remove("wrong-flash"), 450);
      }
    },

    _updateProgress() {
      const total = (this.data.questions || []).length;
      const done = Object.values(this.state.questions).filter((q) => q.correct).length;
      const pct = total ? Math.round((done / total) * 100) : 0;
      const fill = document.getElementById("voc-progress-fill");
      const label = document.getElementById("voc-progress-label");
      if (fill) fill.style.width = pct + "%";
      if (label) label.textContent = done + " / " + total + " questions correct";
    },

    // ---------- practical section ----------
    _renderPracticalGate(practical) {
      const card = this._el("div", "voc-question");
      const head = this._el("div", "voc-question-head");
      head.appendChild(this._el("div", "voc-question-text", practical.gateQuestion.question));
      card.appendChild(head);
      const opts = this._el("div", "voc-options");
      practical.gateQuestion.options.forEach((optText) => {
        const btn = this._el("button", "voc-option", '<span class="voc-opt-dot"></span><span>' + optText + "</span>");
        btn.type = "button";
        btn.addEventListener("click", () => {
          [...opts.children].forEach((b) => b.classList.remove("correct"));
          btn.classList.add("correct");
          this.state.practicalGate = optText;
          this._togglePracticalBody(optText === "Yes");
          this._checkValidity();
        });
        opts.appendChild(btn);
      });
      card.appendChild(opts);
      card.appendChild(this._el("div", "voc-gate-note", "If Yes, the practical section below must be completed with a supervisor."));
      return card;
    },

    _togglePracticalBody(show) {
      const wrap = this._practicalBody;
      wrap.innerHTML = "";
      if (!show) return;

      const practical = this.data.practical;
      const card = this._el("div", "voc-card");
      const nameField = this._el("div", "voc-field");
      nameField.innerHTML =
        '<label>' + (practical.supervisorNameLabel || "Supervisor's Name") + ' <span class="req">*</span></label>';
      const input = document.createElement("input");
      input.type = "text";
      input.addEventListener("input", () => {
        this.state.supervisorName = input.value;
        this._checkValidity();
      });
      nameField.appendChild(input);
      card.appendChild(nameField);
      wrap.appendChild(card);

      (practical.items || []).forEach((item, idx) => {
        const q = this._el("div", "voc-question");
        const head = this._el("div", "voc-question-head");
        head.appendChild(this._el("div", "voc-qnum", String(idx + 1)));
        const textWrap = this._el("div", "voc-question-text", item.title + "<br><span style='font-weight:400;color:var(--text-muted);font-size:0.85rem'>" + (item.description || "") + "</span>");
        head.appendChild(textWrap);
        q.appendChild(head);

        if (item.procedure && item.procedure.length) {
          const proc = this._el("div", "voc-procedure");
          proc.innerHTML = "<strong>Correct Procedure:</strong><ul>" + item.procedure.map((p) => "<li>" + p + "</li>").join("") + "</ul>";
          q.appendChild(proc);
        }

        const rating = this._el("div", "voc-rating");
        const compBtn = this._el("button", "voc-rate-btn competent", "Competent");
        const notBtn = this._el("button", "voc-rate-btn not-competent", "Not Competent");
        compBtn.type = "button";
        notBtn.type = "button";
        compBtn.addEventListener("click", () => {
          compBtn.classList.add("active");
          notBtn.classList.remove("active");
          this.state.practicalRatings[item.id] = "Competent";
          this._checkValidity();
        });
        notBtn.addEventListener("click", () => {
          notBtn.classList.add("active");
          compBtn.classList.remove("active");
          this.state.practicalRatings[item.id] = "Not Competent";
          this._checkValidity();
        });
        rating.appendChild(compBtn);
        rating.appendChild(notBtn);
        q.appendChild(rating);

        wrap.appendChild(q);
      });

      // Overall outcome
      const outcomeCard = this._el("div", "voc-question");
      outcomeCard.appendChild(this._el("div", "voc-question-text", "Overall Assessment — based on your observations, mark the employee:"));
      const outcomeRating = this._el("div", "voc-rating");
      const oComp = this._el("button", "voc-rate-btn competent", "Competent");
      const oNot = this._el("button", "voc-rate-btn not-competent", "Not Competent");
      oComp.type = "button";
      oNot.type = "button";
      oComp.addEventListener("click", () => {
        oComp.classList.add("active");
        oNot.classList.remove("active");
        this.state.overallOutcome = "Competent";
        this._checkValidity();
      });
      oNot.addEventListener("click", () => {
        oNot.classList.add("active");
        oComp.classList.remove("active");
        this.state.overallOutcome = "Not Competent";
        this._checkValidity();
      });
      outcomeRating.appendChild(oComp);
      outcomeRating.appendChild(oNot);
      outcomeCard.appendChild(outcomeRating);
      wrap.appendChild(outcomeCard);

      // Signature
      const sigCard = this._el("div", "voc-card");
      sigCard.appendChild(this._el("h2", null, "Sign to Submit"));
      const canvas = document.createElement("canvas");
      canvas.className = "voc-signature-pad";
      sigCard.appendChild(canvas);
      const sigActions = this._el("div", "voc-sig-actions");
      const clearBtn = this._el("button", "voc-link-btn", "Clear signature");
      clearBtn.type = "button";
      const dateField = document.createElement("input");
      dateField.type = "date";
      dateField.value = this.state.signatureDate;
      dateField.addEventListener("input", () => {
        this.state.signatureDate = dateField.value;
        this._checkValidity();
      });
      sigActions.appendChild(clearBtn);
      sigActions.appendChild(dateField);
      sigCard.appendChild(sigActions);
      wrap.appendChild(sigCard);

      this._setupSignaturePad(canvas, clearBtn);
    },

    _setupSignaturePad(canvas, clearBtn) {
      const ratio = window.devicePixelRatio || 1;
      const resize = () => {
        const rect = canvas.getBoundingClientRect();
        canvas.width = rect.width * ratio;
        canvas.height = rect.height * ratio;
        const ctx = canvas.getContext("2d");
        ctx.scale(ratio, ratio);
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.strokeStyle = "#10233f";
      };
      resize();
      const ctx = canvas.getContext("2d");
      let drawing = false;

      const pos = (e) => {
        const rect = canvas.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
      };
      const start = (e) => {
        drawing = true;
        const p = pos(e);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
      };
      const move = (e) => {
        if (!drawing) return;
        const p = pos(e);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
      };
      const end = () => {
        if (!drawing) return;
        drawing = false;
        this.state.signatureDataUrl = canvas.toDataURL("image/png");
        this._checkValidity();
      };

      canvas.addEventListener("pointerdown", start);
      canvas.addEventListener("pointermove", move);
      window.addEventListener("pointerup", end);

      clearBtn.addEventListener("click", () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        this.state.signatureDataUrl = null;
        this._checkValidity();
      });
    },

    // ---------- validation ----------
    _checkValidity() {
      const d = this.data;
      const errors = [];

      (d.personalFields || []).forEach((f) => {
        if (f.required && !this.state.personal[f.id]) errors.push("personal:" + f.id);
      });
      (d.preQuestions || []).forEach((pq) => {
        if (pq.required && !this.state.pre[pq.id]) errors.push("pre:" + pq.id);
      });
      (d.questions || []).forEach((q) => {
        if (!this.state.questions[q.id].correct) errors.push("q:" + q.id);
      });

      if (d.practical) {
        if (!this.state.practicalGate) errors.push("practicalGate");
        if (this.state.practicalGate === "Yes") {
          if (!this.state.supervisorName) errors.push("supervisorName");
          (d.practical.items || []).forEach((item) => {
            if (!this.state.practicalRatings[item.id]) errors.push("rating:" + item.id);
          });
          if (!this.state.overallOutcome) errors.push("overallOutcome");
          if (!this.state.signatureDataUrl) errors.push("signature");
        }
      }

      const btn = document.getElementById("voc-submit-btn");
      const hint = document.getElementById("voc-submit-hint");
      if (!btn) return errors.length === 0;

      if (errors.length === 0) {
        btn.disabled = false;
        hint.textContent = "All checks complete — ready to submit.";
      } else {
        btn.disabled = true;
        hint.textContent = "Complete all required fields and answer every question correctly to unlock submission.";
      }
      return errors.length === 0;
    },

    // ---------- submit ----------
    _collectPayload() {
      const d = this.data;
      return {
        formId: d.meta && d.meta.formId,
        formTitle: d.title,
        formVersion: d.meta && d.meta.version,
        submittedAt: new Date().toISOString(),
        personal: this.state.personal,
        preAnswers: this.state.pre,
        questions: (d.questions || []).map((q) => ({
          id: q.id,
          question: q.question,
          answer: this.state.questions[q.id].selectedText,
          attempts: this.state.questions[q.id].attempts + 1
        })),
        practicalRequired: this.state.practicalGate,
        supervisorName: this.state.supervisorName,
        practicalItems: d.practical
          ? (d.practical.items || []).map((item) => ({
              id: item.id,
              title: item.title,
              rating: this.state.practicalRatings[item.id] || ""
            }))
          : [],
        overallOutcome: this.state.overallOutcome,
        signatureDate: this.state.signatureDate,
        signatureDataUrl: this.state.signatureDataUrl
      };
    },

    async _submit() {
      if (!this._checkValidity()) return;
      const btn = document.getElementById("voc-submit-btn");
      const errMsg = document.getElementById("voc-error-msg");
      btn.disabled = true;
      btn.textContent = "Submitting...";
      errMsg.classList.add("voc-hidden");

      const payload = this._collectPayload();
      const cfg = window.VOC_CONFIG || {};

      try {
        if (!cfg.submitUrl) throw new Error("NO_ENDPOINT");
        const res = await fetch(cfg.submitUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error("HTTP_" + res.status);
        this._showSuccess();
      } catch (err) {
        this._downloadFallback(payload);
        if (err.message === "NO_ENDPOINT") {
          errMsg.textContent =
            "Submission endpoint isn't configured yet, so your responses were downloaded as a file instead. Please send that file to your administrator.";
        } else {
          errMsg.textContent =
            "Couldn't reach the submission service. Your responses were downloaded as a file — please send it to your administrator, then try again later.";
        }
        errMsg.classList.remove("voc-hidden");
        btn.disabled = false;
        btn.textContent = "Submit VOC";
      }
    },

    _downloadFallback(payload) {
      const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const safeName = (payload.formId || "voc") + "_" + (payload.personal && Object.values(payload.personal)[0] ? String(Object.values(payload.personal)[0]).replace(/\s+/g, "-") : "response");
      a.download = safeName + ".json";
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    },

    _showSuccess() {
      this.root.innerHTML =
        '<div class="voc-container"><div class="voc-success"><div class="voc-success-icon">&#10003;</div>' +
        "<h2>VOC submitted</h2><p>Thank you — your Verification of Competency has been recorded.</p></div></div>";
    }
  };

  window.VOCEngine = VOCEngine;
})();
