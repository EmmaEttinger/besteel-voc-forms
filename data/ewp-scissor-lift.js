window.VOC_DATA = {
  title: "Verification of Competency - EWP Scissor Lift",

  meta: {
    formId: "ewp-scissor-lift",
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
      question: "Which of the following is NOT listed as a potential hazard when operating a scissor lift?",
      options: [
        "Loss of control",
        "Falling objects",
        "Exposure to high noise levels",
        "Electric shock"
      ],
      correctIndex: 2
    },
    {
      id: "q2",
      question: "What is a mandatory requirement before using the scissor lift?",
      options: [
        "Ensuring the machine is painted bright yellow for visibility",
        "Completing a pre-start inspection and signing off on completion",
        "Filling the platform with necessary tools before operation",
        "Checking that the lift can exceed its weight limit safely"
      ],
      correctIndex: 1
    },
    {
      id: "q3",
      question: "What is the correct safety procedure when working at heights on a scissor lift?",
      options: [
        "Using ladders or boxes to reach extra height if necessary",
        "Keeping all body parts within the confines of the platform",
        "Reaching out beyond the guardrails for better access",
        "Attaching banners or signs to the platform for visibility"
      ],
      correctIndex: 1
    },
    {
      id: "q4",
      question: "Which PPE is mandatory for scissor lift operation?",
      options: [
        "Flip-flops and a high-visibility vest",
        "Safety harness, hard hat, and appropriate footwear",
        "Loose clothing for comfort and sunglasses for glare protection",
        "Welding mask and knee pads"
      ],
      correctIndex: 1
    },
    {
      id: "q5",
      question: "What should you do before raising or lowering the platform?",
      options: [
        "Ensure all personnel are cleared from the area",
        "Test the emergency brakes by moving the lift quickly",
        "Increase the operating speed to avoid delays",
        "Stand near the lift with one hand on the railing"
      ],
      correctIndex: 0
    },
    {
      id: "q6",
      question: "Which of the following is a prohibited action when operating a scissor lift?",
      options: [
        "Keeping the platform as low as possible before movement",
        "Operating the lift in high winds above the machine's maximum rating",
        "Conducting a site inspection before operation",
        "Ensuring overhead powerlines are a safe distance away"
      ],
      correctIndex: 1
    },
    {
      id: "q7",
      question: "Why is it important to avoid sudden platform movements on uneven terrain?",
      options: [
        "To prevent unnecessary wear on the tires",
        "Because minor movement at ground level can amplify into large, unintended movement at height",
        "To conserve battery life and reduce fuel consumption",
        "Because sudden movements make operation inefficient"
      ],
      correctIndex: 1
    },
    {
      id: "q8",
      question: "What is the correct action if a fault is detected in the scissor lift?",
      options: [
        "Continue operating and report it at the end of the shift",
        "Stop use immediately and report the issue",
        "Modify the lift to make it work temporarily",
        "Use the lift but only for short, low-height tasks"
      ],
      correctIndex: 1
    },
    {
      id: "q9",
      question: "When should you wear a full-body harness and lanyard while on the scissor lift?",
      options: [
        "Only when working above 10 meters",
        "Whenever the operator feels it is necessary",
        "When required by safety guidelines and attached to the specified anchor point",
        "Only when transporting heavy materials"
      ],
      correctIndex: 2
    },
    {
      id: "q10",
      question: "What is the correct post-operation procedure after using a scissor lift?",
      options: [
        "Leave the machine running for quick access the next day",
        "Lower the platform, switch off the machine, and remove the key (if fitted)",
        "Keep the lift elevated for the next shift's convenience",
        "Park the lift in a high-traffic area for easy access"
      ],
      correctIndex: 1
    }
  ]
};
