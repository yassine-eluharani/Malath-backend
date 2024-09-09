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
    // TODO: Catch retrun value of saveUser, deleteUserByClerkId, updateUserByClerkId and handle errors
    let result;

    if (eventType === 'user.created') {
      result = await Service.saveUser(attributes);
      if (result.includes("already exists")) {
        return res.status(409).json({ error: result }); // Conflict status for duplicate
      }
      return res.status(201).json({ message: result }); // Created status
    } else if (eventType === 'user.deleted') {
      result = await Service.deleteUserByClerkId(attributes);
      if (result === "User not found") {
        return res.status(404).json({ error: result }); // Not found status
      }
      return res.status(200).json({ message: result }); // Success status
    } else if (eventType === 'user.updated') {
      result = await Service.updateUserByClerkId(attributes);
      if (result === "User not found") {
        return res.status(404).json({ error: result }); // Not found status
      }
      return res.status(200).json({ message: result }); // Success status
    } else {
      console.log(`Unknown event type ${eventType}`);
      return res.status(400).json({ error: `Unknown event type ${eventType}` }); // Bad request status
    }
  } catch (err) {
    console.error("Error in registerWebHook:", err);
    return res.status(500).json({ error: "Internal server error" }); // Internal server error
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
