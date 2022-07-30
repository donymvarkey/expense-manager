const User = require("../models/User");
const bcrypt = require("bcrypt");
const returnResponse = require("../utils/response/ResponseHandler");

const updateUserDetails = async (req, res, next) => {
  const { id } = req.params;
  if (req.body.password) {
    const hashedPassword = await bcrypt.hashSync(password, 10);
    req.body.password = hashedPassword;
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true }
    );
    returnResponse(200, "User updated successfully", updatedUser, res);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    returnResponse(200, "User deleted successfully", null, res);
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    const { password, ...userData } = user._doc;
    returnResponse(200, "User fetched successfully", userData, res);
  } catch (error) {
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  const { query } = req.query;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    const userArray = [];
    users.map((user) => {
      userArray.push({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username: user.username,
        id: user._id,
        isAdmin: user.isAdmin,
      });
    });

    returnResponse(200, "User fetched successfully", userArray, res);
  } catch (error) {
    next(error);
  }
};

const getUserStats = async (req, res, next) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await User.aggregate([
      {
        $match: {
          createdAt: { $gte: lastYear },
        },
      },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);

    returnResponse(200, "Stats fetched.", data, res);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  updateUserDetails,
  deleteUser,
  getUser,
  getAllUsers,
  getUserStats,
};
