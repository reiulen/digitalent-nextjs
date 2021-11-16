import {
    KATEGORI_VIDEO_CONTENT_REQUEST,
    KATEGORI_VIDEO_CONTENT_SUCCESS,
    KATEGORI_VIDEO_CONTENT_FAIL,
    CLEAR_ERRORS
} from "../../types/publikasi/kategori.type"

import axios from "axios";

export const getKategoriVideoContent = (token) => async (dispatch) => {
    try {

        dispatch({ type: KATEGORI_VIDEO_CONTENT_REQUEST })

        let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/kategori`
        const config = {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };

        const { data } = await axios.get(link, config)

        dispatch({
            type: KATEGORI_VIDEO_CONTENT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: KATEGORI_VIDEO_CONTENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async dispatch => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};