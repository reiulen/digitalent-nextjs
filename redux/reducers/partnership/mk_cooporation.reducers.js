import {
  MK_COOPORATION_REQUEST,
  MK_COOPORATION_SUCCESS,
  MK_COOPORATION_FAIL,
  SEARCH_COORPORATION,
  LIMIT_CONFIGURATION,
  SUCCESS_GET_SINGLE_COOPORATION,
  DELETE_COOPORATION_REQUEST,
  SUCCESS_DELETE_COOPORATION_REQUEST,
  SUCCESS_CHANGE_STATUS_LIST,
} from "../../types/partnership/mk_cooporation.type";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  status: statuslist.idle,
  mk_cooporation: [],
  mk_single_cooporation: [],
  keyword: "",
  limit: 1,
  status_delete: "",
  status_list: "",
};

export const allMKCooporationReducer = (state = initialState, action) => {
  switch (action.type) {
    case MK_COOPORATION_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };

    case MK_COOPORATION_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        mk_cooporation: action.data,
      };

    case MK_COOPORATION_FAIL:
      return {
        ...state,
        status: statuslist.error,
        error: action.payload,
      };
    case SEARCH_COORPORATION:
      return {
        ...state,
        keyword: action.text,
      };

    case LIMIT_CONFIGURATION:
      return {
        ...state,
        limit: action.limitValue,
      };

    case SUCCESS_GET_SINGLE_COOPORATION:
      return {
        ...state,
        status: statuslist.success,
        mk_single_cooporation: action.data,
      };

    case SUCCESS_DELETE_COOPORATION_REQUEST:
      return {
        ...state,
        status_delete: statuslist.success,
        mk_cooporation: action.data,
      };

    case SUCCESS_CHANGE_STATUS_LIST:
      // console.log("action");
      // console.log(action.data, action.index_list);
      // console.log("state");
      // console.log(state.mk_cooporation);

      // state.mk_cooporation.data.cooperation_categories.map(
      //   (cooperation_categorie, index) => {
      //     if (index === action.index_list) {
      //       cooperation_categorie.status = action.data.data.status;
      //     }
      //     return cooperation_categorie;
      //   }
      // );
      // console.log("state new");
      // console.log(state.mk_cooporation);

      return {
        ...state,
        status_delete: state.status_delete === "" ? statuslist.success : "",
      };

    default:
      return state;
  }
};
