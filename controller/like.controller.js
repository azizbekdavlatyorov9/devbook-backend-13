const CustomErrorHandler = require("../error/error");
const CitationSchema = require("../schema/citation.schema");
const LikeSchema = require("../schema/like.schema");
const mongoose = require("mongoose");

const Like = async (req, res) => {
  try {
    const { id } = req.params;

    const foundedCitation = await CitationSchema.findOne({
      _id: id,
    });
    if (!foundedCitation) {
      throw CustomErrorHandler.NotFound("Citation not found");
    }

    const foundedUserLike = await LikeSchema.find({ user_id: req.user.id });
    

    if (foundedUserLike.length === 0) {
      await LikeSchema.create({
        user_id: req.user.id,
        citation_id: id,
      });
    }

    const objectId = new mongoose.Types.ObjectId(id);

    const userLikes = await foundedUserLike.find((like) => like.citation_id.equals(objectId));

    if(userLikes){
      await LikeSchema.findByIdAndDelete(userLikes._id
      )
    }else(
      await LikeSchema.create({
        user_id: req.user.id,
        citation_id: id,
      })
    )
    

    res.status(200).json({
      message: "OK",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  Like,
};
