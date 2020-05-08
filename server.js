require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Nexmo = require('nexmo');

const IMAGE_URL =
  'https://www.dailyembroidery.com/wp-content/uploads/2014/05/Ahoy-Mate-Applique-5_5-Inch.jpg';

const nexmo = new Nexmo(
  {
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    applicationId: process.env.APPLICATION_ID,
    privateKey: process.env.PRIVATE_KEY
  },
  {
    debug: true
  }
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/webhooks/inbound-message', (req, res) => {
  console.log(req.body);
  res.status(200).end();
});

app.post('/webhooks/message-status', (req, res) => {
  console.log(req.body);
  res.status(200).end();
});

app.get('/start-workflow', (req, res) => {
  const failOptions = {
    fb: {
      to: { type: 'messenger', id: process.env.FB_RECIPIENT_ID },
      from: { type: 'messenger', id: process.env.FB_SENDER_ID },
      message: {
        content: {
          type: 'image',
          image: { url: IMAGE_URL }
        }
      }
    },
    sms: {
      from: { type: 'sms', number: process.env.FROM_NUMBER },
      to: { type: 'sms', number: process.env.TO_NUMBER },
      message: {
        content: {
          type: 'text',
          text:
            'Hi there, at home tomorrow? You better be, you have a package coming your way'
        }
      }
    }
  };
  const secondStep = req.query.onfail || Math.random() < 0.5 ? 'sms' : 'fb';
  const onFail = failOptions[secondStep];

  nexmo.dispatch.create(
    'failover',
    [
      {
        from: { type: 'sms', number: process.env.FROM_NUMBER },
        to: { type: 'sms', number: process.env.TO_NUMBER },
        message: {
          content: {
            type: 'text',
            text: 'Package update: Your Am4z0n package is arriving tomorrow'
          }
        },
        failover: {
          expiry_time: 180,
          condition_status: 'read'
        }
      },
      onFail
    ],
    (err, data) => {
      if (err) {
        console.error(err);
      } else {
        console.log(data.dispatch_uuid);
      }
    }
  );
  return { ok: true };
});

app.listen(3000);
