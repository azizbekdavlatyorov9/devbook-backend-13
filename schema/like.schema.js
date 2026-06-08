const { Schema, model } = require("mongoose");

const Like = new Schema(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    citation_id: {
      type: Schema.Types.ObjectId,
      ref: "Citation",
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const LikeSchema = model("Like", Like);
module.exports = LikeSchema;
