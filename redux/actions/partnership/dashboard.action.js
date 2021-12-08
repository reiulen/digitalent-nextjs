import {
  DASHBOARD_REQUEST,
  DASHBOARD_SUCCESS,
  DASHBOARD_FAIL,
} from "../../types/partnership/dashboard.type";

import axios from "axios";
import Cookies from "js-cookie";

export const fetchDashboard = (token) => {
  return async (dispatch) => {
    dispatch({ type: DASHBOARD_REQUEST });
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}api/dashbord`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            // permissionToken: localStorage.getItem("token-permission")
            // permissionToken : "U2FsdGVkX1/8bJA1yPuTitjBQIWEy1GEsyNFohOq7F2PIsPVfNgnmPPOWcJXAKFEgbMppK8Fyw0xReLhnj+Pmf6udk18GMKI1929EvT0DZafMFtuR/iRg3fz1L1ntUCC8J9DXy/FmNThOaTiYI7q8Q355IC5RgKGtHfkQxDRDLfS/XwQ8y1hnRRurzZgJAV9cTJs/7ZPQbI5r0E1ymvHbg6hzwCXeONeRcX3U7rsXaO6ouwfN6/ymcJUEGMxVNv/64NkXTk0ISzV06+jyuhoT/on/emeQ6prfLCjaPxzDDCdSlUKAD3kA/FYLAtJKdyUZVkQMx1T9d5UIuI1eO8WZfP0jV+R12qrzM12QCsr5jiTJTe2UiCGWhm3fLdJJKMKPxWJJyHyhGLE47qFGjK84iEVvqAvuSGyGOPCjN7g49ARR0H9vBC0qCtekN/58zGfyqGORFjcZFLSlKnsTQip1U2qgPvDTf6b6rot3gSsEYJRyhhG3ksp1uyFDxGmNR+qfo4C/iQ4qodADfQg+mFGOx2mVhMuj+8wcbRD6XW9v0vmAHiW/Zx+bN4/dOYsaLrGdnWssuoNi9yIRCVPkqYImGRgMI2A2BM7/ZpRrD8/HvI="
            // permissionToken: Cookies.get("token-permission").toString()
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
