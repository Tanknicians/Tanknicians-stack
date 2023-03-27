import { Request, Response } from "express";
import * as UserDB from "../../../prisma/db/User";

// For when the ID is already known, use FIND.
export async function find(req: Request, res: Response) {
  const { id } = req.body;
  const err: string = `User with id: ${id} not found.`;

  const user = await UserDB.find(id);
  if (!user) {
    console.error(err);
    res.json({ success: false, message: err });
  }

  res.send(user);
}

// Search requires a STRING and searches all columns of User
export async function search(req: Request, res: Response) {
  const { search } = req.body;
  const err: string = `User with search: "${search}" not found.`;

  const result = await UserDB.search(search);
  if (!result) {
    console.error(err);
    res.json({ success: false, message: err });
  }

  res.send(result);
}
