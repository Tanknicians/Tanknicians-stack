import nodemailer from "nodemailer";

const fromEmail = process.env.EMAIL_USERNAME;
const fromPassword = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: fromEmail,
    pass: fromPassword,
  },
});

export async function sendEmail(to: string, subject: string, text: string) {
  const mailOptions = {
    from: fromEmail,
    to,
    subject,
    text,
  };

  return new Promise<string>((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        reject(error);
      } else {
        console.log(`Email sent: ${info.response}`);
        resolve(info.response);
      }
    });
  });
}

export async function resetPassword(email: string) {
  return sendEmail(
    email,
    "Reset Password",
    "You have requested to reset your password.",
  );
}
