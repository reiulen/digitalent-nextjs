import {
    DASHBOARD_PUBLIKASI_REQUEST,
    DASHBOARD_PUBLIKASI_SUCCESS,
    DASHBOARD_PUBLIKASI_FAIL,

    CLEAR_ERRORS
} from '../../types/publikasi/dashboard-publikasi.type'

import axios from "axios";

export const getAllDashboardPublikasi = () =>
  async (dispatch) => {
    try {
      dispatch({ type: DASHBOARD_PUBLIKASI_REQUEST });

      let link = process.env.END_POINT_API_PUBLIKASI + `api/dashboard`;

      const { data } = await axios.get(link);

      dispatch({
        type: DASHBOARD_PUBLIKASI_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: DASHBOARD_PUBLIKASI_FAIL,
        payload: error.message,
      });
    }
};

// Clear Error
export const clearErrors = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS,
    });
};