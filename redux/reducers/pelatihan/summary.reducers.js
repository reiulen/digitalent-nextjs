import {
  SUMMARY_REQUEST,
  SUMMARY_SUCCESS,
  SUMMARY_FAIL,
  CLEAR_ERRORS,
} from "../../types/pelatihan/summary.type";

export const allSummaryReducer = (state = { summary: [] }, action) => {
  switch (action.type) {
    case SUMMARY_REQUEST:
      return {
        loading: true,
      };

    case SUMMARY_SUCCESS:
      return {
        loading: false,
        summary: action.payload.data,
      };

    case SUMMARY_FAIL:
      return {
        loading: false,
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
