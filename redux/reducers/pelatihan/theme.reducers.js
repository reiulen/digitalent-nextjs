import {
  THEME_REQUEST,
  THEME_SUCCESS,
  THEME_FAIL,
  NEW_THEME_REQUEST,
  NEW_THEME_SUCCESS,
  NEW_THEME_RESET,
  NEW_THEME_FAIL,
  DELETE_THEME_REQUEST,
  DELETE_THEME_SUCCESS,
  DELETE_THEME_RESET,
  DELETE_THEME_FAIL,
  DETAIL_THEME_REQUEST,
  DETAIL_THEME_SUCCESS,
  DETAIL_THEME_FAIL,
  UPDATE_THEME_REQUEST,
  UPDATE_THEME_SUCCESS,
  UPDATE_THEME_FAIL,
  UPDATE_THEME_RESET,
  CLEAR_ERRORS,
} from "../../types/pelatihan/theme.type";

export const allThemeReducer = (state = { theme: [] }, action) => {
  switch (action.type) {
    case THEME_REQUEST:
      return {
        loading: true,
      };

    case THEME_SUCCESS:
      return {
        loading: false,
        theme: action.payload.data,
      };

    case THEME_FAIL:
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

export const newThemeReducer = (state = { theme: {} }, action) => {
  switch (action.type) {
    case NEW_THEME_REQUEST:
      return {
        loading: true,
      };

    case NEW_THEME_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        theme: action.payload.data,
      };

    case NEW_THEME_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case NEW_THEME_RESET:
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

export const detailThemeReducer = (state = { theme: {} }, action) => {
  switch (action.type) {
    case DETAIL_THEME_REQUEST:
      return {
        loading: true,
      };

    case DETAIL_THEME_SUCCESS:
      return {
        loading: false,
        theme: action.payload,
      };

    case DETAIL_THEME_FAIL:
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

export const deleteThemeReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_THEME_REQUEST:
      return {
        loading: true,
      };

    case DELETE_THEME_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_THEME_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case DELETE_THEME_FAIL:
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

export const updateThemeReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_THEME_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_THEME_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_THEME_RESET:
      return {
        loading: false,
        isUpdated: false,
      };

    case UPDATE_THEME_FAIL:
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
