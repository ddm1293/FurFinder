import emailjs from '@emailjs/browser';

// EmailJS credential
const TEMPLATE_ID = "template_lv3avyc";
const SERVICE_ID = "service_6ku6q2a";
const PUBLIC_KEY = "ioBFrm6RN5vp3b93U";

export const sendEmailNotification = async (recipientEmail, recipientName, threadUrl, message) => {
  const templateParams = {
    recipient_name: recipientName,
    thread_url: threadUrl,
    message: message,
    recipient_email: recipientEmail
  };

  try {
    const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
    console.log("'SUCCESS!'Email notification sent:", response);
  } catch (error) {
    console.error("FAILED! Error sending email notification:", error);
  }
};

