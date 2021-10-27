import {
  EXPORT_DATA_REQUEST,
  EXPORT_DATA_SUCCESS,
  EXPORT_DATA_FAIL,
  DETAIL_EXPORT_DATA_REQUEST,
  DETAIL_EXPORT_DATA_SUCCESS,
  DETAIL_EXPORT_DATA_FAIL,
  DETAIL_EXPORT_DATA_RESET,
  DELETE_EXPORT_DATA_SUCCESS,
  DELETE_EXPORT_DATA_FAIL,
  DELETE_EXPORT_DATA_REQUEST,
  DELETE_EXPORT_DATA_RESET,
  POST_EXPORT_DATA_REQUEST,
  POST_EXPORT_DATA_SUCCESS,
  POST_EXPORT_DATA_FAIL,
  POST_EXPORT_DATA_RESET,
  UPDATE_EXPORT_DATA_REQUEST,
  UPDATE_EXPORT_DATA_SUCCESS,
  UPDATE_EXPORT_DATA_FAIL,
  UPDATE_EXPORT_DATA_RESET,
  LIMIT_CONFIGURATION,
  SET_PAGE,
  SEARCH_COORPORATION,
  CLEAR_ERRORS,
} from "../../types/site-management/export-data.type";

import axios from "axios";

export const getAllExportData = (token) => async (dispatch, getState) => {
  try {
    dispatch({ type: EXPORT_DATA_REQUEST });

    let pageState = getState().allExportData.page || 1;
    let cariState = getState().allExportData.cari || "";
    let limitState = getState().allExportData.limit || 5;

    const params = {
      page: pageState,
      cari: cariState,
      limit: limitState,
    };

    const { data } = await axios.get(
      `${process.env.END_POINT_API_SITE_MANAGEMENT}api/export/all`,
      {
        params,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: EXPORT_DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: EXPORT_DATA_FAIL,
    });
  }
};

export const deleteExportDataAction = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_EXPORT_DATA_REQUEST });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.delete(
      process.env.END_POINT_API_SITE_MANAGEMENT + `api/export/delete/${id}`,
      config
    );

    dispatch({
      type: DELETE_EXPORT_DATA_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: DELETE_EXPORT_DATA_FAIL,
    });
  }
};

export const getDetailExportData =
  (id, token) => async (dispatch, getState) => {
    let pageState = getState().detailExportData.page || 1;
    let cariState = getState().detailExportData.cari || "";
    let limitState = getState().detailExportData.limit || 5;

    const params = {
      page: pageState,
      cari: cariState,
      limit: limitState,
    };

    try {
      dispatch({
        type: DETAIL_EXPORT_DATA_REQUEST,
      });
      const config = {
        params,
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      let link =
        process.env.END_POINT_API_SITE_MANAGEMENT + `api/export/detail/${id}`;

      const { data } = await axios.get(link, config);

      dispatch({
        type: DETAIL_EXPORT_DATA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DETAIL_EXPORT_DATA_FAIL,
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

export const exportFileCSV = (id, token) => {
  return async () => {
    try {
      let urlExport = await axios.get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/export/download/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      var url = urlExport.config.url;

      fetch(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.blob())
        .then((blob) => {
          var _url = window.URL.createObjectURL(blob);
          window.open(_url, "_blank").focus();
        })
        .catch((error) => {
          alert(error.response.data.message);
        });
    } catch (error) {
      alert(error.response.data.message);
    }
  };
};
