window.VOC_DATA = {
  title: "Verification of Competency - Blower",

  meta: {
    formId: "blower",
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
      question: "Which of the following is NOT listed as a potential hazard when operating a blower?",
      options: [
        "Exposure to dust",
        "Slips, trips, and falls",
        "Eye strain from prolonged use",
        "Muffler burns"
      ],
      correctIndex: 2
    },
    {
      id: "q2",
      question: "What must you do before using a blower?",
      options: [
        "Ensure you have been trained in its safe use",
        "Modify the machine to improve performance",
        "Start the engine inside to check for fumes",
        "Hold the unit by the blow pipe for stability"
      ],
      correctIndex: 0
    },
    {
      id: "q3",
      question: "Which of the following is an essential PPE requirement for operating a blower?",
      options: [
        "Flip-flops and a dust mask",
        "Hearing protection and appropriate footwear",
        "Loose clothing for comfort",
        "Sunglasses and gloves"
      ],
      correctIndex: 1
    },
    {
      id: "q4",
      question: "Which action should you NEVER take when operating a blower?",
      options: [
        "Secure loose clothing and tie back long hair",
        "Check the engine before setting the unit down",
        "Use the blower if it is faulty or does not operate correctly",
        "Maintain the unit according to the recommended schedule"
      ],
      correctIndex: 2
    },
    {
      id: "q5",
      question: "What should you do before setting the blower down?",
      options: [
        "Keep it running to save time for the next task",
        "Ensure the engine has stopped completely",
        "Disconnect the power cord immediately",
        "Adjust the air intake for maximum efficiency"
      ],
      correctIndex: 1
    },
    {
      id: "q6",
      question: "When should you take regular rest breaks while using a blower?",
      options: [
        "Only when feeling physically exhausted",
        "Only when using a petrol blower",
        "At planned intervals to prevent fatigue and strain",
        "Never, as it disrupts workflow"
      ],
      correctIndex: 2
    },
    {
      id: "q7",
      question: "Why should you never start or run the blower engine inside a closed room?",
      options: [
        "It might damage the machine",
        "Exhaust fumes can be lethal",
        "The noise might be too loud",
        "There is no risk associated with indoor use"
      ],
      correctIndex: 1
    },
    {
      id: "q8",
      question: "If using an electric blower, what pre-use inspection should be conducted?",
      options: [
        "Check for dust buildup inside the motor",
        "Inspect the cord for damage and replace if necessary",
        "Ensure it is fully submerged in water before use",
        "Remove all safety guards for better performance"
      ],
      correctIndex: 1
    },
    {
      id: "q9",
      question: "What is the correct way to start a petrol-driven blower?",
      options: [
        "Hold the machine with both hands and pull the starter rope",
        "Kickstart it while holding the blow pipe",
        "Shake the machine first, then press the start button",
        "Pull the starter rope with one hand while balancing on one foot"
      ],
      correctIndex: 0
    },
    {
      id: "q10",
      question: "What should you do after operating the blower?",
      options: [
        "Store it securely to prevent accidental damage",
        "Leave it running for a few minutes before turning it off",
        "Ignore maintenance unless it stops working",
        "Refill the fuel tank immediately, even if the engine is still hot"
      ],
      correctIndex: 0
    }
  ]
};
