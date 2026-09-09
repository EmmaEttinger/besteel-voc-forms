window.VOC_DATA = {
  title: "Verification of Competency - MIG Welding",

  meta: {
    formId: "mig-welding",
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
      question: "Which of the following is NOT a potential hazard of MIG welding?",
      options: [
        "Electric shocks",
        "Burns from hot materials",
        "Hearing loss due to loud noise",
        "Fumes from welding materials"
      ],
      correctIndex: 2
    },
    {
      id: "q2",
      question: "What specific PPE is required to prevent radiation burns during MIG welding?",
      options: [
        "Welding gloves",
        "Respiratory protection",
        "Welding mask and close-fitting protective clothing",
        "Steel-capped boots"
      ],
      correctIndex: 2
    },
    {
      id: "q3",
      question: "Why is it critical to check for grease, oil, or flammable materials within 3 meters of the welding area?",
      options: [
        "To reduce the risk of slips and trips",
        "To maintain proper grounding for the equipment",
        "To minimize the risk of fire caused by sparks or heat",
        "To improve ventilation for fume extraction"
      ],
      correctIndex: 2
    },
    {
      id: "q4",
      question: "Which action should you perform before turning on the fume extraction unit?",
      options: [
        "Ensure all PPE is properly worn",
        "Verify the work leads do not create a tripping hazard",
        "Confirm the machine is set to the correct voltage and current",
        "Check that welding screens or barriers are in place"
      ],
      correctIndex: 3
    },
    {
      id: "q5",
      question: "What happens if the work return cables do not make firm contact?",
      options: [
        "Fume extraction will fail",
        "The welding gun will overheat",
        "The electrical connection may be weak, causing poor welding performance or hazards",
        "The gas flow system will shut down automatically"
      ],
      correctIndex: 2
    },
    {
      id: "q6",
      question: "When should you close the gas cylinder valve?",
      options: [
        "Before switching off the machine",
        "Immediately after finishing the weld but before removing PPE",
        "After switching off the machine and fume extraction unit",
        "Only if the gas cylinder is empty"
      ],
      correctIndex: 2
    },
    {
      id: "q7",
      question: "What is the main purpose of ensuring the current, voltage, wire feed, and gas flow are correctly set?",
      options: [
        "To ensure the weld is neat and professional in appearance",
        "To avoid overheating the electrode holder",
        "To produce a stable arc and high-quality welds",
        "To reduce wear and tear on the fume extraction unit"
      ],
      correctIndex: 2
    },
    {
      id: "q8",
      question: "Which of the following would require immediate reporting to a supervisor?",
      options: [
        "The gloves are slightly damp but still functional",
        "A minor crack is observed on the welding gun handle",
        "The work area has a small amount of grease, which is being cleaned up",
        "The fume extraction unit is making unusual noises and appears to be malfunctioning"
      ],
      correctIndex: 3
    },
    {
      id: "q9",
      question: "What is the risk of leaving the MIG welder running unattended?",
      options: [
        "Increased wear and tear on the equipment",
        "Potential for fire, sparks, or accidental operation",
        "Higher electricity consumption",
        "Overheating of the workspace"
      ],
      correctIndex: 1
    },
    {
      id: "q10",
      question: "Why is it essential to hang up the welding gun and cables after completing a task?",
      options: [
        "To keep the work area tidy and free of hazards",
        "To allow the equipment to cool faster",
        "To prevent unauthorized use of the equipment",
        "To ensure the cables remain straight and untangled"
      ],
      correctIndex: 0
    }
  ]
};
