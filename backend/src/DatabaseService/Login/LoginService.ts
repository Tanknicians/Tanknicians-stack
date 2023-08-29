import * as Prisma from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { loginDB } from "./../../../prisma/db/Login";

export async function create(login: Omit<Prisma.Login, "id">) {
  try {
    await loginDB.create(login);
    return { message: "Login created successfully" };
  } catch (e) {
    throw new Error("An error occurred during create.");
  }
}

export async function read(email: string) {
  try {
    const login = await loginDB.read(email);
    if (!login) {
      throw new Error(`Login with email: ${email} not found.`);
    }
    return login;
  } catch (e) {
    throw new Error("An error occurred during read.");
  }
}

export async function update(login: Prisma.Login) {
  try {
    login.password = await bcrypt.hash(login.password, 10);
    await loginDB.update(login);
    return { message: "Login updated successfully" };
  } catch (e) {
    throw new Error("An error occurred during update.");
  }
}

export async function deleteOne(id: number) {
  try {
    await loginDB.deleteLogin(id);
    return { message: "Login deleted successfully" };
  } catch (e) {
    throw new Error("An error occurred during delete.");
  }
}

export async function search(search: string, page: number) {
  try {
    const searchData = loginDB.searchByString(search, page);
    if (!searchData) {
      throw new Error("No searchUser from search found.");
    }
    return searchData;
  } catch (e) {
    throw new Error("An error occurred during search.");
  }
}
