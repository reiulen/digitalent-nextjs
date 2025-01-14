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
export const beasiswaStatistikDalamReducer = (
  state = { statistik: [] },
  action
) => {
  switch (action.type) {
    case BEASISWA_STATISTIK_DALAM_REQUEST:
      return {
        loading: true,
      };

    case BEASISWA_STATISTIK_DALAM_SUCCESS:
      return {
        loading: false,
        statistik: action.payload.data,
      };

    case BEASISWA_STATISTIK_DALAM_FAIL:
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
export const beasiswaStatistikLuarReducer = (
  state = { statistik: [] },
  action
) => {
  switch (action.type) {
    case BEASISWA_STATISTIK_LUAR_REQUEST:
      return {
        loading: true,
      };

    case BEASISWA_STATISTIK_LUAR_SUCCESS:
      return {
        loading: false,
        statistik: action.payload.data,
      };

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
export const beasiswaProvinsiPendaftarReducer = (
  state = { provinsi: [] },
  action
) => {
  switch (action.type) {
    case BEASISWA_PROVINSI_PENDAFTAR_REQUEST:
      return {
        loading: true,
      };

    case BEASISWA_PROVINSI_PENDAFTAR_SUCCESS:
      return {
        loading: false,
        provinsi: action.payload.data,
      };

    case BEASISWA_PROVINSI_PENDAFTAR_FAIL:
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
export const beasiswaProvinsiAwardeeReducer = (
  state = { provinsi: [] },
  action
) => {
  switch (action.type) {
    case BEASISWA_PROVINSI_AWARDEE_REQUEST:
      return {
        loading: true,
      };

    case BEASISWA_PROVINSI_AWARDEE_SUCCESS:
      return {
        loading: false,
        provinsi: action.payload.data,
      };

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
export const beasiswaUniversitasDalamReducer = (
  state = { universitas: [] },
  action
) => {
  switch (action.type) {
    case BEASISWA_UNIVERSITAS_DALAM_REQUEST:
      return {
        loading: true,
      };

    case BEASISWA_UNIVERSITAS_DALAM_SUCCESS:
      return {
        loading: false,
        universitas: action.payload.data,
      };

    case BEASISWA_UNIVERSITAS_DALAM_FAIL:
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

export const beasiswaUniversitasLuarReducer = (
  state = { universitas: [] },
  action
) => {
  switch (action.type) {
    case BEASISWA_UNIVERSITAS_LUAR_REQUEST:
      return {
        loading: true,
      };

    case BEASISWA_UNIVERSITAS_LUAR_SUCCESS:
      return {
        loading: false,
        universitas: action.payload.data,
      };

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
      return {
        loading: true,
      };

    case BEASISWA_ALUMNI_SUCCESS:
      return {
        loading: false,
        alumni: action.payload.data,
      };

    case BEASISWA_ALUMNI_FAIL:
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

export const beasiswaAlumniAwardeeReducer = (
  state = { alumni: [] },
  action
) => {
  switch (action.type) {
    case BEASISWA_AWARDEE_REQUEST:
      return {
        loading: true,
      };

    case BEASISWA_AWARDEE_SUCCESS:
      return {
        loading: false,
        alumni: action.payload.data,
      };

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

// BEASISWA YEAR
export const beasiswaYearReducer = (state = { year: [] }, action) => {
  switch (action.type) {
    case BEASISWA_YEAR_REQUEST:
      return {
        loading: true,
      };

    case BEASISWA_YEAR_SUCCESS:
      return {
        loading: false,
        year: action.payload.data,
      };

    case BEASISWA_YEAR_FAIL:
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
