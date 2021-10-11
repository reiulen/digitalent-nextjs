import {
  GENERAL_REQUEST,
  GENERAL_SUCCESS,
  GENERAL_FAIL,
  DETAIL_GENERAL_REQUEST,
  DETAIL_GENERAL_SUCCESS,
  DETAIL_GENERAL_FAIL,
  DETAIL_GENERAL_RESET,
  DELETE_GENERAL_SUCCESS,
  DELETE_GENERAL_FAIL,
  DELETE_GENERAL_REQUEST,
  DELETE_GENERAL_RESET,
  POST_GENERAL_REQUEST,
  POST_GENERAL_SUCCESS,
  POST_GENERAL_FAIL,
  POST_GENERAL_RESET,
  UPDATE_GENERAL_REQUEST,
  UPDATE_GENERAL_SUCCESS,
  UPDATE_GENERAL_FAIL,
  UPDATE_GENERAL_RESET,
  LIMIT_CONFIGURATION,
  SET_PAGE,
  SEARCH_COORPORATION,
  CLEAR_ERRORS,
} from "../../../types/site-management/settings/general.type";

export const allGeneralReducer = (state = { dataReference: [] }, action) => {
  switch (action.type) {
    case GENERAL_REQUEST:
      return {
        loading: true,
      };

    case GENERAL_SUCCESS:
      return {
        loading: false,
        dataReference: action.payload.data,
        page: 1,
      };

    case GENERAL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
      };

    default:
      return state;
  }
};

export const deleteGeneralReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_GENERAL_REQUEST:
      return {
        loading: true,
      };

    case DELETE_GENERAL_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_GENERAL_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case DELETE_GENERAL_FAIL:
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

export const newGeneralReducer = (state = { general: {} }, action) => {
  switch (action.type) {
    case POST_GENERAL_REQUEST:
      return {
        loading: true,
      };

    case POST_GENERAL_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        general: action.payload.data,
      };

    case POST_GENERAL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case POST_GENERAL_RESET:
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

export const detailGeneralReducer = (state = { general: {} }, action) => {
  switch (action.type) {
    case DETAIL_GENERAL_REQUEST:
      return {
        loading: true,
      };

    case DETAIL_GENERAL_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        general: action.payload.data,
      };

    case DETAIL_GENERAL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case DETAIL_GENERAL_RESET:
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

export const updateGeneralReducer = (state = { general: {} }, action) => {
  switch (action.type) {
    case UPDATE_GENERAL_REQUEST:
      return {
        loadingUpdate: true,
      };

    case UPDATE_GENERAL_SUCCESS:
      return {
        loadingUpdate: false,
        isUpdate: action.payload.message,
        general: action.payload.data,
      };

    case UPDATE_GENERAL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case UPDATE_GENERAL_RESET:
      return {
        isUpdate: false,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
      };

    default:
      return state;
  }
};
