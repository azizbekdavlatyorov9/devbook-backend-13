const jwt = require("jsonwebtoken");
const CustomErrorHandler = require("../error/error");

module.exports = function adminChecker(req, res, next) {
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

    
    if (req.user.role !== "admin" || req.user.role !== "superadmin") {
      throw CustomErrorHandler.Forbidden("You are not admin or superadmin");
    }
    
    next();
  } catch (error) {
    next(error);
  }
};
