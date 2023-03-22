import { Login, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// CREATE
export async function createLogin(login: Login) {
  await prisma.login.create({
    // note: originally was set to {data: login} but throws an insane error if not created explicitly this way
    data: {
      email: login.email,
      password: login.password,
      role: login.role,
    },
  });
}

// READ
export async function findLogin(login: Login) {
  if (login.email === null) return;
  try {
    return await prisma.login.findUnique({
      where: {
        email: login.email,
      },
    });
  } catch (error) {
    console.log(error);
  }
}

export async function getAllLogins() {
  return await prisma.login.findMany();
}

// UPDATE
export async function updateLogin(login: Login) {
  await prisma.login.update({
    where: {
      id: login.id,
    },
    data: login,
  });
}

// DELETE
export async function deleteLogin(login: Login) {
  await prisma.login.delete({
    where: {
      id: login.id,
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
            Loginname: login.Loginname,
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
            Loginname: login.Loginname,
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

export * as loginDB from "./Login";
