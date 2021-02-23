const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const createMailData = (to, driverName, path) => {
  return {
    from: process.env.EMAIL_ADDRESS,
    to,
    subject: `${driverName} - zestawienie przekroczeń granic`,
    attachments: [{ path, filename: `${driverName}.html` }],
  };
};

module.exports = {
  transporter,
  createMailData,
};
