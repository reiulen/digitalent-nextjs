import {
  MASTER_SATUAN_KERJA_PENYELENGGARA_REQUEST,
  MASTER_SATUAN_KERJA_PENYELENGGARA_SUCCESS,
  MASTER_SATUAN_KERJA_PENYELENGGARA_FAIL,
  NEW_MASTER_SATUAN_KERJA_PENYELENGGARA_REQUEST,
  NEW_MASTER_SATUAN_KERJA_PENYELENGGARA_SUCCESS,
  NEW_MASTER_SATUAN_KERJA_PENYELENGGARA_FAIL,
  DELETE_MASTER_SATUAN_KERJA_PENYELENGGARA_REQUEST,
  DELETE_MASTER_SATUAN_KERJA_PENYELENGGARA_SUCCESS,
  DELETE_MASTER_SATUAN_KERJA_PENYELENGGARA_FAIL,
  DETAIL_MASTER_SATUAN_KERJA_PENYELENGGARA_REQUEST,
  DETAIL_MASTER_SATUAN_KERJA_PENYELENGGARA_SUCCESS,
  DETAIL_MASTER_SATUAN_KERJA_PENYELENGGARA_FAIL,
  CLEAR_ERRORS,
} from "../../types/site-management/master-satuan-kerja-penyelenggara.type";

import axios from "axios";
import { getSession } from "next-auth/client";

// get all data
export const getAllMasterSatuanKerjaPenyelenggaras =
  (page = 1, keyword = "", limit = 5, token) =>
  async (dispatch) => {
    try {
      dispatch({ type: MASTER_SATUAN_KERJA_PENYELENGGARA_REQUEST });

      let link =
        "http://dts-user-dev.majapahit.id" + `/api/satuan/all?page=${page}`;
      if (keyword) link = link.concat(`&keyword=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: MASTER_SATUAN_KERJA_PENYELENGGARA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: MASTER_SATUAN_KERJA_PENYELENGGARA_FAIL,
        payload: error.message,
      });
    }
  };

export const newMasterSatuanKerjaPenyelenggaras =
  (subtanceData, token) => async (dispatch) => {
    try {
      dispatch({
        type: NEW_MASTER_SATUAN_KERJA_PENYELENGGARA_REQUEST,
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
        type: NEW_MASTER_SATUAN_KERJA_PENYELENGGARA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_MASTER_SATUAN_KERJA_PENYELENGGARA_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getOneMasterSatuanKerjaPenyelenggaras =
  (id, token) => async (dispatch) => {
    try {
      dispatch({ type: DETAIL_MASTER_SATUAN_KERJA_PENYELENGGARA_REQUEST });

      let link =
        process.env.END_POINT_API_SUBVIT + `api/subtance-question-banks/${id}`;

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: DETAIL_MASTER_SATUAN_KERJA_PENYELENGGARA_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: DETAIL_MASTER_SATUAN_KERJA_PENYELENGGARA_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const updatewMasterSatuanKerjaPenyelenggaras =
  (id, MasterSatuanKerjaPenyelenggaraData, token) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_MASTER_SATUAN_KERJA_PENYELENGGARA_REQUEST,
      });

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.post(
        process.env.END_POINT_API_SUBVIT + `api/subtance-question-banks/${id}`,
        MasterSatuanKerjaPenyelenggaraData,
        config
      );

      dispatch({
        type: UPDATE_MASTER_SATUAN_KERJA_PENYELENGGARA_SUCCESS,
        payload: data.status,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_MASTER_SATUAN_KERJA_PENYELENGGARA_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const deleteMasterSatuanKerjaPenyelenggaras =
  (id, token) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_MASTER_SATUAN_KERJA_PENYELENGGARA_REQUEST });

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
        type: DELETE_MASTER_SATUAN_KERJA_PENYELENGGARA_SUCCESS,
        payload: data.status,
      });
    } catch (error) {
      dispatch({
        type: DELETE_MASTER_SATUAN_KERJA_PENYELENGGARA_FAIL,
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
