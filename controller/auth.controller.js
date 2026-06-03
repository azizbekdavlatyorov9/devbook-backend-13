const User = require("../schema/users.schema");
const bcrypt = require("bcryptjs");
const { v4 } = require("uuid");
const jwt = require("jsonwebtoken");

const Register = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      message: "username, email, password are required",
    });
  }
  try {
    const foundedEmail = await User.findOne({
      email,
    });

    if (foundedEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      id: v4(),
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    return res.status(201).json({
      message: "Registered",
    });
  } catch (err) {
    next(err);
  }
};

const Login = async (req, res, next) => {
  const { email, password } = req.body;

  const foundedUser = await User.findOne({ email });

  if (!foundedUser) {
    return res.status(401).json({
      message: "User not found",
    });
  }

  const checkPassword = await bcrypt.compare(password, foundedUser.password);

  if (checkPassword) {
    const payload = { id: foundedUser.id, email: foundedUser.email };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Success",
      token,
    });
  } else {
    return res.status(401).json({
      message: "Wrong password",
    });
  }
};

module.exports = {
  Register,
  Login,
};
