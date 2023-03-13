// in here we may or may not use axios
import { User } from "@prisma/client";
import { Request, Response } from "express";
import * as userDB from "../../prisma/db/User";
import { compare, hash } from "bcrypt";

export async function loginUserService(req: Request, res: Response) {
  const parsedUser: User = {
    id: 0,
    email: req.body.email,
    password: req.body.password,
    token: null,
  };

  try {
    // using PRISMA db function
    const user = await userDB.findUser(parsedUser);
    if (user != null) {
      console.log(`User found: ${user.email}`);
      // required to make sure the Promises are not null
      if (parsedUser.password != null && user.password != null) {
        const isCompared = await compare(parsedUser.password, user.password);
        if (isCompared) {
          console.log("Sending token.");
          res.send(user);
        } else {
          res.send("Invalid login");
        }
      }
    } else {
      throw console.error(`User with email: ${parsedUser.email} not found.`);
    }
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

export async function findUserService(req: Request, res: Response) {
  const { email } = req.body;
  try {
    // using PRISMA db function
    const user = await userDB.findUser(email);
    if (user != null) {
      res.send(user);
    } else {
      throw console.error(`User with email: ${email} not found.`);
    }
  } catch (error) {
    res.send(error);
  }
}

// this should be a private function that cannot be used by a front-end until future expansion
export async function registerUserService(req: Request, res: Response) {
  const parsedUser: User = {
    id: 0,
    email: req.body.email,
    password: req.body.password,
    token: null,
  };
  // not allowed to register an empty password
  if (parsedUser.password != null && parsedUser.password != "") {
    parsedUser.password = await hash(parsedUser.password, 10);
  } else {
    res.send("Password cannot be empty.");
  }

  try {
    userDB.createUser(parsedUser);
  } catch (error) {
    res.send(error);
  }
}
