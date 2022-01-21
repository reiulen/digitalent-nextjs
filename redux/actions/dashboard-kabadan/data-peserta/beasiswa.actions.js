import {
  BEASISWA_KANDIDAT_REQUEST,
  BEASISWA_KANDIDAT_SUCCESS,
  BEASISWA_KANDIDAT_FAIL,
  BEASISWA_FILTER_REQUEST,
  BEASISWA_FILTER_SUCCESS,
  BEASISWA_FILTER_FAIL,
  CLEAR_ERRORS,
} from "../../../types/dashboard-kabadan/data-peserta/beasiswa.type";

import axios from "axios";

export const getAllBeasiswaKandidat =
  (
    token,
    page = 1,
    keyword = "",
    limit = null,
    type = null,
    category = null,
    destination = null,
    stage = null
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: BEASISWA_KANDIDAT_REQUEST });

      let link = process.env.END_POINT_API_BEASISWA + `participant`;
      if (page) link = link.concat(`?page=${page}`);
      if (keyword) link = link.concat(`&keyword=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);
      if (type) link = link.concat(`&type=${type}`);
      if (category) link = link.concat(`&category=${category}`);
      if (destination) link = link.concat(`&destination=${destination}`);
      if (stage) link = link.concat(`&stage=${stage}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: BEASISWA_KANDIDAT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BEASISWA_KANDIDAT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getAllBeasiswaFilter = (token) => async (dispatch) => {
  try {
    dispatch({ type: BEASISWA_FILTER_REQUEST });

    let link = process.env.END_POINT_API_BEASISWA + `participant/filter`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: BEASISWA_FILTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BEASISWA_FILTER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
