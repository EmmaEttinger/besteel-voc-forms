window.VOC_DATA = {
  title: "Verification of Competency - Guillotine",

  meta: {
    formId: "guillotine",
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
      question: "What is a potential hazard when operating a guillotine?",
      options: [
        "Ultraviolet light exposure",
        "Slipping on oil",
        "Noise-induced hearing loss",
        "Falling from height"
      ],
      correctIndex: 2
    },
    {
      id: "q2",
      question: "Which of the following PPE is NOT required when operating the guillotine?",
      options: [
        "Steel-capped boots",
        "Hearing protection",
        "Safety glasses",
        "Welding gloves"
      ],
      correctIndex: 3
    },
    {
      id: "q3",
      question: "What clothing guideline must be followed when operating the guillotine?",
      options: [
        "Loose, long-sleeved shirts are preferred",
        "Only gloves and aprons are required",
        "Close fitting clothing with no long sleeves",
        "Heavy-duty coats must be worn"
      ],
      correctIndex: 2
    },
    {
      id: "q4",
      question: "Before using the guillotine, what MUST be confirmed during pre-operation checks?",
      options: [
        "Blade sharpness is optimal",
        "The power switch is left on",
        "Operator has been trained and is competent",
        "Material has been pre-cut to size"
      ],
      correctIndex: 2
    },
    {
      id: "q5",
      question: "What should you NEVER do while operating the guillotine?",
      options: [
        "Use lifting aids for heavy items",
        "Leave the guillotine on unattended",
        "Maintain a clean workspace",
        "Wear hearing protection"
      ],
      correctIndex: 1
    },
    {
      id: "q6",
      question: "When should safety glasses be worn around a guillotine?",
      options: [
        "Only when cutting thick materials",
        "When servicing the blade",
        "At all times when operating or nearby",
        "Only during pre-operation checks"
      ],
      correctIndex: 2
    },
    {
      id: "q7",
      question: "What is the correct action if an issue occurs during guillotine operation?",
      options: [
        "Inform the supervisor after finishing the job",
        "Adjust the guards to compensate",
        "Stop the machine immediately",
        "Continue using manual handling to bypass"
      ],
      correctIndex: 2
    },
    {
      id: "q8",
      question: "What is a key safety step when loading material into the guillotine?",
      options: [
        "Wear gloves to avoid cuts",
        "Hold material loosely to allow adjustment",
        "Keep hands clear of the blade",
        "Increase speed of feed for efficiency"
      ],
      correctIndex: 2
    },
    {
      id: "q9",
      question: "Which task is part of post-operation housekeeping?",
      options: [
        "Remove safety guards for cleaning",
        "Sweep floor and dispose of off-cuts properly",
        "Leave machine in standby mode",
        "Store material on the guillotine table"
      ],
      correctIndex: 1
    },
    {
      id: "q10",
      question: "What is the correct method to power down the guillotine?",
      options: [
        "Turn off main power at circuit box",
        "Switch off using control panel and confirm power is off",
        "Leave the foot pedal disengaged",
        "Pull the plug without switching off"
      ],
      correctIndex: 1
    }
  ]
};
