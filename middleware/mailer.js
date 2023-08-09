const nodemailer = require("nodemailer");
const Mailgen = require("mailgen");

const contactUs = async (email, offre, dateFin, prix, date, user) => {
  var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "6adcb0b3bc15c3",
      pass: "c170a6da93e22e",
    },
  });

  let MailGenerator = new Mailgen({
    theme: "default",
    product: {
      name: "Taa Marbouta",
      link: "https://www.taamarbouta.com/",
    },
  });

  let response = {
    body: {
      name: user,
      intro: "Your bill has arrived!",
      table: {
        data: [
          {
            item: "Nodemailer Stack Book",
            description: "A Backend application",
            price: "$10.99",
          },
        ],
      },
      outro: "Looking forward to do more business",
    },
  };

  let mail = MailGenerator.generate(response);

  let message = {
    from: "appoffres@mailpluss.com",
    to: email,
    subject: "Confirmation",
    html: mail,
  };

  await transporter
    .sendMail(message)
    .then((info) => {
      console.log("Email successfully sent ✅ --> " + info.accepted);
    })
    .catch((error) => {
      console.log("Email not sent ⛔️");
      console.log(error);
    });
};

module.exports = { contactUs };
