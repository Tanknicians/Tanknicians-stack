import * as Prisma from "@prisma/client";
import { tankDB } from "prisma/db/TankMetadata";
import { TRPCError } from "@trpc/server";

export async function create(tank: Omit<Prisma.TankMetadata, "id">) {
  try {
    await tankDB.create(tank);
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
    const tank = await tankDB.read(id);
    if (!tank) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `TankMetadata with id: ${id} not found.`,
      });
    }
    return tank;
  } catch (e) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An error occured during read",
      cause: e,
    });
  }
}

export async function update(tank: Prisma.TankMetadata) {
  try {
    await tankDB.update(tank);
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
    await tankDB.deleteTankMetadata(id);
  } catch (e) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An error occured during delete.",
      cause: e,
    });
  }
}

/*
  // Search requires any STRING and searches all columns
  export async function search(search: string) {
    try {
      const searchData = tankDB.search(search)
      if (!searchData) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: `No searchTankMetadata from search found.`,
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
  */
