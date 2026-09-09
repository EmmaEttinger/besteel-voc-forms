window.VOC_DATA = {
  title: "Verification of Competency - Arc Welding",

  meta: {
    formId: "arc-welding",
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
      question: "Which of the following is a potential hazard of arc welding?",
      options: [
        "Electric shocks",
        "Radiation burns to eyes and skin",
        "Fire",
        "All of the above"
      ],
      correctIndex: 3
    },
    {
      id: "q2",
      question: "What is the minimum safe distance from flammable materials during welding?",
      options: ["1 meter", "2 meters", "3 meters", "5 meters"],
      correctIndex: 2
    },
    {
      id: "q3",
      question: "Which of the following is NOT part of the required PPE for welding?",
      options: [
        "Welding mask",
        "Hearing protection",
        "Jewellery",
        "Respiratory protection (if required)"
      ],
      correctIndex: 2
    },
    {
      id: "q4",
      question: "What should you do before beginning a welding task in an enclosed space?",
      options: [
        "Alert a supervisor",
        "Place welding screens to protect others",
        "Clean the workspace",
        "Perform all of the above"
      ],
      correctIndex: 1
    },
    {
      id: "q5",
      question: "When should you check for tripping hazards, oil, grease, or flammables in the welding area?",
      options: [
        "During the operation phase",
        "After completing the welding task",
        "Before beginning the welding task",
        "Only if someone else is working nearby"
      ],
      correctIndex: 2
    },
    {
      id: "q6",
      question: "What must you ensure before turning on the welding machine?",
      options: [
        "The electrode holder contains the electrode",
        "All power tools are turned off",
        "The electrode holder has no electrode in it",
        "The area is shielded by welding screens"
      ],
      correctIndex: 2
    },
    {
      id: "q7",
      question: "What should you NEVER do when welding?",
      options: [
        "Use bare hands",
        "Use faulty equipment",
        "Expose the welding tool to rain or water",
        "All of the above"
      ],
      correctIndex: 3
    },
    {
      id: "q8",
      question: "What is the first step after completing a welding task?",
      options: [
        "Clean the electrode holder",
        "Switch off the welding machine",
        "Remove safety signage",
        "Inform a supervisor"
      ],
      correctIndex: 1
    },
    {
      id: "q9",
      question: "What should you do with the electrode holder and welding cables after finishing?",
      options: [
        "Hang them up properly",
        "Leave them in the workspace",
        "Inspect them for damage",
        "Store them in a toolbox"
      ],
      correctIndex: 0
    },
    {
      id: "q10",
      question: "Who is allowed to use welding equipment?",
      options: [
        "Anyone with basic knowledge of welding",
        "Only experienced operators",
        "Supervisors only",
        "Any worker in an emergency situation"
      ],
      correctIndex: 1
    }
  ],

  practical: {
    gateQuestion: {
      question: "Do you need to complete a Practical VOC?",
      options: ["Yes", "No", "N/A"]
    },
    supervisorNameLabel: "Supervisor's Name",
    items: [
      { id: "p1", title: "Can the operator correctly set up the welder (connect earth clamp, plug in safely, lay out leads, check cables are undamaged and dry)?" },
      { id: "p2", title: "Can the operator select and install the correct mig wire or electrode for the job and secure it properly in the holder?" },
      { id: "p3", title: "Can they correctly set the welding current/amperage according to electrode size and material?" },
      { id: "p4", title: "Can they safely strike the arc without excessive spatter or repeated sticking?" },
      { id: "p5", title: "Can they maintain a stable arc length and correct travel speed while welding?" },
      { id: "p6", title: "Can they adjust machine settings if required (e.g., amperage) to correct weld quality issues?" },
      { id: "p7", title: "Can they position themselves and the workpiece safely to avoid electric shock, burns, and cable hazards?" },
      { id: "p8", title: "Can they manage fume and ventilation requirements (e.g., weld in ventilated area, use screens where needed)?" },
      { id: "p9", title: "Can they monitor the machine during welding (overheating, abnormal noises, unstable current) and stop if unsafe?" },
      { id: "p10", title: "Can they correctly shut down and pack up the welder, including switching it off, removing electrode, and storing leads safely?" }
    ]
  }
};
