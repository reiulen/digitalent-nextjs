import {
  UNIT_WORK_REQUEST,
  UNIT_WORK_SUCCESS,
  UNIT_WORK_FAIL,
  DETAIL_UNIT_WORK_REQUEST,
  DETAIL_UNIT_WORK_SUCCESS,
  DETAIL_UNIT_WORK_FAIL,
  DETAIL_UNIT_WORK_RESET,
  DELETE_UNIT_WORK_SUCCESS,
  DELETE_UNIT_WORK_FAIL,
  DELETE_UNIT_WORK_REQUEST,
  DELETE_UNIT_WORK_RESET,
  POST_UNIT_WORK_REQUEST,
  POST_UNIT_WORK_SUCCESS,
  POST_UNIT_WORK_FAIL,
  POST_UNIT_WORK_RESET,
  UPDATE_UNIT_WORK_REQUEST,
  UPDATE_UNIT_WORK_SUCCESS,
  UPDATE_UNIT_WORK_FAIL,
  UPDATE_DATA_REFERENCE_RESET,
  LIMIT_CONFIGURATION,
  SET_PAGE,
  SEARCH_COORPORATION,
  CLEAR_ERRORS,
} from "../../types/site-management/unit-work.type";

import axios from "axios";

export const getAllUnitWork = (token) => async (dispatch, getState) => {
  try {
    dispatch({ type: UNIT_WORK_REQUEST });

    let pageState = getState().allUnitWork.page || 1;
    let cariState = getState().allUnitWork.cari || "";
    let limitState = getState().allUnitWork.limit || 5;

    const params = {
      page: pageState,
      cari: cariState,
      limit: limitState,
    };

    const { data } = await axios.get(
      `${process.env.END_POINT_API_SITE_MANAGEMENT}api/satuan/all`,
      {
        params,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: UNIT_WORK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UNIT_WORK_FAIL,
    });
  }
};

// delete gak ada
export const deleteUnitWork = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_UNIT_WORK_REQUEST });

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
      type: DELETE_UNIT_WORK_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: DELETE_UNIT_WORK_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const postUnitWork = (sendData, token) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: POST_UNIT_WORK_REQUEST,
      });
      const { data } = await axios.post(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/satuan/store`,
        sendData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: POST_UNIT_WORK_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_UNIT_WORK_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

export const getDetailUnitWork = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: DETAIL_UNIT_WORK_REQUEST,
    });
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    let link =
      process.env.END_POINT_API_SITE_MANAGEMENT + `api/satuan/detail/${id}`;

    const { data } = await axios.get(link, config);

    dispatch({
      type: DETAIL_UNIT_WORK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_UNIT_WORK_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateUnitWork = (sendData, id, token) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_UNIT_WORK_REQUEST,
    });
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_SITE_MANAGEMENT + `/api/satuan/update/${id}`,
      sendData,
      config
    );

    dispatch({
      type: UPDATE_UNIT_WORK_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_UNIT_WORK_FAIL,
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
