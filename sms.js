require('dotenv').config();
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  applicationId: process.env.APPLICATION_ID,
  privateKey: process.env.PRIVATE_KEY
}, {
  debug: true
});

nexmo.channel.send(
  { type: 'sms', number: process.env.TO_NUMBER },
  { type: 'sms', number: process.env.FROM_NUMBER },
  {
    content: {
      type: 'text',
      text: 'This is an SMS sent from the Messages API'
    }
  },
  (err, data) => {
    console.log(data.message_uuid);
  }
);
