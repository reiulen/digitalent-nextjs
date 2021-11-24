import {
    BERANDA_VIDEO_REQUEST,
    BERANDA_VIDEO_SUCCESS,
    BERANDA_VIDEO_FAIL,

    DETAIL_BERANDA_VIDEO_REQUEST,
    DETAIL_BERANDA_VIDEO_SUCCESS,
    DETAIL_BERANDA_VIDEO_FAIL,

    KATEGORI_BERANDA_VIDEO_REQUEST,
    KATEGORI_BERANDA_VIDEO_SUCCESS,
    KATEGORI_BERANDA_VIDEO_FAIL,

    TAG_BERANDA_VIDEO_REQUEST,
    TAG_BERANDA_VIDEO_SUCCESS,
    TAG_BERANDA_VIDEO_FAIL,

    PLAY_BERANDA_VIDEO_REQUEST,
    PLAY_BERANDA_VIDEO_SUCCESS,
    PLAY_BERANDA_VIDEO_FAIL,

    CLEAR_ERRORS
} from "../../types/beranda/video-content.type"

import axios from 'axios'

export const getAllVideoContent = (
    page=1,
    keyword="",
    limit="",
    filterPublish="",
    sort="",
    category_id="",
    category_name="",
    tag="",
    ) => async (dispatch) => {
    try {

        dispatch({ type: BERANDA_VIDEO_REQUEST })

        let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/home/video?page=${page}`
        if (keyword) link = link.concat(`&keyword=${keyword}`)
        if (limit) link = link.concat(`&limit=${limit}`)
        if (filterPublish) link = link.concat(`&filterPublish=${filterPublish}`);
        if (sort) link = link.concat(`&sort=${sort}`);
        if (category_id) link = link.concat(`&category_id=${category_id}`);
        if (category_name) link = link.concat(`&category_name=${category_name}`);
        if (tag) link = link.concat(`&tag=${tag}`);

        const { data } = await axios.get(link)

        dispatch({
            type: BERANDA_VIDEO_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: BERANDA_VIDEO_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getDetailBerandaVideo = (id) => async dispatch => {
    try {
        // dispatch({ type: DETAIL_BERANDA_VIDEO_REQUEST })

        let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/home/video/${id}`

        const { data } = await axios.get(link)

        dispatch ({
            type: DETAIL_BERANDA_VIDEO_SUCCESS,
            payload: data.data
        })
        
    } catch (error) {
        dispatch ({
            type: DETAIL_BERANDA_VIDEO_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getKategoriVideoContent = () => async (dispatch) => {
    try {

        dispatch({ type: KATEGORI_BERANDA_VIDEO_REQUEST })
        
        let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/kategori`
        
        const { data } = await axios.get(link)

        dispatch({
            type: KATEGORI_BERANDA_VIDEO_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: KATEGORI_BERANDA_VIDEO_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getTagVideo = () => async (dispatch) => {
    try {

        dispatch({ type: TAG_BERANDA_VIDEO_REQUEST })
        
        let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/home/tag/video`
        
        const { data } = await axios.get(link)

        dispatch({
            type: TAG_BERANDA_VIDEO_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: TAG_BERANDA_VIDEO_FAIL,
            payload: error.response.data.message
        })
    }
}

export const playVideoContent = (videoData) => async (dispatch) => {
    try {
        dispatch({ type: PLAY_BERANDA_VIDEO_REQUEST })

        let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/video/play/${videoData.id}`
       
        const { data } = await axios.post(link, videoData)

        dispatch({
            type: PLAY_BERANDA_VIDEO_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PLAY_BERANDA_VIDEO_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Error
export const clearErrors = () => async dispatch => {
    dispatch({
      type: CLEAR_ERRORS,
    });
};