const { Router } = require("express")
const { addLike } = require("../controller/like.controller");
const authorization = require("../middlewares/authorization");

const likeRouter = Router();

likeRouter.post("/like", authorization, addLike);

module.exports = likeRouter;
