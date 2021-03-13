const nodemailer = require('nodemailer');

// email configuration
const createTransport = () => {
  return nodemailer.createTransport({
    host: process.env.ETHEREAL_HOST,
    port: process.env.ETHEREAL_PORT,
    auth: {
      user: process.env.ETHEREAL_USER,
      pass: process.env.ETHEREAL_PASSWORD,
    },
  });
};

// sending a signup confirmation email
exports.sendConfirmationEmail = async (user, urlToSend) => {
  // creating the transport
  const transport = createTransport();

  // setting email options
  const mailOptions = {
    from: process.env.ETHEREAL_NAME,
    to: user.email,
    subject: 'Registration',
    text: `Please click on the link to signup. ${urlToSend}`,
  };

  // send the mail to the user
  await transport.sendMail(mailOptions);
};

// sending a welcome email
exports.sendWelcomeEmail = async (user) => {
  // creating the transport
  const transport = createTransport();

  // setting email options
  const mailOptions = {
    from: 'Vittorio Caiazzo',
    to: user.email,
    subject: 'Welcome on board!',
    text: `Your registration is complete!`,
  };

  // send the mail to the user
  await transport.sendMail(mailOptions);
};

exports.sendResetPasswordEmail = async (user, urlToSend) => {
  // creating the transport
  const transport = createTransport();

  // setting email options
  const mailOptions = {
    from: 'Vittorio Caiazzo',
    to: user.email,
    subject: 'Password reset',
    text: `Click on the link to reset the password: ${urlToSend}`,
  };

  // send the mail to the user
  await transport.sendMail(mailOptions);
};
