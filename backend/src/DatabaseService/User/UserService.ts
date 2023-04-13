import { Request, Response } from 'express';
import * as UserDB from '../../../prisma/db/User';
import * as Prisma from '@prisma/client';
import { TRPCError } from '@trpc/server';

export async function read(id: number) {
  try {
    const user = await UserDB.read(id);
    if (!user) {
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: `User with id: ${id} not found.`
      });
    }
    return user;
  } catch (e) {
    throw new TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'An error occured during read',
      cause: e
    });
  }
}

// Search requires any STRING and searches all columns
export async function search(search: string) {}
