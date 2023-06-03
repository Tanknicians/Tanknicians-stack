import { faker } from "@faker-js/faker";
import { Role } from "@prisma/client";
import { authRouter } from "./AuthRoutes";
import '@types/jest'

class MockUser {
  email: string;
  password: string;
  id: number;
  role: Role;
  userId: number;

  constructor(role: Role) {
    this.email = faker.internet.email();
    this.password = faker.internet.password();
    this.id = faker.datatype.number();
    this.userId = 1;
    this.role = role;
  }

  public getAdminUser() {
    return {
      id: this.id,
      email: this.email,
      password: this.password,
      role: this.role,
      userId: this.userId,
    };
  }
  public getAdminUserData() {
    const { id, ...adminUserData } = this.getAdminUser();
    return adminUserData;
  }
  public createCaller() {
    return authRouter.createCaller({
      jwtPayload: {
        id: this.id,
        email: this.email,
        role: this.role,
        userId: this.userId,
      },
    });
  }
}

describe("User creation management", () => {
  const adminUser = new MockUser(Role.ADMIN);
  const caller = adminUser.createCaller();

  test("should create a user", async () => {
    await caller.register(adminUser.getAdminUserData());
  });
});

describe("User login management", () => {
  const adminUser = new MockUser(Role.ADMIN);
  const caller = adminUser.createCaller();

  beforeAll(async () => {
    await caller.register(adminUser.getAdminUserData());
  });

  test("should login a user", async () => {
    const result = await caller.login({
      email: adminUser.email,
      password: adminUser.password,
    });
    expect(result.savedCredentials.role).toEqual(adminUser.role);
    expect(result.savedCredentials.email).toEqual(adminUser.email);
    expect(result.savedCredentials.userId).toEqual(adminUser.userId);
  });
});
