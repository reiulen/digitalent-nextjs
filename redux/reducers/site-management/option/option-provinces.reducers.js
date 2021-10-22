import {
  PROVINCES_REQUEST,
  PROVINCES_SUCCESS,
  PROVINCES_FAIL,
} from "../../../types/site-management/option/option-provinces.type";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  data: [],
  status: statuslist.idle,
};

export const allProvincesSiteReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROVINCES_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };

    case PROVINCES_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        data: action.payload.data,
      };

    case PROVINCES_FAIL:
      return {
        ...state,
        status: statuslist.error,
        error: null,
      };

    default:
      return state;
  }
};
