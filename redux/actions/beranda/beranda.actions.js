import {
  BERANDA_PENYELENGGARA_REQUEST,
  BERANDA_PENYELENGGARA_SUCCESS,
  BERANDA_PENYELENGGARA_FAIL,
  BERANDA_PENYELENGGARA_PAGE_REQUEST,
  BERANDA_PENYELENGGARA_PAGE_SUCCESS,
  BERANDA_PENYELENGGARA_PAGE_FAIL,
  BERANDA_NOTIF_TEMA_REQUEST,
  BERANDA_NOTIF_TEMA_SUCCESS,
  BERANDA_NOTIF_TEMA_FAIL,
  BERANDA_AKADEMI_REQUEST,
  BERANDA_AKADEMI_SUCCESS,
  BERANDA_AKADEMI_FAIL,
  BERANDA_TEMA_REQUEST,
  BERANDA_TEMA_SUCCESS,
  BERANDA_TEMA_FAIL,
  BERANDA_TEMA_ORIGINAL_REQUEST,
  BERANDA_TEMA_ORIGINAL_SUCCESS,
  BERANDA_TEMA_ORIGINAL_FAIL,
  BERANDA_KOTA_REQUEST,
  BERANDA_KOTA_SUCCESS,
  BERANDA_KOTA_FAIL,
  BERANDA_PELATIHAN_REQUEST,
  BERANDA_PELATIHAN_SUCCESS,
  BERANDA_PELATIHAN_FAIL,
  BERANDA_PUBLIKASI_REQUEST,
  BERANDA_PUBLIKASI_SUCCESS,
  BERANDA_PUBLIKASI_FAIL,
  BERANDA_FOOTER_REQUEST,
  BERANDA_FOOTER_SUCCESS,
  BERANDA_FOOTER_FAIL,
  CLEAR_ERRORS,
} from "../../types/beranda/beranda.type";

import axios from "axios";

// GET FOOTER
export const getBerandaFooter = () => async (dispatch) => {
  try {
    dispatch({ type: BERANDA_FOOTER_REQUEST });

    let link =
      process.env.END_POINT_API_SITE_MANAGEMENT + `api/setting/general/get`;

    const { data } = await axios.get(link);

    dispatch({
      type: BERANDA_FOOTER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BERANDA_FOOTER_FAIL,
      payload: error.message,
    });
  }
};

export const addNotifTema = (dataNotif, token) => async (dispatch) => {
  try {
    dispatch({
      type: BERANDA_NOTIF_TEMA_REQUEST,
    });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_PELATIHAN + "api/v1/pengingat/create",
      dataNotif,
      config
    );

    dispatch({
      type: BERANDA_NOTIF_TEMA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BERANDA_NOTIF_TEMA_FAIL,
      payload: error.response.data.message,
    });
  }
};

// GET AKADEMI
export const getAllAkademi = () => async (dispatch) => {
  try {
    dispatch({ type: BERANDA_AKADEMI_REQUEST });

    let link =
      process.env.END_POINT_API_PELATIHAN + `api/v1/akademi/dasboard-akademi`;

    const { data } = await axios.get(link);

    dispatch({
      type: BERANDA_AKADEMI_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BERANDA_AKADEMI_FAIL,
      payload: error.message,
    });
  }
};

// GET TEMA ORIGINAL
export const getAllTemaOriginal = () => async (dispatch) => {
  try {
    dispatch({ type: BERANDA_TEMA_ORIGINAL_REQUEST });

    let link = process.env.END_POINT_API_PELATIHAN + `api/v1/tema/list-tema`;

    const { data } = await axios.get(link);

    dispatch({
      type: BERANDA_TEMA_ORIGINAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BERANDA_TEMA_ORIGINAL_FAIL,
      payload: error.message,
    });
  }
};

// GET KOTA
export const getAllKotaPeserta = () => async (dispatch) => {
  try {
    dispatch({ type: BERANDA_KOTA_REQUEST });

    let link = process.env.END_POINT_API_SITE_MANAGEMENT + `api/option/city`;

    const { data } = await axios.get(link);

    dispatch({
      type: BERANDA_KOTA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BERANDA_KOTA_FAIL,
      payload: error.message,
    });
  }
};

// GET PENYELENGGARA
export const getAllPenyeleggaraPeserta = () => async (dispatch) => {
  try {
    dispatch({ type: BERANDA_PENYELENGGARA_REQUEST });

    let link =
      process.env.END_POINT_API_SITE_MANAGEMENT + `api/option/organizer`;

    const { data } = await axios.get(link);

    dispatch({
      type: BERANDA_PENYELENGGARA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BERANDA_PENYELENGGARA_FAIL,
      payload: error.message,
    });
  }
};

// GET TEMA
export const getTemaByAkademi = (akademi_id) => async (dispatch) => {
  try {
    dispatch({ type: BERANDA_TEMA_REQUEST });

    let link =
      process.env.END_POINT_API_PELATIHAN +
      `api/v1/tema/FilterAkademi?akademi_id=${akademi_id}`;

    const { data } = await axios.get(link);

    dispatch({
      type: BERANDA_TEMA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BERANDA_TEMA_FAIL,
      payload: error.message,
    });
  }
};

// GET PELATIHAN
export const getPelatihanByTema =
  (akademi = 1, tema = 1, page = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: BERANDA_PELATIHAN_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN +
        `api/v1/pelatihan/dasboard-pelatihan?akademi=${akademi}&tema=${tema}&page=${page}`;

      const { data } = await axios.get(link);

      dispatch({
        type: BERANDA_PELATIHAN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BERANDA_PELATIHAN_FAIL,
        payload: error.message,
      });
    }
  };

// GET PUBLIKASI
export const getAllPublikasi = () => async (dispatch) => {
  try {
    dispatch({ type: BERANDA_PUBLIKASI_REQUEST });

    let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/home`;

    const { data } = await axios.get(link);

    dispatch({
      type: BERANDA_PUBLIKASI_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BERANDA_PUBLIKASI_FAIL,
      payload: error.message,
    });
  }
};

// GET PENYELENGGARA PAGE
export const getAllPenyeleggaraPage =
  (page = 1, limit = 24, keyword, order = "asc") =>
  async (dispatch) => {
    try {
      dispatch({ type: BERANDA_PENYELENGGARA_PAGE_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN +
        `api/v1/pelatihan/list-mitra?page=${page}`;
      if (limit) link = link.concat(`&limit=${limit}`);
      if (keyword) link = link.concat(`&keyword=${keyword}`);
      if (order) link = link.concat(`&orderBy=${order}`); //asc || desc

      const { data } = await axios.get(link);

      dispatch({
        type: BERANDA_PENYELENGGARA_PAGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BERANDA_PENYELENGGARA_PAGE_FAIL,
        payload: error.message,
      });
    }
  };

// Clear Error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
