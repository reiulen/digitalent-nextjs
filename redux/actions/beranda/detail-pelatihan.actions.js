import {
  DETAIL_PELATIHAN_REQUEST,
  DETAIL_PELATIHAN_SUCCESS,
  DETAIL_PELATIHAN_FAIL,
  CEK_REGISTER_PELATIHAN_REQUEST,
  CEK_REGISTER_PELATIHAN_SUCCESS,
  CEK_REGISTER_PELATIHAN_FAIL,
  CLEAR_ERRORS,
} from "../../types/beranda/detail-pelatihan.type";

import axios from "axios";

// GET DETAIL PELATIHAN
export const getDetailPelatihan =
  (id, token = "") =>
  async (dispatch) => {
    try {
      let link =
        process.env.END_POINT_API_PELATIHAN +
        `api/v1/pelatihan/get-pelatihan?pelatian_id=${id}`;
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.get(link);
      dispatch({
        type: DETAIL_PELATIHAN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DETAIL_PELATIHAN_FAIL,
        payload: error.message,
      });
    }
  };

// CHECK REGISTER PELATIHAN
export const checkRegisterPelatihan = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: CEK_REGISTER_PELATIHAN_REQUEST,
    });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    let link =
      process.env.END_POINT_API_PELATIHAN +
      `api/v1/formPendaftaran/cek-pendaftaran?pelatian_id=${id}`;

    const { data } = await axios.get(link, config);
    dispatch({
      type: CEK_REGISTER_PELATIHAN_SUCCESS,
      payload: data,
    });

    if (data) {
      return data;
    }
  } catch (error) {
    dispatch({
      type: CEK_REGISTER_PELATIHAN_FAIL,
      payload: error.message,
    });

    if (error) {
      return error.response.data;
    }
  }
};

// Clear Error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
