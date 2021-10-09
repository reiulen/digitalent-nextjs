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
  DELETE_PAGE_REQUEST,
  DELETE_PAGE_SUCCESS,
  DELETE_PAGE_FAIL,
} from "../../../types/site-management/settings/page.type";
import axios from "axios";

export const fetchPage = (token) => {
  return async (dispatch, getState) => {
    let keyword = getState().allPage.keyword || "";
    let limit = getState().allPage.limit || 5;
    let perPage = getState().allPage.page || 1;

    const params = {
      cari: keyword,
      limit: limit,
      page: perPage,
    };
    try {
      dispatch({
        type: PAGE_REQUEST,
      });
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
      console.log("berhasil");
    } catch (error) {
      dispatch({
        type: PAGE_FAIL,
        payload: error.response.data.message,
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

export const limitCooporation = (value) => {
  return {
    type: LIMIT_CONFIGURATION,
    limitValue: value,
  };
};

export const searchCooporation = (text) => {
  return {
    type: SEARCH_COORPORATION,
    text,
  };
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
export const deletePage = (id, token) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: DELETE_PAGE_REQUEST,
      });
      const { data } = await axios.post(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-page/delete/${id}`,
        null,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: DELETE_PAGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_PAGE_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};
