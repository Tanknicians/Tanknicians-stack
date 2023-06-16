import * as Prisma from "@prisma/client";
import { loginDB } from "./../../../prisma/db/Login";
import { TRPCError } from "@trpc/server";

export async function create(login: Omit<Prisma.Login, "id">) {
  try {
    await loginDB.create(login);
  } catch (e) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An error occured during create.",
      cause: e,
    });
  }
}

export async function read(email: string) {
  try {
    const login = await loginDB.read(email);
    if (!login) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Login with email: ${email} not found.`,
      });
    }
    return login;
  } catch (e) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An error occured during read",
      cause: e,
    });
  }
}

export async function update(login: Prisma.Login) {
  try {
    await loginDB.update(login);
  } catch (e) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An error occured during update.",
      cause: e,
    });
  }
}

export async function deleteOne(id: number) {
  try {
    await loginDB.deleteLogin(id);
  } catch (e) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An error occured during delete.",
      cause: e,
    });
  }
}


// Search requires any STRING and searches all string-based columns
  export async function search(search: string) {
    try {
      const searchData = loginDB.searchByString(search)
      if (!searchData) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No searchUser from search found.`,
        });
      }
      return searchData;
    } catch(e) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "An error occured during search.",
        cause: e,
      });
    }
  }

