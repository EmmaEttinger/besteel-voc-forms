window.VOC_DATA = {
  title: "Verification of Competency - Storage & Handling of Steel in Warehouse Racking",

  meta: {
    formId: "steel-warehouse-racking",
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
      question: "What is a potential hazard when handling steel in racking systems?",
      options: [
        "Exposure to electrical currents",
        "Getting caught in automated doors",
        "Falling steel sections during stacking or retrieval",
        "Dust inhalation from grinding"
      ],
      correctIndex: 2
    },
    {
      id: "q2",
      question: "Which PPE item is required when working near steel handling but not necessarily for all other tasks?",
      options: [
        "Respirator",
        "Eye protection",
        "Welding jacket",
        "Safety harness"
      ],
      correctIndex: 1
    },
    {
      id: "q3",
      question: "What is the correct action before storing steel in warehouse racking?",
      options: [
        "Ensure racking load limits are marked and not exceeded",
        "Stand on the rack to reach higher levels",
        "Store materials directly in walkways for easy access",
        "Push bundles into place using manual force"
      ],
      correctIndex: 0
    },
    {
      id: "q4",
      question: "Which behavior is NEVER acceptable in the warehouse?",
      options: [
        "Using spotters when moving loads",
        "Standing beneath suspended steel bundles",
        "Wearing high-visibility clothing",
        "Reporting damaged racking"
      ],
      correctIndex: 1
    },
    {
      id: "q5",
      question: "How should steel be stacked to maintain stability?",
      options: [
        "Mix different shapes and sizes together",
        "Heavier items on top for easy access",
        "Stack heavier and larger items on lower levels",
        "Stack all items regardless of weight or shape"
      ],
      correctIndex: 2
    },
    {
      id: "q6",
      question: "What must be done during pre-operation safety checks?",
      options: [
        "Begin unloading before any checks",
        "Ignore PPE if working alone",
        "Inspect racks and confirm PPE is worn",
        "Leave signage and barricades for someone else"
      ],
      correctIndex: 2
    },
    {
      id: "q7",
      question: "Which action ensures walkways remain hazard-free after operation?",
      options: [
        "Store extra steel temporarily in aisles",
        "Return lifting gear to storage and remove signage",
        "Leave forklifts parked in loading zones",
        "Wait until the next shift to clean up"
      ],
      correctIndex: 1
    },
    {
      id: "q8",
      question: "Why is it important to use correct lifting equipment such as cranes or forklifts?",
      options: [
        "To avoid using manual force beyond safe limits",
        "To increase physical fitness",
        "Because manual lifting is always faster",
        "Because spotters aren't necessary with machines"
      ],
      correctIndex: 0
    },
    {
      id: "q9",
      question: "Which of the following is a required housekeeping task post-operation?",
      options: [
        "Restacking unstable loads",
        "Tagging and reporting rack damage or near-miss events",
        "Reusing temporary barricades without inspection",
        "Turning off the warehouse lights"
      ],
      correctIndex: 1
    },
    {
      id: "q10",
      question: "When visibility is restricted while moving steel, what must be done?",
      options: [
        "Move faster to finish sooner",
        "Proceed without stopping",
        "Use spotters to assist with movement",
        "Shout to warn others"
      ],
      correctIndex: 2
    }
  ]
};
