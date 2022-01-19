import {
  GET_DASHBOARD_PESERTA_SUCCESS,
  GET_DASHBOARD_PESERTA_FAIL,
  CLEAR_ERRORS,
} from "../../../types/pelatihan/dashboard-peserta.type";

export const dashboardPesertaReducer = (
  state = { dataDashboard: {} },
  action
) => {
  switch (action.type) {
    case GET_DASHBOARD_PESERTA_SUCCESS:
      return {
        dataDashboard: action.payload.data,
      };

    case GET_DASHBOARD_PESERTA_FAIL:
      return {
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
