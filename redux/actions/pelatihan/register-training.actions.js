import {
  GET_FORM_BUILDER_SUCCESS,
  GET_FORM_BUILDER_FAIL,
  GET_PELATIHAN_SUCCESS,
  GET_PELATIHAN_FAIL,
  PENDAFTARAN_PELATIHAN_REQUEST,
  PENDAFTARAN_PELATIHAN_SUCCESS,
  PENDAFTARAN_PELATIHAN_RESET,
  PENDAFTARAN_PELATIHAN_FAIL,
  CLEAR_ERRORS,
} from "../../types/pelatihan/register-training.type";
import {
  GET_FORM_REGISTER,
  STORE_FORM_REGISTER,
} from "../../types/pelatihan/function.type";

import axios from "axios";

export const getFormRegister = () => async (dispatch) => {
  dispatch({
    type: GET_FORM_REGISTER,
    payload: [],
  });
};

export const storeFormRegister = (data) => async (dispatch) => {
  dispatch({
    type: STORE_FORM_REGISTER,
    payload: data,
  });
};

export const getFormBuilder = (token, id) => async (dispatch) => {
  try {
    let link =
      process.env.END_POINT_API_PELATIHAN +
      `/api/v1/pelatihan/get-step-dua?pelatian_id=${id}`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: GET_FORM_BUILDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_FORM_BUILDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getPelatihan = (token, id) => async (dispatch) => {
  try {
    let link =
      process.env.END_POINT_API_PELATIHAN +
      `/api/v1/pelatihan/get-step-satu?pelatian_id=${id}`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: GET_PELATIHAN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PELATIHAN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newPendaftaranPelatihan =
  (pendaftaranData, token) => async (dispatch) => {
    try {
      dispatch({
        type: PENDAFTARAN_PELATIHAN_REQUEST,
      });

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.post(
        process.env.END_POINT_API_PELATIHAN + "api/v1/formPendaftaran/create",
        pendaftaranData,
        config
      );

      dispatch({
        type: PENDAFTARAN_PELATIHAN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PENDAFTARAN_PELATIHAN_FAIL,
        payload: error.response.data.message,
      });
    }
  };
