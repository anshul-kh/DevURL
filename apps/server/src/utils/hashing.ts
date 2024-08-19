import * as bcrypt from "bcryptjs";

export const encrypt = async (pass: string): Promise<string | null> => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(pass, salt);
    return hash;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const compare = async (pass: string, hash: string): Promise<boolean> => {
  try {
    const res = await bcrypt.compare(pass, hash);
    return res;
  } catch (err) {
    return false;
  }
};
