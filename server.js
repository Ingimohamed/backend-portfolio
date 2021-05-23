const express = require("express");
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.MAIL_KEY);

const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.post("/send-email", (request, response) => {
  try {
    sgMail.send({
      to: "webdevelopment.ingi@gmail.com",
      from: "webdevelopment.ingi@gmail.com",
      subject: `${request.body.subject} (Freelance Work)`,
      text: `Message from ${request.body.name} \n\n\n\n\n\n

     ${request.body.text} \n\n\n\n
     Phone number:  ${request.body.phone}\n
     Email:  ${request.body.email}\n`
       ,
    });
    response.send();
  } catch (error) {
    console.log(error);
  }
});
app.listen(process.env.PORT, () => console.log("Server runing..."));
