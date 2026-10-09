const nodemailer = require("nodemailer");



const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  auth: {
    user: process.env.NODEMAILEREMAIL,
    pass: process.env.NODEMAILERPASSWORD,
  },
});


async function verificationEmail(email, token) {
  try {
    const info = await transporter.sendMail({
      from: process.env.NODEMAILEREMAIL,
      to: email,
      subject: "Please verify your email",
      text: "Hello world?",
      html: `
        <h3>Verify your email</h3>
        <p>Please click the link below to verify your email:</p>

        <a href="http://localhost:5173/verify/${token}">
          Click Here
        </a>
      `
    });

    console.log("Message sent: %s", info.messageId);

    // Preview URL is only available when using an Ethereal test account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  } catch (err) {
    console.error("Error while sending mail:", err);
  }
}


async function forgetPasswordEmail(email, token) {
  try {
    const info = await transporter.sendMail({
      from: process.env.NODEMAILEREMAIL,
      to: email,
      subject: "Reset your password",
      text: "Please click the link below to reset your password.",
      html: `
        <h3>Reset Password</h3>
        <p>Please click the link below to reset your password:</p>

        <a href="http://localhost:5173/resetpassword/${token}">
          Click Here
        </a>
      `
    });

    console.log("Message sent: %s", info.messageId);

    // Preview URL is only available when using an Ethereal test account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));

  } catch (err) {
    console.error("Error while sending mail:", err);
  }
}



async function categoryCreatedEmail(adminEmails, categoryName, vendorName) {
  try {
  const info = await transtporter.sendmMail({
    from: process.env.NODEMAIL,
    to: adminEmails,
    subject: "New Category Created",
    text: `${vendorName} created new category: ${categoryName}`,
    html: `
        <h3>New category created</h3>
        <p><b>Vendor:</b> ${vendorName}</p>
        <p><b>Category:</b> ${categoryName}</p>
        <p>Please review it in the admin panel.</p>
      `
  })

  console.log("Message  sent %s", info.messageId);
  
  
}catch(err) {
  console.error("Error while sending mail:", err);
}
}



module.exports = {verificationEmail,forgetPasswordEmail,categoryCreatedEmail}

