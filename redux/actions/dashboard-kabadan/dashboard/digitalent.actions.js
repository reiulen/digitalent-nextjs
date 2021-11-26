import {
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
  // UMUR PENDAFTAR || PESERTA
  DTS_UMUR_PENDAFTAR_REQUEST,
  DTS_UMUR_PENDAFTAR_SUCCESS,
  DTS_UMUR_PENDAFTAR_FAIL,
  DTS_UMUR_PESERTA_REQUEST,
  DTS_UMUR_PESERTA_SUCCESS,
  DTS_UMUR_PESERTA_FAIL,
  // JENIS_KELAMIN PENDAFTAR || PESERTA
  DTS_JENIS_KELAMIN_PENDAFTAR_REQUEST,
  DTS_JENIS_KELAMIN_PENDAFTAR_SUCCESS,
  DTS_JENIS_KELAMIN_PENDAFTAR_FAIL,
  DTS_JENIS_KELAMIN_PESERTA_REQUEST,
  DTS_JENIS_KELAMIN_PESERTA_SUCCESS,
  DTS_JENIS_KELAMIN_PESERTA_FAIL,
  // PENDIDIKAN PENDAFTAR || PESERTA
  DTS_PENDIDIKAN_PENDAFTAR_REQUEST,
  DTS_PENDIDIKAN_PENDAFTAR_SUCCESS,
  DTS_PENDIDIKAN_PENDAFTAR_FAIL,
  DTS_PENDIDIKAN_PESERTA_REQUEST,
  DTS_PENDIDIKAN_PESERTA_SUCCESS,
  DTS_PENDIDIKAN_PESERTA_FAIL,
  CLEAR_ERRORS,
} from "../../../types/dashboard-kabadan/dashboard/digitalent.type";
import axios from "axios";

export const getDigitalentTotalPengguna = (token) => async (dispatch) => {
  try {
    dispatch({ type: DTS_TOTAL_PENGGUNA_REQUEST });

    let link =
      process.env.END_POINT_API_PELATIHAN + `api/dashboard/digitalent?`;

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
      payload: error.message,
    });
  }
};

export const getDigitalentStatistikAkademiPeserta =
  (token, year = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: DTS_STATISTIK_AKADEMI_PESERTA_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN + `api/dashboard/digitalent?`;
      if (year) link = link.concat(`&year=${year}`);

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
        payload: error.message,
      });
    }
  };

export const getDigitalentStatistikAkademiPendaftar =
  (token, year = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: DTS_STATISTIK_AKADEMI_PENDAFTAR_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN + `api/dashboard/digitalent?`;
      if (year) link = link.concat(`&year=${year}`);

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
        payload: error.message,
      });
    }
  };

export const getDigitalentStatistikMitraPeserta =
  (token, year = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: DTS_STATISTIK_MITRA_PESERTA_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN + `api/dashboard/digitalent?`;
      if (year) link = link.concat(`&year=${year}`);

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
        payload: error.message,
      });
    }
  };

export const getDigitalentStatistikMitraPendaftar =
  (token, year = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: DTS_STATISTIK_MITRA_PENDAFTAR_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN + `api/dashboard/digitalent?`;
      if (year) link = link.concat(`&year=${year}`);

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
        payload: error.message,
      });
    }
  };

export const getDigitalentTablePendaftaran =
  (token, page = null, keyword = "", limit = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: DTS_LIST_PENDAFTARAN_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN + `api/dashboard/digitalent?`;
      if (page) link = link.concat(`&page=${page}`);
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
        payload: error.message,
      });
    }
  };

export const getDigitalentPesertaWilayah =
  (token, academy = null, theme = "", year = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: DTS_LIST_PESERTA_WILAYAH_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN + `api/dashboard/digitalent?`;
      if (academy) link = link.concat(`&academy=${academy}`);
      if (theme) link = link.concat(`&cari=${theme}`);
      if (year) link = link.concat(`&year=${year}`);

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
        payload: error.message,
      });
    }
  };

export const getDigitalentProvinsiPeserta =
  (token, page = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: DTS_PROVINSI_PESERTA_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN + `api/dashboard/digitalent?`;
      if (page) link = link.concat(`&page=${page}`);

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
        payload: error.message,
      });
    }
  };

export const getDigitalentProvinsiPendaftar =
  (token, page = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: DTS_PROVINSI_PENDAFTAR_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN + `api/dashboard/digitalent?`;
      if (page) link = link.concat(`&page=${page}`);

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
        payload: error.message,
      });
    }
  };

export const getDigitalentUmurPeserta = (token) => async (dispatch) => {
  try {
    dispatch({ type: DTS_UMUR_PESERTA_REQUEST });

    let link =
      process.env.END_POINT_API_PELATIHAN + `api/dashboard/digitalent?`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: DTS_UMUR_PESERTA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DTS_UMUR_PESERTA_FAIL,
      payload: error.message,
    });
  }
};

export const getDigitalentUmurPendaftar = (token) => async (dispatch) => {
  try {
    dispatch({ type: DTS_UMUR_PENDAFTAR_REQUEST });

    let link =
      process.env.END_POINT_API_PELATIHAN + `api/dashboard/digitalent?`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: DTS_UMUR_PENDAFTAR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DTS_UMUR_PENDAFTAR_FAIL,
      payload: error.message,
    });
  }
};

export const getDigitalentJenisKelaminPeserta = (token) => async (dispatch) => {
  try {
    dispatch({ type: DTS_JENIS_KELAMIN_PESERTA_REQUEST });

    let link =
      process.env.END_POINT_API_PELATIHAN + `api/dashboard/digitalent?`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: DTS_JENIS_KELAMIN_PESERTA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DTS_JENIS_KELAMIN_PESERTA_FAIL,
      payload: error.message,
    });
  }
};

export const getDigitalentJenisKelaminPendaftar =
  (token) => async (dispatch) => {
    try {
      dispatch({ type: DTS_JENIS_KELAMIN_PENDAFTAR_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN + `api/dashboard/digitalent?`;

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: DTS_JENIS_KELAMIN_PENDAFTAR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DTS_JENIS_KELAMIN_PENDAFTAR_FAIL,
        payload: error.message,
      });
    }
  };

export const getDigitalentPendidikanPeserta = (token) => async (dispatch) => {
  try {
    dispatch({ type: DTS_PENDIDIKAN_PESERTA_REQUEST });

    let link =
      process.env.END_POINT_API_PELATIHAN + `api/dashboard/digitalent?`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: DTS_PENDIDIKAN_PESERTA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DTS_PENDIDIKAN_PESERTA_FAIL,
      payload: error.message,
    });
  }
};

export const getDigitalentPendidikanPendaftar = (token) => async (dispatch) => {
  try {
    dispatch({ type: DTS_PENDIDIKAN_PENDAFTAR_REQUEST });

    let link =
      process.env.END_POINT_API_PELATIHAN + `api/dashboard/digitalent?`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: DTS_PENDIDIKAN_PENDAFTAR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DTS_PENDIDIKAN_PENDAFTAR_FAIL,
      payload: error.message,
    });
  }
};
