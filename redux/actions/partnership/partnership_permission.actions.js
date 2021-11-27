import {
    FETCH_PARTNERSHIP_PERMISSION_REQUEST,
    FETCH_PARTNERSHIP_PERMISSION_SUCCESS,
    FETCH_PARTNERSHIP_PERMISSION_FAIL,

    CLEAR_ERRORS,

} from "../../types/partnership/partnership_permission.type"

import axios from "axios";

export const getPartnershipPermissions = (token) => async (dispatch) => {
    try {

        dispatch({ type: FETCH_PARTNERSHIP_PERMISSION_REQUEST });

        const config = {
            headers: {
              Authorization: "Bearer " + token,
            },
        };

        let link = process.env.END_POINT_API_SITE_MANAGEMENT + `api/user/permissions` ;

        const { data } = await axios.get(link, config);
        dispatch({
            type: FETCH_PARTNERSHIP_PERMISSION_SUCCESS,
            payload: data,
        });
        
    } catch (error) {
        dispatch({
            type: FETCH_PARTNERSHIP_PERMISSION_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Clear Error
export const clearErrors = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };