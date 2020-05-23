const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');
const env = require('../setup/env');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: env.EMAIL_PORT,
    auth: {
      user: env.EMAIL_USERNAME,
      pass: env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `Air App <${env.EMAIL_USERNAME}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
    text: htmlToText.fromString(options.html),
    attachments: options.attachments,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
