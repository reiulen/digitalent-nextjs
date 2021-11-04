import axios from 'axios'
import {
    VIDEO_REQUEST,
    VIDEO_SUCCESS,
    VIDEO_FAIL,
    TAG_REQUEST,
    TAG_SUCCESS,
    TAG_FAIL,
    PLAY_REQUEST,
    PLAY_SUCCESS,
    PLAY_FAIL
} from "../../types/publikasi/video.type"

export const getAllVideo = (
    page=1,
    keyword="",
    limit="",
    filterPublish="",
    sort="",
    category_id="",
    category_name="",
    tag="",
    token
    ) => async (dispatch) => {
    try {

        dispatch({ type: VIDEO_REQUEST })

        let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/home/video?page=${page}`
        if (keyword) link = link.concat(`&keyword=${keyword}`)
        if (limit) link = link.concat(`&limit=${limit}`)
        if (filterPublish) link = link.concat(`&filterPublish=${filterPublish}`);
        if (sort) link = link.concat(`&sort=${sort}`);
        if (category_id) link = link.concat(`&category_id=${category_id}`);
        if (category_name) link = link.concat(`&category_name=${category_name}`);
        if (tag) link = link.concat(`&tag=${tag}`);

        const config = {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };

        // const { data } = await axios.get(process.env.END_POINT_API_PUBLIKASI + 'api/video')
        const { data } = await axios.get(link, config)

        dispatch({
            type: VIDEO_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: VIDEO_FAIL,
            payload: error.response.data.message
        })
    }
}


export const getTagVideo = (token) => async (dispatch) => {
    try {

        dispatch({ type: TAG_REQUEST })
        
        let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/home/tag/video`
        const config = {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };
        
        const { data } = await axios.get(link, config)

        dispatch({
            type: TAG_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: TAG_FAIL,
            payload: error.response.data.message
        })
    }
}

export const playVideoContent = (videoData, token) => async (dispatch) => {
    try {
        dispatch({ type: PLAY_REQUEST })

        const config = {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };
        let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/home/video/${videoData.id}`
       
        const { data } = await axios.get(link, videoData, config)

        dispatch({
            type: PLAY_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PLAY_FAIL,
            payload: error.response.data.message
        })
    }
}