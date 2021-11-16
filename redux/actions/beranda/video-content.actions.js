// import {
//     VIDEO_REQUEST,
//     VIDEO_SUCCESS,
//     VIDEO_FAIL,
//     TAG_REQUEST,
//     TAG_SUCCESS,
//     TAG_FAIL,
//     PLAY_REQUEST,
//     PLAY_SUCCESS,
//     PLAY_FAIL,
//     KATEGORI_VIDEO_CONTENT_REQUEST,
//     KATEGORI_VIDEO_CONTENT_SUCCESS,
//     KATEGORI_VIDEO_CONTENT_FAIL
// } from "../../types/publikasi/video.type"

import {
    BERANDA_VIDEO_REQUEST,
    BERANDA_VIDEO_SUCCESS,
    BERANDA_VIDEO_FAIL,

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
       
        const { data } = await axios.get(link, videoData)

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