import {
  // MITRA
  MITRA_REQUEST,
  MITRA_SUCCESS,
  MITRA_FAIL,
  CLEAR_ERRORS,

  // NEW MITRA
  NEW_MITRA_REQUEST,
  NEW_MITRA_SUCCESS,
  NEW_MITRA_RESET,
  NEW_MITRA_FAIL,
} from "../../types/partnership/mitra.type";

import axios from "axios";

export const getAllMitra = () => async (dispatch) => {
  try {
    dispatch({ type: MITRA_REQUEST });

    let link = process.env.END_POINT_API_PARTNERSHIP + `api/partner?page=1`;
    // if (keyword) link = link.concat(`&keyword=${keyword}`)
    // if (limit) link = link.concat(`&limit=${limit}`)

    // const config = {
    //     headers: {
    //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
    //         'Access-Control-Allow-Origin': '*',
    //         'apikey': process.env.END_POINT_KEY_AUTH
    //     }
    // }

    const { data } = await axios.get(link);

    dispatch({
      type: MITRA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MITRA_FAIL,
      payload: error.message,
    });
  }
};

export const newMitra = (mitraData, id) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_MITRA_REQUEST,
    });

    // const config = {
    //     headers: {
    //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
    //         'Access-Control-Allow-Origin': '*',
    //         'apikey': process.env.END_POINT_KEY_AUTH
    //     }
    // }

    const { data } = await axios.post(
      process.env
        .END_POINT_API_PARTNERSHIP`/api/cooperation/proposal/submit-document/${id}`,
      mitraData
    );

    dispatch({
      type: NEW_MITRA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_MITRA_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
