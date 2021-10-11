import {
  API_REQUEST,
  API_SUCCESS,
  API_FAIL,
  DETAIL_API_REQUEST,
  DETAIL_API_SUCCESS,
  DETAIL_API_FAIL,
  DETAIL_API_RESET,
  DELETE_API_SUCCESS,
  DELETE_API_FAIL,
  DELETE_API_REQUEST,
  DELETE_API_RESET,
  POST_API_REQUEST,
  POST_API_SUCCESS,
  POST_API_FAIL,
  POST_API_RESET,
  UPDATE_API_REQUEST,
  UPDATE_API_SUCCESS,
  UPDATE_API_FAIL,
  UPDATE_API_RESET,
  LIMIT_CONFIGURATION,
  SET_PAGE,
  SEARCH_COORPORATION,
  CLEAR_ERRORS,
} from "../../../types/site-management/settings/api.type";

export const allApiReducer = (state = { apies: [] }, action) => {
  switch (action.type) {
    case API_REQUEST:
      return {
        loading: true,
      };

    case API_SUCCESS:
      return {
        loading: false,
        apies: action.payload.data,
        page: 1,
      };

    case API_FAIL:
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

export const deleteApiReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_API_REQUEST:
      return {
        loading: true,
      };

    case DELETE_API_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_API_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case DELETE_API_FAIL:
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

export const newApiReducer = (state = { apies: {} }, action) => {
  switch (action.type) {
    case POST_API_REQUEST:
      return {
        loading: true,
      };

    case POST_API_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        apies: action.payload.data,
      };

    case POST_API_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case POST_API_RESET:
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

export const detailApiReducer = (state = { apies: {} }, action) => {
  switch (action.type) {
    case DETAIL_API_REQUEST:
      return {
        loading: true,
      };

    case DETAIL_API_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        apies: action.payload.data,
      };

    case DETAIL_API_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case DETAIL_API_RESET:
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

export const updateApiReducer = (state = { apies: {} }, action) => {
  switch (action.type) {
    case UPDATE_API_REQUEST:
      return {
        loadingUpdate: true,
      };

    case UPDATE_API_SUCCESS:
      return {
        loadingUpdate: false,
        isUpdateSuccess: action.payload.message,
        apiesUpdate: action.payload.data,
      };

    case UPDATE_API_FAIL:
      return {
        loadingUpdate: false,
        errorUpdate: action.payload,
      };

    case UPDATE_API_RESET:
      return {
        isUpdateSuccess: false,
      };

    case CLEAR_ERRORS:
      return {
        errorUpdate: null,
      };

    default:
      return state;
  }
};
