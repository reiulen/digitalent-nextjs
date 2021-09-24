import {
    VIDEO_REQUEST,
    VIDEO_SUCCESS,
    VIDEO_FAIL,

    NEW_VIDEO_REQUEST,
    NEW_VIDEO_SUCCESS,
    NEW_VIDEO_RESET,
    NEW_VIDEO_FAIL,

    DETAIL_VIDEO_REQUEST,
    DETAIL_VIDEO_SUCCESS,
    DETAIL_VIDEO_FAIL,

    DELETE_VIDEO_REQUEST,
    DELETE_VIDEO_SUCCESS,
    DELETE_VIDEO_RESET,
    DELETE_VIDEO_FAIL,

    UPDATE_VIDEO_REQUEST,
    UPDATE_VIDEO_SUCCESS,
    UPDATE_VIDEO_RESET,
    UPDATE_VIDEO_FAIL,

    PLAY_VIDEO_REQUEST,
    PLAY_VIDEO_SUCCESS,
    PLAY_VIDEO_FAIL,

    CLEAR_ERRORS,
} from '../../types/publikasi/video.type'

import axios from 'axios'


// get all data
export const getAllVideo = (page = 1, keyword = "", limit = 5, publish = null, startdate = null, enddate = null, token) => async (dispatch) => {
    try {

        dispatch({ type: VIDEO_REQUEST })

        let link = process.env.END_POINT_API_PUBLIKASI + `api/video?page=${page}`
        if (keyword) link = link.concat(`&keyword=${keyword}`)
        if (limit) link = link.concat(`&limit=${limit}`)
        if (publish) link = link.concat(`&publish=${publish}`);
        if (startdate) link = link.concat(`&startdate=${startdate}`);
        if (enddate) link = link.concat(`&enddate=${enddate}`);

        const config = {
            headers: {
                Authorization: "Bearer " + token,
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
            payload: error.message
        })
    }
}

export const getDetailVideo = (id, token) => async (dispatch) => {
    try {

        let link = process.env.END_POINT_API_PUBLIKASI + `api/video/${id}`

        const config = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };

        const { data } = await axios.get(link, config)

        console.log("test")
        console.log(data)

        dispatch({
            type: DETAIL_VIDEO_SUCCESS,
            payload: data.data
        })


    } catch (error) {
        dispatch({
            type: DETAIL_VIDEO_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newVideo = (videoData) => async (dispatch) => {
    try {

        dispatch({
            type: NEW_VIDEO_REQUEST
        })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.post(process.env.END_POINT_API_PUBLIKASI + 'api/video', videoData)

        dispatch({
            type: NEW_VIDEO_SUCCESS,
            payload: data
        })

        console.log(videoData)

    } catch (error) {
        dispatch({
            type: NEW_VIDEO_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateVideo = (videoData, token) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_VIDEO_REQUEST })

        let link = process.env.END_POINT_API_PUBLIKASI + `api/video/${videoData.id}`

        // const dataToSend ={
        //     users_id: 3,
        //     judul_video: videoData.judul_video,
        //     isi_video: videoData.isi_video,
        //     url_video: "www.youtube.com/watch?v=JxPj3GAYYZ0&ab_channel=Epitaph",
        //     gambar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAPFBMVEUAAAAcEDAcEDAXBiVlPQh4Vwu3sQ2dhwxjPgaRIzvACxv4OUr/bnaBDiGkCxr/o6HmCyHv2sigO1f///8kjhRLAAAAA3RSTlMAQHBaCvrnAAAAAWJLR0QTDLtclgAAAAd0SU1FB+IDBwApN7HUaKQAAAB0SURBVBjTXc5REsIwCARQ0lUrSyHY+x/WtDGNykw+eLOzQWQM5H++BcAP4HZ/ADPY9hVPDMK5K2gbZoPT4UPg4dwqrVqeAnVaWn1ZssPuwUyzzLjgkGT4p6QLGePj3Q+JEejSeuI6HqoOnYGytNNKe0sReQMksgUhPSgEAAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAxOC0wMy0wNlQyMzo0MTo1NSswMTowMJImYPsAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMTgtMDMtMDZUMjM6NDE6NTUrMDE6MDDje9hHAAAAAElFTkSuQmCC",
        //     // gambar: videoData.gambar,
        //     tag: ["check"],
        //     _method: "put",
        //     publish: 1,
        //     kategori_id: 76
        // }

        // const { data } = await axios.post (link, dataToSend)

        const config = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };

        const { data } = await axios.post(link, videoData, config)
        console.log("Update Data : ", data)
        dispatch({
            type: UPDATE_VIDEO_SUCCESS,
            payload: data
        })
        // console.log ("check")
        console.log("Video Data : ", videoData)

    } catch (error) {
        dispatch({
            type: UPDATE_VIDEO_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteVideo = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_VIDEO_REQUEST })

        const { data } = await axios.delete(process.env.END_POINT_API_PUBLIKASI + `api/video/${id}`)

        dispatch({
            type: DELETE_VIDEO_SUCCESS,
            payload: data.status
        })

    } catch (error) {
        dispatch({
            type: DELETE_VIDEO_FAIL,
            payload: error.response.data.message
        })
    }
}

export const playVideo = (videoData) => async (dispatch) => {
    try {
        dispatch({ type: PLAY_VIDEO_REQUEST })

        let link = process.env.END_POINT_API_PUBLIKASI + `api/video/${videoData.id}`

        const { data } = await axios.post(link, videoData)

        dispatch({
            type: PLAY_VIDEO_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PLAY_VIDEO_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Error
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}