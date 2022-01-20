import {
  SIMONAS_KANDIDAT_REQUEST,
  SIMONAS_KANDIDAT_SUCCESS,
  SIMONAS_KANDIDAT_FAIL,
  SIMONAS_FILTER_COMPANY_REQUEST,
  SIMONAS_FILTER_COMPANY_SUCCESS,
  SIMONAS_FILTER_COMPANY_FAIL,
  SIMONAS_FILTER_STATUS_REQUEST,
  SIMONAS_FILTER_STATUS_SUCCESS,
  SIMONAS_FILTER_STATUS_FAIL,
  CLEAR_ERRORS,
} from "../../../types/dashboard-kabadan/data-peserta/simonas.type";

import axios from "axios";

export const getAllSimonasKandidat =
  (
    token,
    page = null,
    keyword = "",
    limit = null,
    company = null,
    statusJob = null,
    category = null,
    status
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: SIMONAS_KANDIDAT_REQUEST });

      let link = process.env.END_POINT_API_SIMONAS + `candidates/all`;
      if (page) link = link.concat(`?page=${page}`);
      if (keyword) link = link.concat(`&keyword=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);
      if (company) link = link.concat(`&company=${company}`);
      if (statusJob) link = link.concat(`&status_job=${statusJob}`);
      if (category) link = link.concat(`&category=${category}`);
      if (status) link = link.concat(`&status=${status}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: SIMONAS_KANDIDAT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SIMONAS_KANDIDAT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getSimonasFilterCompany = (token) => async (dispatch) => {
  try {
    dispatch({ type: SIMONAS_FILTER_COMPANY_REQUEST });

    let link = process.env.END_POINT_API_SIMONAS + `candidates/company`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: SIMONAS_FILTER_COMPANY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SIMONAS_FILTER_COMPANY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getSimonasFilterStatus = (token, filter) => async (dispatch) => {
  try {
    dispatch({ type: SIMONAS_FILTER_STATUS_REQUEST });

    let link = process.env.END_POINT_API_SIMONAS + `candidates/status`;
    if (filter) link = link.concat(`?filter=${filter}`);

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: SIMONAS_FILTER_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SIMONAS_FILTER_STATUS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
