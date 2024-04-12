const Service = require("../services/user.service");
const svix = require('svix');
const Webhook = svix.Webhook;

const registerWebHook = async function(req, res) {
  try {
    const payloadString = req.body.toString();
    const svixHeaders = req.headers;

    const wh = new Webhook(process.env.WEBHOOK_SECRET);
    const evt = wh.verify(payloadString, svixHeaders);
    const { id, ...attributes } = evt.data;

    // Handle the webhooks
    const eventType = evt.type;
    if (eventType === 'user.created') {
      await Service.saveUser(
        id,
        attributes,
        res
      );
    } else if (eventType === 'user.deleted') {
      await Service.deleteUserByClerkId(id);
    } else if (eventType === 'user.updated') {
      console.log(`User ${id} was ${eventType}`);
    } else {
      console.log(`Unknown event type ${eventType}`);
    }
    res.status(200).json({
      success: true,
      message: 'Webhook received',
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = {
  registerWebHook
}
