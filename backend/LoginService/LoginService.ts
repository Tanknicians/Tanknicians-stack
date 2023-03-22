// in here we may or may not use axios
import { Login } from "@prisma/client";
import { Request, Response } from "express";
import * as loginDB from "../../prisma/db/Login";
import { compare, hash } from "bcrypt";
import { generateToken } from "../JWTService";

// needed for the JWT secret
require('dotenv').config()

export async function login(req: Request, res: Response) {

  const parsedLogin: Login = {
    id: 0,
    email: req.body.email,
    password: req.body.password,
    role: null,
    personId: null
  };

  try {
    // using PRISMA db function
    const login = await loginDB.find(parsedLogin);
    if (login != null) {
      console.log(`login found: ${login.email}`);
      // required to make sure the Promises are not null
      if (parsedLogin.password != null && login.password != null) {
        const isCompared = await compare(parsedLogin.password, login.password);
        if (isCompared) {
          console.log("Sending token.");
          // UPDATE: sends the login data as a generated token instead of a simple JSON
          const secret: string = process.env.JWT_SECRET || "";
          res.status(200).send(
            {
              "token" : generateToken(login, secret)
            });
          return;
        } else {
          res.status(401).send("Invalid login");
        }
      }
    } else {
      res.status(401).send("Invalid login");
      throw console.error(`Login with email: ${parsedLogin.email} not found.`);
    }
  } catch (error) {
    console.log(error);
    res.status(401).send(error);
  }
}

export async function find(req: Request, res: Response) {
  const { email } = req.body;
  try {
    // using PRISMA db function
    const login = await loginDB.find(email);
    if (login != null) {
      res.send(login);
    } else {
      throw console.error(`login with email: ${email} not found.`);
    }
  } catch (error) {
    res.send(error);
  }
}

// this should be a private function that cannot be used by a front-end until future expansion
export async function register(req: Request, res: Response) {

  let parsedLogin: Login = {
    id: 0,
    email: req.body.email,
    password: req.body.password,
    role: req.body.role,
    personId: req.body.personId
  };

  // though a role is required, having a string helps more than "null"
  if (parsedLogin.role == null) {
    res.send("Role cannot be empty.");
    return;
  }

  // not allowed to register an empty password
  if (parsedLogin.password != null && parsedLogin.password != "") {
    parsedLogin.password = await hash(parsedLogin.password, 10);
  } else {
    res.send("Password cannot be empty.");
    return;
  }

  try {
    loginDB.create(parsedLogin);
  } catch (error) {
    res.send(error);
  }
}