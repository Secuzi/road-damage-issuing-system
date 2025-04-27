import nodemailer from "nodemailer";
import createError from "http-errors";
const transporter = nodemailer.createTransport({
  host: "smtp-relay.brevo.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (recipientEmail, subject, text, next) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_SENDER, // sender address
      to: recipientEmail, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              .my-div {
                padding: 8px;
                color: red;
                border: 1px solid black;
              }
              h1 {
                color: pink;
                font-size: 2rem;
              }
            </style>
          </head>
          <body>
            <div class="my-div">
            <h1>${subject}</h1>  
            <p>${text}</p>
            </div>
          </body>
        </html>`, // html body
    });

    return { message: "Message sent" };
  } catch (error) {
    return next(createError(404, error.message));
  }
};
