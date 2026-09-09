window.VOC_DATA = {
  title: "Safe Operating Procedure - Coil Change",

  meta: {
    formId: "coil-change",
    version: "1.0"
  },

  personalFields: [
    { id: "preparedBy", label: "Prepared by", type: "text", required: true },
    { id: "conductedOn", label: "Conducted on", type: "datetime", required: true },
    { id: "siteConducted", label: "Site conducted", type: "text", required: true },
    { id: "location", label: "Location", type: "text", required: false }
  ],

  questions: [
    {
      id: "q1",
      question: "What is the PRIMARY reason operators must stand to the side when cutting coil bands?",
      options: [
        "To improve visibility of the band being cut",
        "To avoid injury from potential coil spring-back",
        "To allow better communication with forklift operators",
        "To prevent damage to the decoiler"
      ],
      correctIndex: 1
    },
    {
      id: "q2",
      question: "Before removing a used coil, what must be done FIRST?",
      options: [
        "Expand the mandrel",
        "Switch the decoiler to automatic mode",
        "Stop the rollforming machine and press Emergency Stop",
        "Remove coil keepers"
      ],
      correctIndex: 2
    },
    {
      id: "q3",
      question: "Why are soft lifting slings prohibited when lifting coils?",
      options: [
        "They are too flexible for forklift use",
        "They cannot support the weight rating",
        "They may be cut by the sharp steel edges",
        "They stretch and cause coil imbalance"
      ],
      correctIndex: 2
    },
    {
      id: "q4",
      question: "What is the correct control action to EXPAND the mandrel when loading a new coil?",
      options: [
        "Manual control button position 2",
        "Emergency Stop reset",
        "Manual control button position 1",
        "Automatic feed mode"
      ],
      correctIndex: 2
    },
    {
      id: "q5",
      question: "A worker notices a lifting chain has no current test & tag identification. What should they do?",
      options: [
        "Use it if it looks undamaged",
        "Tag it themselves and continue",
        "Remove it from service and report it",
        "Use it only for lighter coils"
      ],
      correctIndex: 2
    },
    {
      id: "q6",
      question: "During coil removal, when is it safe to cut the coil bands?",
      options: [
        "Immediately after loosening the mandrel",
        "Once the coil is secure on the mandrel and controlled",
        "Before applying lifting chains",
        "While standing in front of the coil for better control"
      ],
      correctIndex: 1
    },
    {
      id: "q7",
      question: "Why must at least TWO operators guide the strip into the material guide and infeed rollers?",
      options: [
        "To speed up the loading process",
        "To reduce wear on the rollers",
        "To maintain control and prevent injury from strip movement",
        "To meet manufacturer warranty requirements"
      ],
      correctIndex: 2
    },
    {
      id: "q8",
      question: "Which situation requires immediate STOP and reassessment before proceeding?",
      options: [
        "The coil is slightly off-centre but expands fully",
        "The area around the decoiler is clear",
        "A person walks within the path of a suspended load",
        "The forklift operator is licensed"
      ],
      correctIndex: 2
    },
    {
      id: "q9",
      question: "After loading and securing a new coil, which step ensures safe and correct feeding?",
      options: [
        "Restart the rollformer at full speed",
        "Check strip alignment and confirm no twists",
        "Remove all guards for better observation",
        "Leave lifting chains nearby for quick adjustment"
      ],
      correctIndex: 1
    },
    {
      id: "q10",
      question: "What is the MOST critical reason only licensed operators may use the forklift during coil change?",
      options: [
        "Company administrative policy",
        "To prevent damage to coil racks",
        "To ensure competent operation of lifting equipment and control of suspended loads",
        "To reduce fuel consumption"
      ],
      correctIndex: 2
    }
  ]
};
