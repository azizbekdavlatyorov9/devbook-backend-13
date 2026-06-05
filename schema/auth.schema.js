const { Schema, model } = require("mongoose");

const Auth = new Schema(
  {
    username: {
      type: String,
      required: true,
      set: (value) => value.trim(),
      minLength: [3, "Ism kamida 3 ta belgidan iborat bo'lishi kerak"],
      maxLength: 50,
      match: /^[a-zA-Z\s]+$/,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: false,
    },
    otpTime: {
      type: BigInt,
      required: false,
    },
    role: {
      type: String,
      required: true,
      default: "user",
      enum: ["admin", "user", "superadmin"],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

const AuthSchema = model("Auth", Auth);
module.exports = AuthSchema;
