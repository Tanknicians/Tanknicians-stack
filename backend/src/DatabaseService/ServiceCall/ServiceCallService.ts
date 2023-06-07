import * as Prisma from "@prisma/client";
import { serviceCallDB } from "prisma/db/ServiceCall";
import { TRPCError } from "@trpc/server";

export async function create(serviceCall: Omit<Prisma.ServiceCall, "id">) {
  try {
    await serviceCallDB.create(serviceCall);
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
    const serviceCall = await serviceCallDB.read(id);
    if (!serviceCall) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `ServiceCall with id: ${id} not found.`,
      });
    }
    return serviceCall;
  } catch (e) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "An error occured during read",
      cause: e,
    });
  }
}

export async function update(serviceCall: Prisma.ServiceCall) {
  try {
    await serviceCallDB.update(serviceCall);
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
    await serviceCallDB.deleteServiceCall(id);
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
      const searchData = serviceCallDB.search(search)
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
  */
