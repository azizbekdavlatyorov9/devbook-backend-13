const { required } = require("joi");
const { Schema, model } = require("mongoose");

const Author = new Schema(
  {
    full_name: {
      type: String,
      required: true,
      set: (value) => value.trim(),
      minLength: [3, "Ism kamida 3 ta belgidan iborat bo'lishi kerak"],
      maxLength: 50,
      match: /^[a-zA-Z\s]+$/,
    },
    birth_year: {
      type: Number,
      required: true,
      min: 0,
      max: new Date().getFullYear(),
    },
    death_year: {
      type: Number,
      required: true,
      validate: {
        validator: function (value) {
          return value > this.birth_year;
        },
        message: "O'lim yili tug'ilish yilidan katta bo'lishi kerak",
      },
    },
    bio: {
      type: String,
      required: true,
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
    work: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const AuthorSchema = model("Author", Author);
module.exports = AuthorSchema;
