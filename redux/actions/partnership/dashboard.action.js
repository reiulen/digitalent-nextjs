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
            // permissionToken: localStorage.getItem("token-permission")
            // permissionToken : "U2FsdGVkX19WFVH8/7lAizossZdhbD0T+WW1N1WKQ5XtrVRskbZYDZP0Mhifibsh7PiJPol4AAX0s7uhIbpE/lx1esLAP/PoArlH+z9idpsRjZgnBf6D4HFhTVZJQEdXzQJ5LHiwFiJ5gwenqv9bRkH6prVvpbdcJUIFIownkW6cDjSYWFGRSRO5+oniYSmqQ1ZVnx1UtZRAutKRvdB9Ut8ULIEoJTfr6baC9YmOQwHOCoOh0R91Z+eqgZiCAZUZwbuktGkXsM4B49hz/cEzAz4P8aTVy8Q2UI2I0nVS0whwyH1gtWj1nSok9UpVq5QUSj6Af3+XrMm8UYXrpRbrJz3NITE79c2p0U5SO0xXO4OxdxYmCSvkkpeeQxHrYzODa56X68RAQn2CVdfiw88lgA3jRH5ahq3WvZc7jqeGSFdvglJ3aBRB5y3+4kOAnvY/y7eVvatfYhGqgHp+Sum9AqTNVTNNYc9uSoiJYsKBgtXiqW3oGRG1odvbHcPA+eOGb6K/ADlDDNGzHRUkmp7CjbbkdSx4GVCvheTCBTdg6jeEw1SAC1G6+iyZ/sqJX7wRBUnt4gnNPnkcUqztm0n/cFoZ2F5w+Gu/uiz0odhg8Lc="
            permissionToken: permission
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
