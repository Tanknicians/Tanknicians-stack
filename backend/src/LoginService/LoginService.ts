// in here we may or may not use axios
import * as Prisma from "@prisma/client";
import { Request, Response } from "express";
import * as LoginDB from "../../prisma/db/Login";
import * as bcrypt from "bcrypt";
import * as TokenGenerator from "../TokenGenerator";

export async function login(req: Request, res: Response) {
  // Construct user login model for Prisma
  const userLogin: Prisma.Login = {
    id: 0,
    email: req.body.email,
    password: req.body.password,
    role: null,
    userId: null,
  };

  // Check that user completed credentials
  if (userLogin.email == null || userLogin.password == null) {
    console.error("Email or pw is nullish");
    return res.status(401).send("Invalid login");
  }

  // Retrieve user saved credentials based on username/email
  const savedCredentials = await LoginDB.find(userLogin);

  // Confirm user credentials existed in full in DB
  if (!savedCredentials) {
    console.error(`Login with email: ${userLogin.email} not found.`);
    return res.status(401).send("No record found for given credentials");
  }
  if (!(savedCredentials.email && savedCredentials.password)) {
    console.error("record email or pw is nullish");
    return res.status(401).send("User record incomplete");
  }

  console.log(`login found for ${userLogin.email}`);

  let token: string;
  bcrypt.compare(
    userLogin.password,
    savedCredentials.password,
    function (err, result) {
      if (err) {
        console.error(err);
        return res.status(401).send(err);
      }
      if (!result) {
        // response is OutgoingMessage object that server response http request
        return res.json({ success: false, message: "passwords do not match" });
      }

      console.log("Generating token.");

      // UPDATE: sends the login data as a generated token instead of a simple JSON
      token = TokenGenerator.generateJWT(savedCredentials);
      if (!token) {
        return res.status(401).send("Could not generate token");
      }
      return res.status(200).json({
        token: token,
      });
    }
  );
}

export async function find(req: Request, res: Response) {
  const { email } = req.body;
  const err: string = `login with email: ${email} not found.`;

  const login = await LoginDB.find(email);
  if (!login) {
    console.error(err);
    res.json({ success: false, message: err });
  }

  res.send(login);
}

// this should be a private function that cannot be used by a front-end until future expansion
export async function register(req: Request, res: Response) {
  let parsedLogin: Prisma.Login = {
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
  if (parsedLogin.password) {
    parsedLogin.password = await bcrypt.hash(parsedLogin.password, 10);
  } else {
    res.send("Password cannot be empty.");
    return;
  }

  try {
    LoginDB.create(parsedLogin);
  } catch (error) {
    res.send(error);
  }
}
