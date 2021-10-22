import {
  MITRA_SITE_REQUEST,
  MITRA_SITE_SUCCESS,
  MITRA_SITE_FAIL,
  GET_LIST_MITRA_SITE_REQUEST,
  GET_LIST_MITRA_SITE_SUCCESS,
  GET_LIST_MITRA_SITE_FAIL,
  GET_LIST_FIELD_REQUEST,
  GET_LIST_FIELD_SUCCESS,
  GET_LIST_FIELD_FAIL,
  DETAIL_MITRA_SITE_REQUEST,
  DETAIL_MITRA_SITE_SUCCESS,
  DETAIL_MITRA_SITE_FAIL,
  DETAIL_MITRA_SITE_RESET,
  DELETE_MITRA_SITE_SUCCESS,
  DELETE_MITRA_SITE_FAIL,
  DELETE_MITRA_SITE_REQUEST,
  DELETE_MITRA_SITE_RESET,
  POST_MITRA_SITE_REQUEST,
  POST_MITRA_SITE_SUCCESS,
  POST_MITRA_SITE_FAIL,
  POST_MITRA_SITE_RESET,
  UPDATE_MITRA_SITE_REQUEST,
  UPDATE_MITRA_SITE_SUCCESS,
  UPDATE_MITRA_SITE_FAIL,
  UPDATE_MITRA_SITE_RESET,
  LIMIT_CONFIGURATION,
  SET_PAGE,
  SEARCH_COORPORATION,
  CLEAR_ERRORS,
} from "../../../types/site-management/user/mitra-site.type";

import axios from "axios";

export const getAllMitraSite = (token) => async (dispatch, getState) => {
  try {
    dispatch({ type: MITRA_SITE_REQUEST });

    let pageState = getState().allMitraSite.page || 1;
    let keywordState = getState().allMitraSite.keyword || "";
    let limitState = getState().allMitraSite.limit || 5;

    const params = {
      page: pageState,
      keyword: keywordState,
      limit: limitState,
    };

    const { data } = await axios.get(
      `${process.env.END_POINT_API_SITE_MANAGEMENT}api/user-mitra/all`,
      {
        params,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: MITRA_SITE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MITRA_SITE_FAIL,
    });
  }
};

export const postMitraSite = (sendData, token) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: POST_MITRA_SITE_REQUEST,
      });
      const { data } = await axios.post(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/user-mitra/store`,
        sendData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: POST_MITRA_SITE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_MITRA_SITE_FAIL,
      });
    }
  };
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

export const getDetailMitraSite = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: DETAIL_MITRA_SITE_REQUEST,
    });
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    let link =
      process.env.END_POINT_API_SITE_MANAGEMENT + `api/user-mitra/detail/${id}`;

    const { data } = await axios.get(link, config);

    dispatch({
      type: DETAIL_MITRA_SITE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("error", error);
    dispatch({
      type: DETAIL_MITRA_SITE_FAIL,
      payload: error.response.data.message,
    });
  }
};
