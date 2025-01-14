import axios from "axios";
import {
  LIST_TRAINING_FAIL,
  LIST_TRAINING_REQUEST,
  LIST_TRAINING_SUCCESS,
  CLEAR_ERRORS,
  RESET_STATUS_FILTER,
  SET_KATEGORI_PESERTA_VALUE,
  SET_KEYWORD_VALUE,
  SET_LIMIT_VALUE,
  SET_PAGE_VALUE,
  SET_PELATIHAN_AKHIR_VALUE,
  SET_PELATIHAN_MULAI_VALUE,
  SET_PENYELENGGARA_VALUE,
} from "../../types/pelatihan/pencarian.type";

export const getPencarian =
  (
    keyword = "",
    page = 1,
    limit = 6,
    penyelenggara = "",
    pelatihan_mulai = "",
    pelatihan_akhir = "",
    kategori_peserta = "",
    token = ""
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: LIST_TRAINING_REQUEST });
      let link =
        process.env.END_POINT_API_PELATIHAN +
        `api/v1/pelatihan/dasboard-filter-pelatihan?`;

      // let keywordState = cari || "";
      // let pageState = getState().allPencarian.page || 1;
      // let limitState = getState().allPencarian.limit || 5;
      // let penyelenggaraState = getState().allPencarian.penyelenggara || "";
      // let kategoriPesertaState = getState().allPencarian.kategori_peserta || "";
      // let pelatihanMulaiState = getState().allPencarian.pelatihan_mulai || "";
      // let pelatihanAkhirState = getState().allPencarian.pelatihan_akhir || "";
      // let link = process.env.END_POINT_API_PELATIHAN + `api/v1/akademi/find?`;

      if (keyword) link = link.concat(`&cari=${keyword}`);
      if (page) link = link.concat(`&page=${page}`);
      if (limit) link = link.concat(`&limit=${limit}`);
      if (penyelenggara) link = link.concat(`&penyelenggara=${penyelenggara}`);
      if (pelatihan_mulai)
        link = link.concat(`&pelatihan_mulai=${pelatihan_mulai}`);
      if (pelatihan_akhir)
        link = link.concat(`&pelatihan_akhir=${pelatihan_akhir}`);
      if (kategori_peserta)
        link = link.concat(`&kategori_peserta=${kategori_peserta}`);

      let config = "";
      if (token) {
        config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      }
      const { data } = await axios.get(link, config);
      if (data) {
        dispatch({ type: LIST_TRAINING_SUCCESS, payload: data });
      }
      return data;
    } catch (error) {
      dispatch({
        type: LIST_TRAINING_FAIL,
        payload: error?.response?.data?.message || error.message,
      });
    }
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
export const setValuePenyelenggara = (text) => {
  return {
    type: SET_PENYELENGGARA_VALUE,
    text,
  };
};
export const setValueKategoriPeserta = (text) => {
  return {
    type: SET_KATEGORI_PESERTA_VALUE,
    text,
  };
};
export const setValuePelatihanMulai = (text) => {
  return {
    type: SET_PELATIHAN_MULAI_VALUE,
    text,
  };
};
export const setValuePelatihanAkhir = (text) => {
  return {
    type: SET_PELATIHAN_AKHIR_VALUE,
    text,
  };
};

export const resetFilter = () => {
  return {
    type: RESET_STATUS_FILTER,
  };
};
