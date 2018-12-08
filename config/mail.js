const nodeMailer = require("nodemailer");
//https://myaccount.google.com/lesssecureapps
var transporter = nodeMailer.createTransport({
  service: "gmail",
  auth: {
    // first go the link avobe and enable (remember you need to signed in in your gmail)
    user: "yourgmail", //change here
    pass: "gmailpassword" //change here
  }
});
module.exports.sendEmail = (to, subject, html, callback) => {
  const mailOptions = {
    from: "your gmail", // sender address
    to,
    subject,
    html
  };
  transporter.sendMail(mailOptions, function(err, info) {
    if (err) console.log(err);
    else {
      callback(info);
    }
  });
};
