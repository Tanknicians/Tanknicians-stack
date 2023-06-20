import Prisma from "@prisma/client";
import { generateToken } from "./TokenGenerator";

test("return token for complete login", () => {
  const userLogin: Prisma.Login = {
    id: 0,
    email: "email",
    password: "pw",
    role: "CUSTOMER",
    userId: 1,
  };

  expect(generateToken(userLogin)).not.toBe(null);
});
