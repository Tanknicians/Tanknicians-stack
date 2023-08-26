describe("environment variables", () => {
  test("include jwt_secret", () => {
    expect(process.env.JWT_SECRET).not.toBe(null || "" || undefined);
  });
});
