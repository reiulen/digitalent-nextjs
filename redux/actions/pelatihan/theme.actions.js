import {
  THEME_REQUEST,
  THEME_SUCCESS,
  THEME_FAIL,
  NEW_THEME_REQUEST,
  NEW_THEME_SUCCESS,
  NEW_THEME_RESET,
  NEW_THEME_FAIL,
  DELETE_THEME_REQUEST,
  DELETE_THEME_SUCCESS,
  DELETE_THEME_RESET,
  DELETE_THEME_FAIL,
  DETAIL_THEME_REQUEST,
  DETAIL_THEME_SUCCESS,
  DETAIL_THEME_FAIL,
  UPDATE_THEME_REQUEST,
  UPDATE_THEME_SUCCESS,
  UPDATE_THEME_FAIL,
  UPDATE_THEME_RESET,
  CLEAR_ERRORS,
} from "../../types/pelatihan/theme.type";

import axios from "axios";

export const getAllTheme =
  (page = 1, keyword = "", akademi = null, status = null, limit = 5, token) =>
  async (dispatch) => {
    try {
      dispatch({ type: THEME_REQUEST });

      let link = process.env.END_POINT_API_PELATIHAN + `api/v1/tema/find?`;
      if (page) link = link.concat(`&page=${page}`);
      if (keyword) link = link.concat(`&cari=${keyword}`);
      if (akademi) link = link.concat(`&akademi=${akademi}`);
      if (status) link = link.concat(`&status=${status}`);
      if (limit) link = link.concat(`&limit=${limit}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: THEME_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: THEME_FAIL,
        payload: error.message,
      });
    }
  };

export const getDetailTheme = (id, token) => async (dispatch) => {
  try {
    let link =
      process.env.END_POINT_API_PELATIHAN + `api/v1/tema/detail?id=${id}`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: DETAIL_THEME_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_THEME_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newTheme = (themeData, token) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_THEME_REQUEST,
    });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_PELATIHAN + "api/v1/tema/create",
      themeData,
      config
    );

    dispatch({
      type: NEW_THEME_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_THEME_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateTheme = (themeData, token) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_THEME_REQUEST,
    });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_PELATIHAN + `api/v1/akademi/update`,
      themeData,
      config
    );

    dispatch({
      type: UPDATE_THEME_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_THEME_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteTheme = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_THEME_REQUEST });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.delete(
      process.env.END_POINT_API_PELATIHAN + `api/v1/tema/delete?id=${id}`,
      config
    );

    dispatch({
      type: DELETE_THEME_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: DELETE_THEME_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
