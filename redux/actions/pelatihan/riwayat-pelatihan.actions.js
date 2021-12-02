import {
  RIWAYAT_PELATIHAN_FAIL,
  RIWAYAT_PELATIHAN_REQUEST,
  RIWAYAT_PELATIHAN_SUCCESS,
  SET_KEYWORD_VALUE,
  SET_PESERTA_VALUE,
  SET_LIMIT_VALUE,
  SET_PAGE_VALUE,
  CLEAR_ERRORS,
  RIWAYAT_PELATIHAN_DETAIL_FAIL,
  RIWAYAT_PELATIHAN_DETAIL_REQUEST,
  RIWAYAT_PELATIHAN_DETAIL_SUCCESS,
  SET_PELATIHAN_BERJALAN_VALUE,
  SET_PELATIHAN_SELESAI_VALUE,
  RESET_FILTER,
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
      let sedang_berjalan =
        getState().getAllRiwayatPelatihanPeserta.sedang_berjalan || "0";
      let selesai = getState().getAllRiwayatPelatihanPeserta.selesai || "0";

      const params = {
        peserta: pesertaState,
        cari: keywordState,
        page: pageState,
        limit: limitState,
        selesai,
        sedang_berjalan,
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
        return data;
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

export const setPelatihanBerjalanValue = (text) => {
  return {
    type: SET_PELATIHAN_BERJALAN_VALUE,
    text,
  };
};

export const setPelatihanSelesaiValue = (text) => {
  return {
    type: SET_PELATIHAN_SELESAI_VALUE,
    text,
  };
};

export const resetFilter = () => {
  return {
    type: RESET_FILTER,
  };
};

export const getDetailRiwayatPelatihan =
  (id, token) => async (dispatch, getState) => {
    try {
      dispatch({ type: RIWAYAT_PELATIHAN_DETAIL_REQUEST });
      let link =
        process.env.END_POINT_API_PELATIHAN +
        `api/v1/formPendaftaran/detail-pendaftaran-user?id=${id}`;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(link, config);
      if (data) {
        dispatch({ type: RIWAYAT_PELATIHAN_DETAIL_SUCCESS, payload: data });
      }
      return data;
    } catch (error) {
      dispatch({
        type: RIWAYAT_PELATIHAN_DETAIL_FAIL,
        payload: error,
      });
    }
  };
