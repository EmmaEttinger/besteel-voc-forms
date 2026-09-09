window.VOC_DATA = {
  title: "Verification of Competency - Operation of Power Tools",

  meta: {
    formId: "operation-of-power-tools",
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
      question:
        "You're about to use a grinder but notice the guard is loose and doesn't lock securely. What is the most appropriate course of action?",
      options: [
        "Use the tool carefully and avoid bumping the guard",
        "Secure the guard with tape or wire as a temporary fix",
        "Tag out the tool and report the defect before proceeding",
        "Inform a co-worker and continue use if they agree it looks safe"
      ],
      correctIndex: 2
    },
    {
      id: "q2",
      question:
        "A co-worker removes a safety guard from a power tool because it's 'getting in the way'. What is your correct response according to SOP?",
      options: [
        "Mind your own task unless there's an injury",
        "Warn them but take no further action",
        "Immediately report the unsafe act to a supervisor",
        "Reattach the guard yourself when they're on break"
      ],
      correctIndex: 2
    },
    {
      id: "q3",
      question: "When working near flammable materials, which two controls should always be in place before operating power tools?",
      options: [
        "Dust mask and rubber gloves",
        "Safety goggles and padded flooring",
        "Proper tool grounding and a nearby fire extinguisher",
        "Ventilation system and loud alarms"
      ],
      correctIndex: 2
    },
    {
      id: "q4",
      question: "During a pre-start check, you confirm all PPE is worn, but the RCD push-button test fails. What should you do next?",
      options: [
        "Bypass the RCD and start the tool",
        "Reset the RCD and try again once",
        "Replace the RCD with an extension cord",
        "Stop work and escalate the issue to maintenance"
      ],
      correctIndex: 3
    },
    {
      id: "q5",
      question:
        "A team member experiences tingling in their hands after extended use of a vibrating tool. What control is most appropriate to implement immediately?",
      options: [
        "Increase tool speed to finish faster",
        "Provide padded gloves only",
        "Rotate tasks to limit exposure duration",
        "Advise the worker to ignore it unless it worsens"
      ],
      correctIndex: 2
    },
    {
      id: "q6",
      question: "You are assigned a task requiring a drill bit attachment. Upon inspection, you find the bit is worn and slightly bent. What is the best action?",
      options: [
        "Use the bit for small holes only",
        "Straighten the bit using a vice",
        "Replace the bit with a properly rated one",
        "Run the drill in reverse to reduce stress on the bit"
      ],
      correctIndex: 2
    },
    {
      id: "q7",
      question: "Why must all electrical leads be routed safely and regularly inspected, especially when using tools in a shared workspace?",
      options: [
        "To reduce workplace clutter",
        "To prevent tripping and electrical fire risks",
        "To extend the life of the cords",
        "To avoid confusing leads with personal devices"
      ],
      correctIndex: 1
    },
    {
      id: "q8",
      question: "A ladder is needed to perform work 2.5m above ground level. According to the SOP, which combination of actions is required?",
      options: [
        "Check rung spacing and angle",
        "Confirm compliance with AS 1892 and use fall protection",
        "Wear non-slip shoes and hold the ladder",
        "Assign a spotter and increase tool RPM for speed"
      ],
      correctIndex: 1
    },
    {
      id: "q9",
      question: "Which of the following best explains why tools should never be forced during operation?",
      options: [
        "It reduces efficiency and increases power draw",
        "It may break the tool casing",
        "It increases the risk of user injury and damage to the tool",
        "It triggers unnecessary vibration"
      ],
      correctIndex: 2
    },
    {
      id: "q10",
      question: "After completing a grinding task, you turn off and unplug the tool. What additional step must be taken according to proper housekeeping?",
      options: [
        "Reuse any leftover materials",
        "Store the tool without cleaning to save time",
        "Clean and inspect the tool for damage or debris buildup",
        "Wrap the cord tightly around the tool for easy transport"
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
      { id: "p1", title: "Follows standard operating procedures (SOPs)" },
      { id: "p2", title: "Complies with work health and safety (WHS) requirements at all times" },
      { id: "p3", title: "Uses appropriate personal protective equipment (PPE) in accordance with SOPs" },
      { id: "p4", title: "Identifies job requirements from specifications, drawings, job sheets or work instructions" },
      { id: "p5", title: "Uses power tools for general engineering applications" },
      { id: "p6", title: "Selects power tools appropriate to the task requirements" },
      { id: "p7", title: "Uses power tools for a determined sequence of operations to produce desired outcomes to job specifications" },
      { id: "p8", title: "Identifies unsafe or faulty tools and mark for repair before, during and after use according to SOPs" },
      { id: "p9", title: "Undertakes operational maintenance of tools according to principles, techniques, and SOPs" },
      { id: "p10", title: "Stores power tools safely in appropriate location according to manufacturers' recommendations and SOPs" }
    ]
  }
};
