import { serviceCallDB } from "../../../prisma/db/ServiceCall";
import { ServiceCall, ServiceCallCreate } from "src/zodTypes";

export async function create(serviceCall: ServiceCallCreate) {
  try {
    await serviceCallDB.create(serviceCall);
    return { message: "Service Call created successfully" };
  } catch (e) {
    throw new Error("An error occurred during create.");
  }
}

export async function read(id: number) {
  try {
    const serviceCall = await serviceCallDB.read(id);
    if (!serviceCall) {
      throw new Error(`Service Call with id: ${id} not found.`);
    }
    return serviceCall;
  } catch (e) {
    throw new Error("An error occurred during read.");
  }
}

export async function update(serviceCall: ServiceCall) {
  try {
    await serviceCallDB.update(serviceCall);
    return { message: "Service Call updated successfully" };
  } catch (e) {
    throw new Error("An error occurred during update.");
  }
}

export async function deleteOne(id: number) {
  try {
    await serviceCallDB.deleteServiceCall(id);
    return { message: "Service Call deleted successfully" };
  } catch (e) {
    throw new Error("An error occurred during delete.");
  }
}

export async function search(search: string) {
  try {
    const searchData = serviceCallDB.searchByString(search);
    if (!searchData) {
      throw new Error("No Service Call from search found.");
    }
    return searchData;
  } catch (e) {
    throw new Error("An error occurred during search.");
  }
}
