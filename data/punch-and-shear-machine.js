window.VOC_DATA = {
  title: "Verification of Competency - Operation of Punch & Shear Machine",

  meta: {
    formId: "punch-and-shear-machine",
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
      question: "What is the correct operating mode to use when adjusting tooling or stroke length?",
      options: ["AUTO", "NORMAL", "SHEAR", "INCH"],
      correctIndex: 3
    },
    {
      id: "q2",
      question: "Which of the following is considered a critical pre-operation safety check?",
      options: [
        "Applying extra lubrication to the motor",
        "Verifying emergency stop function",
        "Cutting a sample piece of steel",
        "Running the machine in AUTO mode for warm-up"
      ],
      correctIndex: 1
    },
    {
      id: "q3",
      question: "What PPE is specifically required when operating the Punch & Shear machine?",
      options: [
        "Loose-fitting clothing and gloves",
        "Leather gloves, close-fitting clothing, secured hair",
        "Welding mask and respirator",
        "Steel apron and gumboots"
      ],
      correctIndex: 1
    },
    {
      id: "q4",
      question: "What should you ALWAYS do after using the punch and shear machine?",
      options: [
        "Leave the punch in position for the next operator",
        "Regrind shear blades",
        "Remove all tooling and clean the blade areas",
        "Lubricate the motor before shutdown"
      ],
      correctIndex: 2
    },
    {
      id: "q5",
      question: "When is it acceptable to operate the machine without guards in place?",
      options: [
        "When cutting thick steel sections",
        "During training demonstrations",
        "Only during authorised maintenance",
        "When guards are obstructing your view"
      ],
      correctIndex: 2
    },
    {
      id: "q6",
      question: "Why is it important to keep hands away from pinch points during operation?",
      options: [
        "To avoid electrical interference",
        "To reduce tool wear",
        "To prevent crushing or amputation injuries",
        "To maintain hydraulic pressure"
      ],
      correctIndex: 2
    },
    {
      id: "q7",
      question: "What action should be taken if material exceeds the shear's support limits?",
      options: [
        "Angle the material to fit",
        "Shear the unsupported end quickly",
        "Do not attempt the cut",
        "Clamp the excess section in place manually"
      ],
      correctIndex: 2
    },
    {
      id: "q8",
      question: "What is the danger of using the machine unattended in AUTO or INCH mode?",
      options: [
        "Reduced production speed",
        "Overheating of the hydraulic system",
        "Risk of unexpected machine movement and injury",
        "Wasting lubricants"
      ],
      correctIndex: 2
    },
    {
      id: "q9",
      question: "During notching, what clearance must be maintained between punch and die?",
      options: [
        "1.0 mm on all sides",
        "0.5 mm front and back only",
        "0.1 mm side and 0.3 mm front",
        "No clearance required"
      ],
      correctIndex: 2
    },
    {
      id: "q10",
      question: "What is the correct response if you observe worn or damaged blades?",
      options: [
        "Regrind them for sharper edges",
        "Continue use until failure",
        "Replace the blades; do not regrind",
        "Spray them with lubricant and reuse"
      ],
      correctIndex: 2
    }
  ]
};
