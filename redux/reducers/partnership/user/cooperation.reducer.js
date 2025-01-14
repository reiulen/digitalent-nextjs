import {
  COOPERATION_REQUEST,
  COOPERATION_SUCCESS,
  COOPERATION_ERROR,
  SUCCESS_COOPERTAION_ACTIVE_SELECT_USER,
  FAIL_COOPERTAION_ACTIVE_SELECT_USER,
  CHANGE_COOPERTAION_ACTIVE_SELECT_BY_ID_USER,
  SUCCESS_COOPERTAION_ACTIVE_SELECT_BY_ID_USER,
  FAIL_COOPERTAION_ACTIVE_SELECT_BY_ID_USER,
  SET_PAGE_U,
  SEARCH_M_COORPORATION,
  LIST_STATUS_REQUEST,
  LIST_STATUS_SUCCESS,
  LIST_STATUS_FAIL,
  RESET_VALUE_SORTIR,
  SET_VALUE_STATUS_M,
  SET_VALUE_KERJA_SAMA_M,
  LIST_COOPERATION_REQUEST,
  LIST_COOPERATION_FAIL,
  LIST_COOPERATION_SUCCESS,
  SET_VALUE_CARD_M,
  LIMIT_CONFIGURATION_M,
  SUCCESS_GET_SINGLE_COOPERATION_M,
  SUCCESS_DELETE_COOPERATION_M,
  REJECT_COOPERATION,
  RELOAD_TABLE,
} from "../../../types/partnership/user/cooperation.type";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  statusLoad: statuslist.idle,
  cooperationMitra: [],
  page: 1,
  limit: 5,
  keyword: "",
  cooperationActiveSelect: [],
  idCooporationSelect: "",
  singleCooporationSelect: [],
  card: "",
  stateListStatus: [],
  stateListKerjaSama: [],
  categories_cooporation: [],
  status: "",
  totalDataActive: 0,
  totalDataNonActive: 0,
  totalDataAnother: 0,
  totalData: 0,
  cooperationById: [],
  status_delete: "",
};

export const cooperationUserReducer = (state = initialState, action) => {
  switch (action.type) {
    case COOPERATION_REQUEST:
      return {
        ...state,
        statusLoad: statuslist.process,
      };

    case COOPERATION_SUCCESS:
      return {
        ...state,
        statusLoad: statuslist.success,
        cooperationMitra: action.payload,
        totalDataActive: action.resultDataActives.length,
        totalDataNonActive: action.resultDataNonActives.length,
        totalDataAnother: action.resultDataAnothers.length,
        totalData: action.totalData,
      };

    case COOPERATION_ERROR:
      return {
        ...state,
        statusLoad: statuslist.error,
      };
    case SUCCESS_COOPERTAION_ACTIVE_SELECT_USER:
      return {
        ...state,
        cooperationActiveSelect: action.data,
      };
    case CHANGE_COOPERTAION_ACTIVE_SELECT_BY_ID_USER:
      return {
        ...state,
        idCooporationSelect: action.value,
      };
    case SUCCESS_COOPERTAION_ACTIVE_SELECT_BY_ID_USER:
      return {
        ...state,
        singleCooporationSelect: action.data,
      };
    case SET_PAGE_U:
      return {
        ...state,
        page: action.page,
      };

    case SEARCH_M_COORPORATION:
      return {
        ...state,
        page: 1,
        keyword: action.text,
        card: "",
      };

    case LIST_STATUS_SUCCESS:
      return {
        ...state,
        stateListStatus: action.data,
      };

    case RESET_VALUE_SORTIR:
      return {
        ...state,
        status: "",
        page: 1,
        limit: 5,
        categories_cooporation: "",
        card: "",
        keyword: "",
      };

    case SET_VALUE_STATUS_M:
      return {
        ...state,
        status: action.value,
        card: "",
        page: 1,
      };

    case SET_VALUE_KERJA_SAMA_M:
      return {
        ...state,
        categories_cooporation: action.value,
        card: "",
      };
    case LIST_COOPERATION_SUCCESS:
      return {
        ...state,
        stateListKerjaSama: action.data,
      };

    case SET_VALUE_CARD_M:
      return {
        ...state,
        card: action.value,
        page: 1,
      };

    case LIMIT_CONFIGURATION_M:
      return {
        ...state,
        limit: action.limitValue,
        page: 1,
        card: "",
      };

    case SUCCESS_GET_SINGLE_COOPERATION_M:
      return {
        ...state,
        cooperationById: action.data,
      };

    case SUCCESS_DELETE_COOPERATION_M:
      return {
        ...state,
        status_delete: state.status_delete === "" ? "delete" : "",
      };

    case REJECT_COOPERATION:
      return {
        ...state,
        status_delete: state.status_delete === "" ? "delete" : "",
      };
    case RELOAD_TABLE:
      return {
        ...state,
        status_delete: state.status_delete === "" ? "delete" : "",
      };

    default:
      return state;
  }
};
