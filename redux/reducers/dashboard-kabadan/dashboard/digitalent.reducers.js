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

// TOTAL PENGGUNA
export const digitalentTotalPenggunaReducer = (
  state = { totalPengguna: [] },
  action
) => {
  switch (action.type) {
    case DTS_TOTAL_PENGGUNA_REQUEST:
      return {
        loading: true,
      };

    case DTS_TOTAL_PENGGUNA_SUCCESS:
      return {
        loading: false,
        totalPengguna: action.payload.data,
      };

    case DTS_TOTAL_PENGGUNA_FAIL:
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

// STATISTIK PESERTA
export const digitalentStatistikAkademiReducer = (
  state = { statistik: [] },
  action
) => {
  switch (action.type) {
    case DTS_STATISTIK_AKADEMI_PESERTA_REQUEST:
    case DTS_STATISTIK_AKADEMI_PENDAFTAR_REQUEST:
      return {
        loading: true,
      };

    case DTS_STATISTIK_AKADEMI_PESERTA_SUCCESS:
    case DTS_STATISTIK_AKADEMI_PENDAFTAR_SUCCESS:
      return {
        loading: false,
        statistik: action.payload.data,
      };

    case DTS_STATISTIK_AKADEMI_PESERTA_FAIL:
    case DTS_STATISTIK_AKADEMI_PENDAFTAR_FAIL:
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

//   STATISTIK MITRA
export const digitalentStatistikMitraReducer = (
  state = { statistik: [] },
  action
) => {
  switch (action.type) {
    case DTS_STATISTIK_MITRA_PESERTA_REQUEST:
    case DTS_STATISTIK_MITRA_PENDAFTAR_REQUEST:
      return {
        loading: true,
      };

    case DTS_STATISTIK_MITRA_PESERTA_SUCCESS:
    case DTS_STATISTIK_MITRA_PENDAFTAR_SUCCESS:
      return {
        loading: false,
        statistik: action.payload.data,
      };

    case DTS_STATISTIK_MITRA_PESERTA_FAIL:
    case DTS_STATISTIK_MITRA_PENDAFTAR_FAIL:
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

//   TABLE PENDAFTARAN DIBUKA
export const digitalentTablePendaftaranReducer = (
  state = { tablePendaftar: [] },
  action
) => {
  switch (action.type) {
    case DTS_LIST_PENDAFTARAN_REQUEST:
      return {
        loading: true,
      };

    case DTS_LIST_PENDAFTARAN_SUCCESS:
      return {
        loading: false,
        tablePendaftar: action.payload.data,
      };

    case DTS_LIST_PENDAFTARAN_FAIL:
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

// PENYEBARAN PESERTA WILAYAH
export const digitalentPesertaWilayahReducer = (
  state = { wilayah: [] },
  action
) => {
  switch (action.type) {
    case DTS_LIST_PESERTA_WILAYAH_REQUEST:
      return {
        loading: true,
      };

    case DTS_LIST_PESERTA_WILAYAH_SUCCESS:
      return {
        loading: false,
        wilayah: action.payload.data,
      };

    case DTS_LIST_PESERTA_WILAYAH_FAIL:
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

// PROVINSI PENDAFTAR || PESERTA
export const digitalentProvinsiReducer = (state = { provinsi: [] }, action) => {
  switch (action.type) {
    case DTS_PROVINSI_PESERTA_REQUEST:
    case DTS_PROVINSI_PENDAFTAR_REQUEST:
      return {
        loading: true,
      };

    case DTS_PROVINSI_PESERTA_SUCCESS:
    case DTS_PROVINSI_PENDAFTAR_SUCCESS:
      return {
        loading: false,
        provinsi: action.payload.data,
      };

    case DTS_PROVINSI_PESERTA_FAIL:
    case DTS_PROVINSI_PENDAFTAR_FAIL:
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

// UMUR PENDAFTAR || PESERTA
export const digitalentUmurReducer = (state = { umur: [] }, action) => {
  switch (action.type) {
    case DTS_UMUR_PESERTA_REQUEST:
    case DTS_UMUR_PENDAFTAR_REQUEST:
      return {
        loading: true,
      };

    case DTS_UMUR_PESERTA_SUCCESS:
    case DTS_UMUR_PENDAFTAR_SUCCESS:
      return {
        loading: false,
        umur: action.payload.data,
      };

    case DTS_UMUR_PESERTA_FAIL:
    case DTS_UMUR_PENDAFTAR_FAIL:
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

// JENIS KELAMIN PENDAFTAR || PESERTA
export const digitalentJenisKelaminReducer = (
  state = { jenis_kelamin: [] },
  action
) => {
  switch (action.type) {
    case DTS_JENIS_KELAMIN_PESERTA_REQUEST:
    case DTS_JENIS_KELAMIN_PENDAFTAR_REQUEST:
      return {
        loading: true,
      };

    case DTS_JENIS_KELAMIN_PESERTA_SUCCESS:
    case DTS_JENIS_KELAMIN_PENDAFTAR_SUCCESS:
      return {
        loading: false,
        jenis_kelamin: action.payload.data,
      };

    case DTS_JENIS_KELAMIN_PESERTA_FAIL:
    case DTS_JENIS_KELAMIN_PENDAFTAR_FAIL:
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

// PENDIDIKAN PENDAFTAR || PESERTA
export const digitalentPendidikanReducer = (
  state = { pendidikan: [] },
  action
) => {
  switch (action.type) {
    case DTS_PENDIDIKAN_PESERTA_REQUEST:
    case DTS_PENDIDIKAN_PENDAFTAR_REQUEST:
      return {
        loading: true,
      };

    case DTS_PENDIDIKAN_PESERTA_SUCCESS:
    case DTS_PENDIDIKAN_PENDAFTAR_SUCCESS:
      return {
        loading: false,
        pendidikan: action.payload.data,
      };

    case DTS_PENDIDIKAN_PESERTA_FAIL:
    case DTS_PENDIDIKAN_PENDAFTAR_FAIL:
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
