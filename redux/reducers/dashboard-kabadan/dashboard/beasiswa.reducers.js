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

// BEASISWA TOTAL PENGGUNA
export const beasiswaTotalPenggunaReducer = (
  state = { totalPengguna: [] },
  action
) => {
  switch (action.type) {
    case BEASISWA_TOTAL_PENGGUNA_REQUEST:
      return {
        loading: true,
      };

    case BEASISWA_TOTAL_PENGGUNA_SUCCESS:
      return {
        loading: false,
        totalPengguna: action.payload.data,
      };

    case BEASISWA_TOTAL_PENGGUNA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// BEASISWA TOTAL PENDAFTAR
export const beasiswaTotalPendaftarReducer = (
  state = { totalPendaftar: [] },
  action
) => {
  switch (action.type) {
    case BEASISWA_TOTAL_PENDAFTAR_REQUEST:
      return {
        loading: true,
      };

    case BEASISWA_TOTAL_PENDAFTAR_SUCCESS:
      return {
        loading: false,
        totalPendaftar: action.payload.data,
      };

    case BEASISWA_TOTAL_PENDAFTAR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// BEASISWA STATISTIK
export const beasiswaStatistikReducer = (state = { statistik: [] }, action) => {
  switch (action.type) {
    case BEASISWA_STATISTIK_DALAM_REQUEST:
    case BEASISWA_STATISTIK_LUAR_REQUEST:
      return {
        loading: true,
      };

    case BEASISWA_STATISTIK_DALAM_SUCCESS:
    case BEASISWA_STATISTIK_LUAR_SUCCESS:
      return {
        loading: false,
        statistik: action.payload.data,
      };

    case BEASISWA_STATISTIK_DALAM_FAIL:
    case BEASISWA_STATISTIK_LUAR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// BEASISWA MAP PENDAFTAR
export const beasiswaMapPendaftarReducer = (
  state = { wilayah: [] },
  action
) => {
  switch (action.type) {
    case BEASISWA_MAP_PENDAFTAR_REQUEST:
      return {
        loading: true,
      };

    case BEASISWA_MAP_PENDAFTAR_SUCCESS:
      return {
        loading: false,
        wilayah: action.payload.data,
      };

    case BEASISWA_MAP_PENDAFTAR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// BEASISWA PROVINSI
export const beasiswaProvinsiReducer = (state = { provinsi: [] }, action) => {
  switch (action.type) {
    case BEASISWA_PROVINSI_PENDAFTAR_REQUEST:
    case BEASISWA_PROVINSI_AWARDEE_REQUEST:
      return {
        loading: true,
      };

    case BEASISWA_PROVINSI_PENDAFTAR_SUCCESS:
    case BEASISWA_PROVINSI_AWARDEE_SUCCESS:
      return {
        loading: false,
        provinsi: action.payload.data,
      };

    case BEASISWA_PROVINSI_PENDAFTAR_FAIL:
    case BEASISWA_PROVINSI_AWARDEE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// BEASISWA UNIVERSITAS
export const beasiswaUniversitasReducer = (
  state = { universitas: [] },
  action
) => {
  switch (action.type) {
    case BEASISWA_UNIVERSITAS_DALAM_REQUEST:
    case BEASISWA_UNIVERSITAS_LUAR_REQUEST:
      return {
        loading: true,
      };

    case BEASISWA_UNIVERSITAS_DALAM_SUCCESS:
    case BEASISWA_UNIVERSITAS_LUAR_SUCCESS:
      return {
        loading: false,
        universitas: action.payload.data,
      };

    case BEASISWA_UNIVERSITAS_DALAM_FAIL:
    case BEASISWA_UNIVERSITAS_LUAR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

// BEASISWA ALUMNI
export const beasiswaAlumniReducer = (state = { alumni: [] }, action) => {
  switch (action.type) {
    case BEASISWA_ALUMNI_REQUEST:
    case BEASISWA_AWARDEE_REQUEST:
      return {
        loading: true,
      };

    case BEASISWA_ALUMNI_SUCCESS:
    case BEASISWA_AWARDEE_SUCCESS:
      return {
        loading: false,
        alumni: action.payload.data,
      };

    case BEASISWA_ALUMNI_FAIL:
    case BEASISWA_AWARDEE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
