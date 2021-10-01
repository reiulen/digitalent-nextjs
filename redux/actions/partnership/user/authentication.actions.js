import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REGISTER_PROCESS,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_PROCESS,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_PROCESS,
  RECOVERY_PASSWORD_SUCCESS,
  RECOVERY_PASSWORD_ERROR,
  RECOVERY_PASSWORD_PROCESS,
} from "../../../types/partnership/user/authentication.type";
import axios from "axios";

export const mitraRegister = (formData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: REGISTER_PROCESS,
      });
      const { data } = await axios.post(
        `${process.env.END_POINT_API_PARTNERSHIP_MITRA}api/authentication/register`,
        formData
      );
      dispatch({
        type: REGISTER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REGISTER_ERROR,
        payload: error.response.data.message,
      });
    }
  };
};
export const vericationEmail = (formData) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: RECOVERY_PASSWORD_PROCESS,
      });
      const { data } = await axios.post(
        `${process.env.END_POINT_API_PARTNERSHIP_MITRA}api/authentication/forgot-password`,
        formData
      );
      dispatch({
        type: RECOVERY_PASSWORD_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: RECOVERY_PASSWORD_ERROR,
        payload: error.response.data.message,
      });
    }
  };
};
