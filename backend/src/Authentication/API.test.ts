import { generateRandomPassword, resetPassword } from './API';
import { verifyRefreshToken } from './../Token/Generator';

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
    const refreshToken: string = 'faketoken';
    // Act
    // Assert
    expect(() => {
      verifyRefreshToken(refreshToken);
    }).toThrow('Refresh token verification failed');
  });

  it('throws error when email not found on password reset', async () => {
    // Arrange
    const badEmail = '';
    // Act
    // Assert
    expect(async () => {
      await resetPassword(badEmail);
    }).rejects.toThrow(`login not found for email ${badEmail}`);
  });

  // Commented until i learn how to mock
  // it('returns email success response on reset flow completed', async () => {
  //   // Arrange
  //   // Note that this email pw gets overwritten so
  //   // we need to own this email if we expect to be able to use the new password
  //   const goodEmail = 'tanknicians.testing+reset@gmail.com';
  //   const expected: string = 'OK';

  //   // Act
  //   const received = await resetPassword(goodEmail);
  //   // Assert
  //   expect(received).toContain(expected);
  // });
});
