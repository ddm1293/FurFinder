import nodemailer from 'nodemailer';

// const createTransporter = nodemailer.createTransport({
//   service: 'Gmail', // Gmail SMTP
//   auth: {
//     user: 'your_email@example.com',
//     pass: 'your_email_password'
//   }
// });

// const MAIL_USER = 'furfinder23@gmail.com';
// const MAIL_PASS = 'Furfinder2023@';
// const MAIL_FROM = 'furfinder23@gmail.com';

// const createTransporter = async () => {
//   const transporter = nodemailer.createTransport({
//     service: 'gmail', // Gmail SMTP
//     auth: {
//       user: MAIL_USER,
//       pass: MAIL_PASS
//     }
//   });
//   return transporter;
// };
//
// export const sendEmail = async (recipient, subject, text, html) => {
//   try {
//     const transporter = await createTransporter();
//
//     const mailOptions = {
//       from: MAIL_FROM,
//       to: recipient,
//       subject: subject,
//       text: text,
//       html: html
//     };
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Message sent: %s', info.messageId);
//     console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
//   } catch (error) {
//     console.log('Error sending email:', error.message);
//   }
// };

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
