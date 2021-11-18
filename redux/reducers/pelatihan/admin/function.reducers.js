import {
  GET_TRAINING_STEP1,
  STORE_TRAINING_STEP1,
  RESET_TRAINING_STEP1,
  GET_REGISTRATION_STEP2,
  STORE_REGISTRATION_STEP2,
  RESET_REGISTRATION_STEP2,
  GET_COMMITMENT_STEP3,
  STORE_COMMITMENT_STEP3,
  RESET_COMMITMENT_STEP3,
  //dropdown
  GET_DROPDOWN_AGAMA,
  ERROR_DROPDOWN_AGAMA,
  GET_DROPDOWN_AKADEMI,
  ERROR_DROPDOWN_AKADEMI,
  GET_DROPDOWN_TEMA,
  ERROR_DROPDOWN_TEMA,
  GET_DROPDOWN_TEMA_BY_AKADEMI,
  ERROR_DROPDOWN_TEMA_BY_AKADEMI,
  GET_DROPDOWN_PELATIHAN,
  ERROR_DROPDOWN_PELATIHAN,
  GET_DROPDOWN_PELATIHAN_BY_TEMA,
  ERROR_DROPDOWN_PELATIHAN_BY_TEMA,
  GET_DROPDOWN_STATUS_PEKERJAAN,
  ERROR_DROPDOWN_STATUS_PEKERJAAN,
  GET_DROPDOWN_PENDIDIKAN,
  ERROR_DROPDOWN_PENDIDIKAN,
  GET_DROPDOWN_LEVEL_PELATIHAN,
  ERROR_DROPDOWN_LEVEL_PELATIHAN,
  GET_DROPDOWN_MITRA,
  ERROR_DROPDOWN_MITRA,
  GET_DROPDOWN_ZONASI,
  ERROR_DROPDOWN_ZONASI,
  GET_DROPDOWN_PROVINSI,
  ERROR_DROPDOWN_PROVINSI,
  GET_DROPDOWN_KABUPATEN,
  ERROR_DROPDOWN_KABUPATEN,
  GET_DROPDOWN_KABUPATEN_DOMISILI,
  ERROR_DROPDOWN_KABUPATEN_DOMISILI,
  GET_DROPDOWN_PROVINSI_TO_DESA,
  ERROR_DROPDOWN_PROVINSI_TO_DESA,
  GET_DROPDOWN_KECAMATAN_TO_DESA,
  ERROR_DROPDOWN_KECAMATAN_TO_DESA,
  GET_DROPDOWN_PENYELENGGARA,
  ERROR_DROPDOWN_PENYELENGGARA,
  GET_DROPDOWN_FORM_BUILDER,
  ERROR_DROPDOWN_FORM_BUILDER,
  GET_DATA_PRIBADI_SUCCESS,
  GET_DATA_PRIBADI_FAIL,
  CLEAR_ERRORS,
} from "../../../types/pelatihan/function.type";

