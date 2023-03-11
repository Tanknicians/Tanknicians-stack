import * as bcrypt from "bcrypt";

async function compareHash() {
  const password = "password";
  const hashTest = await bcrypt.hash("password", 10);

  const isCompare = await bcrypt.compare(password, hashTest);

  console.log(password + " " + hashTest + " " + isCompare);
}
