import nodemailer from 'nodemailer';

export const testAccount = await nodemailer.createTestAccount();

export const transporter = nodemailer.createTransport({

  // service: 'Gmail',
  // auth: {
  //   user: 'your_email@example.com',
  //   pass: 'your_email_password',
  // },
  // test account

  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: testAccount.username, // generated ethereal user: testAccount.username
    pass: testAccount.pass// generated ethereal password: testAccount.pass
  }
});

export const sendEmail = (recipient, subject, text) => {
  const mailOptions = {
    from: testAccount.username,
    to: recipient,
    subject: subject,
    text: text
    // html: '<b>Sending Email</b>' // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};
