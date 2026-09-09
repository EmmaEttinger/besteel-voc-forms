window.VOC_DATA = {
  title: "Verification of Competency - Overhead Crane",

  meta: {
    formId: "overhead-crane",
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
      question: "What is a potential hazard when operating an overhead crane?",
      options: [
        "Exposure to loud music",
        "Tripping over cables",
        "Falling loads or dropped objects",
        "Welding arc flash"
      ],
      correctIndex: 2
    },
    {
      id: "q2",
      question: "Which PPE is always required when operating or assisting with overhead crane tasks?",
      options: [
        "Respirator and welding gloves",
        "High-visibility vest only",
        "Hard hat and steel-capped boots",
        "Apron and welding mask"
      ],
      correctIndex: 2
    },
    {
      id: "q3",
      question: "Before each lift, what inspection is required during pre-operation checks?",
      options: [
        "Visual inspection of the floor surface",
        "Check for loose paint or stickers on crane",
        "Crane, lifting gear, and safety switches/interlocks",
        "Supervisor approval only"
      ],
      correctIndex: 2
    },
    {
      id: "q4",
      question: "What should you NEVER do while using the overhead crane?",
      options: [
        "Ensure the load is stable before lifting",
        "Use damaged or untagged lifting gear",
        "Test the emergency stop system",
        "Maintain a clean work area"
      ],
      correctIndex: 1
    },
    {
      id: "q5",
      question: "What action is required if someone needs to guide the load but visibility is poor?",
      options: [
        "Guess the position based on the last known location",
        "Signal with your back turned to the crane operator",
        "Request assistance to ensure safe guidance",
        "Swing the load to increase visibility"
      ],
      correctIndex: 2
    },
    {
      id: "q6",
      question: "What should be done immediately after completing a lifting task?",
      options: [
        "Leave the crane controls engaged",
        "Move the crane into standby mode",
        "Set crane controls to neutral and isolate power",
        "Store the load on the crane hook"
      ],
      correctIndex: 2
    },
    {
      id: "q7",
      question: "When is it acceptable to leave a load suspended in the air?",
      options: [
        "While you quickly complete paperwork",
        "When the load is light and balanced",
        "If no one is standing nearby",
        "Never – the load must never be left suspended"
      ],
      correctIndex: 3
    },
    {
      id: "q8",
      question: "Why must signage and barriers be placed before lifting operations?",
      options: [
        "To comply with environmental rules",
        "To improve operator visibility",
        "To warn and prevent entry into exclusion zones",
        "To reduce noise levels"
      ],
      correctIndex: 2
    },
    {
      id: "q9",
      question: "Which task is part of post-operation housekeeping for the crane?",
      options: [
        "Adjust load ratings for future lifts",
        "Return lifting gear to designated storage",
        "Perform daily inspection again",
        "Increase crane swing speed"
      ],
      correctIndex: 1
    },
    {
      id: "q10",
      question: "What is the correct response if a crane or lifting gear fault is identified?",
      options: [
        "Record it in your personal log only",
        "Continue use until the next shift",
        "Tag and isolate the faulty equipment",
        "Adjust the load to compensate"
      ],
      correctIndex: 2
    }
  ]
};
