import {
  DATA_REFERENCE_REQUEST,
  DATA_REFERENCE_SUCCESS,
  DATA_REFERENCE_FAIL,
  DETAIL_DATA_REFERENCE_REQUEST,
  DETAIL_DATA_REFERENCE_SUCCESS,
  DETAIL_DATA_REFERENCE_FAIL,
  DETAIL_DATA_REFERENCE_RESET,
  DELETE_DATA_REFERENCE_SUCCESS,
  DELETE_DATA_REFERENCE_FAIL,
  DELETE_DATA_REFERENCE_REQUEST,
  DELETE_DATA_REFERENCE_RESET,
  POST_DATA_REFERENCE_REQUEST,
  POST_DATA_REFERENCE_SUCCESS,
  POST_DATA_REFERENCE_FAIL,
  POST_DATA_REFERENCE_RESET,
  UPDATE_DATA_REFERENCE_REQUEST,
  UPDATE_DATA_REFERENCE_SUCCESS,
  UPDATE_DATA_REFERENCE_FAIL,
  UPDATE_DATA_REFERENCE_RESET,
  LIMIT_CONFIGURATION,
  SET_PAGE,
  SEARCH_COORPORATION,
  CLEAR_ERRORS,
} from "../../types/site-management/data-reference.type";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  page: 1,
  limit: 5,
  cari: "",
  status: statuslist.idle,
};

export const allDataReferenceReducer = (state = initialState, action) => {
  switch (action.type) {
    case DATA_REFERENCE_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };

    case DATA_REFERENCE_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        data: action.payload.data,
      };

    case DATA_REFERENCE_FAIL:
      return {
        ...state,
        status: statuslist.error,
        error: null,
      };

    case SEARCH_COORPORATION:
      return {
        ...state,
        cari: action.text,
        page: 1,
      };

    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      };

    case LIMIT_CONFIGURATION:
      return {
        ...state,
        limit: action.limitValue,
        page: 1,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
      };

    default:
      return state;
  }
};

// delete tidak ada
export const deleteDataReferenceReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_DATA_REFERENCE_REQUEST:
      return {
        loading: true,
      };

    case DELETE_DATA_REFERENCE_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_DATA_REFERENCE_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case DELETE_DATA_REFERENCE_FAIL:
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

export const newDataReferenceReducer = (
  state = { dataReference: {} },
  action
) => {
  switch (action.type) {
    case POST_DATA_REFERENCE_REQUEST:
      return {
        loading: true,
      };

    case POST_DATA_REFERENCE_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        dataReference: action.payload.data,
      };

    case POST_DATA_REFERENCE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case POST_DATA_REFERENCE_RESET:
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

export const detailDataReferenceReducer = (
  state = { dataReference: {} },
  action
) => {
  switch (action.type) {
    case DETAIL_DATA_REFERENCE_REQUEST:
      return {
        loading: true,
      };

    case DETAIL_DATA_REFERENCE_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        dataReference: action.payload.data,
      };

    case DETAIL_DATA_REFERENCE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case DETAIL_DATA_REFERENCE_RESET:
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

export const updateDataReferenceReducer = (
  state = { dataReference: {} },
  action
) => {
  switch (action.type) {
    case UPDATE_DATA_REFERENCE_REQUEST:
      return {
        loadingUpdate: true,
      };

    case UPDATE_DATA_REFERENCE_SUCCESS:
      return {
        loadingUpdate: false,
        isUpdate: action.payload.message,
        dataReference: action.payload.data,
      };

    case UPDATE_DATA_REFERENCE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case UPDATE_DATA_REFERENCE_RESET:
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
