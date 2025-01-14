import {
  API_REQUEST,
  API_SUCCESS,
  API_FAIL,
  GET_LIST_API_REQUEST,
  GET_LIST_API_SUCCESS,
  GET_LIST_API_FAIL,
  GET_LIST_FIELD_REQUEST,
  GET_LIST_FIELD_SUCCESS,
  GET_LIST_FIELD_FAIL,
  DETAIL_API_REQUEST,
  DETAIL_API_SUCCESS,
  DETAIL_API_FAIL,
  DETAIL_API_RESET,
  DELETE_API_SUCCESS,
  DELETE_API_FAIL,
  DELETE_API_REQUEST,
  DELETE_API_RESET,
  POST_API_REQUEST,
  POST_API_SUCCESS,
  POST_API_FAIL,
  POST_API_RESET,
  UPDATE_API_REQUEST,
  UPDATE_API_SUCCESS,
  UPDATE_API_FAIL,
  UPDATE_API_RESET,
  LIMIT_CONFIGURATION,
  SET_PAGE,
  SEARCH_COORPORATION,
  CLEAR_ERRORS,
  DETAIL_LOG_API_REQUEST,
  DETAIL_LOG_API_SUCCESS,
  DETAIL_LOG_API_FAIL,
  RESET_VALUE_SORTIR,
  CHANGE_DATES,
} from "../../../types/site-management/settings/api.type";

import axios from "axios";

export const getAllApi = (token, tokenPermission) => async (dispatch, getState) => {
  try {
    dispatch({ type: API_REQUEST });

    let pageState = getState().allApi.page || 1;
    let cariState = getState().allApi.cari || "";
    let limitState = getState().allApi.limit || 5;

    const params = {
      page: pageState,
      cari: cariState,
      limit: limitState,
    };

    const { data } = await axios.get(
      `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-api/all`,
      {
        params,
        headers: {
          authorization: `Bearer ${token}`,
          Permission: tokenPermission,
        },
      }
    );

    dispatch({
      type: API_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: API_FAIL,
    });
  }
};

export const deleteApis = (id, token, tokenPermission) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_API_REQUEST });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
        Permission: tokenPermission,
      },
    };

    const { data } = await axios.delete(
      process.env.END_POINT_API_SITE_MANAGEMENT +
      `api/setting-api/delete/${id}`,
      config
    );

    dispatch({
      type: DELETE_API_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: DELETE_API_FAIL,
    });
  }
};

export const postApi = (sendData, token, tokenPermission) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: POST_API_REQUEST,
      });
      const { data } = await axios.post(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-api/store`,
        sendData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            Permission: tokenPermission,
          },
        }
      );
      dispatch({
        type: POST_API_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_API_FAIL,
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

export const getListApi = (token, tokenPermission) => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_API_REQUEST });
    const { data } = await axios.get(
      `${process.env.END_POINT_API_SITE_MANAGEMENT}api/api-list/all`,
      {
        headers: {
          authorization: `Bearer ${token}`,
          Permission: tokenPermission,
        },
      }
    );

    dispatch({
      type: GET_LIST_API_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_LIST_API_FAIL,
    });
  }
};
export const getListField = (id, token, tokenPermission) => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_FIELD_REQUEST });

    const { data } = await axios.get(
      `${process.env.END_POINT_API_SITE_MANAGEMENT}api/api-list/fields/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
          Permission: tokenPermission,
        },
      }
    );

    let dataSortir = data.data.map((items) => {
      return {
        ...items,
        label: items.field_name,
        value: items.field_name,
      };
    });

    dispatch({
      type: GET_LIST_FIELD_SUCCESS,
      payload: data,
      sortirData: dataSortir,
    });
  } catch (error) {
    dispatch({
      type: GET_LIST_FIELD_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getDetailApi = (id, token, tokenPermission) => async (dispatch) => {
  try {
    dispatch({
      type: DETAIL_API_REQUEST,
    });
    const config = {
      headers: {
        Authorization: "Bearer " + token,
        Permission: tokenPermission,
      },
    };

    let link =
      process.env.END_POINT_API_SITE_MANAGEMENT +
      `api/setting-api/detail/${id}`;

    const { data } = await axios.get(link, config);

    dispatch({
      type: DETAIL_API_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_API_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getDetailLog = (id, token, tokenPermission) => async (dispatch, getState) => {
  try {
    dispatch({ type: DETAIL_LOG_API_REQUEST });

    let pageState = getState().listLog.page || 1;
    let cariState = getState().listLog.cari || "";
    let limitState = getState().listLog.limit || 5;
    let fromState = getState().listLog.from;
    let toState = getState().listLog.to;

    const params = {
      page: pageState,
      cari: cariState,
      limit: limitState,
      from: fromState,
      to: toState,
    };

    const { data } = await axios.get(
      `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-api/detail/log/${id}`,
      {
        params,
        headers: {
          authorization: `Bearer ${token}`,
          Permission: tokenPermission,
        },
      }
    );

    dispatch({
      type: DETAIL_LOG_API_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: DETAIL_LOG_API_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const changeDates = (from, to) => {
  return {
    type: CHANGE_DATES,
    from,
    to,
  };
};

export const exportFileCSV = (token, id, tokenPermission) => {
  return async () => {
    try {
      // type=csv
      let urlExport = await axios.get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-api/export/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            Permission: tokenPermission,
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
          return;
        });
    } catch (error) {
      return;
    }
  };
};

// Clear Error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
