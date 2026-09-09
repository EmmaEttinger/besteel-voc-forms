window.VOC_DATA = {
  title: "Verification of Competency - Brake Press",

  meta: {
    formId: "brake-press",
    version: "1.0"
  },

  personalFields: [
    { id: "preparedBy", label: "Prepared by", type: "text", required: true },
    { id: "conductedOn", label: "Conducted on", type: "datetime", required: true },
    { id: "siteConducted", label: "Site conducted", type: "text", required: true },
    { id: "location", label: "Location", type: "text", required: false },
    { id: "siteReference", label: "Please enter your Site as reference", type: "text", required: false }
  ],

  preQuestions: [
    {
      id: "sopRead",
      question:
        "STOP! Have you read the relevant Safety Operating Procedure? Please do that first if you haven't already.",
      options: ["Yes", "No", "N/A"],
      required: true
    }
  ],

  questions: [
    {
      id: "q1",
      question: "What is a potential hazard when using a brake press?",
      options: [
        "Electric shock",
        "Squash/crush and pinch points",
        "Exposure to toxic fumes",
        "Fire hazard"
      ],
      correctIndex: 1
    },
    {
      id: "q2",
      question: "Which PPE is required when operating a brake press?",
      options: [
        "High visibility clothing, safety shoes, and eye protection",
        "Loose-fitting clothing and gloves",
        "Respirator and welding mask",
        "Flip-flops and hearing protection"
      ],
      correctIndex: 0
    },
    {
      id: "q3",
      question: "What must be done before making adjustments to the brake press?",
      options: [
        "Increase the machine's speed to ensure smooth operation",
        "Apply lubricant while the machine is in motion",
        "Ensure the equipment is switched off",
        "Remove safety guards for easier access"
      ],
      correctIndex: 2
    },
    {
      id: "q4",
      question: "What should you NEVER do while operating the brake press?",
      options: [
        "Use gloves",
        "Ensure hands are clear before operation",
        "Lubricate moving parts",
        "Inspect the machine for faults"
      ],
      correctIndex: 0
    },
    {
      id: "q5",
      question: "When is it acceptable to remove or adjust machine guards or safety devices?",
      options: [
        "When they are obstructing your view",
        "Only for maintenance purposes by an authorized person",
        "To increase efficiency when working with thick metal",
        "When the machine is in operation"
      ],
      correctIndex: 1
    },
    {
      id: "q6",
      question: "What materials should NOT be bent using the brake press?",
      options: [
        "Mild steel sheets",
        "Spring steel sheets, rod, wire, or strap",
        "Aluminium sheets under 3mm thick",
        "Galvanized steel plates"
      ],
      correctIndex: 1
    },
    {
      id: "q7",
      question: "How should brake press fingers be handled?",
      options: [
        "Remove only the necessary fingers for the operation",
        "Remove all fingers to prevent obstructions",
        "Drop them into place quickly for efficiency",
        "Tighten them loosely to allow for movement"
      ],
      correctIndex: 0
    },
    {
      id: "q8",
      question: "What must be done when leaving a brake press unattended?",
      options: [
        "Ensure the machine is still running for the next operator",
        "Place a chock under the ram",
        "Leave the workpiece clamped in place",
        "Keep the foot pedal engaged"
      ],
      correctIndex: 1
    },
    {
      id: "q9",
      question: "Which action must be taken during a pre-operation check?",
      options: [
        "Ensure all machine guards and safety devices are in place",
        "Spray oil on moving parts while the machine is running",
        "Remove all counterweights before use",
        "Increase the machine's pressure to maximum"
      ],
      correctIndex: 0
    },
    {
      id: "q10",
      question: "What should be done after using the brake press?",
      options: [
        "Leave the machine in its last operating position",
        "Clean up the work area and return tools",
        "Store workpieces on the machine for the next use",
        "Keep finger clamps raised to speed up the next setup"
      ],
      correctIndex: 1
    }
  ]
};
