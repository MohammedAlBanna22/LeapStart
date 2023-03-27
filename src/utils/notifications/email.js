require('dotenv').config();
const axios = require('axios');

async function sendEmail(emails, subject, body) {
  const { ONESIGNAL_URL } = process.env;
  const { ONESIGNAL_APP_ID } = process.env;
  const { ONESIGNAL_API_KEY } = process.env;

  try {
    await axios.post(
      ONESIGNAL_URL,
      JSON.stringify({
        app_id: ONESIGNAL_APP_ID,
        include_email_tokens: emails,

        email_subject: subject,
        email_body: body,
        email_from_name: 'LeapStart',
      }),
      {
        headers: {
          Authorization: `Basic ${ONESIGNAL_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
  } catch (err) {
    console.error(err);
  }
}

async function sendVerificationCodeEmail(email, code) {
  const subject = 'Verify your email';
  const body = `
  <p>Hi,</p>
  <br>
  <p>The verification code is: <b>${code}</b></p>
  `;
  const emails = [email];

  await sendEmail(emails, subject, body);
}

module.exports.sendEmail = sendEmail;
module.exports.sendVerificationCodeEmail = sendVerificationCodeEmail;
