import nodemailer from 'nodemailer';
import { resetPassword } from '../Authentication/API';

const fromEmail = process.env.EMAIL_USERNAME;
const fromPassword = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: fromEmail,
    pass: fromPassword
  }
});

export async function sendEmail(to: string, subject: string, text: string) {
  const mailOptions = {
    from: fromEmail,
    to,
    subject,
    text
  };

  return new Promise<string>((resolve, reject) => {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        resolve(info.response);
      }
    });
  });
}

// quick and dirty way to make the reset-password endpoint work
export async function emailResetPassword(email: string) {
  const response = resetPassword(email);
  return response;
}
