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
