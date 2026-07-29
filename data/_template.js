// ============================================================
// TEMPLATE — copy this file to data/your-voc-name.js and fill in.
// Then add a link to it in index.html.
//
// Easiest path: just paste your VOC's raw text (questions, options,
// which answer is marked "Correct", and the practical steps) into a
// Claude Code / Claude chat and ask it to turn it into a file like
// this one — it takes seconds per VOC.
// ============================================================

window.VOC_DATA = {
  title: "Verification of Competency - [Tool/Task Name]",

  meta: {
    formId: "your-voc-name", // must match the filename (without .js)
    version: "1.0"
  },

  // Free-text / date fields at the top of the form.
  personalFields: [
    { id: "preparedBy", label: "Prepared by", type: "text", required: true },
    { id: "conductedOn", label: "Conducted on", type: "datetime", required: true },
    { id: "siteConducted", label: "Site conducted", type: "text", required: true },
    { id: "location", label: "Location", type: "text", required: false }
  ],

  // Optional informational/required questions before the quiz
  // (e.g. "Have you read the SOP?"). Not graded — just required.
  preQuestions: [
    {
      id: "sopRead",
      question: "STOP! Have you read the relevant Safety Operating Procedure?",
      options: ["Yes", "No", "N/A"],
      required: true
    }
  ],

  // The 10 (or however many) graded multiple-choice questions.
  // correctIndex is zero-based (0 = first option).
  questions: [
    {
      id: "q1",
      question: "Your question text here?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctIndex: 0
    }
    // ...repeat for each question
  ],

  // Optional practical (supervisor-led) section.
  // Delete this whole block if the VOC has no practical component.
  practical: {
    gateQuestion: {
      question: "Do you need to complete a Practical VOC?",
      options: ["Yes", "No", "N/A"]
    },
    supervisorNameLabel: "Supervisor's Name",
    items: [
      {
        id: "p1",
        title: "1. Step name",
        description: "What the supervisor asks the employee to demonstrate.",
        procedure: ["Correct step one.", "Correct step two."]
      }
      // ...repeat for each practical step
    ]
  },

  // Optional closing note shown at the bottom of the form.
  note: ""
};
