import Prisma from "@prisma/client";
import { generateSecret, generateJWT } from "./TokenGenerator";

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

  expect(generateJWT(userLogin, testSecret)).not.toBe(null);
});
