const nodemailer = require("nodejs-nodemailer-outlook");

module.exports = sendConfirmationEmail = (sender, name, email, confirmationCode) => {
    console.log("Check");
    nodemailer.sendEmail({
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD,
        },
        from: sender,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
          <h2>Hello ${name}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:${process.env.PORT}/api/v1/auth/confirm/${confirmationCode}> Click here</a>
          </div>`,
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    })
};