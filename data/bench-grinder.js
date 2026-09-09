window.VOC_DATA = {
  title: "Verification of Competency - Bench Grinder",

  meta: {
    formId: "bench-grinder",
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
      question: "What is the maximum allowable gap between the work rest and the grinding wheel?",
      options: ["5mm", "10mm", "15mm", "20mm"],
      correctIndex: 2
    },
    {
      id: "q2",
      question: "Which of the following personal protective equipment (PPE) is NOT required when using a bench grinder?",
      options: [
        "Eye protection",
        "Hearing protection",
        "Gloves",
        "Close-fitting clothing"
      ],
      correctIndex: 2
    },
    {
      id: "q3",
      question: "What should be done before operating the bench grinder?",
      options: [
        "Check for slip/trip hazards",
        "Ensure the guard is in place",
        "Inspect the wheel for cracks or glazing",
        "All of the above"
      ],
      correctIndex: 3
    },
    {
      id: "q4",
      question: "Why should you never grind on the side of the grinding wheel?",
      options: [
        "It can cause the wheel to break",
        "It is less efficient",
        "It causes excessive sparks",
        "It damages the motor"
      ],
      correctIndex: 0
    },
    {
      id: "q5",
      question: "What should you do if the bench grinder is faulty or not operating correctly?",
      options: [
        "Try to fix it yourself",
        "Continue using it with caution",
        "Report the issue and do not use it",
        "Use it only for small jobs"
      ],
      correctIndex: 2
    },
    {
      id: "q6",
      question: "When starting the bench grinder, you should:",
      options: [
        "Stand directly in front of the wheel",
        "Stand to the side of the wheels",
        "Hold the workpiece against the wheel before it reaches full speed",
        "Apply pressure immediately"
      ],
      correctIndex: 1
    },
    {
      id: "q7",
      question: "Why is it important to remove loose clothing, jewellery, and secure long hair before using a bench grinder?",
      options: [
        "It prevents overheating",
        "It reduces noise levels",
        "It prevents entanglement in moving parts",
        "It allows better visibility"
      ],
      correctIndex: 2
    },
    {
      id: "q8",
      question: "What is the correct procedure for using a workpiece on the grinding wheel?",
      options: [
        "Hold it in one spot to grind quickly",
        "Slowly move it across the face of the wheel in a uniform manner",
        "Press it firmly against the wheel for faster grinding",
        "Use gloves to hold it securely"
      ],
      correctIndex: 1
    },
    {
      id: "q9",
      question: "What is the proper action once you have finished using the bench grinder?",
      options: [
        "Leave it running for the next user",
        "Switch it off and walk away",
        "Clean the area and leave the machine in a safe, tidy state",
        "Leave the workpiece in place for next time"
      ],
      correctIndex: 2
    },
    {
      id: "q10",
      question: "Why should you never leave the bench grinder running unattended?",
      options: [
        "The wheel will overheat",
        "It can continue running and cause injury",
        "The machine can shut off automatically",
        "Sparks may damage the workpiece"
      ],
      correctIndex: 1
    }
  ]
};
