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
