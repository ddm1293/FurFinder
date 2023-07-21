import nodemailer from 'nodemailer';

// export const transporter = nodemailer.createTransport({
//   service: 'Gmail',
//   auth: {
//     user: 'your_email@example.com',
//     pass: 'your_email_password'
//   }
// });

const createTransporter = async () => {
  const testAccount = await nodemailer.createTestAccount();
  console.log('test account', testAccount);
  const transporter = nodemailer.createTransport({
    host: testAccount.smtp.host, // 'smtp.ethereal.email',
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  });
  return { testAccount, transporter };
};

export const sendEmail = async (recipient, subject, text, html) => {
  try {
    const { testAccount, transporter } = await createTransporter();

    const mailOptions = {
      from: testAccount.user,
      to: recipient,
      subject: subject,
      text: text,
      html: html
    };
    const info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log('Error sending email:', error.message);
  }
};
