import "../config";
import { resetPassword, sendEmail } from "./EmailService";

const testEmail = process.env.TEST_EMAIL;

test("send email", async () => {
  expect(testEmail).not.toBeUndefined();
  if (testEmail === undefined) throw new Error("TEST_EMAIL not set");
  const res = await sendEmail(testEmail, "Test Email", "This is a test email.");
  expect(res.includes("Email sent:"));
});

test("send reset password", async () => {
  expect(testEmail).not.toBeUndefined();
  if (testEmail === undefined) throw new Error("TEST_EMAIL not set");
  const res = await resetPassword(testEmail);
  expect(res.includes("Email sent:"));
});
