import { generateRandomPassword } from './API';
import * as AuthService from './API';
import { AuthLogin, AuthRegister } from '../zodTypes';
import { Response } from 'express';
import { verifyRefreshToken } from './../Token/Generator';
import { JwtPayload } from 'jsonwebtoken';

describe('authentication api', () => {
  it('generates a utf8 string of length 16 when passed 16 as the length argument', () => {
    // Arrange
    const expected = 16;
    // Act
    const actual: string = generateRandomPassword(16);
    // Assert
    expect(actual.length).toBe(expected);
    console.log(actual);
  });

  it('throws error when token invalid', () => {
    // Arrange
    const email = 'testemail@gmail.com';
    const refreshToken: string = 'faketoken';
    // Act
    // Assert
    expect(() => {
      verifyRefreshToken(refreshToken);
    }).toThrow('Refresh token verification failed');
  });
});
