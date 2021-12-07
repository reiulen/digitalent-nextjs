import {
  // BEASISWA TOTAL PENGGUNA
  BEASISWA_TOTAL_PENGGUNA_REQUEST,
  BEASISWA_TOTAL_PENGGUNA_SUCCESS,
  BEASISWA_TOTAL_PENGGUNA_FAIL,
  // BEASISWA TOTAL PENDAFTAR
  BEASISWA_TOTAL_PENDAFTAR_REQUEST,
  BEASISWA_TOTAL_PENDAFTAR_SUCCESS,
  BEASISWA_TOTAL_PENDAFTAR_FAIL,
  // BEASISWA STATISTIK
  BEASISWA_STATISTIK_DALAM_REQUEST,
  BEASISWA_STATISTIK_DALAM_SUCCESS,
  BEASISWA_STATISTIK_DALAM_FAIL,
  BEASISWA_STATISTIK_LUAR_REQUEST,
  BEASISWA_STATISTIK_LUAR_SUCCESS,
  BEASISWA_STATISTIK_LUAR_FAIL,
  // BEASISWA MAP PENDAFTAR
  BEASISWA_MAP_PENDAFTAR_REQUEST,
  BEASISWA_MAP_PENDAFTAR_SUCCESS,
  BEASISWA_MAP_PENDAFTAR_FAIL,
  // BEASISWA PROVINSI
  BEASISWA_PROVINSI_PENDAFTAR_REQUEST,
  BEASISWA_PROVINSI_PENDAFTAR_SUCCESS,
  BEASISWA_PROVINSI_PENDAFTAR_FAIL,
  BEASISWA_PROVINSI_AWARDEE_REQUEST,
  BEASISWA_PROVINSI_AWARDEE_SUCCESS,
  BEASISWA_PROVINSI_AWARDEE_FAIL,
  // BEASISWA UNIVERSITAS
  BEASISWA_UNIVERSITAS_DALAM_REQUEST,
  BEASISWA_UNIVERSITAS_DALAM_SUCCESS,
  BEASISWA_UNIVERSITAS_DALAM_FAIL,
  BEASISWA_UNIVERSITAS_LUAR_REQUEST,
  BEASISWA_UNIVERSITAS_LUAR_SUCCESS,
  BEASISWA_UNIVERSITAS_LUAR_FAIL,
  // BEASISWA ALUMNI
  BEASISWA_AWARDEE_REQUEST,
  BEASISWA_AWARDEE_SUCCESS,
  BEASISWA_AWARDEE_FAIL,
  BEASISWA_ALUMNI_REQUEST,
  BEASISWA_ALUMNI_SUCCESS,
  BEASISWA_ALUMNI_FAIL,
  // BEASISWA YEAR
  BEASISWA_YEAR_REQUEST,
  BEASISWA_YEAR_SUCCESS,
  BEASISWA_YEAR_FAIL,
  CLEAR_ERRORS,
} from "../../../types/dashboard-kabadan/dashboard/beasiswa.type";
import axios from "axios";

// BEASISWA TOTAL PENGGUNA
export const getBeasiswaTotalPengguna = (token) => async (dispatch) => {
  try {
    dispatch({ type: BEASISWA_TOTAL_PENGGUNA_REQUEST });

    let link = process.env.END_POINT_API_BEASISWA + `users`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: BEASISWA_TOTAL_PENGGUNA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BEASISWA_TOTAL_PENGGUNA_FAIL,
      payload: error.message,
    });
  }
};

// BEASISWA TOTAL PENDAFTAR
export const getBeasiswaTotalPendaftar = (token) => async (dispatch) => {
  try {
    dispatch({ type: BEASISWA_TOTAL_PENDAFTAR_REQUEST });

    let link = process.env.END_POINT_API_BEASISWA + `registrant`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: BEASISWA_TOTAL_PENDAFTAR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BEASISWA_TOTAL_PENDAFTAR_FAIL,
      payload: error.message,
    });
  }
};

// BEASISWA STATISTIK DALAM
export const getBeasiswaStatistikDalam = (token, year) => async (dispatch) => {
  try {
    dispatch({ type: BEASISWA_STATISTIK_DALAM_REQUEST });

    let link =
      process.env.END_POINT_API_BEASISWA + `statistics?type=dalam negeri`;
    if (year) link = link.concat(`&year=${year}`);

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: BEASISWA_STATISTIK_DALAM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BEASISWA_STATISTIK_DALAM_FAIL,
      payload: error.message,
    });
  }
};

