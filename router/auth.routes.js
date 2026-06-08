const { Router } = require("express");
const { Register, Login, Verify, Logout } = require("../controller/auth.controller");
const authValidateMiddleware = require("../middlewares/auth.validate.middleware");
const refreshToken = require("../middlewares/refresh-token");

const authRouter = Router();
authRouter.post("/register", authValidateMiddleware, Register);
authRouter.post("/verify", Verify);
authRouter.post("/login", Login);
authRouter.get("/refresh", refreshToken);
authRouter.get("/logout", Logout)


module.exports = authRouter;
