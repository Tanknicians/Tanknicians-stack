import { userDB } from "../../prisma/db/User";
// in here we may or may not use axios
import { User } from "@prisma/client";
import { compare } from "bcrypt";
import { generateToken } from "../JWTService";


export async function loginUserService() {

    const testUser: User = {
      id: 0,
      email: "testemail@gmail.com",
      password: "hunter2",
      role: null,
      firstName: null,
      middleName: null,
      lastName: null,
      address: null,
      phone: null
    };
  
    try {
      // using PRISMA db function
      const user = await userDB.findUser(testUser);
      if (user != null) {
        console.log(`User found: ${user.email}`);
        // required to make sure the Promises are not null
        if (testUser.password != null && user.password != null) {
          const isCompared = await compare(testUser.password, user.password);
          if (isCompared) {
            console.log("Sending token.");
            // UPDATE: sends the user data as a generated token instead of a simple JSON
            console.log(generateToken(user, "secret"));
          } else {
            console.log("Invalid login");
          }
        }
      } else {
        console.log(`User with email: ${testUser.email} not found.`);
      }
    } catch (error) {
      console.log(error);
    }
  }

loginUserService();