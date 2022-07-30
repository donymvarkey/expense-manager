const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const returnResponse = require("../utils/response/ResponseHandler");
const UserModel = require("../models/User");

const signUp = async (req, res, next) => {
  const { firstName, lastName, username, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return returnResponse(400, "Missing required fields", null, res);
  }
  try {
    const isUserExist = await UserModel.findOne({ email });
    if (isUserExist) {
      return returnResponse(400, "User already exist", null, res);
    }
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const newUser = new UserModel({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    if (savedUser) {
      return returnResponse(200, "User created successfully", savedUser, res);
    }
    next();
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return returnResponse(400, "Missing required fields", null, res);
  }

  try {
    const isUserExists = await UserModel.findOne({ email });
    if (!isUserExists) {
      return returnResponse(400, "Invalid Credentials", null, res);
    }
    if (bcrypt.compareSync(password, isUserExists.password)) {
      signiningData = {
        email: isUserExists.email,
        firstName: isUserExists.firstName,
        lastName: isUserExists.lastName,
        id: isUserExists._id,
        isAdmin: isUserExists.isAdmin,
      };

      token = jwt.sign(signiningData, process.env.SIGNATURE);
      signiningData["token"] = token;

      returnResponse(200, "Login Successful", signiningData, res);
    } else {
      returnResponse(400, "Invalid Credentials", null, res);
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signUp,
  login,
};
