window.VOC_DATA = {
  title: "Verification of Competency - Steel Erection",

  meta: {
    formId: "steel-erection",
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
      question: "Which combination of control measures best addresses the risks of falling objects during structural steel erection?",
      options: [
        "High-visibility clothing and task rotation",
        "Taglines and regular rest breaks",
        "Securing loose tools and establishing exclusion zones",
        "Using mobile platforms and verbal alerts"
      ],
      correctIndex: 2
    },
    {
      id: "q2",
      question: "You notice a rigger bypassing the use of taglines during a lift. What is the most appropriate action?",
      options: [
        "Wait until the lift is complete to raise concerns",
        "Immediately alert the crane operator to stop the lift",
        "Report it at the end-of-day toolbox talk",
        "Take a video for documentation before reporting"
      ],
      correctIndex: 1
    },
    {
      id: "q3",
      question: "What does it indicate if bolt tension readings vary significantly after securing a steel member?",
      options: [
        "The equipment used was likely over-torqued",
        "The load has stabilized and requires no further checks",
        "There may be misalignment or improper installation",
        "The steel is high-strength and that variation is expected"
      ],
      correctIndex: 2
    },
    {
      id: "q4",
      question: "Which situation would legally and safely permit working without a safety harness at heights?",
      options: [
        "The job will take less than 10 minutes",
        "A ladder is used, and the worker is holding onto a stable beam",
        "A scaffold with fall protection and handrails is in place",
        "There is no harness available, but the supervisor is present"
      ],
      correctIndex: 2
    },
    {
      id: "q5",
      question: "When reviewing the Safe Work Method Statement (SWMS), what should a competent worker verify before signing on?",
      options: [
        "That their name is already pre-printed on the SWMS",
        "That the document includes only generic risks",
        "That it specifically addresses site-specific hazards and controls",
        "That it covers the entire company's operations"
      ],
      correctIndex: 2
    },
    {
      id: "q6",
      question: "During post-operation, you find unlabelled debris near the exclusion zone. What is your best course of action?",
      options: [
        "Sweep it to the side to clear the path",
        "Leave it for the cleanup crew on night shift",
        "Remove the debris and report the issue",
        "Ask the crane operator to relocate it"
      ],
      correctIndex: 2
    },
    {
      id: "q7",
      question: "A co-worker begins operating a mobile plant without having signed into the SWMS. What is your legal and safety obligation?",
      options: [
        "Advise them to be cautious",
        "Notify the site supervisor immediately",
        "Monitor them and intervene if unsafe actions occur",
        "Assume they have verbal approval and continue working"
      ],
      correctIndex: 1
    },
    {
      id: "q8",
      question: "Under which circumstance is it appropriate to work near overhead power lines?",
      options: [
        "The work is brief and does not involve elevated platforms",
        "Exclusion zones have been established and documented",
        "The lines are believed to be insulated",
        "No cranes or lifting equipment are being used"
      ],
      correctIndex: 1
    },
    {
      id: "q9",
      question: "What is the primary reason for maintaining communication between crane operators and riggers during lifts?",
      options: [
        "To signal breaks and shift changes",
        "To assist with crane calibration",
        "To ensure load control and safe placement",
        "To log load weights in real time"
      ],
      correctIndex: 2
    },
    {
      id: "q10",
      question: "A weather report predicts high winds later in the day. What should you do before lifting steel members into place?",
      options: [
        "Proceed with the lift to avoid schedule delays",
        "Suspend lifting operations and reassess conditions regularly",
        "Attach additional taglines and speed up the operation",
        "Only lift lighter members and resume normal activity"
      ],
      correctIndex: 1
    }
  ]
};
