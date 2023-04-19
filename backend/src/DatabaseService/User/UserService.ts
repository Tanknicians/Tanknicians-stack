import { userDB } from "../../../prisma/db/User";
import * as Prisma from "@prisma/client";
import { TRPCError } from "@trpc/server";

export async function create(user: Omit<Prisma.User, "id">) {
  try {
    await userDB.create(user);
  } catch (e) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An error occured during create.",
      cause: e,
    });
  }
}

export async function read(id: number) {
  try {
    const user = await userDB.read(id);
    if (!user) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `User with id: ${id} not found.`,
      });
    }
    return user;
  } catch (e) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An error occured during read",
      cause: e,
    });
  }
}

export async function update(user: Prisma.User) {
  try {
    await userDB.update(user);
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
    await userDB.deleteUser(id);
  } catch (e) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An error occured during delete.",
      cause: e,
    });
  }
}

// Search requires any STRING and searches all columns
export async function search(search: string) {
  try {
    const searchData = userDB.search(search);
    if (!searchData) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "No searchUser from search found.",
      });
    }
    return searchData;
  } catch (e) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An error occured during search.",
      cause: e,
    });
  }
}
