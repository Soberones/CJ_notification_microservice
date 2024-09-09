const axios = require("axios");

exports.sendSms = (phoneNumber, message) => {
  return console.log("sms send to", phoneNumber);
  // Пример запроса с использованием Twilio API
  //   return axios.post(
  //     "https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXXXXXXXXXXXX/Messages.json",
  //     {
  //       to: phoneNumber,
  //       from: process.env.TWILIO_NUMBER,
  //       body: message,
  //     }
  //   );
};
