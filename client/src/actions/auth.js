import axios from "axios";
import { setAlert } from "./alert";
import setAuthToken from "../helpers/setAuthToken";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from "../actions/types";
// Show user
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get("APIs/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
// Register action
export const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const user = JSON.stringify({
      name,
      email,
      password,
    });
    const config = { headers: { "Content-Type": "application/json" } };

    try {
      const res = await axios.post("APIs/users", user, config);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => {
          dispatch(setAlert(error.msg, "danger"));
        });
      }

      dispatch({
        type: REGISTER_FAIL,
      });
    }
  };

// Login action
export const login = (email, password) => async (dispatch) => {
  const user = JSON.stringify({
    email,
    password,
  });
  const config = { headers: { "Content-Type": "application/json" } };

  try {
    const res = await axios.post("APIs/auth", user, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error.msg, "danger"));
      });
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

// LOGOUT
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
  dispatch({ type: CLEAR_PROFILE });
};
