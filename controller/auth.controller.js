const CustomErrorHandler = require("../error/error");
const AuthSchema = require("../schema/auth.schema");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/email-sender");
const jwt = require("jsonwebtoken");

const Register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const foundedUser = await AuthSchema.findOne({
      email,
    });

    if (foundedUser) {
      throw CustomErrorHandler.UnAuthorized("User already exists");
    }
    const randomCode = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 9),
    ).join("");

    const dateNow = Date.now() + 120000;

    const hashPassword = await bcrypt.hash(password, 12);

    await sendEmail(email, randomCode);

    await AuthSchema.create({
      username,
      email,
      password: hashPassword,
      otp: randomCode,
      otpTime: dateNow,
    });
    res.status(201).json({
      message: "Registered",
    });
  } catch (err) {
    next(err);
  }
};

const Verify = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const foundedUser = await AuthSchema.findOne({ email });

    if (!foundedUser) {
      throw CustomErrorHandler.UnAuthorized("User not found");
    }

    if (foundedUser.otpTime < Date.now()) {
      throw CustomErrorHandler.UnAuthorized("Code expired");
    }

    if (foundedUser.otp !== code) {
      throw CustomErrorHandler.UnAuthorized("Wrong code");
    }

    const payload = {
      id: foundedUser._id,
      email: foundedUser.email,
      role: foundedUser.role,
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "15d",
    });

    await AuthSchema.findByIdAndUpdate(foundedUser._id, {
      otp: "",
      otpTime: 0,
    });

    res.status(200).json({
      message: "Success",
      token,
    });
  } catch (error) {
    next(error)
  }
};

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundedUser = await AuthSchema.findOne({ email });

    if (!foundedUser) {
      throw CustomErrorHandler.UnAuthorized("User not found");
    }
    const decode = await bcrypt.compare(password, foundedUser.password);

    if (decode) {
      const randomCode = Array.from({ length: 6 }, () =>
        Math.floor(Math.random() * 9),
      ).join("");

      const dateNow = Date.now() + 120000;

      await sendEmail(email, randomCode);

      await AuthSchema.findByIdAndUpdate(foundedUser._id, {
        otp: randomCode,
        otpTime: dateNow,
      });
      res.status(200).json({
        message: "Please check your email for the code",
      });
    } else {
      throw CustomErrorHandler.UnAuthorized("Wrong password");
    }
  } catch (error) {
   next(error)
  }
};

module.exports = {
  Register,
  Login,
  Verify,
};
