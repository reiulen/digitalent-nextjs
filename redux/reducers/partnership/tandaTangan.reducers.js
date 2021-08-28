import {
  // Tanda Tangan
  TANDA_TANGAN_REQUEST,
  TANDA_TANGAN_SUCCESS,
  TANDA_TANGAN_FAIL,
  RELOAD_TABLE,
  SET_PAGE_M_TD,
  SET_LIMIT_TD,
  SUCESS_DELETE_TD,
  SEARCH_BY_KEY_TTD,
} from "../../types/partnership/tandaTangan.type";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  status: statuslist.idle,
  tanda_tangan: [],
  keyword: "",
  limit: 5,
  page: 1,
  reload_table: "",
};

export const allTandaTanganReducer = (state = initialState, action) => {
  switch (action.type) {
    case TANDA_TANGAN_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };

    case TANDA_TANGAN_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        tanda_tangan: action.data,
      };

    case TANDA_TANGAN_FAIL:
      return {
        ...state,
        status: statuslist.error,
      };
    case RELOAD_TABLE:
      return {
        ...state,
        status_reload: state.status_reload === "" ? "reload" : "",
      };

    case SET_PAGE_M_TD:
      return {
        ...state,
        page: action.page,
      };

    case SET_LIMIT_TD:
      return {
        ...state,
        limit: action.value,
        page: 1,
      };

    case SUCESS_DELETE_TD:
      return {
        ...state,
        status_reload: state.status_reload === "" ? "reload" : "",
      };

    case SEARCH_BY_KEY_TTD:
      return {
        ...state,
        keyword: action.value,
        page: 1,
      };

    default:
      return state;
  }
};
