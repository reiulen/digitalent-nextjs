import {
  // TOTAL DATA PENDAFTAR
  DTS_TOTAL_PENDAFTAR_REQUEST,
  DTS_TOTAL_PENDAFTAR_SUCCESS,
  DTS_TOTAL_PENDAFTAR_FAIL,
  // TOTAL PENGGUNA
  DTS_TOTAL_PENGGUNA_REQUEST,
  DTS_TOTAL_PENGGUNA_SUCCESS,
  DTS_TOTAL_PENGGUNA_FAIL,
  // STATISTIK PESERTA
  DTS_STATISTIK_AKADEMI_PENDAFTAR_REQUEST,
  DTS_STATISTIK_AKADEMI_PENDAFTAR_SUCCESS,
  DTS_STATISTIK_AKADEMI_PENDAFTAR_FAIL,
  DTS_STATISTIK_AKADEMI_PESERTA_REQUEST,
  DTS_STATISTIK_AKADEMI_PESERTA_SUCCESS,
  DTS_STATISTIK_AKADEMI_PESERTA_FAIL,
  // STATISTIK MITRA
  DTS_STATISTIK_MITRA_PENDAFTAR_REQUEST,
  DTS_STATISTIK_MITRA_PENDAFTAR_SUCCESS,
  DTS_STATISTIK_MITRA_PENDAFTAR_FAIL,
  DTS_STATISTIK_MITRA_PESERTA_REQUEST,
  DTS_STATISTIK_MITRA_PESERTA_SUCCESS,
  DTS_STATISTIK_MITRA_PESERTA_FAIL,
  // TABLE PENDAFTARAN
  DTS_LIST_PENDAFTARAN_REQUEST,
  DTS_LIST_PENDAFTARAN_SUCCESS,
  DTS_LIST_PENDAFTARAN_FAIL,
  // PENYEBARAN PESERTA WILAYAH
  DTS_LIST_PESERTA_WILAYAH_REQUEST,
  DTS_LIST_PESERTA_WILAYAH_SUCCESS,
  DTS_LIST_PESERTA_WILAYAH_FAIL,
  // PROVINSI PENDAFTAR || PESERTA
  DTS_PROVINSI_PENDAFTAR_REQUEST,
  DTS_PROVINSI_PENDAFTAR_SUCCESS,
  DTS_PROVINSI_PENDAFTAR_FAIL,
  DTS_PROVINSI_PESERTA_REQUEST,
  DTS_PROVINSI_PESERTA_SUCCESS,
  DTS_PROVINSI_PESERTA_FAIL,
  // DATA PRIBADI UMUR | JENIS KELAMIN | PEKERJAAN
  DTS_PRIBADI_PESERTA_REQUEST,
  DTS_PRIBADI_PESERTA_SUCCESS,
  DTS_PRIBADI_PESERTA_FAIL,
  // DETAIL DASHBOARD
  DTS_DETAIL_AKADEMI_PENDAFTAR_REQUEST,
  DTS_DETAIL_AKADEMI_PENDAFTAR_SUCCESS,
  DTS_DETAIL_AKADEMI_PENDAFTAR_FAIL,
  DTS_DETAIL_AKADEMI_PESERTA_REQUEST,
  DTS_DETAIL_AKADEMI_PESERTA_SUCCESS,
  DTS_DETAIL_AKADEMI_PESERTA_FAIL,
  DTS_DETAIL_TEMA_PENDAFTAR_REQUEST,
  DTS_DETAIL_TEMA_PENDAFTAR_SUCCESS,
  DTS_DETAIL_TEMA_PENDAFTAR_FAIL,
  DTS_DETAIL_TEMA_PESERTA_REQUEST,
  DTS_DETAIL_TEMA_PESERTA_SUCCESS,
  DTS_DETAIL_TEMA_PESERTA_FAIL,
  CLEAR_ERRORS,
} from "../../../types/dashboard-kabadan/dashboard/digitalent.type";
import axios from "axios";

export const getDetailAkademiPendaftar =
  (token, token_permission = "", slug, year = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: DTS_DETAIL_AKADEMI_PENDAFTAR_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN +
        `api/v1/formPendaftaran/dashboard-peserta-tema?slug=${slug}`;
      if (year) link = link.concat(`&tahun=${year}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
          Permission: token_permission,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: DTS_DETAIL_AKADEMI_PENDAFTAR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DTS_DETAIL_AKADEMI_PENDAFTAR_FAIL,
        payload: error.response.data.message,
      });
    }
  };
export const getDetailAkademiPeserta =
  (token, token_permission = "", slug, year = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: DTS_DETAIL_AKADEMI_PESERTA_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN +
        `api/v1/formPendaftaran/dashboard-pengguna-tema?slug=${slug}`;
      if (year) link = link.concat(`&tahun=${year}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
          Permission: token_permission,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: DTS_DETAIL_AKADEMI_PESERTA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DTS_DETAIL_AKADEMI_PESERTA_FAIL,
        payload: error.response.data.message,
      });
    }
  };
