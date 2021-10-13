import {
  ACADEMY_REQUEST,
  ACADEMY_SUCCESS,
  ACADEMY_FAIL,
  NEW_ACADEMY_REQUEST,
  NEW_ACADEMY_SUCCESS,
  NEW_ACADEMY_RESET,
  NEW_ACADEMY_FAIL,
  DELETE_ACADEMY_REQUEST,
  DELETE_ACADEMY_SUCCESS,
  DELETE_ACADEMY_RESET,
  DELETE_ACADEMY_FAIL,
  DETAIL_ACADEMY_REQUEST,
  DETAIL_ACADEMY_SUCCESS,
  DETAIL_ACADEMY_FAIL,
  UPDATE_ACADEMY_REQUEST,
  UPDATE_ACADEMY_SUCCESS,
  UPDATE_ACADEMY_FAIL,
  UPDATE_ACADEMY_RESET,
  CLEAR_ERRORS,
} from "../../types/pelatihan/academy.type";

import axios from "axios";

export const getAllAcademy =
  (page = null, keyword = "", limit = null, token) =>
  async dispatch => {
    try {
      dispatch({ type: ACADEMY_REQUEST });

      let link = process.env.END_POINT_API_PELATIHAN + `api/v1/akademi/find?`;
      if (page) link = link.concat(`&page=${page}`);
      if (keyword) link = link.concat(`&cari=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: ACADEMY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ACADEMY_FAIL,
        payload: error.message,
      });
    }
  };

export const getDetailAcademy = (id, token) => async dispatch => {
  try {
    let link =
      process.env.END_POINT_API_PELATIHAN + `api/v1/akademi/detail?id=${id}`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: DETAIL_ACADEMY_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_ACADEMY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newAcademy = (academyData, token) => async dispatch => {
  try {
    dispatch({
      type: NEW_ACADEMY_REQUEST,
    });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_PELATIHAN + "api/v1/akademi/create",
      academyData,
      config
    );

    dispatch({
      type: NEW_ACADEMY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_ACADEMY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateAcademy = (academyData, token) => async dispatch => {
  try {
    dispatch({
      type: UPDATE_ACADEMY_REQUEST,
    });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_PELATIHAN + `api/v1/akademi/update`,
      academyData,
      config
    );

    dispatch({
      type: UPDATE_ACADEMY_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ACADEMY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteAcademy = (id, token) => async dispatch => {
  try {
    dispatch({ type: DELETE_ACADEMY_REQUEST });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.delete(
      process.env.END_POINT_API_PELATIHAN + `api/v1/akademi/delete?id=${id}`,
      config
    );

    dispatch({
      type: DELETE_ACADEMY_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ACADEMY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async dispatch => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
