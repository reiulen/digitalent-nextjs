import {
  ADMIN_SITE_REQUEST,
  ADMIN_SITE_SUCCESS,
  ADMIN_SITE_FAIL,
  ROLES_LIST_REQUEST,
  ROLES_LIST_SUCCESS,
  ROLES_LIST_FAIL,
  UNIT_WORK_LIST_REQUEST,
  UNIT_WORK_LIST_SUCCESS,
  UNIT_WORK_LIST_FAIL,
  PELATIHAN_LIST_REQUEST,
  PELATIHAN_LIST_SUCCESS,
  PELATIHAN_LIST_FAIL,
  GET_LIST_ADMIN_SITE_REQUEST,
  GET_LIST_ADMIN_SITE_SUCCESS,
  GET_LIST_ADMIN_SITE_FAIL,
  GET_ACADEMY_REQUEST,
  GET_ACADEMY_SUCCESS,
  GET_ACADEMY_FAIL,
  DETAIL_ADMIN_SITE_REQUEST,
  DETAIL_ADMIN_SITE_SUCCESS,
  DETAIL_ADMIN_SITE_FAIL,
  DETAIL_ADMIN_SITE_RESET,
  DELETE_ADMIN_SITE_SUCCESS,
  DELETE_ADMIN_SITE_FAIL,
  DELETE_ADMIN_SITE_RESET,
  DELETE_ADMIN_SITE_REQUEST,
  UPDATE_STATUS_ADMIN_SITE_SUCCESS,
  UPDATE_STATUS_ADMIN_SITE_FAIL,
  UPDATE_STATUS_ADMIN_SITE_RESET,
  UPDATE_STATUS_ADMIN_SITE_REQUEST,
  POST_ADMIN_SITE_REQUEST,
  POST_ADMIN_SITE_SUCCESS,
  POST_ADMIN_SITE_FAIL,
  POST_ADMIN_SITE_RESET,
  UPDATE_ADMIN_SITE_REQUEST,
  UPDATE_ADMIN_SITE_SUCCESS,
  UPDATE_ADMIN_SITE_FAIL,
  UPDATE_ADMIN_SITE_RESET,
  LIMIT_CONFIGURATION,
  SET_PAGE,
  SEARCH_COORPORATION,
  CLEAR_ERRORS,
  RESET_UPDATE_STATUS_REDUCER,
  RESET_DELETE_STATUS_REDUCER
} from "../../../types/site-management/user/admin-site.type";

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

export const allAdminSiteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADMIN_SITE_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };

    case ADMIN_SITE_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        data: action.payload.data,
      };

    case ADMIN_SITE_FAIL:
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

export const allRolesListReducer = (state = initialState, action) => {
  switch (action.type) {
    case ROLES_LIST_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };

    case ROLES_LIST_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        data: action.payload.data,
      };

    case ROLES_LIST_FAIL:
      return {
        ...state,
        status: statuslist.error,
        error: null,
      };

    default:
      return state;
  }
};
export const allListPelatihanReducer = (state = initialState, action) => {
  switch (action.type) {
    case PELATIHAN_LIST_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };

    case PELATIHAN_LIST_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        data: action.payload.data,
      };

    case PELATIHAN_LIST_FAIL:
      return {
        ...state,
        status: statuslist.error,
        error: null,
      };

    default:
      return state;
  }
};
export const allAcademyListReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ACADEMY_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };

    case GET_ACADEMY_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        data: action.payload,
      };

    case GET_ACADEMY_FAIL:
      return {
        ...state,
        status: statuslist.error,
        error: null,
      };

    default:
      return state;
  }
};
export const allUnitWorkListReducer = (state = initialState, action) => {
  switch (action.type) {
    case UNIT_WORK_LIST_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };

    case UNIT_WORK_LIST_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        data: action.payload.data,
      };

    case UNIT_WORK_LIST_FAIL:
      return {
        ...state,
        status: statuslist.error,
        error: null,
      };

    default:
      return state;
  }
};

export const deleteAdminSiteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ADMIN_SITE_REQUEST:
      return {
        loading: true,
      };

    case DELETE_ADMIN_SITE_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_ADMIN_SITE_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case DELETE_ADMIN_SITE_FAIL:
      return {
        loading: false,
        error: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

      case RESET_DELETE_STATUS_REDUCER:
      return {};

    default:
      return state;
  }
};

export const updateStatusAdminReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_STATUS_ADMIN_SITE_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_STATUS_ADMIN_SITE_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_STATUS_ADMIN_SITE_RESET:
      return {
        loading: false,
        isUpdated: false,
      };

    case UPDATE_STATUS_ADMIN_SITE_FAIL:
      return {
        loading: false,
        error: null,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    case RESET_UPDATE_STATUS_REDUCER:
      return {};

    default:
      return state;
  }
};

export const newAdminSiteReducer = (state = { adminSite: {} }, action) => {
  switch (action.type) {
    case POST_ADMIN_SITE_REQUEST:
      return {
        loading: true,
      };

    case POST_ADMIN_SITE_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        adminSite: action.payload.data,
      };

    case POST_ADMIN_SITE_FAIL:
      return {
        loading: false,
        error: null,
      };

    case POST_ADMIN_SITE_RESET:
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

export const detailAdminSiteReducer = (state = { adminSite: {} }, action) => {
  switch (action.type) {
    case DETAIL_ADMIN_SITE_REQUEST:
      return {
        loading: true,
      };

    case DETAIL_ADMIN_SITE_SUCCESS:
      return {
        loading: false,
        adminSite: action.payload,
      };

    case DETAIL_ADMIN_SITE_FAIL:
      return {
        loading: false,
        error: null,
      };

    case DETAIL_ADMIN_SITE_RESET:
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

export const updateAdminSiteReducer = (state = { adminSite: {} }, action) => {
  switch (action.type) {
    case UPDATE_ADMIN_SITE_REQUEST:
      return {
        loadingUpdate: true,
      };

    case UPDATE_ADMIN_SITE_SUCCESS:
      return {
        loadingUpdate: false,
        isUpdateSuccess: action.payload.message,
        adminSite: action.payload.data,
      };

    case UPDATE_ADMIN_SITE_FAIL:
      return {
        loadingUpdate: false,
        error: null,
      };

    case UPDATE_ADMIN_SITE_RESET:
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
