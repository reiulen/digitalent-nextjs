import {
  RIWAYAT_PELATIHAN_FAIL,
  RIWAYAT_PELATIHAN_REQUEST,
  RIWAYAT_PELATIHAN_SUCCESS,
  SET_KEYWORD_VALUE,
  SET_PESERTA_VALUE,
  SET_LIMIT_VALUE,
  SET_PAGE_VALUE,
  CLEAR_ERRORS,
} from "../../types/pelatihan/riwayat-pelatihan.type";
import axios from "axios";

export const getAllRiwayatPelatihanPeserta =
  (token) => async (dispatch, getState) => {
    try {
      dispatch({ type: RIWAYAT_PELATIHAN_REQUEST });
      let link =
        process.env.END_POINT_API_PELATIHAN +
        `api/v1/formPendaftaran/list-pendaftaran-user`;
      let pesertaState =
        getState().getAllRiwayatPelatihanPeserta.peserta || "all";
      let keywordState = getState().getAllRiwayatPelatihanPeserta.keyword || "";
      let pageState = getState().getAllRiwayatPelatihanPeserta.page || 1;
      let limitState = getState().getAllRiwayatPelatihanPeserta.limit || 5;

      const params = {
        peserta: pesertaState,
        keyword: keywordState,
        page: pageState,
        limit: limitState,
      };

      const config = {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(link, config);
      if (data) {
        dispatch({ type: RIWAYAT_PELATIHAN_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({
        type: RIWAYAT_PELATIHAN_FAIL,
        payload: error,
      });
    }
  };

export const setValuePeserta = (text) => {
  return {
    type: SET_PESERTA_VALUE,
    text,
  };
};

export const searchKeyword = (text) => {
  return {
    type: SET_KEYWORD_VALUE,
    text,
  };
};

export const setValuePage = (text) => {
  return {
    type: SET_PAGE_VALUE,
    text,
  };
};

export const setValueLimit = (text) => {
  return {
    type: SET_LIMIT_VALUE,
    text,
  };
};
