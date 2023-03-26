
// The proof of this shows that JWT_SECRET is "undefined" without the 'require' statement.

test("do not load jwt_secret", () => {
    expect(process.env.JWT_SECRET).toBe(null || "" || undefined);
})

test("load jwt_secret", () => {
    require('dotenv').config()
    expect(process.env.JWT_SECRET).not.toBe(null || "" || undefined);
  });
  
