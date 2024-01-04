const jwt = require("jsonwebtoken");

const createAccessToken = (payload) => {
  if (!process.env.TOKEN_SECRET) {
    throw new Error("TOKEN_SECRET is not defined in the environment");
  }
  return new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      {
        expiresIn: "1d",
      },
      (err, token) => {
        if (err) reject(err);
        resolve(token);
      }
    );
  });
};

module.exports = createAccessToken;
