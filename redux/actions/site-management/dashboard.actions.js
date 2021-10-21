import { DRAW_LOAD_DATA_DASHBOARD_SITE_MANAGEMENT, LOAD_DATA_DASHBOARD_SITE_MANAGEMENT } from '../../types/site-management/dashboard.type'

import axios from "axios";

export const loadDataZonasi = (token, type, page) => {
    const params = {
        type,
        page
    }

    return async (dispatch) => {

        

      try {
        dispatch({
            type: DRAW_LOAD_DATA_DASHBOARD_SITE_MANAGEMENT
        })
        
        let { data } = await axios.get(
          `${process.env.END_POINT_API_SITE_MANAGEMENT}/api/dashboard/zonasi`,
          {
            params,
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch({
          type: LOAD_DATA_DASHBOARD_SITE_MANAGEMENT,
          payload: data.data,
          page
        });
      } catch (error) {
        console.log(error);
      }
    };
  };

  export const loadDataZonasiNext = (token, type, page) => {
    const params = {
        type,
        page
    }

    return async (dispatch) => {
      try {
        let { data } = await axios.get(
          `${process.env.END_POINT_API_SITE_MANAGEMENT}/api/dashboard/zonasi`,
          {
            params,
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        dispatch({
          type: DRAW_LOAD_DATA_DASHBOARD_SITE_MANAGEMENT,
          payload: data.data.list_zonasi,
        });
      } catch (error) {
        console.log(error);
      }
    };
  };

