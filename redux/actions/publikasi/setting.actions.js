import {
    SETTING_REQUEST,
    SETTING_SUCCESS,
    SETTING_FAIL,

    UPDATE_SETTING_REQUEST,

    UPDATE_SETTING_IMAGE_SUCCESS,
    UPDATE_SETTING_IMAGETRON_SUCCESS,
    UPDATE_SETTING_SLIDER_SUCCESS,
    UPDATE_SETTING_FAQ_SUCCESS,

    UPDATE_SETTING_IMAGE_FAIL,
    UPDATE_SETTING_IMAGETRON_FAIL,
    UPDATE_SETTING_SLIDER_FAIL,
    UPDATE_SETTING_FAQ_FAIL,

    UPDATE_SETTING_RESET,

    CLEAR_ERRORS
} from "../../types/publikasi/setting.type"

import axios from "axios";

export const getSettingPublikasi = (token, permission) => async (dispatch) => {
    try {
        dispatch({ type: SETTING_REQUEST });

        let link = process.env.END_POINT_API_PUBLIKASI + `api/settings`

        const config = {
            headers: {
                Authorization: "Bearer " + token,
                "Permission": permission
            },
        };

        const { data } = await axios.get(link, config)

        dispatch({
            type: SETTING_SUCCESS,
            payload: data,
        });

    } catch (error) {
        dispatch({
            type: SETTING_FAIL,
            payload: error.response.data.message,
        });
    }
}

export const updateSettingImagePublikasi = (settingData, token, permission) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_SETTING_REQUEST });

        let linkImage = process.env.END_POINT_API_PUBLIKASI + `api/settings/size-upload-image`

        let params = new URLSearchParams()
        params.append("max_size", settingData)

        const config = {
            headers: {
                Authorization: "Bearer " + token,
                'Content-Type': 'application/x-www-form-urlencoded',
                "Permission": permission
            }
        }

        const { dataImage } = await axios.put(linkImage, params, config)

        dispatch({
            type: UPDATE_SETTING_IMAGE_SUCCESS,
            payload: dataImage,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_SETTING_IMAGE_FAIL,
            payload: error.response.data.message,
        });
    }
}

export const updateSettingImagetronPublikasi = (settingData, token, permission) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_SETTING_REQUEST });

        let linkImagetron = process.env.END_POINT_API_PUBLIKASI + `api/settings/size-upload-imagetron`

        let params = new URLSearchParams()
        params.append("max_size", settingData)

        const config = {
            headers: {
                Authorization: "Bearer " + token,
                'Content-Type': 'application/x-www-form-urlencoded',
                "Permission": permission
            }
        }

        const { dataImagetron } = await axios.put(linkImagetron, params, config)

        dispatch({
            type: UPDATE_SETTING_IMAGETRON_SUCCESS,
            payload: dataImagetron,
        });

    } catch (error) {
        dispatch({
            type: UPDATE_SETTING_IMAGETRON_FAIL,
            payload: error.response.data.message,
        });
    }
}

export const updateSettingSliderPublikasi = (settingData, token, permission) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_SETTING_REQUEST });

        let linkSlider = process.env.END_POINT_API_PUBLIKASI + `api/settings/size-slider`

        let params = new URLSearchParams()
        params.append("max_size", settingData)

        const config = {
            headers: {
                Authorization: "Bearer " + token,
                'Content-Type': 'application/x-www-form-urlencoded',
                "Permission": permission
            }
        }

        const { dataSlider } = await axios.put(linkSlider, params, config)

        dispatch({
            type: UPDATE_SETTING_SLIDER_SUCCESS,
            payload: dataSlider,
        });


    } catch (error) {
        dispatch({
            type: UPDATE_SETTING_SLIDER_FAIL,
            payload: error.response.data.message,
        });
    }
}

export const updateSettingFaqPublikasi = (settingData, token, permission) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_SETTING_REQUEST });

        let linkFaq = process.env.END_POINT_API_PUBLIKASI + `api/settings/size-pin-faq`

        let params = new URLSearchParams()
        params.append("max_size", settingData)

        const config = {
            headers: {
                Authorization: "Bearer " + token,
                'Content-Type': 'application/x-www-form-urlencoded',
                "Permission": permission
            }
        }

        const { dataFaq } = await axios.put(linkFaq, params, config)

        dispatch({
            type: UPDATE_SETTING_FAQ_SUCCESS,
            payload: dataFaq,
        });


    } catch (error) {
        dispatch({
            type: UPDATE_SETTING_FAQ_FAIL,
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