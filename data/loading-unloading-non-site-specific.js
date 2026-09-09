window.VOC_DATA = {
  title: "Safe Operating Procedure - Loading and Unloading Truck (Non-Site Specific)",

  meta: {
    formId: "loading-unloading-non-site-specific",
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
      question: "What is the primary reason for performing pre-start checks on forklifts and crane trucks?",
      options: [
        "To improve fuel efficiency",
        "To ensure operator comfort",
        "To identify faults before use and ensure safe operation",
        "To record equipment brand details"
      ],
      correctIndex: 2
    },
    {
      id: "q2",
      question: "When is it acceptable to operate a crane within 6.4 meters of overhead powerlines?",
      options: [
        "During daylight hours only",
        "When no one is on-site",
        "Only with a designated spotter present",
        "When the crane is insulated"
      ],
      correctIndex: 2
    },
    {
      id: "q3",
      question: "Why must drivers remain in designated safe zones during loading and unloading?",
      options: [
        "To supervise load placement",
        "To assist operators if needed",
        "To avoid exposure to mobile plant hazards",
        "To keep paperwork updated"
      ],
      correctIndex: 2
    },
    {
      id: "q4",
      question: "What is the correct load restraint requirement for securing steel sections according to the SOP?",
      options: [
        "100% in all directions",
        "80% forward, 50% rearward and sideways, 20% upward",
        "50% in all directions",
        "70% forward and 30% all other directions"
      ],
      correctIndex: 1
    },
    {
      id: "q5",
      question: "What must be done if wind conditions exceed 30 knots during crane operations?",
      options: [
        "Increase counterweights",
        "Use two tag lines instead of one",
        "Cease all cranage activity",
        "Continue but shorten lift heights"
      ],
      correctIndex: 2
    },
    {
      id: "q6",
      question: "What is the purpose of using tag lines or mechanical aids when guiding loads?",
      options: [
        "To reduce equipment wear",
        "To speed up load handling",
        "To allow remote control of the crane",
        "To guide loads while maintaining a safe distance"
      ],
      correctIndex: 3
    },
    {
      id: "q7",
      question: "Which of the following actions is prohibited during loading/unloading operations?",
      options: [
        "Using a man-basket or platform to access the truck tray",
        "Applying chocks to truck wheels",
        "Operating cranes from the ground level",
        "Standing under a suspended load"
      ],
      correctIndex: 3
    },
    {
      id: "q8",
      question: "After completing the loading/unloading task, what must be done before leaving the area?",
      options: [
        "Disconnect the crane battery",
        "Leave the exclusion zone in place for safety",
        "Remove all dunnage and debris from the work area",
        "Stack steel on frame packs for the next task"
      ],
      correctIndex: 2
    },
    {
      id: "q9",
      question: "Which of the following would be considered a breach of the SOP's \"NEVER\" section?",
      options: [
        "Using close-fitting clothing",
        "Blocking access paths with equipment",
        "Using a face shield when required",
        "Inducting workers into site-specific protocols"
      ],
      correctIndex: 2
    },
    {
      id: "q10",
      question: "What documentation is required after completing the loading/unloading task?",
      options: [
        "A toolbox meeting form",
        "Maintenance and inspection logbook updates",
        "A handwritten thank-you note",
        "A photographic record of the load"
      ],
      correctIndex: 1
    }
  ]
};
