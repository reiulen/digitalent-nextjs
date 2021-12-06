import {
  UPDATE_DATA_PRIBADI_REQUEST,
  UPDATE_DATA_PRIBADI_SUCCESS,
  UPDATE_DATA_PRIBADI_RESET,
  UPDATE_DATA_PRIBADI_FAIL,
  //ALAMAT
  GET_ALAMAT_SUCCESS,
  GET_ALAMAT_FAIL,
  UPDATE_ALAMAT_REQUEST,
  UPDATE_ALAMAT_SUCCESS,
  UPDATE_ALAMAT_RESET,
  UPDATE_ALAMAT_FAIL,
  //PENDIDIKAN
  GET_PENDIDIKAN_SUCCESS,
  GET_PENDIDIKAN_FAIL,
  UPDATE_PENDIDIKAN_REQUEST,
  UPDATE_PENDIDIKAN_SUCCESS,
  UPDATE_PENDIDIKAN_RESET,
  UPDATE_PENDIDIKAN_FAIL,
  //KETERAMPILAN
  GET_KETERAMPILAN_SUCCESS,
  GET_KETERAMPILAN_FAIL,
  UPDATE_KETERAMPILAN_REQUEST,
  UPDATE_KETERAMPILAN_SUCCESS,
  UPDATE_KETERAMPILAN_RESET,
  UPDATE_KETERAMPILAN_FAIL,
  //PEKERJAAN
  GET_PEKERJAAN_SUCCESS,
  GET_PEKERJAAN_FAIL,
  GET_REF_PEKERJAAN_REQUEST,
  GET_REF_PEKERJAAN_SUCCESS,
  GET_REF_PEKERJAAN_FAIL,
  UPDATE_PEKERJAAN_REQUEST,
  UPDATE_PEKERJAAN_SUCCESS,
  UPDATE_PEKERJAAN_RESET,
  UPDATE_PEKERJAAN_FAIL,
  CLEAR_ERRORS,
  GET_ASAL_SEKOLAH,
  STORE_ALL_DATA_PRIBADI,
  GET_DATA_PRIBADI_WIZZARD,
  STORE_ALAMAT_WIZZARD,
  STORE_INFORMASI_WIZZARD,
  STORE_PEKERJAAN_WIZZARD,
  STORE_PENDIDIKAN_WIZZARD,
} from "../../../types/pelatihan/profile.type";

export const dataAlamatReducer = (state = { alamat: {} }, action) => {
  switch (action.type) {
    case GET_ALAMAT_SUCCESS:
      return {
        alamat: action.payload.data,
      };

    case GET_ALAMAT_FAIL:
      return {
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

export const dataPendidikanReducer = (state = { pendidikan: {} }, action) => {
  switch (action.type) {
    case GET_PENDIDIKAN_SUCCESS:
      return {
        pendidikan: action.payload.data,
      };

    case GET_PENDIDIKAN_FAIL:
      return {
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

export const dataKeterampilanReducer = (
  state = { keterampilan: {} },
  action
) => {
  switch (action.type) {
    case GET_KETERAMPILAN_SUCCESS:
      return {
        keterampilan: action.payload.data,
      };

    case GET_KETERAMPILAN_FAIL:
      return {
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

export const dataPekerjaanReducer = (state = { pekerjaan: {} }, action) => {
  switch (action.type) {
    case GET_PEKERJAAN_SUCCESS:
      return {
        pekerjaan: action.payload.data,
      };

    case GET_PEKERJAAN_FAIL:
      return {
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

export const updateDataPribadiReducer = (
  state = { success: false },
  action
) => {
  switch (action.type) {
    case UPDATE_DATA_PRIBADI_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_DATA_PRIBADI_SUCCESS:
      return {
        loading: false,
        success: action.payload.data,
      };

    case UPDATE_DATA_PRIBADI_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case UPDATE_DATA_PRIBADI_RESET:
      return {
        success: false,
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

export const updateAlamatReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case UPDATE_ALAMAT_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_ALAMAT_SUCCESS:
      return {
        loading: false,
        success: action.payload.data,
      };

    case UPDATE_ALAMAT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case UPDATE_ALAMAT_RESET:
      return {
        success: false,
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

export const getAsalSekolahReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ASAL_SEKOLAH:
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

// GET REF DATA PEKERJAAN
export const getRefPekerjaanReducer = (state = { dataRefPekerjaan: [] }, action) => {
  switch (action.type) {
    case GET_REF_PEKERJAAN_REQUEST:
      return {
        loading: true,
      };

    case GET_REF_PEKERJAAN_SUCCESS:
      return {
        loading: false,
        dataRefPekerjaan: action.payload.data
      };

    case GET_REF_PEKERJAAN_FAIL:
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

export const updatePendidikanReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case UPDATE_PENDIDIKAN_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_PENDIDIKAN_SUCCESS:
      return {
        loading: false,
        success: action.payload.data,
      };

    case UPDATE_PENDIDIKAN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case UPDATE_PENDIDIKAN_RESET:
      return {
        success: false,
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

export const updateKeterampilanReducer = (
  state = { success: false },
  action
) => {
  switch (action.type) {
    case UPDATE_KETERAMPILAN_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_KETERAMPILAN_SUCCESS:
      return {
        loading: false,
        success: action.payload.data,
      };

    case UPDATE_KETERAMPILAN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case UPDATE_KETERAMPILAN_RESET:
      return {
        success: false,
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

export const updatePekerjaanReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case UPDATE_PEKERJAAN_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_PEKERJAAN_SUCCESS:
      return {
        loading: false,
        success: action.payload.data,
      };

    case UPDATE_PEKERJAAN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case UPDATE_PEKERJAAN_RESET:
      return {
        success: false,
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

// export const updateDataWizzardReducer = (state = {}, action) => {
//   switch (action.type) {
//     case STORE_ALL_DATA_PRIBADI:
//       return {
//         ...state,
//         data: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export const updateDataInformasiWizzardReducer = (state = {}, action) => {
//   switch (action.type) {
//     case STORE_ALL_DATA_PRIBADI:
//       return {
//         ...state,
//         data: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export const updateDataAlamatWizzardReducer = (state = {}, action) => {
//   switch (action.type) {
//     case STORE_ALL_DATA_PRIBADI:
//       return {
//         ...state,
//         data: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export const updateDataPendidikanWizzardReducer = (state = {}, action) => {
//   switch (action.type) {
//     case STORE_ALL_DATA_PRIBADI:
//       return {
//         ...state,
//         data: action.payload,
//       };
//     default:
//       return state;
//   }
// };

// export const updateDataPekerjaanWizzardReducer = (state = {}, action) => {
//   switch (action.type) {
//     case STORE_ALL_DATA_PRIBADI:
//       return {
//         ...state,
//         data: action.payload,
//       };
//     default:
//       return state;
//   }
// };
