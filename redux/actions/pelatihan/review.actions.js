import {
  LIST_REVIEW_REQUEST,
  LIST_REVIEW_SUCCESS,
  LIST_REVIEW_FAIL,
  CARD_REVIEW_SUCCESS,
  CARD_REVIEW_FAIL,
  GET_LIST_REVISI_SUCCESS,
  GET_LIST_REVISI_FAIL,
  GET_REVIEW_STEP1_SUCCESS,
  GET_REVIEW_STEP1_FAIL,
  GET_REVIEW_STEP2_SUCCESS,
  GET_REVIEW_STEP2_FAIL,
  GET_REVIEW_STEP3_SUCCESS,
  GET_REVIEW_STEP3_FAIL,
  REVISI_REVIEW_REQUEST,
  REVISI_REVIEW_SUCCESS,
  REVISI_REVIEW_FAIL,
  TOLAK_REVIEW_REQUEST,
  TOLAK_REVIEW_SUCCESS,
  TOLAK_REVIEW_FAIL,
  CLEAR_ERRORS,
  GET_REVIEW_STEP4_SUCCESS,
} from "../../types/pelatihan/review.type";

import axios from "axios";

//ALL LIST REVIEW
export const getAllListReview =
  (
    page = 1,
    keyword = "",
    limit = 5,
    pendaftaran_mulai,
    pelatihan_mulai,
    status_substansi,
    status_pelatihan,
    penyelenggara,
    akademi,
    tema,
    token
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: LIST_REVIEW_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN +
        `/api/v1/pelatihan/find-subtansi?page=${page}`;
      if (keyword) link = link.concat(`&cari=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);
      if (pendaftaran_mulai)
        link = link.concat(`&pendaftaran_mulai=${pendaftaran_mulai}`);
      if (pelatihan_mulai)
        link = link.concat(`&pelatihan_mulai=${pelatihan_mulai}`);
      if (status_substansi)
        link = link.concat(`&status_substansi=${status_substansi}`);
      if (status_pelatihan)
        link = link.concat(`&status_pelatihan=${status_pelatihan}`);
      if (penyelenggara) link = link.concat(`&penyelenggara=${penyelenggara}`);
      if (akademi) link = link.concat(`&akademi=${akademi}`);
      if (tema) link = link.concat(`&tema=${tema}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: LIST_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LIST_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };
//END ALL LIST REVIEW

//CARD REVIEW
export const getCardReview = (token) => async (dispatch) => {
  try {
    let link =
      process.env.END_POINT_API_PELATIHAN +
      `/api/v1/pelatihan/list-count-subtansi`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: CARD_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CARD_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};
//END CARD REVIEW

export const getListRevisi = (token, id) => async (dispatch) => {
  try {
    let link =
      process.env.END_POINT_API_PELATIHAN +
      `/api/v1/pelatihan/list-revisi?pelatian_id=${id}`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: GET_LIST_REVISI_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_LIST_REVISI_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getReviewStep1Revisi = (token, id) => async (dispatch) => {
  try {
    let link =
      process.env.END_POINT_API_PELATIHAN +
      `/api/v1/pelatihan/get-step-satu?pelatian_id=${id}`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: GET_REVIEW_STEP1_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_REVIEW_STEP1_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getReviewStep2Revisi = (token, id) => async (dispatch) => {
  try {
    let link =
      process.env.END_POINT_API_PELATIHAN +
      `/api/v1/pelatihan/get-step-dua?pelatian_id=${id}`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: GET_REVIEW_STEP2_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_REVIEW_STEP2_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getReviewStep3Revisi = (token, id) => async (dispatch) => {
  try {
    let link =
      process.env.END_POINT_API_PELATIHAN +
      `/api/v1/pelatihan/get-step-tiga?pelatian_id=${id}`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: GET_REVIEW_STEP3_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_REVIEW_STEP3_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getReviewStep4Revisi = (token, id) => async (dispatch) => {
  try {
    let link = "http://192.168.1.96:81" + `/api/v1/pelatihan/pelatihan-parameter`;

    const config = {
      params: {
        pelatian_id: id,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.get(link, config);
    dispatch({
      type: GET_REVIEW_STEP4_SUCCESS,
      payload: data,
    });
  } catch (error) {
  }
};

export const revisiReviewPelatihan =
  (dataRevisi, token) => async (dispatch) => {
    try {
      dispatch({ type: REVISI_REVIEW_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN +
        `/api/v1/pelatihan/revisi-pelatihan`;

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.post(link, dataRevisi, config);

      dispatch({
        type: REVISI_REVIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REVISI_REVIEW_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const tolakReviewPelatihan = (dataTolak, token) => async (dispatch) => {
  try {
    dispatch({ type: TOLAK_REVIEW_REQUEST });

    let link =
      process.env.END_POINT_API_PELATIHAN +
      `/api/v1/pelatihan/update-status-subtansi`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(link, dataTolak, config);

    dispatch({
      type: TOLAK_REVIEW_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TOLAK_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
