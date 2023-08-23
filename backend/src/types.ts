import * as Prisma from "@prisma/client";

export class LoginInput implements Pick<Prisma.Login, "email" | "password"> {
  email!: string;
  password!: string;
}

export class RegisterInput implements Omit<Prisma.Login, "id"> {
  email!: string;
  password!: string;
  role!: Prisma.Role;
  userId!: number;
}
