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

export const getDetailsExportData =
  (id, token, page = 1, cari = "", limit = 5) =>
  async (dispatch) => {
    const params = {
      page: page,
      cari: cari,
      limit: limit,
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
        payload: data.exports,
      });
    } catch (error) {
      dispatch({
        type: DETAIL_EXPORT_DATA_FAIL,
      });
    }
  };

export const postFilterExportData = (token, datas, page = 1, limit = 5) => async (dispatch) => {
  try {
    dispatch({
      type: POST_EXPORT_DATA_REQUEST,
    });
    const config = {
      params: {
        page, 
        limit
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    let link = process.env.END_POINT_API_SITE_MANAGEMENT + `api/export/store`;

    const  data  = await axios.post(link, datas, config);
    
    
    if(datas.button_type === 1){
      var url = data.config.url;
      fetch(url, {
        body: JSON.stringify(datas),
        headers: {
          authorization: `Bearer ${token}`,
        },
        method: "POST",
      })
        .then((response) => response.blob())
        .then((blob) => {
          var _url = window.URL.createObjectURL(blob);
          window.open(_url, "_blank").focus();
        })
        .catch((error) => {
        });
    }

    dispatch({
      type: POST_EXPORT_DATA_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    Swal.fire("Ooppss", JSON.stringify(error.message), "error").then(() => {
    });
    dispatch({
      type: POST_EXPORT_DATA_FAIL,
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
      let { data } = await axios.get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/export/download/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      window.open(data.data, "_blank");
    } catch (error) {
      alert(error.response.data.message);
    }
  };
};
