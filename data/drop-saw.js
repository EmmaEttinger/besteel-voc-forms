window.VOC_DATA = {
  title: "Verification of Competency - Drop Saw",

  meta: {
    formId: "drop-saw",
    version: "1.0"
  },

  personalFields: [
    { id: "preparedBy", label: "Prepared by", type: "text", required: true },
    { id: "conductedOn", label: "Conducted on", type: "datetime", required: true },
    { id: "siteConducted", label: "Site conducted", type: "text", required: true },
    { id: "location", label: "Location", type: "text", required: false }
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
      question: "What is a potential hazard when operating a drop saw?",
      options: [
        "Overheating the air compressor",
        "Chemical spills",
        "Dust inhalation",
        "Flooding"
      ],
      correctIndex: 2
    },
    {
      id: "q2",
      question: "Which of the following is required PPE when using a drop saw?",
      options: [
        "Loose-fitting clothes and gloves",
        "Steel-capped boots, safety glasses, and hearing protection",
        "Flip-flops and sunglasses",
        "Respirator and welding hood"
      ],
      correctIndex: 1
    },
    {
      id: "q3",
      question: "When must the power be isolated on the drop saw?",
      options: [
        "When changing the blade speed",
        "During normal cutting",
        "Before cleaning the work area",
        "Before servicing the equipment"
      ],
      correctIndex: 3
    },
    {
      id: "q4",
      question: "Which of the following actions is NEVER permitted while using a drop saw?",
      options: [
        "Wearing safety glasses",
        "Wearing tight-fitting clothing",
        "Leaving the machine running unattended",
        "Using guards"
      ],
      correctIndex: 2
    },
    {
      id: "q5",
      question: "Why is it important to inspect the saw blade before use?",
      options: [
        "To ensure it's a preferred color",
        "To confirm it is properly spinning and centered",
        "To count the number of teeth",
        "To make the equipment look clean"
      ],
      correctIndex: 1
    },
    {
      id: "q6",
      question: "What must be done before starting a cut on the drop saw?",
      options: [
        "Increase the saw speed",
        "Remove the blade guard",
        "Confirm proper depth setting",
        "Disconnect all PPE"
      ],
      correctIndex: 2
    },
    {
      id: "q7",
      question: "How can projectiles be prevented during saw operation?",
      options: [
        "Wear a welding helmet",
        "Avoid using clamps",
        "Check the condition of the product",
        "Operate the saw at maximum speed"
      ],
      correctIndex: 2
    },
    {
      id: "q8",
      question: "Which of the following housekeeping practices is CORRECT after operating the drop saw?",
      options: [
        "Leave tools around for the next user",
        "Leave the saw blade spinning for cooldown",
        "Dispose of waste materials in designated bins",
        "Ignore off-cuts on the floor if they're small"
      ],
      correctIndex: 2
    },
    {
      id: "q9",
      question: "What should you do if an issue arises while the saw is operating?",
      options: [
        "Finish the cut quickly",
        "Adjust settings while it's running",
        "Stop the saw immediately",
        "Call for help but let the saw continue running"
      ],
      correctIndex: 2
    },
    {
      id: "q10",
      question: "Which situation requires the use of mechanical aids or team lifting when working with a drop saw?",
      options: [
        "Cutting small plastic tubing",
        "Moving lightweight safety cones",
        "Lifting heavy materials",
        "Adjusting the depth setting"
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
        title: "1. Pre-Operational Safety Inspection",
        description: "Show me how you inspect the drop saw before use.",
        procedure: [
          "Check that the tool is unplugged before inspecting.",
          "Visually inspect the blade for cracks, pitch buildup, or dullness.",
          "Check that all guards are functional and return properly.",
          "Confirm all adjustment knobs and levers are tightened.",
          "Ensure the dust bag is emptied or the vacuum is connected correctly."
        ]
      },
      {
        id: "p2",
        title: "2. Power & Trigger Safety Check",
        description: "Demonstrate how you safely power on and test the trigger mechanism.",
        procedure: [
          "Confirm the saw is plugged into a suitable power source.",
          "Ensure the lock-off button is working before pulling the trigger.",
          "Confirm the switch returns to \"OFF\" when released.",
          "Never tape down or defeat the lock-off button."
        ]
      },
      {
        id: "p3",
        title: "3. Securing the Workpiece",
        description: "Secure a workpiece for cutting using the correct vise setup.",
        procedure: [
          "Use the vertical or horizontal vise depending on the shape of the workpiece.",
          "Ensure hands are at least 100 mm from the blade path.",
          "Confirm the workpiece is flush against both the fence and turn base."
        ]
      },
      {
        id: "p4",
        title: "4. Adjusting the Miter Angle",
        description: "Adjust the saw to a 45° right miter cut.",
        procedure: [
          "Unlock the turn base using the grip.",
          "Rotate the turn base while holding the lock lever.",
          "Align pointer with 45° on the scale.",
          "Lock the grip securely before cutting."
        ]
      },
      {
        id: "p5",
        title: "5. Adjusting the Bevel Angle",
        description: "Set the saw to a 33.9° left bevel cut for crown molding.",
        procedure: [
          "Remove upper guide fence if necessary.",
          "Turn the bevel knob counter clockwise.",
          "Adjust bevel using the scale pointer.",
          "Lock the knob firmly and ensure kerf boards are positioned correctly."
        ]
      },
      {
        id: "p6",
        title: "6. Performing a Safe Slide Cut",
        description: "Perform a safe slide cut on a wide workpiece.",
        procedure: [
          "Pull the carriage fully forward.",
          "Press handle down and push toward the fence.",
          "Keep steady, even pressure with no lateral force.",
          "Let the blade come to a full stop before raising."
        ]
      },
      {
        id: "p7",
        title: "7. Blade Change Procedure",
        description: "Demonstrate how to safely remove and replace the saw blade.",
        procedure: [
          "Unplug the saw.",
          "Lock carriage in raised position.",
          "Use hex wrench to remove center cover and blade guard.",
          "Press shaft lock, remove the bolt and blade.",
          "Install new blade with arrows aligned and guard reassembled."
        ]
      },
      {
        id: "p8",
        title: "8. Emergency Stop and Fault Response",
        description: "What do you do if the blade binds mid-cut or the saw behaves abnormally?",
        procedure: [
          "Release the trigger immediately.",
          "Wait for all moving parts to stop.",
          "Unplug the tool.",
          "Remove jammed material and inspect for faults or damage before reuse."
        ]
      }
    ]
  }
};
