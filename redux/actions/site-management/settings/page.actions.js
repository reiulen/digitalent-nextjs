// parameter
// cari limit page

import {
  PAGE_REQUEST,
  PAGE_SUCCESS,
  PAGE_FAIL,
  SET_PAGE,
  LIMIT_CONFIGURATION,
  SEARCH_COORPORATION,
  POST_PAGE_REQUEST,
  POST_PAGE_SUCCESS,
  POST_PAGE_FAIL,
  UPDATE_PAGE_REQUEST,
  UPDATE_PAGE_SUCCESS,
  UPDATE_PAGE_FAIL,
  UPDATE_PAGE_RESET,
  DELETE_PAGE_REQUEST,
  DELETE_PAGE_SUCCESS,
  DELETE_PAGE_FAIL,
  DETAIL_PAGE_REQUEST,
  DETAIL_PAGE_SUCCESS,
  DETAIL_PAGE_FAIL,
  CLEAR_ERRORS,
} from "../../../types/site-management/settings/page.type";

import axios from "axios";

export const getAllPage = (token) => async (dispatch, getState) => {
  try {
    dispatch({ type: PAGE_REQUEST });

    let pageState = getState().allPage.page || 1;
    let cariState = getState().allPage.cari || "";
    let limitState = getState().allPage.limit || 5;

    const params = {
      page: pageState,
      cari: cariState,
      limit: limitState,
    };

    const { data } = await axios.get(
      `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-page/all`,
      {
        params,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: PAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAGE_FAIL,
    });
  }
};

export const deletePage = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_PAGE_REQUEST });

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
      type: DELETE_PAGE_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: DELETE_PAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const postPage = (sendData, token) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: POST_PAGE_REQUEST,
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
        type: POST_PAGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_PAGE_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const getDetailPages =
  (id, token = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: DETAIL_PAGE_REQUEST,
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
        type: DETAIL_PAGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DETAIL_PAGE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const updatePage = (sendData, id, token) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_PAGE_REQUEST,
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
      type: UPDATE_PAGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_PAGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

export const searchCooporation = (text) => {
  return {
    type: SEARCH_COORPORATION,
    text,
  };
};

export const limitCooporation = (value) => {
  return {
    type: LIMIT_CONFIGURATION,
    limitValue: value,
  };
};
