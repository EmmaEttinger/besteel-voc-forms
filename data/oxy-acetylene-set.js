window.VOC_DATA = {
  title: "Verification of Competency - Operation of Oxy Acetylene Set",

  meta: {
    formId: "oxy-acetylene-set",
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
      question: "What is a key potential hazard when operating an oxy acetylene set?",
      options: [
        "Exposure to radiation",
        "Eye strain from bright lights",
        "Fire and explosion risks",
        "Static electricity"
      ],
      correctIndex: 2
    },
    {
      id: "q2",
      question: "Which item is mandatory PPE when welding with an oxy acetylene set?",
      options: [
        "Disposable apron",
        "Gas welding goggles or welding mask",
        "Rubber gloves",
        "Face shield only"
      ],
      correctIndex: 1
    },
    {
      id: "q3",
      question: "What should you ALWAYS do before using an oxy acetylene set?",
      options: [
        "Shake cylinders to mix gases",
        "Perform a pre-start inspection of all equipment",
        "Check if the nozzle has carbon deposits",
        "Submerge hoses in water to test for leaks"
      ],
      correctIndex: 1
    },
    {
      id: "q4",
      question: "What must be used to ignite the torch safely?",
      options: [
        "Standard cigarette lighter",
        "Matchstick",
        "Spark plug tool",
        "Flint lighter"
      ],
      correctIndex: 3
    },
    {
      id: "q5",
      question: "After completing a task with the oxy acetylene set, what is the required post-operation action?",
      options: [
        "Check equipment pressure and increase if needed",
        "Leave the hoses connected for next use",
        "Turn off gas cylinders and bleed hoses",
        "Spray the area with water"
      ],
      correctIndex: 2
    },
    {
      id: "q6",
      question: "When must a fire watch be conducted after using the oxy acetylene set?",
      options: [
        "Only if a fire incident occurred",
        "Never required unless directed",
        "Immediately for a minimum of 5 minutes",
        "For 20 minutes post-operation"
      ],
      correctIndex: 3
    },
    {
      id: "q7",
      question: "Which of the following is NOT an acceptable practice?",
      options: [
        "Following SDS guidelines",
        "Using flashback arrestors",
        "Using damaged hoses",
        "Wearing safety glasses"
      ],
      correctIndex: 2
    },
    {
      id: "q8",
      question: "If you discover a gas leak during operation, what should you do first?",
      options: [
        "Try to seal the leak using a cloth",
        "Turn up the gas pressure",
        "Report and isolate the leak immediately",
        "Continue working and report later"
      ],
      correctIndex: 2
    },
    {
      id: "q9",
      question: "Why is ventilation critical when using oxy acetylene equipment?",
      options: [
        "To reduce sound levels",
        "To maintain PPE integrity",
        "To disperse flammable fumes and gases",
        "To keep the equipment cool"
      ],
      correctIndex: 2
    },
    {
      id: "q10",
      question: "What is the purpose of securing gas cylinders in a cage or trolley?",
      options: [
        "For easy transport to another job",
        "To reduce cylinder pressure",
        "To prevent tipping and improve safety",
        "To align the regulator gauge"
      ],
      correctIndex: 2
    }
  ]
};
