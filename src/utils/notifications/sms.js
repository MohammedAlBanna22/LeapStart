require('dotenv').config();
const axios = require('axios');

async function sendSMS(mobiles, contents) {
  const { ONESIGNAL_URL } = process.env;
  const { ONESIGNAL_APP_ID } = process.env;
  const { ONESIGNAL_API_KEY } = process.env;
  try {
    await axios.post(
      ONESIGNAL_URL,
      JSON.stringify({
        app_id: ONESIGNAL_APP_ID,
        name: 'Leap Start',
        include_phone_numbers: mobiles,
        sms_from: '',
        contents,
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

function sendVerificationCodeSMS(mobile, code) {
  const contents = {
    en: `verfication code is: ${code}`,
    ar: `كود التحقق هو: ${code}`,
  };

  sendSMS([mobile], contents);
}

module.exports.sendSMS = sendSMS;
module.exports.sendVerificationCodeSMS = sendVerificationCodeSMS;
