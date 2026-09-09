window.VOC_DATA = {
  title: "Verification of Competency - Operation of a Truck with Hi-Ab",

  meta: {
    formId: "truck-hi-ab",
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
      question: "You are preparing to operate the Hi-Ab crane, but the exclusion zone markers are missing. What is your best course of action?",
      options: [
        "Continue work while being extra cautious",
        "Ask a colleague to stand guard during operations",
        "Delay operation and establish exclusion zones before proceeding",
        "Only operate if the load is under 100kg"
      ],
      correctIndex: 2
    },
    {
      id: "q2",
      question: "A new operator begins lifting without conducting a pre-start check or reading the SWMS. What should you do?",
      options: [
        "Let them proceed and report it later",
        "Stop them and instruct them to follow pre-operation protocols",
        "Help them to speed up the task",
        "Watch closely to ensure they do it safely"
      ],
      correctIndex: 1
    },
    {
      id: "q3",
      question: "Which combination of PPE is mandatory for Hi-Ab crane operation on a construction site?",
      options: [
        "Safety glasses, sandals, and a vest",
        "Respirator, gloves, and loose-fitting clothing",
        "Hard hat, steel-capped boots, safety glasses, high-visibility clothing",
        "Beanie, safety vest, and sneakers"
      ],
      correctIndex: 2
    },
    {
      id: "q4",
      question: "Why is it critical to avoid working under suspended loads during crane operations?",
      options: [
        "It delays work due to shadow interference",
        "It violates noise control policies",
        "It increases the risk of injury or fatality in case of load failure",
        "It causes operator distraction"
      ],
      correctIndex: 2
    },
    {
      id: "q5",
      question: "While lifting a load, the crane begins to tilt. What should you do immediately?",
      options: [
        "Lower the load to stabilize the crane and stop operation",
        "Swing the load faster to regain balance",
        "Continue cautiously and observe the tilt",
        "Call for backup before taking any action"
      ],
      correctIndex: 0
    },
    {
      id: "q6",
      question: "During refuelling, what environmental control must be in place?",
      options: [
        "Refuel on soft ground to absorb spills",
        "Refuel beside storm drains with no barriers",
        "Refuel only at designated off-site areas with spill control procedures",
        "Use a mobile fuel tank wherever convenient"
      ],
      correctIndex: 2
    },
    {
      id: "q7",
      question: "What is the reason for confirming utility service locations before operating the crane?",
      options: [
        "To allow digging nearby",
        "To find optimal crane parking",
        "To prevent contact with underground or overhead services",
        "To avoid wildlife disruption"
      ],
      correctIndex: 2
    },
    {
      id: "q8",
      question: "You observe a co-worker using a mobile phone while operating the crane. What is the appropriate response?",
      options: [
        "Ignore it unless an incident occurs",
        "Use your phone to record it for evidence",
        "Remind them that it's against SOP and report it if necessary",
        "Tell them to use hands-free mode"
      ],
      correctIndex: 2
    },
    {
      id: "q9",
      question: "Why must stabilisers be used with sole boards when parking the crane?",
      options: [
        "To help absorb shock from the road",
        "To improve visibility in poor lighting",
        "To ensure a stable, even foundation on variable surfaces",
        "To mark the crane's location for pedestrians"
      ],
      correctIndex: 2
    },
    {
      id: "q10",
      question: "Toolbox talks are required daily and during which other situation?",
      options: [
        "After lunch breaks",
        "Before rain starts",
        "Any time there is a task change",
        "Only at the beginning of the week"
      ],
      correctIndex: 2
    }
  ]
};
