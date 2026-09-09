window.VOC_DATA = {
  title: "Verification of Competency - Drill Press",

  meta: {
    formId: "drill-press",
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
      question: "Which of the following is NOT listed as a potential hazard when using a drill press?",
      options: [
        "Eye injuries",
        "Fire hazards",
        "Hair/clothing entanglement",
        "Flying swarf and chips"
      ],
      correctIndex: 1
    },
    {
      id: "q2",
      question: "Why is it important to secure loose clothing and long hair before using a drill press?",
      options: [
        "To maintain a professional appearance",
        "To prevent interference with the drill bit",
        "To avoid entanglement, which could lead to serious injury",
        "To ensure maximum comfort while working"
      ],
      correctIndex: 2
    },
    {
      id: "q3",
      question: "What should you do BEFORE turning on the drill press?",
      options: [
        "Remove the chuck key from the drill chuck",
        "Adjust the spindle speed to suit the drill bit",
        "Secure the workpiece properly",
        "All of the above"
      ],
      correctIndex: 3
    },
    {
      id: "q4",
      question: "What is the main reason for ensuring the drill press is firmly secured in place?",
      options: [
        "To improve accuracy when drilling",
        "To reduce vibration and noise",
        "To prevent the machine from moving, which could cause loss of control and injury",
        "To ensure the drill press stays level"
      ],
      correctIndex: 2
    },
    {
      id: "q5",
      question: "Which of the following actions is strictly prohibited when operating a drill press?",
      options: [
        "Leaving the machine running unattended",
        "Feeding downwards at a controlled rate",
        "Adjusting spindle speed before starting the machine",
        "Using clamps to secure the workpiece"
      ],
      correctIndex: 0
    },
    {
      id: "q6",
      question: "When should you remove swarf (metal shavings) from the drill press?",
      options: [
        "Continuously while the drill is running",
        "Only after switching off the machine and it has come to a complete stop",
        "When there is a large pile accumulating near the drill bit",
        "After turning off the machine but before it has fully stopped"
      ],
      correctIndex: 1
    },
    {
      id: "q7",
      question: "What is the correct way to feed the drill into the material?",
      options: [
        "Slowly, with constant pressure, adjusting as needed",
        "Rapidly, to complete the job as quickly as possible",
        "Without applying any force, allowing the drill's weight to do the work",
        "By alternating between applying force and stopping to prevent overheating"
      ],
      correctIndex: 0
    },
    {
      id: "q8",
      question: "What should be done if the job obstructs a walkway?",
      options: [
        "Move the job to a different location",
        "Erect a barricade to warn others and maintain safety",
        "Continue working and warn people verbally",
        "Place a temporary sign and hope no one walks through"
      ],
      correctIndex: 1
    },
    {
      id: "q9",
      question: "Why is it important to use a safe working posture while operating a drill press?",
      options: [
        "To prevent back strain and fatigue from awkward positions",
        "To avoid interference with the drill's movement",
        "To maximize control over the drill",
        "All of the above"
      ],
      correctIndex: 3
    },
    {
      id: "q10",
      question: "What is the final step after finishing work with the drill press?",
      options: [
        "Leave the machine running for the next user",
        "Turn off the machine and leave it in a safe, clean, and tidy state",
        "Quickly move on to the next task without any cleanup",
        "Remove the drill bit and store it separately"
      ],
      correctIndex: 1
    }
  ]
};
