const nodemailer = require("nodemailer");

exports.sendVerificationEmail = async (req, res, email, emailToken) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Define the email options for verification
  const verifyOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Email Verification",
    html: `<h1>Verify your email address</h1>
    <p>Please click the link below to verify your email address</p>
    <a href="http://${req.headers.host}/verify-email/?emailToken=${emailToken}">Verify Email</a>`,
  };

  // Verify email using the transporter
  transporter.sendMail(verifyOptions, (err, info) => {
    if (err) {
      console.log(err);
      return false;
    } else {
      console.log("Verification Email sent to: " + email);
      return true;
    }
  });
};
