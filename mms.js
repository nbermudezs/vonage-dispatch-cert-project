require('dotenv').config();
const Nexmo = require('nexmo');

const nexmo = new Nexmo(
  {
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    applicationId: process.env.APPLICATION_ID,
    privateKey: process.env.PRIVATE_KEY
  },
  {
    // apiHost: 'messages-sandbox.nexmo.com',
    debug: true
  }
);

const IMAGE_URL =
  'https://www.dailyembroidery.com/wp-content/uploads/2014/05/Ahoy-Mate-Applique-5_5-Inch.jpg';

nexmo.channel.send(
  { type: 'mms', number: process.env.TO_NUMBER },
  { type: 'mms', number: process.env.FROM_NUMBER },
  {
    content: {
      type: 'image',
      image: { url: IMAGE_URL }
    }
  },
  (err, data) => {
    console.log(data.message_uuid);
  }
);
