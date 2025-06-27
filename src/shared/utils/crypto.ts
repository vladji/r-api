import bcrypt from "bcrypt";

const saltRounds = 10;

export const createHash = async (password: string) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(password, salt);
  console.log("hash", hash);
  return hash;
};

export const checkPassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

// const pass = "";
// createHash(pass);
