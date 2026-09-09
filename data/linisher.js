window.VOC_DATA = {
  title: "Verification of Competency - Linisher",

  meta: {
    formId: "linisher",
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
      question: "What is the primary hazard associated with operating a linisher?",
      options: [
        "Eye strain",
        "Risk of entanglement, abrasions, and burns",
        "Exposure to radiation",
        "Slipping on the floor"
      ],
      correctIndex: 1
    },
    {
      id: "q2",
      question: "Which of the following is NOT a required PPE item when using a linisher?",
      options: [
        "Hearing protection",
        "Loose-fitting gloves",
        "Eye protection",
        "Close-fitting protective clothing"
      ],
      correctIndex: 1
    },
    {
      id: "q3",
      question: "Before using the linisher, what must be checked on the belt or disc?",
      options: [
        "The colour and texture",
        "The brand and model number",
        "Any damage and correct tension",
        "Whether it is made of metal"
      ],
      correctIndex: 2
    },
    {
      id: "q4",
      question: "When is it safe to change the linisher's belt or disc?",
      options: [
        "After turning off the machine and ensuring it has stopped running",
        "While the machine is still slowing down",
        "Before turning off the extraction system",
        "While the belt is moving at low speed"
      ],
      correctIndex: 0
    },
    {
      id: "q5",
      question: "Why must the dust extraction system be connected and operating?",
      options: [
        "To reduce airborne dust and prevent respiratory irritation",
        "To increase the machine's power output",
        "To cool down the linisher's motor",
        "To help align the belt properly"
      ],
      correctIndex: 0
    },
    {
      id: "q6",
      question: "Which action is considered unsafe while operating the linisher?",
      options: [
        "Holding the work securely on the table",
        "Allowing the machine to reach maximum revolutions before use",
        "Keeping hands away from the rotating belt or disc",
        "Applying excessive pressure to the workpiece"
      ],
      correctIndex: 3
    },
    {
      id: "q7",
      question: "What should the operator do immediately after using the linisher?",
      options: [
        "Leave the machine running for the next operator",
        "Report any faults or hazards to the supervisor",
        "Adjust the guards while the machine is still running",
        "Remove all PPE before cleaning the work area"
      ],
      correctIndex: 1
    },
    {
      id: "q8",
      question: "Which of the following is TRUE about the operator's position during use?",
      options: [
        "The operator should stand directly in line with the belt or disc",
        "The operator's body must be out of the line of the belt or disc",
        "The operator should lean in closely for better accuracy",
        "The operator should operate the machine from behind"
      ],
      correctIndex: 1
    },
    {
      id: "q9",
      question: "When performing maintenance on the linisher, what must be done first?",
      options: [
        "Remove all guards",
        "Disconnect power",
        "Increase belt tension",
        "Clean the machine thoroughly"
      ],
      correctIndex: 1
    },
    {
      id: "q10",
      question: "Why should an operator avoid wearing jewelry or loose clothing while using the linisher?",
      options: [
        "To prevent entanglement in the moving parts",
        "To comply with workplace dress codes",
        "To avoid electrical exposure",
        "To enhance comfort during operation"
      ],
      correctIndex: 0
    }
  ]
};
