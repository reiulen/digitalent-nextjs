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
  (page = 1, keyword = "", limit = 5, token) =>
  async (dispatch) => {
    try {
      dispatch({ type: THEME_REQUEST });

      let link = process.env.END_POINT_API_PELATIHAN + `api/tema?page=${page}`;
      if (keyword) link = link.concat(`&keyword=${keyword}`);
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
    let link = process.env.END_POINT_API_PELATIHAN + `api/tema/${id}`;

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
      process.env.END_POINT_API_PELATIHAN + "api/tema",
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

export const updateTheme = (id, themeData, token) => async (dispatch) => {
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
      process.env.END_POINT_API_PELATIHAN + `api/tema/${id}`,
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
      process.env.END_POINT_API_PELATIHAN + `api/tema/${id}`,
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
