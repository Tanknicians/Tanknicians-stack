import { User, PrismaClient } from "@prisma/client";
import { userDB } from "../../prisma/db/User";

const prisma = new PrismaClient();

const testUser: User = {
  id: 0,
  email: "email@gmail.com",
  password: "hunter2",
  role: null,
  firstName: null,
  middleName: null,
  lastName: null,
  address: null,
  phone: null
};

/*
userDB.createUser(testUser)
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
*/

userDB
  .findUser(testUser)
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
