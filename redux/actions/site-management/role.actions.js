import {
  ROLES_REQUEST,
  ROLES_SUCCESS,
  ROLES_FAIL,
  DETAIL_ROLES_REQUEST,
  DETAIL_ROLES_SUCCESS,
  DETAIL_ROLES_FAIL,
  DETAIL_ROLES_RESET,
  DELETE_ROLES_SUCCESS,
  DELETE_ROLES_FAIL,
  DELETE_ROLES_REQUEST,
  DELETE_ROLES_RESET,
  POST_ROLES_REQUEST,
  POST_ROLES_SUCCESS,
  POST_ROLES_FAIL,
  POST_ROLES_RESET,
  UPDATE_ROLES_REQUEST,
  UPDATE_ROLES_SUCCESS,
  UPDATE_ROLES_FAIL,
  LIMIT_CONFIGURATION,
  SET_PAGE,
  SEARCH_COORPORATION,
  CLEAR_ERRORS,
  PERMISSION_BY_PARENT,
  GET_SIDEBAR,
} from "../../types/site-management/role.type";

import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "js-cookie";

export const getAllRoles =
  (token, tokenPermission) => async (dispatch, getState) => {
    try {
      dispatch({ type: ROLES_REQUEST });

      let pageState = getState().allRoles.page || 1;
      let cariState = getState().allRoles.cari || "";
      let limitState = getState().allRoles.limit || 5;

      const params = {
        page: pageState,
        cari: cariState,
        limit: limitState,
      };

      const { data } = await axios.get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/role/all`,
        {
          params,
          headers: {
            authorization: `Bearer ${token}`,
            Permission: tokenPermission,
          },
        }
      );

      dispatch({
        type: ROLES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ROLES_FAIL,
      });
    }
  };

export const deleteRoles = (id, token, tokenPermission) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ROLES_REQUEST });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
        Permission: tokenPermission,
      },
    };

    const { data } = await axios.get(
      process.env.END_POINT_API_SITE_MANAGEMENT + `api/role/delete/${id}`,
      config
    );

    dispatch({
      type: DELETE_ROLES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ROLES_FAIL,
    });
  }
};

export const postRoles = (sendData, token, tokenPermission) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: POST_ROLES_REQUEST,
      });
      const { data } = await axios.post(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/role/store`,
        sendData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            Permission: tokenPermission,
          },
        }
      );
      dispatch({
        type: POST_ROLES_SUCCESS,
        payload: data,
      });

      if (data.status) {
        Swal.fire("Berhasil", "Data berhasil tersimpan", "success").then(() => {
          window.location = "/site-management/role";
        });
      } else {
        Swal.fire("Oopss", data.message, "error").then(() => {});
      }
    } catch (error) {
      if (error.message.includes("400")) {
        Swal.fire("Oopss", "Nama Role Sudah ada Sebelumnya !", "error").then(
          () => {}
        );
      } else {
        Swal.fire("Oopss", error.message, "error").then(() => {});
      }
      dispatch({
        type: POST_ROLES_FAIL,
      });
    }
  };
};

export const getDetailRoles =
  (id, token, tokenPermission) => async (dispatch) => {
    try {
      dispatch({
        type: DETAIL_ROLES_REQUEST,
      });
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          Permission: tokenPermission,
        },
      };

      let link =
        process.env.END_POINT_API_SITE_MANAGEMENT + `/api/role/detail/${id}`;

      const { data } = await axios.get(link, config);

      dispatch({
        type: DETAIL_ROLES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DETAIL_ROLES_FAIL,
      });
    }
  };

export const getAllPermission =
  (token, tokenPermission) => async (dispatch) => {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          Permission: tokenPermission,
        },
      };

      let link =
        process.env.END_POINT_API_SITE_MANAGEMENT + `api/permission/parent`;

      const { data } = await axios.get(link, config);

      dispatch({
        type: PERMISSION_BY_PARENT,
        payload: data,
      });
    } catch (error) {}
  };

export const updateRoles =
  (sendData, token, tokenPermission) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_ROLES_REQUEST,
      });
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          Permission: tokenPermission,
        },
      };

      const { data } = await axios.post(
        process.env.END_POINT_API_SITE_MANAGEMENT + `/api/role/update`,
        sendData,
        config
      );
      Swal.fire("Berhasil", "Data berhasil tersimpan", "success").then(() => {
        window.location = "/site-management/role";
      });

      dispatch({
        type: UPDATE_ROLES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_ROLES_FAIL,
      });
    }
  };

export const getSidebar = (token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(
      process.env.END_POINT_API_SITE_MANAGEMENT + " ",
      config
    );
    localStorage.setItem("sidebar", JSON.stringify(data.data.menu));
    localStorage.setItem("token-permission", data.data.tokenPermission);
    localStorage.setItem("permissions", data.data.permissions);
    Cookies.set("token_permission", data.data.tokenPermission);
    dispatch({
      type: GET_SIDEBAR,
      payload: data,
    });
  } catch (error) {}
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
