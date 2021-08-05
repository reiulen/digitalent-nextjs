import {
    MITRA_REQUEST,
    MITRA_SUCCESS,
    MITRA_FAIL,

    CLEAR_ERRORS,
} from '../../types/partnership/manajemen-kerjasama.type'

import axios from 'axios'

export const getAllMitra = () => async (dispatch) => {
    try {

        dispatch({ type: MITRA_REQUEST })

        let link = process.env.END_POINT_API_PARTNERSHIP + `api/partner?page=1`
        // if (keyword) link = link.concat(`&keyword=${keyword}`)
        // if (limit) link = link.concat(`&limit=${limit}`)

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.get(link)

        dispatch({
            type: MITRA_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: MITRA_FAIL,
            payload: error.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}