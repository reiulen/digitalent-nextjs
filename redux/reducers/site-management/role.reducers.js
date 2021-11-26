import {
  ROLES_REQUEST,
  ROLES_SUCCESS,
  ROLES_FAIL,
  DETAIL_ROLES_REQUEST,
  DETAIL_ROLES_SUCCESS,
  DETAIL_ROLES_FAIL,
  DETAIL_ROLES_RESET,
  DELETE_ROLES_SUCCESS,
  DELETE_ROLES_FAIL,
  DELETE_ROLES_REQUEST,
  DELETE_ROLES_RESET,
  POST_ROLES_REQUEST,
  POST_ROLES_SUCCESS,
  POST_ROLES_FAIL,
  POST_ROLES_RESET,
  UPDATE_ROLES_REQUEST,
  UPDATE_ROLES_SUCCESS,
  UPDATE_ROLES_FAIL,
  UPDATE_ROLES_RESET,
  LIMIT_CONFIGURATION,
  SET_PAGE,
  SEARCH_COORPORATION,
  CLEAR_ERRORS,
  RELOAD_TABLE,
  PERMISSION_BY_PARENT,
  GET_SIDEBAR,
} from "../../types/site-management/role.type";

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
  reload: true,
};

export const allRolesReducer = (state = initialState, action) => {
  switch (action.type) {
    case RELOAD_TABLE:
      return {
        ...state,
        reload: state.reload ? false : true,
      };
    case ROLES_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };

    case ROLES_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        data: action.payload.data,
      };

    case ROLES_FAIL:
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

export const newRolesReducer = (state = { role: {} }, action) => {
  switch (action.type) {
    case POST_ROLES_REQUEST:
      return {
        loading: true,
      };

    case POST_ROLES_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        role: action.payload.data,
      };

    case POST_ROLES_FAIL:
      return {
        loading: false,
        error: null,
      };

    case POST_ROLES_RESET:
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

export const detailRolesReducer = (state = { role: {} }, action) => {
  switch (action.type) {
    case DETAIL_ROLES_REQUEST:
      return {
        loading: true,
      };

    case DETAIL_ROLES_SUCCESS:
      return {
        loading: false,
        role: action.payload,
      };

    case DETAIL_ROLES_FAIL:
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

export const allPermissionReducer = (state = {}, action) => {
  switch (action.type) {
    case PERMISSION_BY_PARENT:
      return {
        loading: false,
        data: action.payload
      };

    default:
      return state;
  }
};

export const allSidebarReducer = (state = {loading: true, data: {data: {menu: []}}}, action) => {
  switch (action.type) {
    case GET_SIDEBAR:
      return {
        loading: false,
        data: action.payload
      };

    default:
      return state;
  }
};

export const updateRolesReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ROLES_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_ROLES_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_ROLES_RESET:
      return {
        loading: false,
        isUpdated: false,
      };

    case UPDATE_ROLES_FAIL:
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

export const deleteRolesReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ROLES_REQUEST:
      return {
        loading: true,
      };

    case DELETE_ROLES_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_ROLES_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case DELETE_ROLES_FAIL:
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
