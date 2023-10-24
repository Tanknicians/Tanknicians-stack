import nodemailer from 'nodemailer';
import { loginDB } from '../../prisma/db/Login';
import { generateRandomPassword } from '../Authentication/API';

import * as bcrypt from 'bcryptjs';
import * as Prisma from '@prisma/client';

const fromEmail = process.env.EMAIL_USERNAME;
const fromPassword = process.env.EMAIL_PASSWORD;

const DEFAULT_PASSWORD_LENGTH = 16;
const DEFAULT_SALT_LENGTH = 10;

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

/**
 * Resets the password for the given email if it is valid and
 * sends email with the new password
 * @param email
 * @returns confirmation:string from smtp transaction
 */

export async function resetPassword(email: string) {
  // validate email
  let login: Prisma.Login | null;

  login = await loginDB.read(email);
  if (!login) {
    throw new Error(`login not found for email ${email}`);
  }

  // generate new password and attempt record update
  const pw = generateRandomPassword(DEFAULT_PASSWORD_LENGTH);
  login.password = await bcrypt.hash(pw, DEFAULT_SALT_LENGTH);
  await loginDB.update(login);

  // send email with new password
  const emailText = `Your new password is: \n
  PASSWORD: ${login.password} \n
  
  If you lose this password, please ask your admin to generate a reset email.
  `;

  const confirmation = await sendEmail(
    login.email,
    'Password Reset',
    emailText
  );
  console.log(confirmation);
  return confirmation;
}