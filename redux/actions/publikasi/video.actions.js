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
    SET_FILTER_CARD
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

export const getDetailVideo = (id, token) => async (dispatch) => {
    try {

        const config = {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };

        let link = process.env.END_POINT_API_PUBLIKASI + `api/video/${id}`
        const { data } = await axios.get(link, config)

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

export const newVideo = (videoData, token) => async (dispatch) => {
    try {

        dispatch({
            type: NEW_VIDEO_REQUEST
        })

        const config = {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };

        const { data } = await axios.post(process.env.END_POINT_API_PUBLIKASI + 'api/video', videoData, config)

        dispatch({
            type: NEW_VIDEO_SUCCESS,
            payload: data
        })
<<<<<<< HEAD

=======
>>>>>>> 66b5352af30e4aa3554be2c1ab2f16943173b764
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

<<<<<<< HEAD
        // const { data } = await axios.post (link, dataToSend)

=======
>>>>>>> 66b5352af30e4aa3554be2c1ab2f16943173b764
        const config = {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };

        const { data } = await axios.post(link, videoData, config)
        dispatch({
            type: UPDATE_VIDEO_SUCCESS,
            payload: data
        })
<<<<<<< HEAD

=======
>>>>>>> 66b5352af30e4aa3554be2c1ab2f16943173b764
    } catch (error) {
        dispatch({
            type: UPDATE_VIDEO_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteVideo = (id, token) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_VIDEO_REQUEST })

        const config = {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };

        const { data } = await axios.delete(process.env.END_POINT_API_PUBLIKASI + "api/video/" + id, config)

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

export const playVideo = (videoData, token) => async (dispatch) => {
    try {
        dispatch({ type: PLAY_VIDEO_REQUEST })

        const config = {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };

        let link = process.env.END_POINT_API_PUBLIKASI + `api/video/play/${videoData.id}`
        const { data } = await axios.post(link, videoData, config)

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

// Card
// export const changeStatusCard = (data) => {
//     return {
//         type: SET_FILTER_CARD,
//         payload: data
//     }
// }

// export const filterCard = (token) => {
//     return async (dispatch, getState) => {
//         dispatch({ type: VIDEO_SUCCESS });

//         let pageState = getState().allFilter.page || 1;
//         let cardState = getState().allFilter.card || "";
//         let limitState = getState().allFilter.limit || 5;
//         let keywordState = getState().allFilter.keyword || "";
//         let startDateState = getState().allFilter.startdate || null;
//         let endDateState = getState().allFilter.enddate || null;

//         const params = {
//             page: pageState,
//             card: cardState,
//             limit: limitState,
//             keyword: keywordState,
//             startDate: startDateState,
//             endDate: endDateState
//         }

//         try {
//             const { data } = await axios.get(
//                 process.env.END_POINT_API_PUBLIKASI + `api/video`,
//                 {
//                     params,
//                     headers: {
//                         authorization: `Bearer ${token}`,
//                     },
//                 }
//             )
//             const sortData = await axios.get(
//                 process.env.END_POINT_API_PUBLIKASI + `api/video?page=1`,
//                 {
//                     params,
//                     headers: {
//                         authorization: `Bearer ${token}`,
//                     },
//                 }
//             )

//             console.log("Cek Data Video :",data)
//             // let totalData = sortData.data

//         } catch (error) {
//             dispatch({
//                 type: VIDEO_FAIL,
//                 payload: error.message
//             })
//         }
//     }
// }