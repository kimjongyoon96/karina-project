import bcrypt from "bcryptjs";

export const hashPassWord = async (password: string) => {
  const saltRounds: number = 10;
  const hash: string = await bcrypt.hash(password, saltRounds);
  return hash;
};

export const verifyPassword = async (
  password: string,
  hash: string
): Promise<boolean> => {
  const isMatch: boolean = await bcrypt.compare(password, hash);
  return isMatch;
};
