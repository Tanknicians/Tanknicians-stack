import "../config";
import { sendEmail } from "./EmailService";

const testEmail = process.env.TEST_EMAIL;

test("send email", async () => {
  expect(testEmail).not.toBeUndefined();
  if (testEmail === undefined) throw new Error("TEST_EMAIL not set");
  const res = await sendEmail(testEmail);
  expect(res.includes("Email sent:"));
});
