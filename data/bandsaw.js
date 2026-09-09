window.VOC_DATA = {
  title: "Verification of Competency - Bandsaw",

  meta: {
    formId: "bandsaw",
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
      question: "What is a major risk associated with operating a bandsaw?",
      options: [
        "Sunburn",
        "Electric shock during power-off conditions",
        "Dehydration from heat",
        "Hearing damage from prolonged noise exposure"
      ],
      correctIndex: 3
    },
    {
      id: "q2",
      question: "Which of the following PPE items is not suitable for bandsaw operation?",
      options: [
        "Hearing protection",
        "Loose scarf",
        "Steel-capped boots",
        "Close-fitting clothing"
      ],
      correctIndex: 1
    },
    {
      id: "q3",
      question: "What must be done before powering on the bandsaw?",
      options: [
        "Lubricate the blade during operation",
        "Confirm blade guards are properly adjusted",
        "Start cutting immediately to test functionality",
        "Ensure hands are on the material"
      ],
      correctIndex: 1
    },
    {
      id: "q4",
      question: "Which of the following should always be done before using the bandsaw?",
      options: [
        "Leave the machine running to warm up",
        "Conduct a pre-start inspection",
        "Remove safety guards for visibility",
        "Smoke in the workshop to stay alert"
      ],
      correctIndex: 1
    },
    {
      id: "q5",
      question: "What is the correct response if the bandsaw begins making unusual clicking sounds during operation?",
      options: [
        "Apply oil to the blade",
        "Monitor it for five more minutes",
        "Stop the saw completely",
        "Ignore the noise and continue cutting"
      ],
      correctIndex: 2
    },
    {
      id: "q6",
      question: "When is it safe to remove a cut workpiece from the bandsaw?",
      options: [
        "As soon as the cut finishes",
        "After turning off and locking the machine",
        "While the blade is retracting",
        "When the blade slows down"
      ],
      correctIndex: 1
    },
    {
      id: "q7",
      question: "Why must long workpieces be supported while clamping?",
      options: [
        "To reduce noise",
        "To keep the machine balanced",
        "To avoid marking the material",
        "To prevent tipping or shifting during the cut"
      ],
      correctIndex: 3
    },
    {
      id: "q8",
      question: "Which of the following is part of post-operation housekeeping?",
      options: [
        "Leaving the blade exposed",
        "Sweeping up offcuts and dust",
        "Resetting all guards to the open position",
        "Disposing of metal in general trash bins"
      ],
      correctIndex: 1
    },
    {
      id: "q9",
      question: "During pre-operation safety checks, what must be verified about the emergency stop?",
      options: [
        "It functions correctly when tested",
        "It is hidden for emergency use only",
        "It activates automatically after 5 minutes",
        "It is placed near the coolant tank"
      ],
      correctIndex: 0
    },
    {
      id: "q10",
      question: "What is a critical reason to avoid wearing rings or loose jewellery while using the bandsaw?",
      options: [
        "It interferes with vision",
        "It could get caught in moving parts",
        "It increases electrical conductivity",
        "It slows down production"
      ],
      correctIndex: 1
    }
  ]
};
