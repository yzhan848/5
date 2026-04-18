window.FORM_CONFIG = {
  submitMode: "mailto", // "mailto" 或 "googleForm"
  recipientEmail: "your@email.com", // mailto 用
  thankYouPage: "thank-you.html",
  googleForm: {
    action: "https://docs.google.com/forms/d/e/your-form-id/formResponse",
    fields: {
      name: "entry.1111111111",
      email: "entry.2222222222",
      service: "entry.3333333333",
      budget: "entry.4444444444",
      timeline: "entry.5555555555",
      reference: "entry.6666666666",
      message: "entry.7777777777"
    }
  }
};
