import {
  ROLES_REQUEST,
  ROLES_SUCCESS,
  ROLES_FAIL,
  NEW_ROLES_REQUEST,
  NEW_ROLES_SUCCESS,
  NEW_ROLES_FAIL,
  DELETE_ROLES_REQUEST,
  DELETE_ROLES_SUCCESS,
  DELETE_ROLES_FAIL,
  DETAIL_ONE_ROLES_REQUEST,
  DETAIL_ONE_ROLES_SUCCESS,
  DETAIL_ONE_ROLES_FAIL,
  CLEAR_ERRORS,
} from "../../types/site-management/role.type";

import axios from "axios";
import { getSession } from "next-auth/client";

// get all data
export const getAllRoles =
  (page = 1, keyword = "", limit = 5, token) =>
  async (dispatch) => {
    try {
      dispatch({ type: ROLES_REQUEST });

      let link =
        process.env.END_POINT_API_SITE_MANAGEMENT +
        `api/subtance-question-banks?page=${page}`;
      if (keyword) link = link.concat(`&keyword=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      //   const { data } = await axios.get(link, config);
      const { data } = {
        perPage: 5,
        total: 6,
        totalFiltered: 6,
        list_role: [
          {
            id: 1,
            name: "Admin verifikator",
            editable: "Yes",
            Status: "Aktif",
          },
          {
            id: 2,
            name: "Admin Ke 1",
            editable: "Yes",
            Status: "Aktif",
          },
          {
            id: 3,
            name: "Admin Pokja",
            editable: "Yes",
            Status: "Aktif",
          },
          {
            id: 4,
            name: "Admin Akademi",
            editable: "Yes",
            Status: "Aktif",
          },
          {
            id: 5,
            name: "Admin Pelatihan",
            editable: "Yes",
            Status: "Aktif",
          },
          {
            id: 6,
            name: "Admin Tema",
            editable: "Yes",
            Status: "Aktif",
          },
        ],
      };

      dispatch({
        type: ROLES_SUCCESS,
        payload: data,
      });
    } catch (error) {
      // dispatch({
      //   type: ROLES_FAIL,
      //   payload: error.message,
      // });
    }
  };

export const newRoles = (subtanceData, token) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_ROLES_REQUEST,
    });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_SUBVIT + "api/subtance-question-banks",
      subtanceData,
      config
    );

    dispatch({
      type: NEW_ROLES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_ROLES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getOneRoles = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_ONE_ROLES_REQUEST });

    let link =
      process.env.END_POINT_API_SUBVIT + `api/subtance-question-banks/${id}`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: DETAIL_ONE_ROLES_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_ONE_ROLES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updatewRoles = (id, RoleData, token) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_ROLES_REQUEST,
    });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_SUBVIT + `api/subtance-question-banks/${id}`,
      RoleData,
      config
    );

    dispatch({
      type: UPDATE_ROLES_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ROLES_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteRoles = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ROLES_REQUEST });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const data = await axios.delete(
      process.env.END_POINT_API_SUBVIT + `api/subtance-question-banks/${id}`,
      config
    );

    dispatch({
      type: DELETE_ROLES_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ROLES_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Clear Error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
