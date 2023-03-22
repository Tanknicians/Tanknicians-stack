// in here we may or may not use axios
import { Login } from "@prisma/client";
import { Request, Response } from "express";
import * as loginDB from "../../prisma/db/Login";
import { compare, hash } from "bcrypt";
import { generateToken } from "../JWTService";

// needed for the JWT secret
require("dotenv").config();

export async function login(req: Request, res: Response) {
  const parsedLogin: Login = {
    id: 0,
    email: req.body.email,
    password: req.body.password,
    role: null,
    userId: null,
  };

  try {
    // using PRISMA db function
    const login = await loginDB.find(parsedLogin);
    if (login != null) {
      // required to make sure the Promises are not null
      if (parsedLogin.password != null && login.password != null) {
        compare(parsedLogin.password, login.password, (error, data) => {
          if (error) throw error;
          if (data) {
            return res.status(200).send({
              token: generateToken(login, process.env.JWT_SECRET || ""),
            });
          } else {
            return res.status(401).json({ error: "Invalid login" });
          }
        });
      }
    } else {
      return res.status(401).send({ error: "Login not found." });
    }
  } catch (error) {
    res.status(401).send({ error: error });
    throw error;
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
    userId: req.body.personId,
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
