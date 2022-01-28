import {
  GENERAL_REQUEST,
  GENERAL_SUCCESS,
  GENERAL_FAIL,
  DETAIL_GENERAL_REQUEST,
  DETAIL_GENERAL_SUCCESS,
  DETAIL_GENERAL_FAIL,
  DETAIL_GENERAL_RESET,
  DELETE_GENERAL_SUCCESS,
  DELETE_GENERAL_FAIL,
  DELETE_GENERAL_REQUEST,
  DELETE_GENERAL_RESET,
  POST_GENERAL_REQUEST,
  POST_GENERAL_SUCCESS,
  POST_GENERAL_FAIL,
  POST_GENERAL_RESET,
  UPDATE_GENERAL_REQUEST,
  UPDATE_GENERAL_SUCCESS,
  UPDATE_GENERAL_FAIL,
  UPDATE_GENERAL_RESET,
  LIMIT_CONFIGURATION,
  SET_PAGE,
  SEARCH_COORPORATION,
  DATA_GENERAL_REQUEST,
  DATA_GENERAL_SUCCESS,
  DATA_GENERAL_FAIL,
  CLEAR_ERRORS,
} from "../../../types/site-management/settings/general.type";

import axios from "axios";

export const getAllGeneral =
  (page = 1, cari = "", limit = 5, token, tokenPermission) =>
    async (dispatch) => {
      try {
        dispatch({ type: GENERAL_REQUEST });
        let link =
          process.env.END_POINT_API_SITE_MANAGEMENT +
          `api/setting-page/all?page=${page}`;
        if (cari) link = link.concat(`&cari=${cari}`);
        if (limit) link = link.concat(`&limit=${limit}`);

        const config = {
          headers: {
            Authorization: "Bearer " + token,
            Permission: tokenPermission,
          },
        };

        const { data } = await axios.get(link, config);

        dispatch({
          type: GENERAL_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: GENERAL_FAIL,
        });
      }
    };

export const getDataGeneral = (token, tokenPermission) =>
  async (dispatch) => {
    try {
      dispatch({ type: DATA_GENERAL_REQUEST });
      let link =
        process.env.END_POINT_API_SITE_MANAGEMENT +
        `sso/api/setting/general/get`;

      const config = {
        headers: {
          Authorization: "Bearer " + token,
          Permission: tokenPermission,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: DATA_GENERAL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DATA_GENERAL_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const deleteGeneral = (id, token, tokenPermission) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_GENERAL_REQUEST });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
        Permission: tokenPermission,
      },
    };

    const { data } = await axios.delete(
      process.env.END_POINT_API_SITE_MANAGEMENT +
      `api/setting-page/delete/${id}`,
      config
    );

    dispatch({
      type: DELETE_GENERAL_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: DELETE_GENERAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const postGeneral = (sendData, token, tokenPermission) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: POST_GENERAL_REQUEST,
      });
      const { data } = await axios.post(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-page/store`,
        sendData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            Permission: tokenPermission,
          },
        }
      );
      dispatch({
        type: POST_GENERAL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_GENERAL_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const getDetailGeneral = (id, token, tokenPermission) => async (dispatch) => {
  try {
    dispatch({
      type: DETAIL_GENERAL_REQUEST,
    });
    const config = {
      headers: {
        Authorization: "Bearer " + token,
        Permission: tokenPermission,
      },
    };

    let link =
      process.env.END_POINT_API_SITE_MANAGEMENT +
      `api/setting-page/detail/${id}`;

    const { data } = await axios.get(link, config);

    dispatch({
      type: DETAIL_GENERAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_GENERAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateGeneral = (sendData, id, token, tokenPermission) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_GENERAL_REQUEST,
    });
    const config = {
      headers: {
        Authorization: "Bearer " + token,
        Permission: tokenPermission,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_SITE_MANAGEMENT +
      `api/setting-page/update/${id}`,
      sendData,
      config
    );

    dispatch({
      type: UPDATE_GENERAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_GENERAL_FAIL,
      payload: error.response.data.message,
    });
  }
};
