window.VOC_DATA = {
  title: "Verification of Competency - Bandsaw",

  meta: {
    formId: "bandsaw",
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
      question: "What is a major risk associated with operating a bandsaw?",
      options: [
        "Sunburn",
        "Electric shock during power-off conditions",
        "Dehydration from heat",
        "Hearing damage from prolonged noise exposure"
      ],
      correctIndex: 3
    },
    {
      id: "q2",
      question: "Which of the following PPE items is not suitable for bandsaw operation?",
      options: [
        "Hearing protection",
        "Loose scarf",
        "Steel-capped boots",
        "Close-fitting clothing"
      ],
      correctIndex: 1
    },
    {
      id: "q3",
      question: "What must be done before powering on the bandsaw?",
      options: [
        "Lubricate the blade during operation",
        "Confirm blade guards are properly adjusted",
        "Start cutting immediately to test functionality",
        "Ensure hands are on the material"
      ],
      correctIndex: 1
    },
    {
      id: "q4",
      question: "Which of the following should always be done before using the bandsaw?",
      options: [
        "Leave the machine running to warm up",
        "Conduct a pre-start inspection",
        "Remove safety guards for visibility",
        "Smoke in the workshop to stay alert"
      ],
      correctIndex: 1
    },
    {
      id: "q5",
      question: "What is the correct response if the bandsaw begins making unusual clicking sounds during operation?",
      options: [
        "Apply oil to the blade",
        "Monitor it for five more minutes",
        "Stop the saw completely",
        "Ignore the noise and continue cutting"
      ],
      correctIndex: 2
    },
    {
      id: "q6",
      question: "When is it safe to remove a cut workpiece from the bandsaw?",
      options: [
        "As soon as the cut finishes",
        "After turning off and locking the machine",
        "While the blade is retracting",
        "When the blade slows down"
      ],
      correctIndex: 1
    },
    {
      id: "q7",
      question: "Why must long workpieces be supported while clamping?",
      options: [
        "To reduce noise",
        "To keep the machine balanced",
        "To avoid marking the material",
        "To prevent tipping or shifting during the cut"
      ],
      correctIndex: 3
    },
    {
      id: "q8",
      question: "Which of the following is part of post-operation housekeeping?",
      options: [
        "Leaving the blade exposed",
        "Sweeping up offcuts and dust",
        "Resetting all guards to the open position",
        "Disposing of metal in general trash bins"
      ],
      correctIndex: 1
    },
    {
      id: "q9",
      question: "During pre-operation safety checks, what must be verified about the emergency stop?",
      options: [
        "It functions correctly when tested",
        "It is hidden for emergency use only",
        "It activates automatically after 5 minutes",
        "It is placed near the coolant tank"
      ],
      correctIndex: 0
    },
    {
      id: "q10",
      question: "What is a critical reason to avoid wearing rings or loose jewellery while using the bandsaw?",
      options: [
        "It interferes with vision",
        "It could get caught in moving parts",
        "It increases electrical conductivity",
        "It slows down production"
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
      {
        id: "p1",
        title: "1. Demonstrate the required pre-start inspection of the band saw before operation.",
        procedure: [
          "Employee checks general machine condition, guards, blade condition/tension, controls, hydraulics, coolant system and surrounding work area; identifies any obvious faults before use."
        ]
      },
      {
        id: "p2",
        title: "2. Demonstrate how you would check the machine's safety controls, including the emergency stop.",
        procedure: [
          "Correctly identifies and tests the emergency stop and confirms controls/safety mechanisms are operational before commencing work."
        ]
      },
      {
        id: "p3",
        title: "3. Select the appropriate PPE and prepare yourself to safely operate the band saw.",
        procedure: [
          "Wears required PPE; clothing is close-fitting; no loose jewellery/rings or other items that could become caught in moving equipment."
        ]
      },
      {
        id: "p4",
        title: "4. Load and correctly position a piece of material ready for cutting.",
        procedure: [
          "Uses safe manual handling; positions material correctly; supports long/heavy material where required; keeps hands clear of pinch and cutting areas."
        ]
      },
      {
        id: "p5",
        title: "5. Demonstrate how to correctly secure the material in the band saw before making a cut.",
        procedure: [
          "Correctly positions and firmly secures the workpiece using the hydraulic vice; confirms material is stable before operating the saw."
        ]
      },
      {
        id: "p6",
        title: "6. Set the band saw to a nominated cutting angle provided by the supervisor.",
        procedure: [
          "Safely sets the required mitre angle, uses the angle/digital readout correctly where applicable, locks the head/mitre mechanism and verifies the setup before cutting."
        ]
      },
      {
        id: "p7",
        title: "7. Set up the machine for the material being cut and demonstrate a normal cutting cycle.",
        procedure: [
          "Selects/adjusts appropriate blade speed and hydraulic feed/cutting pressure where required, uses coolant appropriately, keeps hands clear and allows the machine to cut without forcing the cutting head."
        ]
      },
      {
        id: "p8",
        title: "8. While operating the saw, demonstrate what you monitor to determine whether the machine is cutting safely and correctly.",
        procedure: [
          "Monitors blade/cut, material security, coolant and machine operation; recognises abnormal noise, vibration, clicking, jamming or other signs of a problem and responds appropriately."
        ]
      },
      {
        id: "p9",
        title: "9. Demonstrate the correct response to a simulated jam, blade problem or other machine fault.",
        procedure: [
          "Stops the machine safely, waits for all movement to cease and isolates/locks out the machine before attempting to clear material or make adjustments; reports faults to the supervisor where required."
        ]
      },
      {
        id: "p10",
        title: "10. Complete the cut and demonstrate the correct shutdown and post-operation procedure.",
        procedure: [
          "Allows cutting cycle to finish safely; confirms blade has completely stopped before handling material; switches off machine, resets guards, removes material safely, cleans swarf/offcuts, leaves area tidy and reports any faults."
        ]
      }
    ]
  }
};