export const getDetailTemaPeserta =
  (token, token_permission = "", id, year = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: DTS_DETAIL_TEMA_PESERTA_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN +
        `api/v1/formPendaftaran/dashboard-pengguna-pelatihan?id=${id}`;
      if (year) link = link.concat(`&tahun=${year}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
          Permission: token_permission,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: DTS_DETAIL_TEMA_PESERTA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DTS_DETAIL_TEMA_PESERTA_FAIL,
        payload: error.response.data.message,
      });
    }
  };
export const getDetailTemaPendaftar =
  (token, token_permission = "", id, page = null, year = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: DTS_DETAIL_TEMA_PENDAFTAR_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN +
        `api/v1/formPendaftaran/dashboard-peserta-pelatihan?id=${id}`;
      if (page) link = link.concat(`&page=${page}`);
      if (year) link = link.concat(`&tahun=${year}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
          Permission: token_permission,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: DTS_DETAIL_TEMA_PENDAFTAR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DTS_DETAIL_TEMA_PENDAFTAR_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getDigitalentTotalDataPendaftar =
  (token, token_permission = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: DTS_TOTAL_PENDAFTAR_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN + `api/v1/auth/dashboard-pengguna`;

      const config = {
        headers: {
          Authorization: "Bearer " + token,
          Permission: token_permission,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: DTS_TOTAL_PENDAFTAR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DTS_TOTAL_PENDAFTAR_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getDigitalentTotalPengguna =
  (token, token_permission = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: DTS_TOTAL_PENGGUNA_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN +
        `api/v1/auth/dashboard-total-pengguna`;

      const config = {
        headers: {
          Authorization: "Bearer " + token,
          Permission: token_permission,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: DTS_TOTAL_PENGGUNA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DTS_TOTAL_PENGGUNA_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getDigitalentStatistikAkademiPeserta =
  (token, token_permission = "", tahun) =>
  async (dispatch) => {
    try {
      dispatch({ type: DTS_STATISTIK_AKADEMI_PESERTA_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN + `api/v1/akademi/peserta-akademi`;
      if (tahun) link = link.concat(`?tahun=${tahun}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
          Permission: token_permission,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: DTS_STATISTIK_AKADEMI_PESERTA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DTS_STATISTIK_AKADEMI_PESERTA_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getDigitalentStatistikAkademiPendaftar =
  (token, token_permission = "", tahun) =>
  async (dispatch) => {
    try {
      dispatch({ type: DTS_STATISTIK_AKADEMI_PENDAFTAR_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN +
        `api/v1/akademi/pendaftaran-akademi`;
      if (tahun) link = link.concat(`?tahun=${tahun}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
          Permission: token_permission,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: DTS_STATISTIK_AKADEMI_PENDAFTAR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DTS_STATISTIK_AKADEMI_PENDAFTAR_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getDigitalentStatistikMitraPeserta =
  (token, token_permission = "", page = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: DTS_STATISTIK_MITRA_PESERTA_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN +
        `api/v1/formPendaftaran/peserta-mitra`;
      if (page) link = link.concat(`?page=${page}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
          Permission: token_permission,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: DTS_STATISTIK_MITRA_PESERTA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DTS_STATISTIK_MITRA_PESERTA_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getDigitalentStatistikMitraPendaftar =
  (token, token_permission = "", page = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: DTS_STATISTIK_MITRA_PENDAFTAR_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN +
        `api/v1/formPendaftaran/pendaftaran-mitra`;
      if (page) link = link.concat(`?page=${page}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
          Permission: token_permission,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: DTS_STATISTIK_MITRA_PENDAFTAR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DTS_STATISTIK_MITRA_PENDAFTAR_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getDigitalentTablePendaftaran =
  (token, token_permission = "", page = null, keyword = "", limit = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: DTS_LIST_PENDAFTARAN_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN +
        `api/v1/pelatihan/list-pelatihan-status`;
      if (page) link = link.concat(`?page=${page}`);
      if (keyword) link = link.concat(`&cari=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
          Permission: token_permission,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: DTS_LIST_PENDAFTARAN_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DTS_LIST_PENDAFTARAN_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getDigitalentPesertaWilayah =
  (token, token_permission = "", akademi = null, tema = "", tahun = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: DTS_LIST_PESERTA_WILAYAH_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN +
        `api/v1/formPendaftaran/peta-indonesia?`;
      if (akademi) link = link.concat(`&akademi=${akademi}`);
      if (tema) link = link.concat(`&tema=${tema}`);
      if (tahun) link = link.concat(`&tahun=${tahun}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
          Permission: token_permission,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: DTS_LIST_PESERTA_WILAYAH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DTS_LIST_PESERTA_WILAYAH_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getDigitalentProvinsiPeserta =
  (token, token_permission = "", page = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: DTS_PROVINSI_PESERTA_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN +
        `api/v1/formPendaftaran/peserta-provinsi`;
      if (page) link = link.concat(`?page=${page}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
          Permission: token_permission,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: DTS_PROVINSI_PESERTA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DTS_PROVINSI_PESERTA_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getDigitalentProvinsiPendaftar =
  (token, token_permission = "", page = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: DTS_PROVINSI_PENDAFTAR_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN +
        `api/v1/formPendaftaran/pendaftaran-provinsi`;
      if (page) link = link.concat(`?page=${page}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
          Permission: token_permission,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: DTS_PROVINSI_PENDAFTAR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DTS_PROVINSI_PENDAFTAR_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getDigitalentDataPribadi =
  (token, token_permission = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: DTS_PRIBADI_PESERTA_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN +
        `api/v1/formPendaftaran/data-pendaftran-user-pelatihan`;

      const config = {
        headers: {
          Authorization: "Bearer " + token,
          Permission: token_permission,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: DTS_PRIBADI_PESERTA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DTS_PRIBADI_PESERTA_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
