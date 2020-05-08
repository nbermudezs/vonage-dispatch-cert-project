## Showcase Vonage Dispath and Messages APIs

See details [here](https://vonage-workshop.nexmodev.com/messages/certification/certification-project/). 

### Pre-requisites

- A Facebook Page
- A Vonage App with Messages capabilities
- Link Vonage on your FB Page
  - visit https://messenger.nexmo.com
  - follow the instructions
  - copy the "external id" of the page you selected -- you will need it later
- Link FB on your Vonage App
  - go to your [Vonage Dashboard](https://dashboard.nexmo.com/)
  - locate your application
  - Under "Linked External Accounts" identify your FB Page and click "Link"
- A Vonage Phone Number linked to the Vonage App you are using
- `ngrok` setup and running on `http 3000`
- Webhook URLs in your Vonage App pointing to the `ngrok` domain.
  - /webhooks/inbound-message
  - /webhooks/message-status

### Setup

In order to run the project locally, first get a copy and install dependencies
```bash
git clone git@github.com:nbermudezs/vonage-dispatch-cert-project.git
cd vonage-dispatch-cert-project
npm install
```

Then configure the environment variables by copying the `.env.example` file and filling out all variables
```bash
cp .env.example .env
```

** Note: if you used the Nexmo CLI to create the Vonage App you should have a `private.key` file located where you ran the command.
Under the `.nexmo-app` you can also find the ApplicationID but you can always retrieve it from your Vonage Dashboard.

Finally, to run the project just execute `node server.js`.

### Usage

While this project exposes two webhooks, the main endpoint you will need is `GET /start-workflow`.

This endpoint has an optional `onfail` query parameter. If omitted you have a 50/50 change of receiving a second SMS or a FB message with an image if the first SMS fails,
Alternatively, you can pass either `sms` or `fb` as the `onfail` value (e.g. `/start-workflow?onfail=sms`) to force that specific second reaching attempt.

### FAQ

- **I can't figure out what the `FB_RECIPIENT_ID` is, how do I get it?**
  - The easiest way is to run this app once without specifying `FB_RECIPIENT_ID` in `.env` and send a message
  to your FB Page from the user you want to message back. This project has a webhook that listens for those messages and will
  log them into your console. You can copy the `FB_RECIPIENT_ID` from the `from` field of the output.