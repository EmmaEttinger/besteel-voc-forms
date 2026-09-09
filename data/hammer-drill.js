window.VOC_DATA = {
  title: "Verification of Competency - Hammer Drill",

  meta: {
    formId: "hammer-drill",
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
      question: "What is a key hazard associated with using a hammer drill?",
      options: [
        "Electrical shock from touching the drill bit",
        "Vibration, which can cause fatigue and loss of control",
        "Excessive heat from the power cord",
        "Exposure to gas leaks"
      ],
      correctIndex: 1
    },
    {
      id: "q2",
      question: "What PPE is required when using a hammer drill?",
      options: [
        "Safety glasses, hearing protection, and steel-toed boots",
        "Hard hat, high-visibility vest, and welding gloves",
        "Respirator, knee pads, and rubber gloves",
        "Only eye protection"
      ],
      correctIndex: 0
    },
    {
      id: "q3",
      question: "Which of the following is NOT an appropriate safety measure when using a hammer drill?",
      options: [
        "Using two hands to maintain a firm grip",
        "Applying slight pressure for effective drilling",
        "Wearing gloves for extra hand protection",
        "Ensuring a firm footing before operation"
      ],
      correctIndex: 2
    },
    {
      id: "q4",
      question: "When should the hammer drill be turned off and unplugged?",
      options: [
        "Only when changing the drill bit",
        "Before cleaning, maintenance, or storage",
        "When moving it from one drilling point to another",
        "Only when the power cord is in the way"
      ],
      correctIndex: 1
    },
    {
      id: "q5",
      question: "Why should you avoid applying excessive force while using a hammer drill?",
      options: [
        "It can cause the motor to overheat",
        "It does not increase efficiency and may reduce control",
        "It will wear down the drill bit faster",
        "It increases vibration, making drilling easier"
      ],
      correctIndex: 1
    },
    {
      id: "q6",
      question: "What should you do if the drill starts bouncing uncontrollably?",
      options: [
        "Reduce pressure and continue using it",
        "Stop operation immediately",
        "Press harder to stabilize it",
        "Switch to a smaller drill bit"
      ],
      correctIndex: 1
    },
    {
      id: "q7",
      question: "What must be done before starting to use a hammer drill?",
      options: [
        "Check the power tool for defects and secure all components",
        "Ensure the drill bit is already spinning before contacting the surface",
        "Plug it in and test run it at full speed",
        "Increase torque settings to maximum"
      ],
      correctIndex: 0
    },
    {
      id: "q8",
      question: "Why should you avoid touching the drill bit immediately after use?",
      options: [
        "It may be contaminated with dust",
        "It could break due to stress",
        "It becomes extremely hot and can cause burns",
        "It may still be rotating"
      ],
      correctIndex: 2
    },
    {
      id: "q9",
      question: "What is the correct response if you identify a defect in the hammer drill?",
      options: [
        "Continue using it if the defect seems minor",
        "Report it to a supervisor immediately",
        "Attempt to repair it yourself",
        "Wrap tape around the damaged area and proceed"
      ],
      correctIndex: 1
    },
    {
      id: "q10",
      question: "Which of the following is a post-operation safety measure?",
      options: [
        "Leaving the drill in a safe place unplugged",
        "Cleaning the drill and inspecting for damage",
        "Storing it immediately after use without cleaning",
        "Placing it near an open power outlet for easy access"
      ],
      correctIndex: 1
    }
  ]
};
