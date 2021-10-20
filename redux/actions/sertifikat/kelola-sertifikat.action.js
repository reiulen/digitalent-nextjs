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
  PUBLISHED_SERTIFIKAT_REQUEST,
  PUBLISHED_SERTIFIKAT_SUCCESS,
  PUBLISHED_SERTIFIKAT_FAIL,
  UPDATE_SERTIFIKAT_REQUEST,
  UPDATE_SERTIFIKAT_SUCCESS,
  UPDATE_SERTIFIKAT_FAIL,
  OPTIONS_ACADEMY_FAIL,
  OPTIONS_ACADEMY_REQUEST,
  OPTIONS_ACADEMY_SUCCESS,
  OPTIONS_THEME_FAIL,
  OPTIONS_THEME_REQUEST,
  OPTIONS_THEME_SUCCESS,
  SET_KEYWORD_VALUE,
  SET_ACADEMY_VALUE,
  SET_THEME_VALUE,
} from "../../types/sertifikat/kelola-sertifikat.type";

export const getAllSertifikat = token => async (dispatch, getState) => {
  try {
    dispatch({ type: SERTIFIKAT_REQUEST });
    let link = process.env.END_POINT_API_SERTIFIKAT + `api/manage_certificates`;
    // console.log(getState().allCertificate);
    let pageState = getState().allCertificates.page || 1;
    let limitState = getState().allCertificates.limit || 5;
    let themeState = getState().allCertificates.theme || "";
    let academyState = getState().allCertificates.academy || "";
    let keywordState = getState().allCertificates.keyword || "";

    const params = {
      page: pageState,
      limit: limitState,
      theme: themeState,
      academy: academyState,
      keyword: keywordState,
    };

    const config = {
      params,
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

export const searchKeyword = text => {
  return {
    type: SET_KEYWORD_VALUE,
    text,
  };
};

export const setValueAcademy = text => {
  return {
    type: SET_ACADEMY_VALUE,
    text,
  };
};

export const setValueTheme = text => {
  return {
    type: SET_THEME_VALUE,
    text,
  };
};

export const getDetailSertifikat =
  (id, page = 1, keyword = "", limit = 5, status = null, token) =>
  async dispatch => {
    try {
      dispatch({ type: DETAIL_SERTIFIKAT_REQUEST });
      let link =
        process.env.END_POINT_API_SERTIFIKAT +
        `api/manage_certificates/detail/${id}?page=${page}`;
      if (keyword) link = link.concat(`&keyword=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);
      if (status) link = link.concat(`&status=${status}`);
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.get(link, config);

      if (data) {
        dispatch({ type: DETAIL_SERTIFIKAT_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({ type: DETAIL_SERTIFIKAT_FAIL, payload: error.message });
    }
  };

export const newSertifikat = (id, formData, token) => async dispatch => {
  try {
    dispatch({ type: NEW_SERTIFIKAT_REQUEST });
    let link =
      process.env.END_POINT_API_SERTIFIKAT +
      `api/manage_certificates/store/${id}`;

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
    dispatch({
      type: NEW_SERTIFIKAT_FAIL,
      payload: error.message,
    });
  }
};

export const clearErrors = () => async dispatch => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const getSingleSertifikat = (id, token) => async dispatch => {
  try {
    dispatch({ type: SINGLE_SERTIFIKAT_REQUEST });
    let link =
      process.env.END_POINT_API_SERTIFIKAT + `api/manage_certificates/${id}`;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(link, config);

    if (data) {
      dispatch({ type: SINGLE_SERTIFIKAT_SUCCESS, payload: data });
    }
  } catch (error) {
    // console.log("error masuk sini", error.response.data.message);
    dispatch({
      type: SINGLE_SERTIFIKAT_FAIL,
      // payload: error.message
      payload: error.response.data.message,
    });
  }
};

export const getPublishedSertifikat = (id, token) => async dispatch => {
  try {
    dispatch({ type: PUBLISHED_SERTIFIKAT_REQUEST });

    let link =
      process.env.END_POINT_API_SERTIFIKAT +
      `api/manage_certificates/image/${id}`;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(link, config);

    if (data) {
      dispatch({
        type: PUBLISHED_SERTIFIKAT_SUCCESS,
        payload: data,
      });
    }
  } catch (error) {
    dispatch({ type: PUBLISHED_SERTIFIKAT_FAIL, payload: error.message });
  }
};

export const updateSertifikat = (id, formData, token) => async dispatch => {
  try {
    dispatch({ type: UPDATE_SERTIFIKAT_REQUEST });
    // for (var pair of formData.entries()) {
    //   console.log(pair[0] + ", " + pair[1]);
    // }

    let link =
      process.env.END_POINT_API_SERTIFIKAT +
      `api/manage_certificates/update/${id}`;

    const config = {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };

    const { data } = await axios.post(link, formData, config);

    if (data) {
      dispatch({ type: UPDATE_SERTIFIKAT_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_SERTIFIKAT_FAIL,
      payload: error.message,
      // payload: error.response.data.message,
    });
  }
};

export const getOptionsAcademy = token => async dispatch => {
  try {
    dispatch({ type: OPTIONS_ACADEMY_REQUEST });
    let link = process.env.END_POINT_API_SERTIFIKAT + `api/option/academy`;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(link, config);
    console.log(data);
    if (data) {
      dispatch({ type: OPTIONS_ACADEMY_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: OPTIONS_ACADEMY_FAIL, payload: error.message });
  }
};

export const getOptionsTheme = token => async dispatch => {
  try {
    dispatch({ type: OPTIONS_THEME_REQUEST });
    let link = process.env.END_POINT_API_SERTIFIKAT + `api/option/theme`;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(link, config);

    if (data) {
      dispatch({ type: OPTIONS_THEME_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: OPTIONS_THEME_FAIL, payload: error.message });
  }
};
