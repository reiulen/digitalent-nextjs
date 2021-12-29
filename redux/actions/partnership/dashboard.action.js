import {
  DASHBOARD_REQUEST,
  DASHBOARD_SUCCESS,
  DASHBOARD_FAIL,
} from "../../types/partnership/dashboard.type";

import axios from "axios";
import Cookies from "js-cookie";

export const fetchDashboard = (token, permission) => {
  return async (dispatch) => {
    dispatch({ type: DASHBOARD_REQUEST });
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}api/dashbord`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            Permission: permission
          },
        }
      );
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
