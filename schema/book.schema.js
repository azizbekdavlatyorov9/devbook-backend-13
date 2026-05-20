const { Schema, model } = require("mongoose");

const Book = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  published_year: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  genre: {
    type: String,
    required: true,
    // enum: {
    //   values: ["Temuriylar davri", "Jadid davri", "Sovet davri", "Mustaqillik davri"],
    //   default: "Temuriylar davri",
    //   message: "{Values} bunday qiymat ko'rsatilmagan"
    // }
  },
  region: {
    type: String,
    required: true
  },
  language: {
    type: String,
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
})

const BookSchema = model("Book", Book)
module.exports = BookSchema