import { User, PrismaClient } from "@prisma/client";
import { userDB } from "../../prisma/db/User";

const prisma = new PrismaClient();

let testUser: User = {
  id: 0,
  email: "email@gmail.com", // this has to be unique each time else it won't create a login!
  password: "hunter2",
  token: "hereisthetoken",
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
