const nodemailer = require("nodejs-nodemailer-outlook");

exports.sendConfirmationEmail = (sender, name, email, confirmationCode) => {
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
          <a href=${process.env.PROD_URL}/api/v1/auth/confirm/${confirmationCode}> Click here</a>
          </div>`,
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    })
};

exports.sendForgotPasswordEmail = (sender, email, resetUrl) => {
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
          <h2>Hello</h2>
          <p>You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}</p>
          </div>`,
        onError: (e) => console.log(e),
        onSuccess: (i) => console.log(i)
    })
};