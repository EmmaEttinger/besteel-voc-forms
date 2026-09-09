window.VOC_DATA = {
  title: "Verification of Competency - Use of Air Compressor and Pneumatic Tools",

  meta: {
    formId: "air-compressor-pneumatic-tools",
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
      question: "Why must all fittings be checked before using an air compressor?",
      options: [
        "To prevent electrical hazards",
        "To ensure proper oil levels",
        "To prevent leaks and hose detachment under pressure",
        "To increase air pressure efficiency"
      ],
      correctIndex: 2
    },
    {
      id: "q2",
      question: "What is a potential hazard of using compressed air improperly?",
      options: [
        "Reduced machine efficiency",
        "Air injection injuries (bubbles in bloodstream)",
        "Reduced air storage capacity",
        "Corrosion of metal components"
      ],
      correctIndex: 1
    },
    {
      id: "q3",
      question: "Which of the following is NOT an acceptable practice when using compressed air?",
      options: [
        "Securing hoses before use",
        "Wearing eye protection",
        "Using compressed air to clean dust off clothing",
        "Checking for air leaks"
      ],
      correctIndex: 2
    },
    {
      id: "q4",
      question: "What should you do before starting the air compressor?",
      options: [
        "Lock the wheels to prevent movement",
        "Adjust the pressure regulator to maximum",
        "Remove all PPE for comfort",
        "Test air pressure by spraying into open space"
      ],
      correctIndex: 0
    },
    {
      id: "q5",
      question: "What PPE is always required when operating an air compressor?",
      options: [
        "High-visibility vest",
        "Gloves and loose-fitting clothing",
        "Eye and hearing protection",
        "None, as long as the equipment is in good condition"
      ],
      correctIndex: 2
    },
    {
      id: "q6",
      question: "What should you do if you detect an air leak in the hose?",
      options: [
        "Increase air pressure to compensate",
        "Ignore it if it is small",
        "Continue using until the job is finished",
        "Immediately report and stop using the equipment"
      ],
      correctIndex: 3
    },
    {
      id: "q7",
      question: "When should the compressor's oil and filters be checked?",
      options: [
        "Every time before use",
        "Only if the machine stops working",
        "Once a year",
        "Only when there is visible contamination"
      ],
      correctIndex: 0
    },
    {
      id: "q8",
      question: "Why is wearing gloves discouraged when using pneumatic tools?",
      options: [
        "Gloves can get caught in moving parts",
        "Gloves reduce grip strength",
        "Gloves are not necessary for safety",
        "Gloves increase static electricity buildup"
      ],
      correctIndex: 0
    },
    {
      id: "q9",
      question: "What should be done immediately after finishing work with the compressor?",
      options: [
        "Leave it running for the next user",
        "Turn it off and leave the work area clean",
        "Disconnect the power supply without turning it off",
        "Release all stored air pressure"
      ],
      correctIndex: 1
    },
    {
      id: "q10",
      question: "Why should long hair and loose clothing be avoided when working with an air compressor?",
      options: [
        "To prevent contamination of the air supply",
        "To maintain a professional appearance",
        "To avoid entanglement in moving parts",
        "Because PPE rules require a uniform appearance"
      ],
      correctIndex: 2
    }
  ]
};
