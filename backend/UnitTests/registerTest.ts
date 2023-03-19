import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { userDB } from "../../prisma/db/User";

// import { PrismaClient } from "@prisma/client";

// const prisma = new PrismaClient();

const testUser: User = {
  id: 0,
  email: "testemail@gmail.com",
  password: "hunter2",
  role: "admin",
  firstName: "john",
  middleName: "dude",
  lastName: "man",
  address: "11111 orlando",
  phone: 4206969
};

export async function registerUserService(testUser: User) {

  // THIS CANNOT BE STATIC
  let parsedUser: User = {
    id: 0,
    email: testUser.email,
    password: testUser.password,
    role: testUser.role,
    firstName: testUser.firstName,
    middleName: testUser.middleName,
    lastName: testUser.lastName,
    address: testUser.address,
    phone: testUser.phone
  };


  // not allowed to register an empty password
  if (parsedUser.password != null && parsedUser.password != "") {
    parsedUser.password = await hash(parsedUser.password, 10);
  } else {
    console.log("Password cannot be empty.");
    return;
  }

  try {
    userDB.createUser(parsedUser);
  } catch (error) {
    console.log(error);
    return;
  }
}


registerUserService(testUser);