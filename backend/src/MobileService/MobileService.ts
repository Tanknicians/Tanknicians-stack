import * as Prisma from "@prisma/client";
import { serviceCallDB } from "../../prisma/db/ServiceCall";
import { userDB } from "../../prisma/db/User";
import { tankDB } from "../../prisma/db/TankMetadata";
import { ServiceCall } from "../zodTypes";

export async function uploadServiceCall(serviceCall: ServiceCall) {
  const submitServiceCall = checkServiceCall(serviceCall);
  const approvedMessage = serviceCall.isApproved ? "approved" : "not approved";
  try {
    await serviceCallDB.create(submitServiceCall);
    return approvedMessage;
  } catch (e) {
    throw new Error("An error occurred during create.");
  }
}

// run checks on the service call and make sure parameters are valid
function checkServiceCall(serviceCall: ServiceCall): ServiceCall {
  const { alkalinity, calcium, nitrate, phosphate } = serviceCall;

  if (
    alkalinity < paramLimits.alkalinityMin ||
    alkalinity > paramLimits.alkalinityMax ||
    calcium < paramLimits.calciumMin ||
    calcium > paramLimits.calciumMax ||
    nitrate < paramLimits.nitrateMin ||
    nitrate > paramLimits.nitrateMax ||
    phosphate < paramLimits.phosphateMin ||
    phosphate > paramLimits.phosphateMax
  ) {
    serviceCall.isApproved = false;
  }

  // return the flagged/unflagged service call
  return serviceCall;
}

const paramLimits = {
  /*
    a.    Calcium at or below 400 and at or above 500 
    b.    Alkalinity at or below 6.5 and at or above 11
    c.    Nitrate at or below 1 and at or above 20
    d.    Phosphate at or below .03 and at or above .24
  */
  calciumMin: 400,
  calciumMax: 500,
  alkalinityMin: 6.5,
  alkalinityMax: 11,
  nitrateMin: 1,
  nitrateMax: 20,
  phosphateMin: 0.03,
  phosphateMax: 0.24,
};

export async function getAllUsers() {
  try {
    return await userDB.getAll();
  } catch (error) {
    return { error: "Failed to get users." };
  }
}

export async function searchUsers(search: string) {
  if (search === "" || search == null)
    return { invalid: "search string cannot be empty" };
  try {
    return await userDB.searchByString(search);
  } catch (error) {
    return { error: "Failed to search users." };
  }
}

export async function getAllTanks() {
  try {
    return await tankDB.getAll();
  } catch (error) {
    return { error: "Failed to get tank list." };
  }
}

export async function getTanksByUserId(userId: number) {
  if (userId < 1) return { invalid: "userId must be a positive integer." };
  try {
    return await tankDB.readTanksByUserId(userId);
  } catch (error) {
    return { error: "Could not get tanks from user ID" };
  }
}

// removed unused code