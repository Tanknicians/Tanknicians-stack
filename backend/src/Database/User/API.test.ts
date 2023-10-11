import { create, read, update, deleteOne, search } from "./API";
import { CreateUser, UpdateUser, SearchSchema } from "src/zodTypes";

// we need to keep track of the id of the user to delete later
let createUserId: number;

const createUser: CreateUser = {
  firstName: "USER_TEST",
  middleName: "USER_TEST",
  lastName: "USER_TEST",
  address: "USER_TEST",
  phone: "11111111111",
  isEmployee: false,
};

describe("User CRUD operations", () => {

  describe("User CRUD testing suite can now be run:", () => {

    it("should create a User", async () => {
      const result = await create(createUser);
      expect(result.message).toBe("User created successfully");
      expect(result.id).toBeDefined();
      createUserId = result.id;
    });

    it("should read a User", async () => {
      const result = await read(createUserId);
      expect(result).toBeDefined();
    });

    it("should update a User", async () => {
      const { isEmployee, ...data } = createUser;
      const updateData: UpdateUser = {
       ...data,
        isEmployee: true
      };
      const result = await update(createUserId, updateData);
      expect(result.message).toBe("User updated successfully");
    });

    it("should search for Users", async () => {
      const searchCriteria: SearchSchema = {
        page: 1,
        size: 5,
        searchString: "USER_TEST",
      };
      const result = await search(searchCriteria);
      expect(result).toBeDefined();
    });

    it("should delete a User", async () => {
      const result = await deleteOne(createUserId);
      expect(result.message).toBe("User deleted successfully");
    });
  });
});
