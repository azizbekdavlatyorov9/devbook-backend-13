const Like = require("../schema/like.schema");
const CustomErrorHandler = require("../error/error");

const addLike = async (req, res, next) => {
  try {
    const { citation_id } = req.body;
    const user_id = req.user.id;

    const foundedLike = await Like.findOne({
      user_id,
      citation_id,
    });

    if (foundedLike) {
      throw CustomErrorHandler.BadRequest(
        "Siz allaqachon like bosgansiz"
      );
    }

    const like = await Like.create({
      user_id,
      citation_id,
    });

    res.status(201).json({
      message: "Like qo'shildi",
      data: like,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addLike,
};