export const getDataPribadiReducer = (state = { dataPribadi: {} }, action) => {
  switch (action.type) {
    case GET_DATA_PRIBADI_SUCCESS:
      return {
        dataPribadi: action.payload.data,
      };

    case GET_DATA_PRIBADI_FAIL:
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

export const trainingStep1Reducer = (state = { trainingData: {} }, action) => {
  switch (action.type) {
    case GET_TRAINING_STEP1:
      return {
        ...state,
        trainingData: action.payload,
      };
    case STORE_TRAINING_STEP1:
      return {
        ...state,
        trainingData: action.payload,
      };
    case RESET_TRAINING_STEP1:
      return {
        ...state,
        trainingData: {},
      };
    default:
      return state;
  }
};

export const registrationStep2Reducer = (
  state = { registrationData: {} },
  action
) => {
  switch (action.type) {
    case GET_REGISTRATION_STEP2:
      return {
        ...state,
        registrationData: action.payload,
      };
    case STORE_REGISTRATION_STEP2:
      return {
        ...state,
        registrationData: action.payload,
      };
    case RESET_REGISTRATION_STEP2:
      return {
        ...state,
        registrationData: {},
      };
    default:
      return state;
  }
};

export const commitmentStep3Reducer = (
  state = { commitmentData: {} },
  action
) => {
  switch (action.type) {
    case GET_COMMITMENT_STEP3:
      return {
        ...state,
        commitmentData: action.payload,
      };
    case STORE_COMMITMENT_STEP3:
      return {
        ...state,
        commitmentData: action.payload,
      };
    case RESET_COMMITMENT_STEP3:
      return {
        ...state,
        commitmentData: {},
      };
    default:
      return state;
  }
};

export const drowpdownAkademiReducers = (state = { data: [] }, action) => {
  switch (action.type) {
    case GET_DROPDOWN_AKADEMI:
      return {
        data: action.payload,
      };
    case ERROR_DROPDOWN_AKADEMI:
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

export const drowpdownFormBuilderReducers = (state = { data: [] }, action) => {
  switch (action.type) {
    case GET_DROPDOWN_FORM_BUILDER:
      return {
        data: action.payload,
      };
    case ERROR_DROPDOWN_FORM_BUILDER:
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

export const drowpdownTemaReducers = (state = { data: [] }, action) => {
  switch (action.type) {
    case GET_DROPDOWN_TEMA:
      return {
        data: action.payload,
      };
    case ERROR_DROPDOWN_TEMA:
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

export const drowpdownTemabyAkademiReducers = (
  state = { data: [] },
  action
) => {
  switch (action.type) {
    case GET_DROPDOWN_TEMA_BY_AKADEMI:
      return {
        data: action.payload,
      };
    case ERROR_DROPDOWN_TEMA_BY_AKADEMI:
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

export const drowpdownPelatihanReducers = (state = { data: [] }, action) => {
  switch (action.type) {
    case GET_DROPDOWN_PELATIHAN:
      return {
        data: action.payload,
      };
    case ERROR_DROPDOWN_PELATIHAN:
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

export const drowpdownPelatihanbyTemaReducers = (
  state = { data: [] },
  action
) => {
  switch (action.type) {
    case GET_DROPDOWN_PELATIHAN_BY_TEMA:
      return {
        data: action.payload,
      };
    case ERROR_DROPDOWN_PELATIHAN_BY_TEMA:
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

export const drowpdownAgamaReducers = (state = { data: [] }, action) => {
  switch (action.type) {
    case GET_DROPDOWN_AGAMA:
      return {
        data: action.payload,
      };
    case ERROR_DROPDOWN_AGAMA:
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

export const drowpdownStatusPekerjaanReducers = (
  state = { data: [] },
  action
) => {
  switch (action.type) {
    case GET_DROPDOWN_STATUS_PEKERJAAN:
      return {
        data: action.payload,
      };
    case ERROR_DROPDOWN_STATUS_PEKERJAAN:
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

export const drowpdownPendidikanReducers = (state = { data: [] }, action) => {
  switch (action.type) {
    case GET_DROPDOWN_PENDIDIKAN:
      return {
        data: action.payload,
      };
    case ERROR_DROPDOWN_PENDIDIKAN:
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

export const drowpdownLevelPelatihanReducers = (
  state = { data: [] },
  action
) => {
  switch (action.type) {
    case GET_DROPDOWN_LEVEL_PELATIHAN:
      return {
        data: action.payload,
      };
    case ERROR_DROPDOWN_LEVEL_PELATIHAN:
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

export const drowpdownMitraReducers = (state = { data: [] }, action) => {
  switch (action.type) {
    case GET_DROPDOWN_MITRA:
      return {
        data: action.payload,
      };
    case ERROR_DROPDOWN_MITRA:
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

export const drowpdownZonasiReducers = (state = { data: [] }, action) => {
  switch (action.type) {
    case GET_DROPDOWN_ZONASI:
      return {
        data: action.payload,
      };
    case ERROR_DROPDOWN_ZONASI:
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

export const drowpdownProvinsiReducers = (state = { data: {} }, action) => {
  switch (action.type) {
    case GET_DROPDOWN_PROVINSI:
      return {
        data: action.payload,
      };
    case ERROR_DROPDOWN_PROVINSI:
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

export const drowpdownKabupatenReducers = (state = { data: [] }, action) => {
  switch (action.type) {
    case GET_DROPDOWN_KABUPATEN:
      return {
        data: action.payload,
      };
    case ERROR_DROPDOWN_KABUPATEN:
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

export const drowpdownKabupatenDomisiliReducers = (
  state = { data: [] },
  action
) => {
  switch (action.type) {
    case GET_DROPDOWN_KABUPATEN_DOMISILI:
      return {
        data: action.payload,
      };
    case ERROR_DROPDOWN_KABUPATEN_DOMISILI:
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

export const drowpdownProvinsiToDesaReducers = (
  state = { data: [] },
  action
) => {
  switch (action.type) {
    case GET_DROPDOWN_PROVINSI_TO_DESA:
      return {
        data: action.payload,
      };
    case ERROR_DROPDOWN_PROVINSI_TO_DESA:
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

export const drowpdownKecamatanToDesaReducers = (
  state = { data: [] },
  action
) => {
  switch (action.type) {
    case GET_DROPDOWN_KECAMATAN_TO_DESA:
      return {
        data: action.payload,
      };
    case ERROR_DROPDOWN_KECAMATAN_TO_DESA:
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

export const drowpdownPenyelenggaraReducers = (
  state = { data: [] },
  action
) => {
  switch (action.type) {
    case GET_DROPDOWN_PENYELENGGARA:
      return {
        data: action.payload,
      };
    case ERROR_DROPDOWN_PENYELENGGARA:
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
