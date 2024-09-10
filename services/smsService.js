const twilio = require("twilio");
const Task = require("../models/taskModel");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

exports.sendSms = async (phoneNumber, message) => {
  try {
    const twilioMessage = await client.messages.create({
      body: message,
      from: process.env.TWILIO_NUMBER,
      to: phoneNumber,
    });

    console.table({
      phoneNumber: twilioMessage.to,
      message: twilioMessage.body,
      status: twilioMessage.status,
    });

    return twilioMessage;
  } catch (error) {
    console.error("Error sending SMS:", error.message);
    throw new Error();
    // console.error("Error sending SMS:", error.message);
    // return { success: false, message: "Failed to send SMS" };
  }
};
