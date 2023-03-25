import * as Prisma from "@prisma/client";
import * as TokenGenerator from "./TokenGenerator";

let testSecret: string;

beforeAll(() => {
  testSecret = TokenGenerator.generateSecret();
});

test("return token for complete login", () => {
  const userLogin: Prisma.Login = {
    id: 0,
    email: "email",
    password: "pw",
    role: null,
    userId: null,
  };

  expect(TokenGenerator.generateJWT(userLogin, testSecret)).not.toBe(null);
});
