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

export const getSettingPublikasi = () => async(dispatch) => {
    try {
        dispatch({ type: SETTING_REQUEST });

        let link = process.env.END_POINT_API_PUBLIKASI + `api/settings`

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

export const updateSettingPublikasi = (settingData) => async(dispatch) => {
    try {
        dispatch({ type: UPDATE_SETTING_REQUEST });

        let linkImage = process.env.END_POINT_API_PUBLIKASI + `api/settings/size-upload-image`
        let linkImagetron = process.env.END_POINT_API_PUBLIKASI + `api/settings/size-upload-imagetron`
        let linkSlider = process.env.END_POINT_API_PUBLIKASI + `api/settings/size-slider`
        let linkFaq = process.env.END_POINT_API_PUBLIKASI + `api/settings/size-pin-faq`

        const { dataImage } = await axios.put(linkImage, encodeURI(settingData.upload_image) )
        const { dataImagetron } = await axios.put(linkImagetron, settingData.upload_imagetron)
        const { dataSlider } = await axios.put(linkSlider, settingData.batas_slider)
        const { dataFaq } = await axios.put(linkFaq, settingData.maxfaq)

        dispatch({
            type: UPDATE_SETTING_IMAGE_SUCCESS,
            payload: dataImage,
          });
        
        dispatch({
            type: UPDATE_SETTING_IMAGETRON_SUCCESS,
            payload: dataImagetron,
        });

        dispatch({
            type: UPDATE_SETTING_SLIDER_SUCCESS,
            payload: dataSlider,
        });

        dispatch({
            type: UPDATE_SETTING_FAQ_SUCCESS,
            payload: dataFaq,
        });
        
        
    } catch (error) {
        dispatch({
            type: UPDATE_SETTING_IMAGE_FAIL,
            payload: error.response.data.message,
        });

        dispatch({
            type: UPDATE_SETTING_IMAGETRON_FAIL,
            payload: error.response.data.message,
        });

        dispatch({
            type: UPDATE_SETTING_SLIDER_FAIL,
            payload: error.response.data.message,
        });

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