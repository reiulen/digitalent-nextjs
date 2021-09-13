import {
  DASHBOARD_REQUEST,
  DASHBOARD_SUCCESS,
  DASHBOARD_FAIL,
} from "../../types/partnership/dashboard.type";

import axios from "axios";

export const fetchDashboard = () => {
  return async (dispatch, getState) => {
    dispatch({ type: DASHBOARD_REQUEST });

    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/dashbord`
      );
      console.log("data", data);
      dispatch(successFetchDashboard(data));
    } catch (error) {
      dispatch({ type: DASHBOARD_FAIL });
    }
  };
};

export const successFetchDashboard = (data) => {
  return {
    type: DASHBOARD_SUCCESS,
    data,
  };
};
