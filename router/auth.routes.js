const { Router } = require("express");
const { Register, Login, Verify } = require("../controller/auth.controller");
const authValidateMiddleware = require("../middlewares/auth.validate.middleware");

const authRouter = Router();
authRouter.post("/register", authValidateMiddleware, Register);
authRouter.post("/verify", Verify);
authRouter.post("/login", Login);

module.exports = authRouter;
