import bcrypt from "bcrypt";

export const hashPassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) reject(err);
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) reject(err);
        resolve(hash);
      });
    });
  });
};

export const comparePassword = async (password, hashed) => {
  return await bcrypt.compare(password, hashed);
};
