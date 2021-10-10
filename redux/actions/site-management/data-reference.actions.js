import {
  DATA_REFERENCE_REQUEST,
  DATA_REFERENCE_SUCCESS,
  DATA_REFERENCE_FAIL,
  DETAIL_DATA_REFERENCE_REQUEST,
  DETAIL_DATA_REFERENCE_SUCCESS,
  DETAIL_DATA_REFERENCE_FAIL,
  DETAIL_DATA_REFERENCE_RESET,
  DELETE_DATA_REFERENCE_SUCCESS,
  DELETE_DATA_REFERENCE_FAIL,
  DELETE_DATA_REFERENCE_REQUEST,
  DELETE_DATA_REFERENCE_RESET,
  POST_DATA_REFERENCE_REQUEST,
  POST_DATA_REFERENCE_SUCCESS,
  POST_DATA_REFERENCE_FAIL,
  POST_DATA_REFERENCE_RESET,
  UPDATE_DATA_REFERENCE_REQUEST,
  UPDATE_DATA_REFERENCE_SUCCESS,
  UPDATE_DATA_REFERENCE_FAIL,
  UPDATE_DATA_REFERENCE_RESET,
  LIMIT_CONFIGURATION,
  SET_PAGE,
  SEARCH_COORPORATION,
  CLEAR_ERRORS,
} from "../../types/site-management/data-reference.type";

import axios from "axios";

export const getAllDataReference =
  (page = 1, cari = "", limit = 5, token) =>
  async (dispatch) => {
    try {
      dispatch({ type: DATA_REFERENCE_REQUEST });
      let link =
        process.env.END_POINT_API_SITE_MANAGEMENT +
        `api/setting-page/all?page=${page}`;
      if (cari) link = link.concat(`&cari=${cari}`);
      if (limit) link = link.concat(`&limit=${limit}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: DATA_REFERENCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DATA_REFERENCE_FAIL,
        payload: error.message,
      });
    }
  };

export const deleteDataReference = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_DATA_REFERENCE_REQUEST });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.delete(
      process.env.END_POINT_API_SITE_MANAGEMENT +
        `api/setting-page/delete/${id}`,
      config
    );

    dispatch({
      type: DELETE_DATA_REFERENCE_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: DELETE_DATA_REFERENCE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const postDataReference = (sendData, token) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: POST_DATA_REFERENCE_REQUEST,
      });
      const { data } = await axios.post(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-page/store`,
        sendData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: POST_DATA_REFERENCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_DATA_REFERENCE_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const getDetailDataReference = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: DETAIL_DATA_REFERENCE_REQUEST,
    });
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    let link =
      process.env.END_POINT_API_SITE_MANAGEMENT +
      `api/setting-page/detail/${id}`;

    const { data } = await axios.get(link, config);

    dispatch({
      type: DETAIL_DATA_REFERENCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_DATA_REFERENCE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateDataReference =
  (sendData, id, token) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_DATA_REFERENCE_REQUEST,
      });
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.post(
        process.env.END_POINT_API_SITE_MANAGEMENT +
          `api/setting-page/update/${id}`,
        sendData,
        config
      );

      dispatch({
        type: UPDATE_DATA_REFERENCE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_DATA_REFERENCE_FAIL,
        payload: error.response.data.message,
      });
    }
  };