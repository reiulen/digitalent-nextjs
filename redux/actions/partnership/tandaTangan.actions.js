import {
  TANDA_TANGAN_REQUEST,
  TANDA_TANGAN_SUCCESS,
  TANDA_TANGAN_FAIL,
  NEW_TANDA_TANGAN_REQUEST,
  NEW_TANDA_TANGAN_SUCCESS,
  NEW_TANDA_TANGAN_FAIL,
  CLEAR_ERRORS,
  DELETE_TANDA_TANGAN_REQUEST,
  DELETE_TANDA_TANGAN_SUCCESS,
  DELETE_TANDA_TANGAN_FAIL,
} from "../../types/partnership/tandaTangan.type";

import axios from "axios";

// get all data
// (page = 1), (keyword = ""), (limit = 5);
export const getAllTandaTangan = () => async (dispatch) => {
  try {
    dispatch({ type: TANDA_TANGAN_REQUEST });

    let link = process.env.END_POINT_API_PARTNERSHIP + `/api/signatures`;
    // if (keyword) link = link.concat(`&keyword=${keyword}`);
    // if (limit) link = link.concat(`&limit=${limit}`);
    // let link = process.env.END_POINT_API_PUBLIKASI + `api/artikel`

    // const config = {
    //     headers: {
    //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
    //         'Access-Control-Allow-Origin': '*',
    //         'apikey': process.env.END_POINT_KEY_AUTH
    //     }
    // }

    const { data } = await axios.get(link);

    dispatch({
      type: TANDA_TANGAN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TANDA_TANGAN_FAIL,
      payload: error.message,
    });
  }
};

export const newTandaTangan = (tandaTanganData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_TANDA_TANGAN_REQUEST,
    });

    // const config = {
    //     headers: {
    //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
    //         'Access-Control-Allow-Origin': '*',
    //         'apikey': process.env.END_POINT_KEY_AUTH
    //     }
    // }

    const { data } = await axios.post(
      process.env.END_POINT_API_PARTNERSHIP + "/api/signatures",
      tandaTanganData
    );

    dispatch({
      type: NEW_TANDA_TANGAN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_TANDA_TANGAN_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteTandaTangan = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TANDA_TANGAN_REQUEST });

    const { data } = await axios.delete(
      process.env.END_POINT_API_PARTNERSHIP + `/api/signatures/${id}`
    );

    dispatch({
      type: DELETE_TANDA_TANGAN_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TANDA_TANGAN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
