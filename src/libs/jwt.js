const jwt = require("jsonwebtoken");

const createAccessToken = (payload) => {
  if (!process.env.TOKEN_SECRET) {
    throw new Error("TOKEN_SECRET is not defined in the environment");
  }

  token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: "1d" });
  return token;
};

module.exports = createAccessToken;
