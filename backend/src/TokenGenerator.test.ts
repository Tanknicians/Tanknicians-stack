import * as Prisma from "@prisma/client";

import * as TokenGenerator from "./TokenGenerator";

test("return token for complete login", () => {
  const userLogin: Prisma.Login = {
    id: 0,
    email: "email",
    password: "pw",
    role: null,
    userId: null,
  };

  expect(TokenGenerator.generateJWT(userLogin)).not.toBe(null);
});
