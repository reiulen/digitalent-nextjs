import {
  SERTIFIKAT_SUCCESS,
  SERTIFIKAT_FAIL,
  SERTIFIKAT_REQUEST,
  NEW_SERTIFIKAT_SUCCESS,
  NEW_SERTIFIKAT_FAIL,
  NEW_SERTIFIKAT_REQUEST,
  NEW_SERTIFIKAT_RESET,
  DETAIL_SERTIFIKAT_FAIL,
  DETAIL_SERTIFIKAT_REQUEST,
  DETAIL_SERTIFIKAT_SUCCESS,
  DELETE_SERTIFIKAT_FAIL,
  DELETE_SERTIFIKAT_REQUEST,
  DELETE_SERTIFIKAT_RESET,
  DELETE_SERTIFIKAT_SUCCESS,
  UPDATE_SERTIFIKAT_FAIL,
  UPDATE_SERTIFIKAT_REQUEST,
  UPDATE_SERTIFIKAT_RESET,
  UPDATE_SERTIFIKAT_SUCCESS,
  SINGLE_SERTIFIKAT_REQUEST,
  SINGLE_SERTIFIKAT_SUCCESS,
  SINGLE_SERTIFIKAT_FAIL,
  CLEAR_ERRORS,
  PUBLISHED_SERTIFIKAT_REQUEST,
  PUBLISHED_SERTIFIKAT_SUCCESS,
  PUBLISHED_SERTIFIKAT_FAIL,
  OPTIONS_ACADEMY_FAIL,
  OPTIONS_ACADEMY_REQUEST,
  OPTIONS_ACADEMY_SUCCESS,
  OPTIONS_THEME_FAIL,
  OPTIONS_THEME_REQUEST,
  OPTIONS_THEME_SUCCESS,
  SET_KEYWORD_VALUE,
  RESET_VALUE_FILTER,
  SET_ACADEMY_VALUE,
  SET_THEME_VALUE,
  SET_PAGE_VALUE,
  SET_LIMIT_VALUE,
} from "../../types/sertifikat/kelola-sertifikat.type";

const initialStates = {
  certificate: [],
  academyOptions: [],
  themeOptions: [],
  //
  page: 1,
  limit: 5,
  academy: "",
  theme: "",
  keyword: "",
  certificateActive: [],
};

export const allSertifikatReducers = (state = initialStates, action) => {
  switch (action.type) {
    case SERTIFIKAT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case SERTIFIKAT_SUCCESS:
      return {
        ...state,
        loading: false,
        certificate: action.payload.data,
      };
    case SERTIFIKAT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case OPTIONS_ACADEMY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OPTIONS_ACADEMY_SUCCESS:
      return {
        ...state,
        loading: false,
        academyOptions: action.payload.data,
      };
    case OPTIONS_ACADEMY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case OPTIONS_THEME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OPTIONS_THEME_SUCCESS:
      return {
        ...state,
        loading: false,
        themeOptions: action.payload.data,
      };
    case OPTIONS_THEME_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_KEYWORD_VALUE: {
      return {
        ...state,
        keyword: action.text,
        page: 1,
      };
    }
    case SET_ACADEMY_VALUE: {
      return {
        ...state,
        academy: action.text,
        page: 1,
      };
    }
    case SET_THEME_VALUE: {
      return {
        ...state,
        theme: action.text,
        page: 1,
      };
    }
    case SET_PAGE_VALUE: {
      return {
        ...state,
        page: action.text,
      };
    }
    case SET_LIMIT_VALUE: {
      return {
        ...state,
        limit: action.text,
      };
    }
    case RESET_VALUE_FILTER: {
      return {
        ...state,
        academy: "",
        theme: "",
        page: 1,
        limit: 5,
        keyword: "",
      };
    }
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const allAcademyOptionsReducer = (state = {}, action) => {
  switch (action.type) {
    case OPTIONS_ACADEMY_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OPTIONS_ACADEMY_SUCCESS:
      return {
        ...state,
        loading: false,
        academyOptions: action.payload.data,
      };
    case OPTIONS_ACADEMY_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const allThemeOptionsReducer = (state = [], action) => {
  switch (action.type) {
    case OPTIONS_THEME_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case OPTIONS_THEME_SUCCESS:
      return {
        ...state,
        themeOptions: action.payload.data,
      };
    case OPTIONS_THEME_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const newSertifikatReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_SERTIFIKAT_REQUEST:
      return {
        loading: true,
      };

    case NEW_SERTIFIKAT_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        certificate: action.payload,
      };

    case NEW_SERTIFIKAT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case NEW_SERTIFIKAT_RESET:
      return {
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
      };

    default:
      return state;
  }
};

export const detailSertifikatReducer = (
  state = { certificate: {} },
  action
) => {
  switch (action.type) {
    case DETAIL_SERTIFIKAT_REQUEST:
      return {
        loading: true,
      };
    case DETAIL_SERTIFIKAT_SUCCESS:
      return {
        loading: false,
        certificate: action.payload,
      };

    case DETAIL_SERTIFIKAT_FAIL:
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

export const singleSertifikatReducer = (
  state = { certificate: {} },
  action
) => {
  switch (action.type) {
    case SINGLE_SERTIFIKAT_REQUEST:
      return {
        loading: true,
      };

    case SINGLE_SERTIFIKAT_SUCCESS:
      return {
        loading: false,
        certificate: action.payload,
      };

    case SINGLE_SERTIFIKAT_FAIL:
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

export const publishedSertifikatReducer = (
  state = { certificate: {} },
  action
) => {
  switch (action.type) {
    case PUBLISHED_SERTIFIKAT_REQUEST:
      return {
        loading: true,
      };
    case PUBLISHED_SERTIFIKAT_SUCCESS:
      return {
        loading: false,
        certificate: action.payload,
      };

    case PUBLISHED_SERTIFIKAT_FAIL:
      return {
        ...state,
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

export const deleteSertifikatReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SERTIFIKAT_REQUEST:
      return {
        loading: true,
      };

    case DELETE_SERTIFIKAT_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_SERTIFIKAT_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case DELETE_SERTIFIKAT_FAIL:
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

export const updateSertifikatReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_SERTIFIKAT_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_SERTIFIKAT_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
        success: true,
      };

    case UPDATE_SERTIFIKAT_RESET:
      return {
        loading: false,
        isUpdated: false,
        success: false,
      };

    case UPDATE_SERTIFIKAT_FAIL:
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
