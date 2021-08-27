import {
  MANAGEMENT_COOPORATION_REQUEST,
  MANAGEMENT_COOPORATION_SUCCESS,
  MANAGEMENT_COOPORATION_FAIL,
  SEARCH_M_COORPORATION,
  SET_PAGE_M,
  SET_VALUE_MITRA_M,
  LIMIT_CONFIGURATION_M,
  SET_VALUE_STATUS_M,
  SET_VALUE_KERJA_SAMA_M,
  LIST_MITRA_REQUEST,
  LIST_MITRA_SUCCESS,
  LIST_MITRA_FAIL,
  LIST_STATUS_REQUEST,
  LIST_STATUS_SUCCESS,
  LIST_STATUS_FAIL,
  LIST_COOPERATION_REQUEST,
  LIST_COOPERATION_SUCCESS,
  LIST_COOPERATION_FAIL,
  SET_NAME_LEMBAGA,
  SUCCESS_GET_EMAIL,
  FAIL_GET_EMAIL,
  GET_COOPERTAION_ACTIVE_SELECT,
  FAIL_COOPERTAION_ACTIVE_SELECT,
  SUCCESS_COOPERTAION_ACTIVE_SELECT,
  SET_VALUE_CARD_M,
  GET_COOPERTAION_ACTIVE_SELECT_BY_ID,
  SUCCESS_COOPERTAION_ACTIVE_SELECT_BY_ID,
  FAIL_COOPERTAION_ACTIVE_SELECT_BY_ID,
  CHANGE_COOPERTAION_ACTIVE_SELECT_BY_ID,
  SUCCESS_DELETE_COOPERATION_M,
  SUCCESS_GET_SINGLE_COOPERATION_M,
  CHANGE_STATUS_LIST_M,
  CANCEL_CHANGE_CATEGORY,
  CANCEL_CHANGE_EMAIL,
  RELOAD_TABLE,
} from "../../types/partnership/management_cooporation.type";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  statusLoad: statuslist.idle,
  m_cooporation: [],
  m_single_cooporation: [],
  status_delete: "",
  status_list: "",
  //
  page: 1,
  limit: 5,
  status: "",
  categories_cooporation: "",
  partner: "",
  keyword: "",
  card: "",
  stateListMitra: [],
  stateListStatus: [],
  stateListKerjaSama: [],
  //
  cooperationActiveSelect: [],
  //
  institution_name: "",
  email: "",
  //
  totalDataActive: 0,
  totalDataNonActive: 0,
  totalDataAnother: 0,
  //
  idCooporationSelect: "",
  singleCooporationSelect: [],
  //
  cooperationById: [],
  totalData: 0,
};

export const allMCooporationReducerMK = (state = initialState, action) => {
  switch (action.type) {
    case MANAGEMENT_COOPORATION_REQUEST:
      return {
        ...state,
        statusLoad: statuslist.process,
      };

    case MANAGEMENT_COOPORATION_SUCCESS:
      return {
        ...state,
        statusLoad: statuslist.success,
        m_cooporation: action.data,
        totalDataActive: action.resultDataActive.length,
        totalDataNonActive: action.resultDataNonActive.length,
        totalDataAnother: action.resultDataAnother.length,
        totalData: action.totalData,
      };

    case MANAGEMENT_COOPORATION_FAIL:
      return {
        ...state,
        statusLoad: statuslist.error,
        error: action.payload,
      };
    case SEARCH_M_COORPORATION:
      return {
        ...state,
        page: 1,
        keyword: action.text,
        card: "",
      };

    case SET_PAGE_M:
      return {
        ...state,
        page: action.page,
      };

    case SET_VALUE_MITRA_M:
      return {
        ...state,
        partner: action.value,
        card: "",
      };
    case SET_VALUE_STATUS_M:
      return {
        ...state,
        status: action.value,
        card: "",
      };
    case SET_VALUE_CARD_M:
      return {
        ...state,
        card: action.value,
      };
    case SET_VALUE_KERJA_SAMA_M:
      return {
        ...state,
        categories_cooporation: action.value,
        card: "",
      };

    case LIMIT_CONFIGURATION_M:
      return {
        ...state,
        limit: action.limitValue,
        page: 1,
        card: "",
      };

    case LIST_MITRA_SUCCESS:
      return {
        ...state,
        stateListMitra: action.data,
      };
    case LIST_COOPERATION_SUCCESS:
      return {
        ...state,
        stateListKerjaSama: action.data,
      };
    case LIST_STATUS_SUCCESS:
      return {
        ...state,
        stateListStatus: action.data,
      };
    case SET_NAME_LEMBAGA:
      return {
        ...state,
        institution_name: action.value,
      };
    case SUCCESS_GET_EMAIL:
      return {
        ...state,
        email: action.email,
      };
    case SUCCESS_COOPERTAION_ACTIVE_SELECT:
      return {
        ...state,
        cooperationActiveSelect: action.data,
      };
    case CHANGE_COOPERTAION_ACTIVE_SELECT_BY_ID:
      return {
        ...state,
        idCooporationSelect: action.value,
      };
    case SUCCESS_COOPERTAION_ACTIVE_SELECT_BY_ID:
      return {
        ...state,
        singleCooporationSelect: action.data,
      };
    case CANCEL_CHANGE_CATEGORY:
      return {
        ...state,
        stateListKerjaSama: [],
      };
    case CANCEL_CHANGE_EMAIL:
      return {
        ...state,
        institution_name: "",
        stateListMitra: [],
      };
    case SUCCESS_DELETE_COOPERATION_M:
      return {
        ...state,
        status_delete: state.status_delete === "" ? "delete" : "",
      };
    case CHANGE_STATUS_LIST_M:
      return {
        ...state,
        status_delete: state.status_delete === "" ? "delete" : "",
      };
    case RELOAD_TABLE:
      return {
        ...state,
        status_delete: state.status_delete === "" ? "delete" : "",
      };
    case SUCCESS_GET_SINGLE_COOPERATION_M:
      console.log("data single", action.data);
      return {
        ...state,
        cooperationById: action.data,
      };
    case FAIL_GET_EMAIL:
      return {
        ...state,
        email:
          state.institution_name === ""
            ? "-"
            : `Tidak ada email untuk lembaga => ${state.institution_name}`,
      };
    // case GET_COOPERTAION_ACTIVE_SELECT:
    //   return {
    //     ...state,
    //     email: action.email,
    //   };

    default:
      return state;
  }
};
