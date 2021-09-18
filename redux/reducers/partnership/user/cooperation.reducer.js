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

    default:
      return state;
  }
};
