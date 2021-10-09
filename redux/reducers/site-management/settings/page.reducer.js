import {
  PAGE_REQUEST,
  PAGE_SUCCESS,
  PAGE_FAIL,
  SET_PAGE,
  LIMIT_CONFIGURATION,
  SEARCH_COORPORATION,
  POST_PAGE_REQUEST,
  POST_PAGE_SUCCESS,
  POST_PAGE_FAIL,
  POST_PAGE_RESET,
  DELETE_PAGE_REQUEST,
  DELETE_PAGE_SUCCESS,
  DELETE_PAGE_FAIL,
  DELETE_PAGE_RESET,
  CLEAR_ERRORS,
} from "../../../types/site-management/settings/page.type";

export const allPageReducer = (state = { pages: [] }, action) => {
  switch (action.type) {
    case PAGE_REQUEST:
      return {
        loading: true,
      };

    case PAGE_SUCCESS:
      return {
        loading: false,
        pages: action.payload.data,
        page: 1,
      };

    case PAGE_FAIL:
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

export const deletePageReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_PAGE_REQUEST:
      return {
        loading: true,
      };

    case DELETE_PAGE_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_PAGE_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case DELETE_PAGE_FAIL:
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

export const newPageReducer = (state = { pages: {} }, action) => {
  switch (action.type) {
    case POST_PAGE_REQUEST:
      return {
        loading: true,
      };

    case POST_PAGE_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        pages: action.payload.data,
      };

    case POST_PAGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case POST_PAGE_RESET:
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
