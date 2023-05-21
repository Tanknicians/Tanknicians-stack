import { RefreshToken, PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// CREATE
export async function create(refreshToken: Omit<RefreshToken, 'id'>) {
    console.log(refreshToken);
    await prisma.refreshToken.create({
      data: {
        ...refreshToken
      }
    });
  }
  
  // READ (we find refreshTokens by the associated loginID foreign key)
  export async function read(loginId: number) {
    return await prisma.refreshToken.findUnique({
      where: {
        loginId: loginId
      }
    });
  }
  
  // UPDATE
  export async function update(refreshToken: RefreshToken) {
    await prisma.refreshToken.update({
      where: {
        id: refreshToken.id
      },
      data: refreshToken
    });
  }
  
  // DELETE
  // single-word convention broken because of "delete" being a reserved word
  export async function deleteRefreshToken(id: number) {
    await prisma.refreshToken.delete({
      where: {
        id: id
      }
    });
  }
  
  // ALL
  export async function getAll() {
    return await prisma.refreshToken.findMany();
  }
  
  export * as refreshTokenDB from './RefreshToken';
  