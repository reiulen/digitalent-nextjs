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
  CLEAR_ERRORS,
} from "../../../types/dashboard-kabadan/dashboard/digitalent.type";
import axios from "axios";

export const getDigitalentTotalDataPendaftar = (token) => async (dispatch) => {
  try {
    dispatch({ type: DTS_TOTAL_PENDAFTAR_REQUEST });

    let link =
      process.env.END_POINT_API_PELATIHAN + `api/v1/auth/dashboard-pengguna`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
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

export const getDigitalentTotalPengguna = (token) => async (dispatch) => {
  try {
    dispatch({ type: DTS_TOTAL_PENGGUNA_REQUEST });

    let link =
      process.env.END_POINT_API_PELATIHAN +
      `api/v1/auth/dashboard-total-pengguna`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
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
  (token, tahun) => async (dispatch) => {
    try {
      dispatch({ type: DTS_STATISTIK_AKADEMI_PESERTA_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN + `api/v1/akademi/peserta-akademi`;
      if (tahun) link = link.concat(`?tahun=${tahun}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
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
  (token, tahun) => async (dispatch) => {
    try {
      dispatch({ type: DTS_STATISTIK_AKADEMI_PENDAFTAR_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN +
        `api/v1/akademi/pendaftaran-akademi`;
      if (tahun) link = link.concat(`?tahun=${tahun}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
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
  (token, page = null) =>
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
  (token, page = null) =>
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
  (token, page = null, keyword = "", limit = null) =>
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
  (token, akademi = null, tema = "", tahun = null) =>
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
  (token, page = null) =>
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
  (token, page = null) =>
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

export const getDigitalentDataPribadi = (token) => async (dispatch) => {
  try {
    dispatch({ type: DTS_PRIBADI_PESERTA_REQUEST });

    let link =
      process.env.END_POINT_API_PELATIHAN +
      `api/v1/formPendaftaran/data-pendaftran-user-pelatihan`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
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
