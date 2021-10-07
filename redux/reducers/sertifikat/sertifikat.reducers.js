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
} from "../../types/sertifikat/kelola-sertifikat.type";

export const allSertifikatReducers = (state = { certificate: [] }, action) => {
  switch (action.type) {
    case SERTIFIKAT_REQUEST:
      return {
        loading: true,
      };
    case SERTIFIKAT_SUCCESS:
      return {
        loading: false,
        certificate: action.payload.data,
      };
    case SERTIFIKAT_FAIL:
      return {
        loading: false,
        certificate: action.payload.data,
      };
    case CLEAR_ERRORS:
      return {
        error: null,
      };
    default:
      return state;
  }
};

export const newSertifikatReducer = (state = { certificate: {} }, action) => {
  switch (action.type) {
    case NEW_SERTIFIKAT_REQUEST:
      return {
        loading: true,
      };

    case NEW_SERTIFIKAT_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        sertifikat: action.payload.data,
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
