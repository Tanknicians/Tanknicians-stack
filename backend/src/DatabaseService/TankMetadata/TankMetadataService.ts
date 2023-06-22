import * as Prisma from "@prisma/client";
import { tankDB } from "./../../../prisma/db/TankMetadata";

export async function create(tank: Omit<Prisma.TankMetadata, "id">) {
  try {
    await tankDB.create(tank);
    return { message: "TankMetadata created successfully" };
  } catch (e) {
    throw new Error("An error occurred during create.");
  }
}

export async function read(id: number) {
  try {
    const tank = await tankDB.read(id);
    if (!tank) {
      throw new Error(`TankMetadata with id: ${id} not found.`);
    }
    return tank;
  } catch (e) {
    throw new Error("An error occurred during read.");
  }
}

export async function update(tank: Prisma.TankMetadata) {
  try {
    await tankDB.update(tank);
    return { message: "TankMetadata updated successfully" };
  } catch (e) {
    throw new Error("An error occurred during update.");
  }
}

export async function deleteOne(id: number) {
  try {
    await tankDB.deleteTankMetadata(id);
    return { message: "TankMetadata deleted successfully" };
  } catch (e) {
    throw new Error("An error occurred during delete.");
  }
}

export async function search(search: string) {
  try {
    const searchData = tankDB.searchByString(search);
    if (!searchData) {
      throw new Error("No TankMetadata from search found.");
    }
    return searchData;
  } catch (e) {
    throw new Error("An error occurred during search.");
  }
}
