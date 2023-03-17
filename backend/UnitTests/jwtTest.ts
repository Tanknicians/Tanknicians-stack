import { User } from "@prisma/client";
import * as jwtService from "../JWTService";

const testUser: User = {
  id: 0,
  email: "email@mail.com",
  password: "butt",
  role: null,
  firstName: null,
  middleName: null,
  lastName: null,
  address: null,
  phone: null
};

//NOTE: To test on JWT.IO, copy/paste the "Secret" on the right-hand space under 'Verifiy Signature'




console.log("Token: " + jwtService.generateToken(testUser, 'secret'));
