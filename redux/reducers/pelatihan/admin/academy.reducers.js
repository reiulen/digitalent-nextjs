import {
  ACADEMY_REQUEST,
  ACADEMY_SUCCESS,
  ACADEMY_FAIL,
  NEW_ACADEMY_REQUEST,
  NEW_ACADEMY_SUCCESS,
  NEW_ACADEMY_RESET,
  NEW_ACADEMY_FAIL,
  DELETE_ACADEMY_REQUEST,
  DELETE_ACADEMY_SUCCESS,
  DELETE_ACADEMY_RESET,
  DELETE_ACADEMY_FAIL,
  DETAIL_ACADEMY_REQUEST,
  DETAIL_ACADEMY_SUCCESS,
  DETAIL_ACADEMY_FAIL,
  UPDATE_ACADEMY_REQUEST,
  UPDATE_ACADEMY_SUCCESS,
  UPDATE_ACADEMY_FAIL,
  UPDATE_ACADEMY_RESET,
  CLEAR_ERRORS,
} from "../../../types/pelatihan/academy.type";

export const allAcademyReducer = (state = { academy: [] }, action) => {
  switch (action.type) {
    case ACADEMY_REQUEST:
      return {
        loading: true,
      };

    case ACADEMY_SUCCESS:
      return {
        loading: false,
        academy: action.payload.data,
      };

    case ACADEMY_FAIL:
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

export const newAcademyReducer = (state = { academy: {} }, action) => {
  switch (action.type) {
    case NEW_ACADEMY_REQUEST:
      return {
        loading: true,
      };

    case NEW_ACADEMY_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        academy: action.payload.data,
      };

    case NEW_ACADEMY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case NEW_ACADEMY_RESET:
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

export const detailAcademyReducer = (state = { academy: {} }, action) => {
  switch (action.type) {
    case DETAIL_ACADEMY_REQUEST:
      return {
        loading: true,
      };

    case DETAIL_ACADEMY_SUCCESS:
      return {
        loading: false,
        academy: action.payload,
      };

    case DETAIL_ACADEMY_FAIL:
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

export const deleteAcademyReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ACADEMY_REQUEST:
      return {
        loading: true,
      };

    case DELETE_ACADEMY_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_ACADEMY_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case DELETE_ACADEMY_FAIL:
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

export const updateAcademyReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ACADEMY_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_ACADEMY_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_ACADEMY_RESET:
      return {
        loading: false,
        isUpdated: false,
      };

    case UPDATE_ACADEMY_FAIL:
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
