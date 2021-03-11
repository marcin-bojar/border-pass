const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;

const oAuth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: 465,
  secure: true,
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_ADDRESS,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
    accessToken: '',
    expires: 3600,
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
