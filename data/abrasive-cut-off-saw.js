window.VOC_DATA = {
  title: "Verification of Competency - Abrasive Cut-Off Saw",

  meta: {
    formId: "abrasive-cut-off-saw",
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
      question: "What is the primary reason an abrasive saw generates significant heat during operation?",
      options: [
        "The motor runs at a high voltage",
        "The friction between the saw blade and metal causes expansion",
        "The machine's internal components overheat",
        "The cooling system is not sufficient"
      ],
      correctIndex: 1
    },
    {
      id: "q2",
      question: "What type of personal protective equipment (PPE) is NOT explicitly mentioned in the document as required?",
      options: [
        "Eye protection",
        "Hearing protection",
        "Respiratory mask",
        "Close-fitting protective clothing"
      ],
      correctIndex: 2
    },
    {
      id: "q3",
      question: "Which of the following is considered a major hazard when using an abrasive cut-off saw?",
      options: [
        "Exposure to UV radiation",
        "Metal sparks and ejected pieces",
        "Electrical shock from the motor",
        "Airborne wood dust"
      ],
      correctIndex: 1
    },
    {
      id: "q4",
      question: "What should you always do before using an abrasive cut-off saw?",
      options: [
        "Ensure the saw is operated on an RCD-protected circuit",
        "Remove all guards for better visibility",
        "Set the blade depth to its maximum setting",
        "Wear gloves to improve grip on the blade"
      ],
      correctIndex: 0
    },
    {
      id: "q5",
      question: "When securing a workpiece for cutting, what is the safest method?",
      options: [
        "Holding the workpiece firmly by hand",
        "Clamping the workpiece in the saw's vice",
        "Using a length stop on the free off-cut end",
        "Placing a second workpiece on top for stability"
      ],
      correctIndex: 1
    },
    {
      id: "q6",
      question: "What should you do immediately after completing a cut?",
      options: [
        "Remove the cut piece before the saw stops spinning",
        "Turn off the saw, hold the arm down, and wait for the blade to stop",
        "Unplug the machine while the blade is still moving",
        "Use compressed air to cool the blade"
      ],
      correctIndex: 1
    },
    {
      id: "q7",
      question: "What should be checked before using an abrasive cut-off wheel?",
      options: [
        "That it has a larger arbor hole than required",
        "That it is free from chips and cracks",
        "That it has the lowest RPM rating possible",
        "That it is covered in lubricant to reduce friction"
      ],
      correctIndex: 1
    },
    {
      id: "q8",
      question: "Which of the following is a prohibited action when using an abrasive cut-off saw?",
      options: [
        "Adjusting the saw while it is running",
        "Using a saw with an RCD-protected circuit",
        "Keeping the work area free from flammable materials",
        "Using a vice to clamp the workpiece"
      ],
      correctIndex: 0
    },
    {
      id: "q9",
      question: "Why is it important to ease the abrasive disc against the workpiece rather than forcing it?",
      options: [
        "To prevent the blade from overheating and wearing out prematurely",
        "To increase cutting speed and efficiency",
        "To generate more sparks for a better visual effect",
        "To allow the motor to run at lower RPMs"
      ],
      correctIndex: 0
    },
    {
      id: "q10",
      question: "What should you do after finishing your work with the saw?",
      options: [
        "Leave the saw plugged in for the next user",
        "Clean ventilation openings and switch levers",
        "Remove the guards to store them separately",
        "Leave metal shavings and off-cuts in the work area"
      ],
      correctIndex: 1
    }
  ]
};
