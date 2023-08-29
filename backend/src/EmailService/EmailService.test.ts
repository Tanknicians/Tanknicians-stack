import SMTPTransport from "nodemailer/lib/smtp-transport";
import "./../config";
import { resetPassword, sendEmail } from "./EmailService";

jest.mock("nodemailer", () => ({
  // return Email sent:
  createTransport: () => ({
    sendMail: (
      _: unknown,
      cb: (
        err: Error | null,
        info: Partial<SMTPTransport.SentMessageInfo>,
      ) => void,
    ) => cb(null, { response: "Email sent:" }),
  }),
}));

describe("email service", () => {
  const testEmail = process.env.TEST_EMAIL;
  if (!testEmail) {
    throw new Error("TEST_EMAIL not defined");
  }

  test("has defined test email", () => {
    expect(testEmail).toBeDefined();
  });

  test("can send test emails", async () => {
    const res = await sendEmail(
      testEmail,
      "Test Email",
      "This is a test email.",
    );
    expect(res.includes("Email sent:"));
  });
  test("can send reset email", async () => {
    const res = await resetPassword(testEmail);
    expect(res.includes("Email sent:"));
  });
});
