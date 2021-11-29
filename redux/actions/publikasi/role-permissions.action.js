import {
    ROLE_PERMISSION_REQUEST,
    ROLE_PERMISSION_SUCCESS,
    ROLE_PERMISSION_FAIL,
    
    CLEAR_ERRORS
  } from '../../types/publikasi/role-permissions.type'
  
  import axios from "axios";
  
  export const getAllRolePermission = (token) =>
    async (dispatch) => {
      try {
        dispatch({ type: ROLE_PERMISSION_REQUEST });
  
        const config = {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        };
        
        let link = process.env.END_POINT_API_SITE_MANAGEMENT + `api/user/permissions`;
        
        const { data } = await axios.get(link, config);
  
        dispatch({
          type: ROLE_PERMISSION_SUCCESS,
          payload: data,
        });
  
      } catch (error) {
        dispatch({
          type: ROLE_PERMISSION_FAIL,
          payload: error.response.data.message,
        });
      }
    };

  // Clear Error
  export const clearErrors = () => async (dispatch) => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };