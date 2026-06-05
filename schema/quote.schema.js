const {Schema, model } = require("mongoose");

const Quote = new Schema(
  {
    text: {
      type: String,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const QuoteSchema = model("Quote", Quote);
module.exports = QuoteSchema;
