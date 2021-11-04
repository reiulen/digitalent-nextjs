import axios from 'axios'
import {
    VIDEO_REQUEST,
    VIDEO_SUCCESS,
    VIDEO_FAIL
} from "../../types/publikasi/video.type"

export const getAllVideo = (token) => async (dispatch) => {
    try {

        dispatch({ type: VIDEO_REQUEST })

        // let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/video?page=${page}`
        let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/home/video`
        // if (keyword) link = link.concat(`&keyword=${keyword}`)
        // if (limit) link = link.concat(`&limit=${limit}`)
        // if (publish) link = link.concat(`&publish=${publish}`);
        // if (startdate) link = link.concat(`&startdate=${startdate}`);
        // if (enddate) link = link.concat(`&enddate=${enddate}`);

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