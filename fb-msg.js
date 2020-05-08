require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const Nexmo = require('nexmo');

const nexmo = new Nexmo({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
  applicationId: process.env.APPLICATION_ID,
  privateKey: process.env.PRIVATE_KEY
}, {
  apiHost: 'messages-sandbox.nexmo.com',
  debug: true
});

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

function sendMessage() {
  nexmo.channel.send(
    { "type": "messenger", "id": "3359319474096057" },
    { "type": "messenger", "id": "107083064136738" },
    {
      "content": {
        "type": "text",
        "text": "This is a Facebook Messenger text message sent using the Messages API"
      }
    },
    (err, data) => {
      if (err) {
        console.error(err, err.body.invalid_parameters[0]);
      } else {
        console.log(data.message_uuid);
      }
    }
  );
}

app.get('/send-msg', (req, res) => {
  sendMessage();
  res.status(200).end();
})

app.listen(3000);
