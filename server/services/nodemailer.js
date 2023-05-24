const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");

exports.sendVerificationEmail = async (req, res, email, emailToken) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // Read the email template file
  const templatePath = path.join(__dirname, "../src/template/verifyEmail.ejs");
  const emailTemplate = fs.readFileSync(templatePath, "utf-8");
  const logoImagePath = path.resolve(__dirname, "../src/images/logo.png");

  // Define the email options for verification
  const verifyOptions = {
    from: process.env.EMAIL_USERNAME,
    to: email,
    subject: "Email Verification",
    html: emailTemplate,
    attachments: [
      {
        filename: "logo.png",
        path: logoImagePath,
        cid: "logo@cid",
      },
    ],
  };

  // Render the template with data
  const renderedTemplate = ejs.render(emailTemplate, {
    logoCid: "logo@cid",
    verificationLink: `http://${req.headers.host}/verify-email/${emailToken}`,
  });

  // Set the HTML of the email
  verifyOptions.html = renderedTemplate;

  // Verify email using the transporter
  transporter.sendMail(verifyOptions, (err) => {
    if (err) {
      console.error("Error sending verification email:", err);
      return false;
    }
    return true;
  });
};
