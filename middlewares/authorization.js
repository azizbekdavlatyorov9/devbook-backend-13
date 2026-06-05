const jwt = require("jsonwebtoken");
const CustomErrorHandler = require("../error/error");

module.exports = function authorization(req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      throw CustomErrorHandler.BadRequest("No token provided");
    }
    const bearer = authorization.split(" ")[0];
    const token = authorization.split(" ")[1];

    if (bearer !== "Bearer" || !token) {
      throw CustomErrorHandler.BadRequest("Invalid token");
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;

    next();
  } catch (error) {
    next(error);
  }
};
