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
  DTS_DETAIL_AKADEMI_PESERTA_REQUEST,
  DTS_DETAIL_AKADEMI_PESERTA_SUCCESS,
  DTS_DETAIL_AKADEMI_PESERTA_FAIL,
  DTS_DETAIL_AKADEMI_PENDAFTAR_REQUEST,
  DTS_DETAIL_AKADEMI_PENDAFTAR_SUCCESS,
  DTS_DETAIL_AKADEMI_PENDAFTAR_FAIL,
  DTS_DETAIL_TEMA_PENDAFTAR_REQUEST,
  DTS_DETAIL_TEMA_PENDAFTAR_SUCCESS,
  DTS_DETAIL_TEMA_PENDAFTAR_FAIL,
  DTS_DETAIL_TEMA_PESERTA_REQUEST,
  DTS_DETAIL_TEMA_PESERTA_SUCCESS,
  DTS_DETAIL_TEMA_PESERTA_FAIL,
  CLEAR_ERRORS,
} from "../../../types/dashboard-kabadan/dashboard/digitalent.type";

// TOTAL DATA PENDAFTAR
export const digitalentTotalDataPendaftarReducer = (
  state = { totalPendaftar: null },
  action
) => {
  switch (action.type) {
    case DTS_TOTAL_PENDAFTAR_REQUEST:
      return {
        loading: true,
      };

    case DTS_TOTAL_PENDAFTAR_SUCCESS:
      return {
        loading: false,
        totalPendaftar: action.payload.data,
      };

    case DTS_TOTAL_PENDAFTAR_FAIL:
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

// TOTAL PENGGUNA
export const digitalentTotalPenggunaReducer = (
  state = { totalPengguna: null },
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
export const digitalentStatistikAkademiPesertaReducer = (
  state = { statistikAkademiPeserta: null },
  action
) => {
  switch (action.type) {
    case DTS_STATISTIK_AKADEMI_PESERTA_REQUEST:
      return {
        loading: true,
      };

    case DTS_STATISTIK_AKADEMI_PESERTA_SUCCESS:
      return {
        loading: false,
        statistikAkademiPeserta: action.payload.data,
      };

    case DTS_STATISTIK_AKADEMI_PESERTA_FAIL:
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

export const digitalentStatistikAkademiPendaftarReducer = (
  state = { statistikAkademiPendaftar: null },
  action
) => {
  switch (action.type) {
    case DTS_STATISTIK_AKADEMI_PENDAFTAR_REQUEST:
      return {
        loading: true,
      };

    case DTS_STATISTIK_AKADEMI_PENDAFTAR_SUCCESS:
      return {
        loading: false,
        statistikAkademiPendaftar: action.payload.data,
      };

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
export const digitalentStatistikMitraPesertaReducer = (
  state = { statistikMitraPeserta: null },
  action
) => {
  switch (action.type) {
    case DTS_STATISTIK_MITRA_PESERTA_REQUEST:
      return {
        loading: true,
      };

    case DTS_STATISTIK_MITRA_PESERTA_SUCCESS:
      return {
        loading: false,
        statistikMitraPeserta: action.payload.data,
      };

    case DTS_STATISTIK_MITRA_PESERTA_FAIL:
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

export const digitalentStatistikMitraPendaftarReducer = (
  state = { statistikMitraPendaftar: null },
  action
) => {
  switch (action.type) {
    case DTS_STATISTIK_MITRA_PENDAFTAR_REQUEST:
      return {
        loading: true,
      };

    case DTS_STATISTIK_MITRA_PENDAFTAR_SUCCESS:
      return {
        loading: false,
        statistikMitraPendaftar: action.payload.data,
      };

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
  state = { tablePendaftar: null },
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
  state = { wilayah: null },
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
export const digitalentProvinsiPesertaReducer = (
  state = { provinsiPeserta: null },
  action
) => {
  switch (action.type) {
    case DTS_PROVINSI_PESERTA_REQUEST:
      return {
        loading: true,
      };

    case DTS_PROVINSI_PESERTA_SUCCESS:
      return {
        loading: false,
        provinsiPeserta: action.payload.data,
      };

    case DTS_PROVINSI_PESERTA_FAIL:
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
export const digitalentProvinsiPendaftarReducer = (
  state = { provinsiPendaftar: null },
  action
) => {
  switch (action.type) {
    case DTS_PROVINSI_PENDAFTAR_REQUEST:
      return {
        loading: true,
      };

    case DTS_PROVINSI_PENDAFTAR_SUCCESS:
      return {
        loading: false,
        provinsiPendaftar: action.payload.data,
      };

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

// DATA PRIBADI UMUR | JENIS KELAMIN | PEKERJAAN
export const digitalentDataPribadiReducer = (
  state = { dataPribadi: null },
  action
) => {
  switch (action.type) {
    case DTS_PRIBADI_PESERTA_REQUEST:
      return {
        loading: true,
      };

    case DTS_PRIBADI_PESERTA_SUCCESS:
      return {
        loading: false,
        dataPribadi: action.payload.data,
      };

    case DTS_PRIBADI_PESERTA_FAIL:
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

// DETAIL DASHBOARD
export const detailAkademiPesertaReducer = (
  state = { akademiPeserta: null },
  action
) => {
  switch (action.type) {
    case DTS_DETAIL_AKADEMI_PESERTA_REQUEST:
      return {
        loading: true,
      };

    case DTS_DETAIL_AKADEMI_PESERTA_SUCCESS:
      return {
        loading: false,
        akademiPeserta: action.payload.data,
      };

    case DTS_DETAIL_AKADEMI_PESERTA_FAIL:
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
export const detailAkademiPendaftarReducer = (
  state = { akademiPendaftar: null },
  action
) => {
  switch (action.type) {
    case DTS_DETAIL_AKADEMI_PENDAFTAR_REQUEST:
      return {
        loading: true,
      };

    case DTS_DETAIL_AKADEMI_PENDAFTAR_SUCCESS:
      return {
        loading: false,
        akademiPendaftar: action.payload.data,
      };

    case DTS_DETAIL_AKADEMI_PENDAFTAR_FAIL:
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
export const detailTemaPesertaReducer = (
  state = { temaPeserta: null },
  action
) => {
  switch (action.type) {
    case DTS_DETAIL_TEMA_PESERTA_REQUEST:
      return {
        loading: true,
      };

    case DTS_DETAIL_TEMA_PESERTA_SUCCESS:
      return {
        loading: false,
        temaPeserta: action.payload.data,
      };

    case DTS_DETAIL_TEMA_PESERTA_FAIL:
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
export const detailTemaPendaftarReducer = (
  state = { temaPendaftar: null },
  action
) => {
  switch (action.type) {
    case DTS_DETAIL_TEMA_PENDAFTAR_REQUEST:
      return {
        loading: true,
      };

    case DTS_DETAIL_TEMA_PENDAFTAR_SUCCESS:
      return {
        loading: false,
        temaPendaftar: action.payload.data,
      };

    case DTS_DETAIL_TEMA_PENDAFTAR_FAIL:
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