// BEASISWA STATISTIK LUAR
export const getBeasiswaStatistikLuar = (token, year) => async (dispatch) => {
  try {
    dispatch({ type: BEASISWA_STATISTIK_LUAR_REQUEST });

    let link =
      process.env.END_POINT_API_BEASISWA + `statistics?type=luar negeri`;
    if (year) link = link.concat(`&year=${year}`);

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: BEASISWA_STATISTIK_LUAR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BEASISWA_STATISTIK_LUAR_FAIL,
      payload: error.message,
    });
  }
};

// BEASISWA MAP PENDAFTAR
export const getBeasiswaPendaftarWilayah =
  (token, year) => async (dispatch) => {
    try {
      dispatch({ type: BEASISWA_MAP_PENDAFTAR_REQUEST });

      let link = process.env.END_POINT_API_BEASISWA + `maps`;
      if (year) link = link.concat(`?year=${year}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: BEASISWA_MAP_PENDAFTAR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BEASISWA_STATISTIK_LUAR_FAIL,
        payload: error.message,
      });
    }
  };

// BEASISWA PROVINSI PENDAFTAR
export const getBeasiswaProvinsiPendaftar =
  (token, page) => async (dispatch) => {
    try {
      dispatch({ type: BEASISWA_PROVINSI_PENDAFTAR_REQUEST });

      let link =
        process.env.END_POINT_API_BEASISWA +
        `progressbar-province?type=pendaftar`;
      if (page) link = link.concat(`&page=${page}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: BEASISWA_PROVINSI_PENDAFTAR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BEASISWA_PROVINSI_PENDAFTAR_FAIL,
        payload: error.message,
      });
    }
  };

// BEASISWA PROVINSI AWARDEE
export const getBeasiswaProvinsiAwardee = (token, page) => async (dispatch) => {
  try {
    dispatch({ type: BEASISWA_PROVINSI_AWARDEE_REQUEST });

    let link =
      process.env.END_POINT_API_BEASISWA + `progressbar-province?type=awardee`;
    if (page) link = link.concat(`&page=${page}`);

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: BEASISWA_PROVINSI_AWARDEE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BEASISWA_PROVINSI_AWARDEE_FAIL,
      payload: error.message,
    });
  }
};

// BEASISWA UNIVERSITAS DALAM
export const getBeasiswaUniversitasDalam =
  (token, page, year) => async (dispatch) => {
    try {
      dispatch({ type: BEASISWA_UNIVERSITAS_DALAM_REQUEST });

      let link =
        process.env.END_POINT_API_BEASISWA +
        `progressbar-scholarship?type=dalam negeri`;
      if (page) link = link.concat(`&page=${page}`);
      if (year) link = link.concat(`&year=${year}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: BEASISWA_UNIVERSITAS_DALAM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BEASISWA_UNIVERSITAS_DALAM_FAIL,
        payload: error.message,
      });
    }
  };

// BEASISWA UNIVERSITAS LUAR
export const getBeasiswaUniversitasLuar =
  (token, page, year) => async (dispatch) => {
    try {
      dispatch({ type: BEASISWA_UNIVERSITAS_LUAR_REQUEST });

      let link =
        process.env.END_POINT_API_BEASISWA +
        `progressbar-scholarship?type=luar negeri`;
      if (page) link = link.concat(`&page=${page}`);
      if (year) link = link.concat(`&year=${year}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: BEASISWA_UNIVERSITAS_LUAR_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BEASISWA_UNIVERSITAS_LUAR_FAIL,
        payload: error.message,
      });
    }
  };

// BEASISWA ALUMNI
export const getBeasiswaAlumni = (token) => async (dispatch) => {
  try {
    dispatch({ type: BEASISWA_ALUMNI_REQUEST });

    let link =
      process.env.END_POINT_API_BEASISWA + `progressbar-alumni?type=alumni`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: BEASISWA_ALUMNI_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BEASISWA_ALUMNI_FAIL,
      payload: error.message,
    });
  }
};

// BEASISWA AWARDEE
export const getBeasiswaAwardee = (token) => async (dispatch) => {
  try {
    dispatch({ type: BEASISWA_AWARDEE_REQUEST });

    let link =
      process.env.END_POINT_API_BEASISWA + `progressbar-alumni?type=awardee`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: BEASISWA_AWARDEE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BEASISWA_AWARDEE_FAIL,
      payload: error.message,
    });
  }
};

// BEASISWA YEAR
export const getBeasiswaYear = (token) => async (dispatch) => {
  try {
    dispatch({ type: BEASISWA_YEAR_REQUEST });

    let link = process.env.END_POINT_API_BEASISWA + `get-year`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: BEASISWA_YEAR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: BEASISWA_YEAR_FAIL,
      payload: error.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
