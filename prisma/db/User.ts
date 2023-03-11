import { User, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// CREATE
export async function createUser(user: User) {
  await prisma.user.create({
    data: user,
  });
}

// READ
export async function findUser(user: User) {
  let findUser = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  });
  return findUser;
}

export async function getAllUsers() {
  return await prisma.user.findMany();
}

// UPDATE
export async function updateUser(user: User) {
  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: user,
  });
}

// DELETE
export async function deleteUser(user: User) {
  await prisma.user.delete({
    where: {
      id: user.id,
    },
  });
}

// currently unused functions
/* 
export async function createCustomerLogin(login: Login, customer: Customer) {
    await prisma.login.create({
        data: {
            password: login.password,
            token: login.token,
            username: login.username,

            customer: {
                connectOrCreate: {
                    where: {
                        id: customer.id
                    },
                    create: {
                        address: customer.address,
                        email: customer.email,
                        firstName: customer.firstName,
                        id: customer.id,
                        lastName: customer.lastName,
                        middleName: customer.middleName,
                        phone: customer.phone
                    }
                }
            }
        }
    })
}

export async function createEmployeeLogin(login: Login, employee: Employee) {
    await prisma.login.create({
        data: {
            password: login.password,
            token: login.token,
            username: login.username,

            employee: {
                connectOrCreate: {
                    where: {
                        id: employee.id
                    },
                    create: {
                        email: employee.email,
                        firstName: employee.firstName,
                        id: employee.id,
                        lastName: employee.lastName,
                        middleName: employee.middleName,
                        phone: employee.phone
                    }
                }
            }
        }
    })
}
*/

export * as userDB from "./User";
