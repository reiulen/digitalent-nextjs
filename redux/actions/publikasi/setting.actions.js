import {
    SETTING_REQUEST,
    SETTING_SUCCESS,
    SETTING_FAIL,

    UPDATE_SETTING_REQUEST,
    UPDATE_SETTING_SUCCESS,
    UPDATE_SETTING_RESET,
    UPDATE_SETTING_FAIL,

    CLEAR_ERRORS
} from "../../types/publikasi/setting.type"

import axios from "axios";

export const getSettingPublikasi = () => async(dispatch) => {
    try {
        dispatch({ type: SETTING_REQUEST });

        let link

        const { data } = await axios.get(link)

        dispatch({
            type: SETTING_SUCCESS,
            payload: data,
        });
        
    } catch (error) {
        dispatch({
            type: SETTING_FAIL,
            payload: error.message,
          });
    }
}

export const updateSettingPublikasi = () => async(dispatch) => {
    try {
        dispatch({ type: UPDATE_SETTING_REQUEST });

        let link

        dispatch({
            type: UPDATE_SETTING_SUCCESS,
            payload: data,
          });
        
    } catch (error) {
        dispatch({
            type: UPDATE_SETTING_FAIL,
            payload: error.response.data.message,
          });
    }
}