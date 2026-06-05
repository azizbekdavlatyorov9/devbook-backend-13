const { Schema, model } = require("mongoose");

const Book = new Schema(
  {
    title: {
      type: String,
      required: true,
      minlength: [3, "Kitob nomi kamida 3 ta belgidan iborat bo'lishi kerak"],
      maxlength: 150,
    },
    period: {
      type: String,
      required: true,
      default: "Temuriylar davri",
      enum: {
        values: [
          "Temuriylar davri",
          "Jadid davri",
          "Sovet davri",
          "Mustaqillik davri",
        ],
        message: "{VALUE} bunday qiymat ko'rsatilmagan",
      },
    },
    published_year: {
      type: Number,
      required: true,
      min: 0,
      max: new Date().getFullYear(),
    },
    pages: {
      type: Number,
      required: true,
      max: 10000,
    },
    publisher: {
      type: String,
      required: true,
    },
    genres: {
      type: String,
      required: true,
      enum: {
        values: [
          "fantastik",
          "badiiy",
          "drama",
          "melodrama",
          "detektiv",
          "sarguzasht",
          "tarixiy",
          "ilmiy-fantastik",
        ],
        message: "{VALUE} bunday qiymat ko'rsatilmagan",
      },
    },
    details: {
      type: String,
      required: true,
    },
    author_info: {
      type: Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
    quotes:[
      {
        type: Schema.Types.ObjectId,
        ref: "Quote",
      }
    ]
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const BookSchema = model("Book", Book);
module.exports = BookSchema;
