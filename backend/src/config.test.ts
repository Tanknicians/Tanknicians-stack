import "./config";

test("do not load jwt_secret", () => {
  expect(process.env.JWT_SECRET).not.toBe(null || "" || undefined);
});
