import {
  ADMIN_SITE_REQUEST,
  ADMIN_SITE_SUCCESS,
  ADMIN_SITE_FAIL,
  ROLES_LIST_REQUEST,
  ROLES_LIST_SUCCESS,
  ROLES_LIST_FAIL,
  PELATIHAN_LIST_REQUEST,
  PELATIHAN_LIST_SUCCESS,
  PELATIHAN_LIST_FAIL,
  GET_ACADEMY_REQUEST,
  GET_ACADEMY_SUCCESS,
  GET_ACADEMY_FAIL,
  UNIT_WORK_LIST_REQUEST,
  UNIT_WORK_LIST_SUCCESS,
  UNIT_WORK_LIST_FAIL,
  GET_LIST_ADMIN_SITE_REQUEST,
  GET_LIST_ADMIN_SITE_SUCCESS,
  GET_LIST_ADMIN_SITE_FAIL,
  DETAIL_ADMIN_SITE_REQUEST,
  DETAIL_ADMIN_SITE_SUCCESS,
  DETAIL_ADMIN_SITE_FAIL,
  DETAIL_ADMIN_SITE_RESET,
  DELETE_ADMIN_SITE_SUCCESS,
  DELETE_ADMIN_SITE_FAIL,
  DELETE_ADMIN_SITE_RESET,
  DELETE_ADMIN_SITE_REQUEST,
  POST_ADMIN_SITE_REQUEST,
  POST_ADMIN_SITE_SUCCESS,
  POST_ADMIN_SITE_FAIL,
  POST_ADMIN_SITE_RESET,
  UPDATE_ADMIN_SITE_REQUEST,
  UPDATE_ADMIN_SITE_SUCCESS,
  UPDATE_ADMIN_SITE_FAIL,
  UPDATE_ADMIN_SITE_RESET,
  LIMIT_CONFIGURATION,
  SET_PAGE,
  SEARCH_COORPORATION,
  CLEAR_ERRORS,
} from "../../../types/site-management/user/admin-site.type";

import axios from "axios";

export const getAllAdminSite = (token) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_SITE_REQUEST });

    let pageState = getState().allAdminSite.page || 1;
    let cariState = getState().allAdminSite.cari || "";
    let limitState = getState().allAdminSite.limit || 5;

    const params = {
      page: pageState,
      cari: cariState,
      limit: limitState,
    };

    const { data } = await axios.get(
      `${process.env.END_POINT_API_SITE_MANAGEMENT}api/user/all-User-Admin`,
      {
        params,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: ADMIN_SITE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_SITE_FAIL,
    });
  }
};

export const getAllListPelatihan = (token) => async (dispatch, getState) => {
  try {
    dispatch({ type: PELATIHAN_LIST_REQUEST });

    let cariState = getState().allListPelatihan.cari || "";

    const params = {
      cari: cariState,
    };

    const { data } = await axios.get(
      `${process.env.END_POINT_API_PELATIHAN}api/v1/pelatihan/dropdown`,
      {
        params,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: PELATIHAN_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PELATIHAN_LIST_FAIL,
    });
  }
};

export const getListRoles = (token, search = "") => async (dispatch) => {
  try {
    dispatch({ type: ROLES_LIST_REQUEST });

    const { data } = await axios.get(
      `${process.env.END_POINT_API_SITE_MANAGEMENT}api/role/all`,
      {
        params: {cari: search},
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: ROLES_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ROLES_LIST_FAIL,
    });
  }
};
export const getListUnitWorks = (token) => async (dispatch) => {
  try {
    dispatch({ type: UNIT_WORK_LIST_REQUEST });

    const { data } = await axios.get(
      `${process.env.END_POINT_API_SITE_MANAGEMENT}api/satuan/all`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: UNIT_WORK_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UNIT_WORK_LIST_FAIL,
    });
  }
};
export const getListAcademy = (token) => async (dispatch) => {
  try {
    dispatch({ type: GET_ACADEMY_REQUEST });

    const { data } = await axios.get(
      `${process.env.END_POINT_API_PELATIHAN}api/v1/akademi/dropdown`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: GET_ACADEMY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ACADEMY_FAIL,
    });
  }
};

export const deleteAdminSite = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ADMIN_SITE_REQUEST });
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(
      process.env.END_POINT_API_SITE_MANAGEMENT + `api/user/delete/${id}`,
      config
    );

    dispatch({
      type: DELETE_ADMIN_SITE_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ADMIN_SITE_FAIL,
    });
  }
};

export const postAdminSite = (sendData, token) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: POST_ADMIN_SITE_REQUEST,
      });
      const { data } = await axios.post(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/user/store`,
        sendData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: POST_ADMIN_SITE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_ADMIN_SITE_FAIL,
      });
    }
  };
};

export const getDetailAdminSite = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: DETAIL_ADMIN_SITE_REQUEST,
    });
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    let link =
      process.env.END_POINT_API_SITE_MANAGEMENT + `api/user/detail/${id}`;

    const { data } = await axios.get(link, config);

    dispatch({
      type: DETAIL_ADMIN_SITE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_ADMIN_SITE_FAIL,
    });
  }
};

export const updateAdminSite = (sendData, id, token) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_ADMIN_SITE_REQUEST,
    });
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_SITE_MANAGEMENT + `api/user/update${id}`,
      sendData,
      config
    );

    dispatch({
      type: UPDATE_ADMIN_SITE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ADMIN_SITE_FAIL,
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
