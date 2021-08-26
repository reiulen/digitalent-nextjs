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

    case SET_LIMIT:
      return {
        ...state,
        limit: action.value,
        page: 1,
        card: "",
      };

    default:
      return state;
  }
};
