import axios from 'axios'
import {
    FAQ_REQUEST,
    FAQ_SUCCESS,
    FAQ_FAIL
} from "../../types/publikasi/faq.type"


export const getAllFaq = (token) => async (dispatch) => {
    try {

        dispatch({ type: FAQ_REQUEST })

        const config = {
            headers: {
                Authorization: 'Bearer ' + token,
            },
        };

        let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/faq`;

        const { data } = await axios.get(link, config)

        dispatch({
            type: FAQ_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: FAQ_FAIL,
            payload: error.response.data.message
        })
    }
}