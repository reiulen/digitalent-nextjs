import {
  // MITRA
  MITRA_REQUEST,
  MITRA_SUCCESS,
  MITRA_FAIL,

  // NEW MITRA
  NEW_MITRA_REQUEST,
  NEW_MITRA_SUCCESS,
  NEW_MITRA_RESET,
  NEW_MITRA_FAIL,

  // EDIT MITRA
  DETAIL_MITRA_REQUEST,
  DETAIL_MITRA_SUCCESS,
  DETAIL_MITRA_FAIL,

  // update
  UPDATE_MITRA_REQUEST,
  UPDATE_MITRA_SUCCESS,
  UPDATE_MITRA_FAIL,
  UPDATE_MITRA_RESET,

  // delete
  DELETE_MITRA_REQUEST,
  DELETE_MITRA_SUCCESS,
  DELETE_MITRA_FAIL,

  // dashboard card count
  CARD_TOTAL_MITRA_REQUEST,
  CARD_TOTAL_MITRA_SUCCESS,
  CARD_TOTAL_MITRA_FAIL,
  // ...
  CARD_ACTIVE_MITRA_REQUEST,
  CARD_ACTIVE_MITRA_SUCCESS,
  CARD_ACTIVE_MITRA_FAIL,
  // ...
  CARD_NON_ACTIVE_MITRA_REQUEST,
  CARD_NON_ACTIVE_MITRA_SUCCESS,
  CARD_NON_ACTIVE_MITRA_FAIL,

  // ------
  CLEAR_ERRORS,
} from "../../types/partnership/mitra.type";

import axios from "axios";

export const getAllMitra =
  (page = 1, keyword = "", limit = 5, card = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: MITRA_REQUEST });

      let link =
        process.env.END_POINT_API_PARTNERSHIP + `/api/partners?page=${page}`;
      if (keyword) link = link.concat(`&keyword=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);
      if (card) link = link.concat(`&card=${card}`);

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

export const newMitra = (newMitraData) => async (dispatch) => {
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
      process.env.END_POINT_API_PARTNERSHIP + "/api/partners/create",
      newMitraData
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

export const getDetailMitra = (id) => async (dispatch) => {
  try {
    let link = process.env.END_POINT_API_PARTNERSHIP + `/api/partners/${id}`;

    const { data } = await axios.get(link);

    dispatch({
      type: DETAIL_MITRA_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_MITRA_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const updateMitra = (id, updateMitraRes) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_MITRA_REQUEST,
    });

    const { data } = await axios.put(
      process.env.END_POINT_API_PARTNERSHIP + `/api/partners/${id}`,
      updateMitraRes
    );

    dispatch({
      type: UPDATE_MITRA_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_MITRA_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteMitra = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_MITRA_REQUEST });

    const { data } = await axios.delete(
      process.env.END_POINT_API_PARTNERSHIP + `/api/partners/${id}`
    );

    dispatch({
      type: DELETE_MITRA_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: DELETE_MITRA_FAIL,
      payload: error.response.data.message,
    });
  }
};

//dashboard card
export const getTotalMitra = () => async (dispatch) => {
  try {
    dispatch({ type: CARD_TOTAL_MITRA_REQUEST });

    let link =
      process.env.END_POINT_API_PARTNERSHIP +
      `/api/partners/?card=non-active&page=1&limit=1&card=all`;

    const { data } = await axios.get(link);

    dispatch({
      type: CARD_TOTAL_MITRA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CARD_TOTAL_MITRA_FAIL,
      payload: error.message,
    });
  }
};

export const getActiveMitra = () => async (dispatch) => {
  try {
    dispatch({ type: CARD_ACTIVE_MITRA_REQUEST });

    let link =
      process.env.END_POINT_API_PARTNERSHIP +
      `/api/partners/?card=non-active&page=1&limit=1&card=active`;

    const { data } = await axios.get(link);

    dispatch({
      type: CARD_ACTIVE_MITRA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CARD_ACTIVE_MITRA_FAIL,
      payload: error.message,
    });
  }
};

export const getNonActiveMitra = () => async (dispatch) => {
  try {
    dispatch({ type: CARD_NON_ACTIVE_MITRA_REQUEST });

    let link =
      process.env.END_POINT_API_PARTNERSHIP +
      `/api/partners/?card=non-active&page=1&limit=1&card=non-active`;

    const { data } = await axios.get(link);

    dispatch({
      type: CARD_NON_ACTIVE_MITRA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CARD_NON_ACTIVE_MITRA_FAIL,
      payload: error.message,
    });
  }
};
