import Prisma from "@prisma/client";
import { generateSecret, generateToken } from "./TokenGenerator";

let testSecret: string;

beforeAll(() => {
  testSecret = generateSecret();
});

test("return token for complete login", () => {
  const userLogin: Prisma.Login = {
    id: 0,
    email: "email",
    password: "pw",
    role: "CUSTOMER",
    userId: 1,
  };

  expect(generateToken(testSecret, userLogin)).not.toBe(null);
});
