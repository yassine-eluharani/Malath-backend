const Service = require("../services/user.service");
const svix = require('svix');
const Webhook = svix.Webhook;

const registerWebHook = async function(req, res) {
  try {
    const payloadString = req.body.toString();
    const svixHeaders = req.headers;

    const wh = new Webhook(process.env.WEBHOOK_SECRET);
    const evt = wh.verify(payloadString, svixHeaders);
    const { ...attributes } = evt.data;

    const eventType = evt.type;
    if (eventType === 'user.created') {
      await Service.saveUser(attributes);
    } else if (eventType === 'user.deleted') {
      await Service.deleteUserByClerkId(attributes);
    } else if (eventType === 'user.updated') {
      await Service.updateUserByClerkId(attributes);
    } else {
      console.log(`Unknown event type ${eventType}`);
    }
  } catch (err) {
    console.error("Error in registerWebHook:", err);
  }
}


const getAllUsers = async function(req, res) {
  try {
    const users = await Service.getAllUsers();
    if (users.length === 0) {
      return res.status(404).json({ message: "No users found" });
    }
    return res.status(200).json(users); // If users found, return them
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Internal Server Error" }); // Handle errors
  }
}


module.exports = {
  registerWebHook,
  getAllUsers
}
