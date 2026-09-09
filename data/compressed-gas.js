window.VOC_DATA = {
  title: "Verification of Competency - Compressed Gas",

  meta: {
    formId: "compressed-gas",
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
      question: "Which of the following is NOT listed as a potential hazard when working with compressed gas?",
      options: [
        "Explosion or major fire",
        "Asphyxiation from leaks",
        "Exposure to radiation",
        "Projectiles causing eye injuries"
      ],
      correctIndex: 2
    },
    {
      id: "q2",
      question: "Before using a compressed gas cylinder, what must always be checked?",
      options: [
        "The cylinder's colour to determine the gas type",
        "The pressure regulator for defects",
        "Whether the cylinder can be stored horizontally",
        "If the cylinder valve is permanently open"
      ],
      correctIndex: 1
    },
    {
      id: "q3",
      question: "How should you check for gas leaks safely?",
      options: [
        "Use a naked flame to detect leaks",
        "Listen for a hissing sound or apply soapy water",
        "Shake the cylinder and smell for leaks",
        "Open the valve fully and see if gas escapes"
      ],
      correctIndex: 1
    },
    {
      id: "q4",
      question: "What is the proper way to open a gas cylinder valve?",
      options: [
        "Turn the valve as hard as possible to ensure it stays open",
        "Use a wrench to force it open",
        "Turn the hand wheel or cylinder valve key anticlockwise with reasonable force",
        "Tap the valve with a hammer if it won't turn"
      ],
      correctIndex: 2
    },
    {
      id: "q5",
      question: "Which of the following actions is strictly prohibited when handling compressed gas cylinders?",
      options: [
        "Storing cylinders upright and secured",
        "Using a trolley to transport cylinders",
        "Testing for leaks with a naked flame",
        "Keeping cylinders in a well-ventilated area"
      ],
      correctIndex: 2
    },
    {
      id: "q6",
      question: "What is the safest way to transport compressed gas cylinders?",
      options: [
        "Laying them flat in the back of a vehicle",
        "Securing them upright with a trolley or in a vehicle",
        "Rolling them on the ground for easy movement",
        "Carrying them by the valve for better grip"
      ],
      correctIndex: 1
    },
    {
      id: "q7",
      question: "Why should gas cylinders be kept away from heat sources?",
      options: [
        "Heat can cause increased pressure and potential explosion",
        "Heat makes the gas inside evaporate faster",
        "Warm gas is less effective for industrial use",
        "It is only required for flammable gases"
      ],
      correctIndex: 0
    },
    {
      id: "q8",
      question: "What should be done before storing a gas cylinder after use?",
      options: [
        "Ensure the valve is fully open for ventilation",
        "Remove the regulator, cap the valve, and store it in a secure area",
        "Leave it near the worksite for easy access next time",
        "Lay it on its side to prevent it from falling over"
      ],
      correctIndex: 1
    },
    {
      id: "q9",
      question: "How should different types of gas cylinders be stored?",
      options: [
        "Mixed together in one designated area",
        "According to regulation (AS4332) in separate, clearly labeled areas",
        "Horizontally to save storage space",
        "With full and empty cylinders next to each other"
      ],
      correctIndex: 1
    },
    {
      id: "q10",
      question: "What is the correct PPE for handling compressed gas cylinders?",
      options: [
        "Flip-flops and sunglasses",
        "Leather gloves, safety footwear, and eye protection",
        "Long, loose clothing to cover exposed skin",
        "No PPE is required if handling cylinders carefully"
      ],
      correctIndex: 1
    }
  ]
};
