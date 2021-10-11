import {
  UNIT_WORK_REQUEST,
  UNIT_WORK_SUCCESS,
  UNIT_WORK_FAIL,
  DETAIL_UNIT_WORK_REQUEST,
  DETAIL_UNIT_WORK_SUCCESS,
  DETAIL_UNIT_WORK_FAIL,
  DETAIL_UNIT_WORK_RESET,
  DELETE_UNIT_WORK_SUCCESS,
  DELETE_UNIT_WORK_FAIL,
  DELETE_UNIT_WORK_REQUEST,
  DELETE_UNIT_WORK_RESET,
  POST_UNIT_WORK_REQUEST,
  POST_UNIT_WORK_SUCCESS,
  POST_UNIT_WORK_FAIL,
  POST_UNIT_WORK_RESET,
  UPDATE_UNIT_WORK_REQUEST,
  UPDATE_UNIT_WORK_SUCCESS,
  UPDATE_UNIT_WORK_FAIL,
  UPDATE_UNIT_WORK_RESET,
  LIMIT_CONFIGURATION,
  SET_PAGE,
  SEARCH_COORPORATION,
  CLEAR_ERRORS,
} from "../../types/site-management/unit-work.type";

export const allUnitWorkReducer = (state = { unitWork: [] }, action) => {
  switch (action.type) {
    case UNIT_WORK_REQUEST:
      return {
        loading: true,
      };

    case UNIT_WORK_SUCCESS:
      return {
        loading: false,
        unitWork: action.payload.data,
        page: 1,
      };

    case UNIT_WORK_FAIL:
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

export const deleteUnitWorkReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_UNIT_WORK_REQUEST:
      return {
        loading: true,
      };

    case DELETE_UNIT_WORK_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_UNIT_WORK_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case DELETE_UNIT_WORK_FAIL:
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

export const newUnitWorkReducer = (state = { unitWork: {} }, action) => {
  switch (action.type) {
    case POST_UNIT_WORK_REQUEST:
      return {
        loading: true,
      };

    case POST_UNIT_WORK_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        unitWork: action.payload.data,
      };

    case POST_UNIT_WORK_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case POST_UNIT_WORK_RESET:
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

export const detailUnitWorkReducer = (state = { unitWork: {} }, action) => {
  switch (action.type) {
    case DETAIL_UNIT_WORK_REQUEST:
      return {
        loading: true,
      };

    case DETAIL_UNIT_WORK_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        unitWork: action.payload.data,
      };

    case DETAIL_UNIT_WORK_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case DETAIL_UNIT_WORK_RESET:
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

export const updateUnitWorkReducer = (state = { unitWork: {} }, action) => {
  switch (action.type) {
    case UPDATE_UNIT_WORK_REQUEST:
      return {
        loadingUpdate: true,
      };

    case UPDATE_UNIT_WORK_SUCCESS:
      return {
        loadingUpdate: false,
        isUpdate: action.payload.message,
        unitWork: action.payload.data,
      };

    case UPDATE_UNIT_WORK_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case UPDATE_UNIT_WORK_RESET:
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
