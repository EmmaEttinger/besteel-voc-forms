window.VOC_DATA = {
  title: "Verification of Competency - Truck Loading and Unloading (Yandina)",

  meta: {
    formId: "truck-loading-unloading-yandina",
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
      question: "What is the minimum width required for the notch used as a lift point for frame packs?",
      options: ["50mm", "75mm", "100mm", "150mm"],
      correctIndex: 1
    },
    {
      id: "q2",
      question: "Which of the following is considered a hazard during loading and unloading activities?",
      options: [
        "Overloading crane capacity",
        "Fall from height",
        "Driving without a license",
        "Forgetting to lock the truck"
      ],
      correctIndex: 1
    },
    {
      id: "q3",
      question: "What is the maximum allowable load height from the ground?",
      options: ["3.5m", "4.0m", "4.3m", "5.0m"],
      correctIndex: 2
    },
    {
      id: "q4",
      question: "Which type of sling should be used for lifting truss packs slung horizontally?",
      options: ["2x 6m slings", "4x 6m slings", "2x 4m slings", "4x 4m slings"],
      correctIndex: 1
    },
    {
      id: "q5",
      question: "What is the recommended method to improve entry and egress to the load?",
      options: [
        "Use a forklift",
        "Climb onto the load",
        "Use a man basket or platform ladder",
        "Jump off the load"
      ],
      correctIndex: 2
    },
    {
      id: "q6",
      question: "What distance must be maintained between the truck and overhead power lines?",
      options: ["5m", "10m", "15m", "20m"],
      correctIndex: 1
    },
    {
      id: "q7",
      question: "What PPE is mandatory for all loading and unloading activities?",
      options: [
        "Safety harness and respirator",
        "High visibility clothing, work boots, eye protection, gloves, hearing protection, hard hat",
        "Chemical-resistant suit",
        "None of the above"
      ],
      correctIndex: 1
    },
    {
      id: "q8",
      question: "What should be done if lifting slings cannot be easily retrieved between tightly packed loads?",
      options: [
        "Cut the slings",
        "Leave the slings in place",
        "Use a smaller crane",
        "Manually adjust the load"
      ],
      correctIndex: 1
    },
    {
      id: "q9",
      question: "When strapping the load, how should straps be positioned to avoid bending the top or bottom plates?",
      options: [
        "Place straps through the truss webs",
        "Position straps on studs",
        "Wrap straps around the load",
        "Secure straps to the crane hook"
      ],
      correctIndex: 1
    },
    {
      id: "q10",
      question: "What is a required post-operation activity?",
      options: [
        "Leave slings on the truck",
        "Park the truck without inspection",
        "Take a photo of the delivery as proof of delivery",
        "Immediately start another operation"
      ],
      correctIndex: 2
    }
  ]
};
