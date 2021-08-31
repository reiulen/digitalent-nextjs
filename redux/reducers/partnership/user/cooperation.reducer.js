import {
  COOPERATION_REQUEST,
  COOPERATION_SUCCESS,
  COOPERATION_ERROR,
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
        cooperationMitra: action.data,
      };

    case COOPERATION_ERROR:
      return {
        ...state,
        statusLoad: statuslist.error,
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
