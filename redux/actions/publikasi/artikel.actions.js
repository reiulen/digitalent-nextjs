import {
    ARTIKEL_REQUEST,
    ARTIKEL_SUCCESS,
    ARTIKEL_FAIL,

    NEW_ARTIKEL_REQUEST,
    NEW_ARTIKEL_SUCCESS,
    NEW_ARTIKEL_RESET,
    NEW_ARTIKEL_FAIL,

    CLEAR_ERRORS,
} from '../../types/publikasi/artikel.type'

import axios from 'axios'


// get all data
export const getAllArtikel = () => async (dispatch) => {
    try {

        dispatch({ type: ARTIKEL_REQUEST })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.get(process.env.END_POINT_API + 'publikasi/api/artikel')

        dispatch({
            type: ARTIKEL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ARTIKEL_FAIL,
            payload: error.message
        })
    }
}

export const newArtikel = (artikelData) => async (dispatch) => {
    try {

        dispatch({
            type: NEW_ARTIKEL_REQUEST
        })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.post(process.env.END_POINT_API + 'publikasi/api/artikel', artikelData)

        dispatch({
            type: NEW_ARTIKEL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_ARTIKEL_FAIL,
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