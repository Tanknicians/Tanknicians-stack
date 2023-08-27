import "./../config";
import { resetPassword, sendEmail } from "./EmailService";

describe("email service", () => {
  const testEmail = process.env.TEST_EMAIL as string;
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
