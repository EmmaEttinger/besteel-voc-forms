window.VOC_DATA = {
  title: "Verification of Competency - Angle Grinder",
  meta: {
    formId: "angle-grinder",
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
      question: "What is the most important safety check to perform before using an angle grinder?",
      options: [
        "Ensure the work area is clean and well-lit",
        "Check that the grinder is aesthetically pleasing",
        "Make sure the grinder is plugged into a power source",
        "Confirm that the grinder produces a loud noise"
      ],
      correctIndex: 0
    },
    {
      id: "q2",
      question: "Which of the following is NOT required personal protective equipment (PPE) for operating an angle grinder?",
      options: [
        "Close-fitting protective clothing",
        "Face mask (dependent on material)",
        "Hard hat",
        "Eye protection"
      ],
      correctIndex: 2
    },
    {
      id: "q3",
      question: "When should you never use an angle grinder?",
      options: [
        "When the work area is clean and free of flammable liquids",
        "When the power tool has a loose or faulty part",
        "When you are wearing all required PPE",
        "When the power tool has been inspected and is operational"
      ],
      correctIndex: 1
    },
    {
      id: "q4",
      question: "What should be done with the electrical lead before using the angle grinder?",
      options: [
        "Check it for faults and ensure it is in good condition",
        "Soak it in water to prevent any electrical hazards",
        "Cut off any damaged sections of the lead",
        "Leave it coiled on the floor for easy access"
      ],
      correctIndex: 0
    },
    {
      id: "q5",
      question: "What is a recommended action before turning on the angle grinder?",
      options: [
        "Lay the tool down on a non-flammable surface",
        "Allow the power tool to run up to operating speed",
        "Place your hands near the cutting surface",
        "Attach the power tool to an ungrounded surface"
      ],
      correctIndex: 1
    },
    {
      id: "q6",
      question: "Which of the following should never be done when using an angle grinder?",
      options: [
        "Secure loose clothing and hair",
        "Use the tool in wet conditions or near water",
        "Ensure the guard is in place",
        "Maintain a firm grip on the grinder"
      ],
      correctIndex: 1
    },
    {
      id: "q7",
      question: "How should you handle the grinder if it is faulty?",
      options: [
        "Continue working with it until the job is finished",
        "Attempt to fix it while it is running",
        "Immediately report the fault and do not use it",
        "Use it cautiously and reduce its speed"
      ],
      correctIndex: 2
    },
    {
      id: "q8",
      question: "What is the recommended action to take when the grinder's blade is still spinning?",
      options: [
        "Lay the grinder down immediately",
        "Wait for the grinder to come to a complete stop before laying it down",
        "Adjust the blade while the grinder is spinning",
        "Remove the blade from the grinder while it is still spinning"
      ],
      correctIndex: 1
    },
    {
      id: "q9",
      question: "Why is it important to avoid body contact with earthed or grounded surfaces while operating the angle grinder?",
      options: [
        "To avoid injury from excessive vibration",
        "To reduce the risk of electrocution",
        "To prevent fire hazards",
        "To increase the tool's cutting efficiency"
      ],
      correctIndex: 1
    },
    {
      id: "q10",
      question: "After using the angle grinder, what should be done as part of the post-operation procedure?",
      options: [
        "Ensure the power tool is plugged in and ready for the next use",
        "Store the tool in an unsecured, convenient location",
        "Disconnect the power source before changing or adjusting the blade",
        "Keep the work area as it is without cleaning"
      ],
      correctIndex: 2
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
        title: "1. Inspect the Grinder and Cord",
        description: "Show how to inspect the angle grinder and its cord before use.",
        procedure: [
          "Check the grinder for cracks, damage, or loose parts.",
          "Inspect the cord for cuts, frays, or signs of wear.",
          "Make sure the plug is undamaged and fits securely in the outlet."
        ]
      },
      {
        id: "p2",
        title: "2. Select and Inspect the Disc",
        description: "Demonstrate how to choose and check a grinding or cutting disc.",
        procedure: [
          "Confirm the disc is rated for at least the tool's maximum RPM.",
          "Check the disc for cracks, chips, or warping — discard if damaged.",
          "Use only discs recommended in the manual for that grinder model."
        ]
      },
      {
        id: "p3",
        title: "3. Install the Wheel Guard Correctly",
        description: "Show how to fit the wheel guard for a grinding or cutting operation.",
        procedure: [
          "Ensure the closed side of the guard faces the operator.",
          "Mount and adjust the guard using the lever or screws so it is secure and covers the wheel properly."
        ]
      },
      {
        id: "p4",
        title: "4. Install the Disc Properly",
        description: "Demonstrate how to safely install a grinding disc.",
        procedure: [
          "Mount the inner flange, place the disc, then the lock nut.",
          "Hold the shaft lock, tighten the lock nut with the wrench — do not over-tighten.",
          "Make sure the disc spins freely without wobble."
        ]
      },
      {
        id: "p5",
        title: "5. Check the Switch and Speed Control",
        description: "Verify the switch works properly and adjust the speed.",
        procedure: [
          "Test the slide switch for smooth ON/OFF operation; ensure it locks and unlocks correctly.",
          "Adjust the speed dial between settings 1–5; confirm the dial turns without forcing."
        ]
      },
      {
        id: "p6",
        title: "6. Test Run the Grinder",
        description: "Perform a safe test run before applying the grinder to material.",
        procedure: [
          "Hold the grinder firmly with both hands.",
          "Start it at a safe distance from objects and people.",
          "Let it run at full speed for at least 1 minute. Watch for vibration or unusual noise."
        ]
      },
      {
        id: "p7",
        title: "7. Demonstrate Correct Operating Grip & Stance",
        description: "Show the proper grip and body position while using the grinder.",
        procedure: [
          "Hold the main handle with one hand and the side handle with the other.",
          "Stand balanced with feet apart; keep the work at waist height.",
          "Keep cord away from the spinning disc."
        ]
      },
      {
        id: "p8",
        title: "8. Perform a Controlled Grinding Task",
        description: "Grind a test piece correctly and safely.",
        procedure: [
          "Keep the wheel at about a 15-degree angle to the work surface.",
          "Apply light, steady pressure — do not force the tool.",
          "Watch for sparks and ensure they fly away from the body and flammable materials."
        ]
      },
      {
        id: "p9",
        title: "9. Shut Down and Put Down the Grinder Safely",
        description: "Show how to stop the grinder and set it down safely.",
        procedure: [
          "Release the switch and wait for the wheel to come to a complete stop.",
          "Never lay the tool down while the wheel is still spinning.",
          "Unplug the tool before changing discs or making adjustments."
        ]
      },
      {
        id: "p10",
        title: "10. Clean and Store the Tool",
        description: "Explain how to clean and store the grinder after use.",
        procedure: [
          "Wipe off dust and debris with a clean cloth.",
          "Inspect for any damage or wear.",
          "Coil the cord neatly, store the tool in a dry place out of reach of children."
        ]
      }
    ]
  },

  note:
    "If the material isn't secured or the cut piece isn't supported, the material can bend, pinching the disc and potentially causing kickback. To avoid the cut-off disc being pinched and potentially exploding, support the piece that will be cut off before you reach the end of the cut. This prevents the two cut pieces falling in towards each other and pinching the cutoff disc. It also minimises the risk of the offcut falling and landing on a power cable, potentially cutting through it. All electrical or extension leads should be kept clear of the \"cut zone\" so offcuts can't land on them."
};
