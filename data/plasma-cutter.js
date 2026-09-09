window.VOC_DATA = {
  title: "Verification of Competency - Operation of Plasma Cutter",

  meta: {
    formId: "plasma-cutter",
    version: "1.0"
  },

  personalFields: [
    { id: "preparedBy", label: "Prepared by", type: "text", required: true },
    { id: "conductedOn", label: "Conducted on", type: "datetime", required: true },
    { id: "siteConducted", label: "Site conducted", type: "text", required: true },
    { id: "location", label: "Location", type: "text", required: false },
    { id: "siteReference", label: "Please enter your Site as reference", type: "text", required: false }
  ],

  questions: [
    {
      id: "q1",
      question: "Why is it critical to verify that return (earth) cables make firm contact before beginning plasma cutting?",
      options: [
        "To ensure the arc is bright enough to cut",
        "To prevent overheating of the torch",
        "To maintain a safe and stable electrical circuit",
        "To reduce wear on the fume extraction unit"
      ],
      correctIndex: 2
    },
    {
      id: "q2",
      question: "During pre-operation checks, a worker finds the fume extraction unit operational but weak in suction. What should they do?",
      options: [
        "Continue work and wear a respirator instead",
        "Increase gas flow to clear fumes",
        "Clean the filters or report the issue before proceeding",
        "Remove the extraction hood to allow better airflow"
      ],
      correctIndex: 2
    },
    {
      id: "q3",
      question: "A colleague suggests using compressed air to clean debris from the plasma cutting table. What is the safest response?",
      options: [
        "Agree, as it helps clear flammable dust quickly",
        "Decline, and recommend a vacuum or broom instead",
        "Suggest doing it only when the plasma cutter is off",
        "Approve it if proper PPE is worn"
      ],
      correctIndex: 1
    },
    {
      id: "q4",
      question: "Which scenario best illustrates a failure to follow Lock Out procedures?",
      options: [
        "An operator shuts down the plasma cutter but leaves the gas bottles connected",
        "A worker leaves the area after switching off the torch only",
        "Maintenance is performed while the isolating switch remains on",
        "The machine is powered down but not cleaned afterward"
      ],
      correctIndex: 2
    },
    {
      id: "q5",
      question: "A worker experiences eye irritation after a cutting session. What is the most likely root cause?",
      options: [
        "Gas bottle leakage",
        "Poor ventilation or failure of extraction unit",
        "Excessive arc brightness from nearby equipment",
        "Hot debris contacting the skin"
      ],
      correctIndex: 1
    },
    {
      id: "q6",
      question: "Why is it dangerous to operate a plasma cutter with residual coatings or surface finishes on the workpiece?",
      options: [
        "They reflect UV light, increasing flash risk",
        "They can melt and clog the torch tip",
        "They may prevent proper grounding and cause arcing hazards",
        "They lower the efficiency of gas flow"
      ],
      correctIndex: 2
    },
    {
      id: "q7",
      question: "When is it acceptable to touch the workpiece or torch during a cutting operation?",
      options: [
        "When wearing full PPE",
        "Only if the torch is on standby mode",
        "Never, as both may be electrically live and extremely hot",
        "After verifying no sparks are visible"
      ],
      correctIndex: 2
    },
    {
      id: "q8",
      question: "If a fire starts due to flammable materials near the cutting area, what initial mistake likely contributed?",
      options: [
        "Failing to inspect the torch before use",
        "Not checking SDS sheets for material hazards",
        "Inadequate PPE usage",
        "Poor housekeeping and cluttered work area"
      ],
      correctIndex: 3
    },
    {
      id: "q9",
      question: "What is the primary purpose of using screens or curtains around a plasma cutting area?",
      options: [
        "To prevent gas leaks",
        "To enhance fume extraction",
        "To shield others from harmful UV radiation",
        "To reduce sound levels"
      ],
      correctIndex: 2
    },
    {
      id: "q10",
      question: "After shutting down the plasma cutter, why must gas bottles be stored upright and secured?",
      options: [
        "To prevent contamination of gas lines",
        "To maintain accurate pressure readings",
        "To prevent leaks and explosion hazards due to falling or damage",
        "To keep them readily accessible for future use"
      ],
      correctIndex: 2
    }
  ]
};
