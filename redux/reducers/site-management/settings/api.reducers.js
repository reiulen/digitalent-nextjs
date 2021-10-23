import {
  API_REQUEST,
  API_SUCCESS,
  API_FAIL,
  GET_LIST_API_REQUEST,
  GET_LIST_API_SUCCESS,
  GET_LIST_API_FAIL,
  GET_LIST_FIELD_REQUEST,
  GET_LIST_FIELD_SUCCESS,
  GET_LIST_FIELD_FAIL,
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
  DETAIL_LOG_API_REQUEST,
  DETAIL_LOG_API_SUCCESS,
  DETAIL_LOG_API_FAIL,
} from "../../../types/site-management/settings/api.type";

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

export const allApiReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };

    case API_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        data: action.payload.data,
      };

    case API_FAIL:
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
        error: null,
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
        error: false,
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
        apies: action.payload,
      };

    case DETAIL_API_FAIL:
      return {
        loading: false,
        error: null,
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

export const listApiReducer = (state = { listApi: [] }, action) => {
  switch (action.type) {
    case GET_LIST_API_REQUEST:
      return {
        loading: true,
      };

    case GET_LIST_API_SUCCESS:
      return {
        loading: false,
        listApi: action.payload.data,
      };

    case GET_LIST_API_FAIL:
      return {
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};

export const listFieldReducer = (state = { listField: [] }, action) => {
  switch (action.type) {
    case GET_LIST_FIELD_REQUEST:
      return {
        loading: true,
      };

    case GET_LIST_FIELD_SUCCESS:
      return {
        loading: false,
        listField: action.payload.data,
        dataSortir: action.sortirData,
      };

    case GET_LIST_FIELD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const listLogReducer = (state = { listLog: [] }, action) => {
  switch (action.type) {
    case DETAIL_LOG_API_REQUEST:
      return {
        loading: true,
      };

    case DETAIL_LOG_API_SUCCESS:
      return {
        loading: false,
        listLog: action.payload,
        data: action.payload,
      };

    case DETAIL_LOG_API_FAIL:
      return {
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};
