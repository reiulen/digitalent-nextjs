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
  stateListMitra: [],
  stateListStatus: [],
  stateListKerjaSama: [],
  //
  institution_name: "",
  email: "",
  //
  totalDataActive: 0,
  totalDataNonActive: 0,
  totalDataAnother: 0,
};

export const allMCooporationReducer = (state = initialState, action) => {
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
      };
    case SET_VALUE_STATUS_M:
      return {
        ...state,
        status: action.value,
      };
    case SET_VALUE_KERJA_SAMA_M:
      return {
        ...state,
        categories_cooporation: action.value,
      };

    case LIMIT_CONFIGURATION_M:
      return {
        ...state,
        limit: action.limitValue,
        page: 1,
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
    case FAIL_GET_EMAIL:
      return {
        ...state,
        email:
          state.institution_name === ""
            ? "-"
            : `Tidak ada email untuk lembaga => ${state.institution_name}`,
      };

    default:
      return state;
  }
};
