const returnResponse = require("../utils/response/ResponseHandler");
const ExpenseModel = require("../models/Expenses");

const createExpense = async (req, res, next) => {
  const { amount, description, category, month } = req.body;
  try {
    if (!amount || !description || !category || !month) {
      return returnResponse(
        400,
        "Please provide all the required fields",
        null,
        res
      );
    }
    const expense = await ExpenseModel.create({
      amount,
      description,
      category,
      month,
      userId: req.user.id,
    });
    returnResponse(200, "Expense added.", expense, res);
  } catch (error) {
    next(error);
  }
};
const getExpenses = async (req, res, next) => {
  try {
    const expenses = await ExpenseModel.find({ userId: req.user.id });
    returnResponse(200, "Expenses fetched.", expenses, res);
  } catch (error) {
    next(error);
  }
};
const getExpense = async (req, res, next) => {
  const { id } = req.params;
  try {
    const expenses = await ExpenseModel.find({ userId: req.user.id, _id: id });
    returnResponse(200, "Expenses fetched.", expenses, res);
  } catch (error) {
    next(error);
  }
};
const deleteExpense = async (req, res, next) => {};

module.exports = {
  createExpense,
  getExpense,
  getExpenses,
  deleteExpense,
};
