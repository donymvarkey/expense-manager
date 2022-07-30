import {
  loginStart,
  loginFailure,
  loginSuccess,
  logoutSuccess,
} from "./userRedux";
import {
  saveExpenseStart,
  saveExpenseSuccess,
  saveExpenseFailure,
} from "./expenseRedux";
import { publicRequest, userRequest } from "../requestMethods";

export const login = async (dispatch, navigate, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data.data));
    navigate("/");
  } catch (error) {
    dispatch(loginFailure(error));
  }
};

export const saveExpense = async (dispatch, expenses) => {
  dispatch(saveExpenseStart());
  try {
    const res = await userRequest.post("/expenses", expenses);
    dispatch(saveExpenseSuccess(res.data.data));
  } catch (error) {
    dispatch(saveExpenseFailure(error));
  }
};

export const logout = async (dispatch) => {
  dispatch(logoutSuccess());
};
