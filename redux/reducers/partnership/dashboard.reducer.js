import {
  DASHBOARD_REQUEST,
  DASHBOARD_SUCCESS,
  DASHBOARD_FAIL,
} from "../../types/partnership/dashboard.type";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  status: statuslist.idle,
  data_dashboard: [],
};

export const dashboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case DASHBOARD_REQUEST:
      return {
        ...state,
        status: statuslist.process,
      };
    case DASHBOARD_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        data_dashboard: action.data,
      };
    case DASHBOARD_FAIL:
      return {
        ...state,
        status: statuslist.error,
      };

    default:
      return state;
  }
};
