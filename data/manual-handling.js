window.VOC_DATA = {
  title: "Verification of Competency - Manual Handling",

  meta: {
    formId: "manual-handling",
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
      question: "Which of the following is a primary reason for using mechanical aids during manual handling?",
      options: [
        "To meet legal requirements",
        "To reduce the need for PPE",
        "To minimize physical strain and prevent injury",
        "To speed up work processes"
      ],
      correctIndex: 2
    },
    {
      id: "q2",
      question: "What should you do before starting any manual handling task on site?",
      options: [
        "Begin lifting to save time",
        "Ensure all team members are wearing matching PPE",
        "Inspect the area for hazards and confirm you've completed a site induction",
        "Select the heaviest items to lift first"
      ],
      correctIndex: 2
    },
    {
      id: "q3",
      question: "Which is considered an unsafe manual handling practice?",
      options: [
        "Using the whole hand for grip",
        "Keeping the load close to the body",
        "Twisting while carrying a heavy load",
        "Breaking down the load to reduce weight"
      ],
      correctIndex: 2
    },
    {
      id: "q4",
      question: "If you identify clutter or debris in the manual handling area, what should you do?",
      options: [
        "Step around it carefully",
        "Ignore it if you're in a hurry",
        "Remove the clutter to clear the path",
        "Inform someone after the task is complete"
      ],
      correctIndex: 2
    },
    {
      id: "q5",
      question: "When performing a team lift, which action is critical to success and safety?",
      options: [
        "Lifting simultaneously without planning",
        "Selecting the strongest person to lift solo",
        "Nominating a coordinator and using clear communication",
        "Starting once everyone is ready without talking"
      ],
      correctIndex: 2
    },
    {
      id: "q6",
      question: "Which of the following is prohibited during manual handling?",
      options: [
        "Using a trolley for transport",
        "Lifting on a clean and dry surface",
        "Carrying items that block your line of sight",
        "Wearing steel-capped boots"
      ],
      correctIndex: 2
    },
    {
      id: "q7",
      question: "What is the correct action if a load appears too heavy or awkward to lift alone?",
      options: [
        "Lift quickly and adjust mid-way",
        "Roll the load to your destination",
        "Request team or mechanical assistance",
        "Drag it across the floor"
      ],
      correctIndex: 2
    },
    {
      id: "q8",
      question: "Why is it important to use your whole hand for grip and keep the load close to your body?",
      options: [
        "It allows you to throw the load if needed",
        "It enhances control and reduces strain",
        "It makes lifting faster",
        "It prevents you from dropping the load"
      ],
      correctIndex: 1
    },
    {
      id: "q9",
      question: "What should be done immediately after completing a manual handling task?",
      options: [
        "Leave the area as is for the next shift",
        "Place tools wherever convenient",
        "Store materials and clear the area of obstructions",
        "Wait for a supervisor to inspect"
      ],
      correctIndex: 2
    },
    {
      id: "q10",
      question: "What is the appropriate response if you notice the procedure is no longer suitable due to a site change?",
      options: [
        "Continue working and report it later",
        "Stop work, update the SOP, and communicate changes",
        "Skip the task and inform your coworker",
        "Complete the task faster to minimize exposure"
      ],
      correctIndex: 1
    }
  ]
};
