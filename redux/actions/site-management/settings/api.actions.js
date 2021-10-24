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
} from "../../../types/site-management/settings/api.type";

import axios from "axios";

export const getAllApi = (token) => async (dispatch, getState) => {
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

export const deleteApi = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_API_REQUEST });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
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
      payload: error.response.data.message,
    });
  }
};

export const postApi = (sendData, token) => {
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

export const getListApi = (token) => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_API_REQUEST });
    const { data } = await axios.get(
      `${process.env.END_POINT_API_SITE_MANAGEMENT}api/api-list/all`,
      {
        headers: {
          authorization: `Bearer ${token}`,
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
export const getListField = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: GET_LIST_FIELD_REQUEST });

    const { data } = await axios.get(
      `${process.env.END_POINT_API_SITE_MANAGEMENT}api/api-list/fields/${id}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
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

export const getDetailApi = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: DETAIL_API_REQUEST,
    });
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    let link =
      process.env.END_POINT_API_SITE_MANAGEMENT +
      `api/setting-api/detail/${id}`;

    const { data } = await axios.get(link, config);
    console.log("data sdafdsaf", data);

    dispatch({
      type: DETAIL_API_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_API_FAIL,
    });
  }
};

export const getDetailLog = (id, token) => async (dispatch, getState) => {
  // try {
  //   dispatch({
  //     type: DETAIL_LOG_API_REQUEST,
  //   });
  //   const config = {
  //     headers: {
  //       Authorization: "Bearer " + token,
  //     },
  //   };

  //   let link =
  //     process.env.END_POINT_API_SITE_MANAGEMENT +
  //     `api/setting-api/detail/log/${id}`;

  //   const { data } = await axios.get(link, config);
  //   console.log("data sdafdsaf", data);

  //   dispatch({
  //     type: DETAIL_LOG_API_SUCCESS,
  //     payload: data,
  //   });
  // } catch (error) {
  //   dispatch({
  //     type: DETAIL_LOG_API_FAIL,
  //   });
  // }

  try {
    dispatch({ type: DETAIL_LOG_API_REQUEST });

    let pageState = getState().listLog.page || 1;
    let cariState = getState().listLog.cari || "";
    let limitState = getState().listLog.limit || 5;

    const params = {
      page: pageState,
      cari: cariState,
      limit: limitState,
    };

    const { data } = await axios.get(
      `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-api/detail/log/${id}`,
      {
        params,
        headers: {
          authorization: `Bearer ${token}`,
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
    });
  }
};
