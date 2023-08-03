import emailjs from '@emailjs/browser';

export const sendEmail = async (recipientEmail, recipientName, notificationType, threadUrl, message) => {
  const templateParams = {
    recipient_email: recipientEmail,
    recipient_name: recipientName,
    notification_type: notificationType,
    thread_url: threadUrl,
    message: message
  };
  try {
    const response = await emailjs.send(
      process.env.REACT_APP_EMAIL_SERVICE_ID,
      process.env.REACT_APP_EMAIL_TEMPLATE_ID,
      templateParams,
      process.env.REACT_APP_EMAIL_PUBLIC_KEY
    );
    console.log("'SUCCESS!'Email notification sent:", response);
  } catch (error) {
    console.error("FAILED! Error sending email notification:", error);
  }
};


