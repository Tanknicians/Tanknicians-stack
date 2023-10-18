import { User } from "@prisma/client";
import { userDB } from "../../../prisma/db/User";
import {
  AuthRegister,
  CreateUser,
  SearchSchema,
  UpdateUser,
} from "../../zodTypes";
import { register } from "../../Authentication/API";

export async function create(data: CreateUser) {
  // convert from Zod to Prisma
  const createUser: Omit<CreateUser, "id"> = {
    ...data,
  };

  try {
    const createdId = await userDB.create(createUser);

    if (data.isEmployee) {
      const createEmployeeLogin: AuthRegister = {
        email: data.email,
        role: "EMPLOYEE", // we always assume we're creating an employee
        userId: createdId, // from previously-created User
      };

      try {
        const createdLogin = await register(createEmployeeLogin);
        return {
          message: "User and Employee Login created successfully",
          id: createdId,
          loginId: createdLogin,
        };
      } catch (e) {
        const errorMessage = e instanceof Error ? e.message : "Unknown error.";
        console.error(errorMessage);
        throw new Error(`An error occurred during create: ${errorMessage}`);
      }
    } else {
      return { message: "User created successfully", id: createdId };
    }
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error.";
    console.error(errorMessage);
    throw new Error(`An error occurred during create: ${errorMessage}`);
  }
}

export async function read(id: number) {
  try {
    const user = await userDB.read(id);
    if (!user) {
      throw new Error(`User with id: ${id} not found.`);
    }
    return user;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error.";
    console.error(errorMessage);
    throw new Error(`An error occurred during read: ${errorMessage}`);
  }
}

export async function readAll(includeTanks: boolean, isEmployee?: boolean) {
  try {
    const users = await userDB.getAll(includeTanks, isEmployee);
    return users;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error.";
    console.error(errorMessage);
    throw new Error(`An error occurred during readAll: ${errorMessage}`);
  }
}

export async function update(id: number, data: UpdateUser) {
  // Convert from Zod to Prisma
  const updateUser: User = {
    id,
    ...data,
  };
  try {
    await userDB.update(updateUser);
    return { message: "User updated successfully" };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error.";
    console.error(errorMessage);
    throw new Error(`An error occurred during update: ${errorMessage}`);
  }
}

export async function deleteOne(id: number) {
  try {
    await userDB.deleteUser(id);
    return { message: "User deleted successfully" };
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error.";
    console.error(errorMessage);
    throw new Error(`An error occurred during delete: ${errorMessage}`);
  }
}

export async function search(searchBody: SearchSchema) {
  try {
    const searchData = userDB.search(searchBody);
    if (!searchData) {
      throw new Error("No User from search found.");
    }
    return searchData;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error.";
    console.error(errorMessage);
    throw new Error(`An error occurred during search: ${errorMessage}`);
  }
}
