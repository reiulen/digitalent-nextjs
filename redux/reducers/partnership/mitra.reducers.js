import {
  MITRA_REQUEST,
  MITRA_SUCCESS,
  MITRA_FAIL,
  SEARCH_BY_KEY,
  SUCESS_DELETE_MITRA,
  SUCESS_PROVINCE,
  SET_PAGE_M,
  SET_LIMIT,
  CANCEL_CHANGE_PROVINCES,
  MITRA_FAIL_DETAIL,
  MITRA_REQUEST_DETAIL,
  MITRA_SUCCESS_DETAIL,
  SEARCH_BY_KEY_DETAIL,
  SET_PAGE_M_DETAIL,
  SET_LIMIT_DETAIL,
  LIST_COOPERATION_SUCCESS_DETAIL,
  LIST_STATUS_SUCCESS_DETAIL,
  SET_VALUE_KERJA_SAMA_M_DETAIL,
  SET_VALUE_STATUS_M_DETAIL,
  RELOAD_TABLE_DETAIL,
  SUCCESS_DELETE_COOPERATION_M_DETAIL,
  CHANGE_STATUS_LIST_M_DETAIL,
} from "../../types/partnership/mitra.type";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  status: statuslist.idle,
  status_reload: "",
  status_delete: "",
  //
  mitraAll: [],
  totalDataMitra: 0,
  mitraSingle: [],
  //
  keyword: "",
  limit: 5,
  page: 1,
  card: "",
  //
  provinces: [],
  //
  mitraDetailAll: [],
  totalDataDetail: 0,
  stateListKerjaSama: [],
  stateListStatus: [],
  pageDetail: 1,
  limitDetail: 5,
  keywordDetail: "",
  categories_cooporation: "",
  statusDetail: "",
};

export const allMitraReducer = (state = initialState, action) => {
  switch (action.type) {
    case MITRA_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };

    case MITRA_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        mitraAll: action.data,
        totalDataMitra: action.totalData,
      };

    case MITRA_FAIL:
      return {
        ...state,
        status: statuslist.error,
        error: action.payload,
      };

    case SEARCH_BY_KEY:
      return {
        ...state,
        keyword: action.value,
        page: 1,
      };
    case SEARCH_BY_KEY_DETAIL:
      return {
        ...state,
        keywordDetail: action.value,
        pageDetail: 1,
      };

    case SUCESS_DELETE_MITRA:
      return {
        ...state,
        status_reload: state.status_reload === "" ? "reload" : "",
      };

    case SUCESS_PROVINCE:
      return {
        ...state,
        provinces: action.data,
      };

    case CANCEL_CHANGE_PROVINCES:
      return {
        ...state,
        provinces: [],
      };

    case SET_PAGE_M:
      return {
        ...state,
        page: action.page,
      };
    case SET_PAGE_M_DETAIL:
      return {
        ...state,
        pageDetail: action.page,
      };

    case SET_LIMIT:
      return {
        ...state,
        limit: action.value,
        page: 1,
        card: "",
      };
    case SET_LIMIT_DETAIL:
      return {
        ...state,
        limitDetail: action.value,
        pageDetail: 1,
      };

    // =================================== detail mitra
    case MITRA_REQUEST_DETAIL:
      return {
        ...state,
        status: statuslist.process,
      };

    case MITRA_SUCCESS_DETAIL:
      return {
        ...state,
        status: statuslist.success,
        mitraDetailAll: action.data,
        totalDataDetail: action.totalData,
      };

    case MITRA_FAIL_DETAIL:
      return {
        ...state,
        status: statuslist.error,
      };

    case LIST_COOPERATION_SUCCESS_DETAIL:
      return {
        ...state,
        stateListKerjaSama: action.data,
      };
    case LIST_STATUS_SUCCESS_DETAIL:
      return {
        ...state,
        stateListStatus: action.data,
      };

    case SET_VALUE_KERJA_SAMA_M_DETAIL:
      return {
        ...state,
        categories_cooporation: action.value,
      };

    case SET_VALUE_STATUS_M_DETAIL:
      return {
        ...state,
        statusDetail: action.value,
      };

    case SUCCESS_DELETE_COOPERATION_M_DETAIL:
      return {
        ...state,
        status_delete: state.status_delete === "" ? "delete" : "",
      };

    case RELOAD_TABLE_DETAIL:
      return {
        ...state,
        status_reload: state.status_reload === "" ? "reload" : "",
      };

    case CHANGE_STATUS_LIST_M_DETAIL:
      return {
        ...state,
        status_reload: state.status_reload === "" ? "reload" : "",
      };

    default:
      return state;
  }
};
