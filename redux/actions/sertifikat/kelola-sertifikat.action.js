import axios from "axios";
import {
  SERTIFIKAT_SUCCESS,
  SERTIFIKAT_FAIL,
  SERTIFIKAT_REQUEST,
  NEW_SERTIFIKAT_SUCCESS,
  NEW_SERTIFIKAT_FAIL,
  NEW_SERTIFIKAT_REQUEST,
  NEW_SERTIFIKAT_RESET,
  DETAIL_SERTIFIKAT_FAIL,
  DETAIL_SERTIFIKAT_REQUEST,
  DETAIL_SERTIFIKAT_SUCCESS,
  DELETE_SERTIFIKAT_FAIL,
  DELETE_SERTIFIKAT_REQUEST,
  DELETE_SERTIFIKAT_RESET,
  DELETE_SERTIFIKAT_SUCCESS,
  SINGLE_SERTIFIKAT_SUCCESS,
  SINGLE_SERTIFIKAT_REQUEST,
  SINGLE_SERTIFIKAT_FAIL,
  CLEAR_ERRORS,
} from "../../types/sertifikat/kelola-sertifikat.type";

export const getAllSertifikat =
  (
    page = 1,
    keyword = "",
    limit = 5,
    publish = null,
    startdate = null,
    enddate = null,
    token
  ) =>
  async dispatch => {
    try {
      dispatch({ type: SERTIFIKAT_REQUEST });
      let link =
        process.env.END_POINT_API_SERTIFIKAT +
        `api/manage_certificates?limit=${limit}&page=${page}`;
      if (keyword) link = link.concat(`&keyword=${keyword}`);
      if (publish) link = link.concat(`&publish=${publish}`);
      if (startdate) link = link.concat(`&startdate=${startdate}`);
      if (enddate) link = link.concat(`&enddate=${enddate}`);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(link, config);

      if (data) {
        dispatch({ type: SERTIFIKAT_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({ type: SERTIFIKAT_FAIL, payload: error.message });
    }
  };

export const getDetailSertifikat =
  (
    id,
    page = 1,
    keyword = "",
    limit = 5,
    publish = null,
    startdate = null,
    enddate = null,
    token
  ) =>
  async dispatch => {
    try {
      dispatch({ type: DETAIL_SERTIFIKAT_REQUEST });
      let link =
        process.env.END_POINT_API_SERTIFIKAT +
        `api/manage_certificates/detail/${id}?page=${page}`;
      if (keyword) link = link.concat(`&keyword=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);
      if (publish) link = link.concat(`&publish=${publish}`);
      if (startdate) link = link.concat(`&startdate=${startdate}`);
      if (enddate) link = link.concat(`&enddate=${enddate}`);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(link, config);

      // console.log(data.data.list_certificate[0], " ini data nya");

      if (data) {
        dispatch({ type: DETAIL_SERTIFIKAT_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({ type: DETAIL_SERTIFIKAT_FAIL, payload: error.message });
    }
  };

export const newSertifikat = (id, formData, token) => async dispatch => {
  try {
    console.log("masuk kesini");
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    console.log(id, "ini id");
    dispatch({ type: NEW_SERTIFIKAT_REQUEST });
    let link =
      process.env.END_POINT_API_SERTIFIKAT +
      `api/manage_certificates/store/${id}`;

    console.log(token, "INI TOKENNNNNNNNNNN!!");
    const config = {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };

    const { data } = await axios.post(link, formData, config);

    if (data) {
      dispatch({ type: NEW_SERTIFIKAT_SUCCESS, payload: data });
    }
  } catch (error) {
    // console.log(error.response.data.message, "masukedispatch");
    console.log(error.response.data.message, "masukedispatch");

    dispatch({ type: NEW_SERTIFIKAT_FAIL, payload: error.message });
  }
};

export const clearErrors = () => async dispatch => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const getSingleSertifikat =
  (
    id,
    page = 1,
    keyword = "",
    limit = 5,
    publish = null,
    startdate = null,
    enddate = null,
    token
  ) =>
  async dispatch => {
    try {
      dispatch({ type: SINGLE_SERTIFIKAT_REQUEST });
      let link =
        process.env.END_POINT_API_SERTIFIKAT +
        `api/manage_certificates/${id}?page=${page}`;
      if (keyword) link = link.concat(`&keyword=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);
      if (publish) link = link.concat(`&publish=${publish}`);
      if (startdate) link = link.concat(`&startdate=${startdate}`);
      if (enddate) link = link.concat(`&enddate=${enddate}`);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(link, config);

      // console.log(data.data.list_certificate[0], " ini data nya");

      if (data) {
        dispatch({ type: SINGLE_SERTIFIKAT_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({ type: SINGLE_SERTIFIKAT_FAIL, payload: error.message });
    }
  };
