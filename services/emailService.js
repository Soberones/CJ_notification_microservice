const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendEmail = async (email, extendedMessage) => {
  console.log("email service work");

  const emailMessage = ({ receiverEmail }) => {
    return {
      from: {
        email: "clubs@clubjunkie.co",
        name: "Club Junkie - marketplace",
      },
      personalizations: [
        {
          to: {
            email: receiverEmail,
          },

          dynamic_template_data: {
            listingId: extendedMessage,
          },
        },
      ],
      template_id: "d-67e8d953ef7d47ceb8d127c74d3cfe97",
    };
  };

  try {
    const res = await sgMail.send(emailMessage({ receiverEmail: email }));
    console.log({ res });
    return res;
  } catch (error) {
    console.error("Error sending SMS:", error.message);
    throw new Error();
  }
};
