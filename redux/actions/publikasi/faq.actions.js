import {
    FAQ_REQUEST,
    FAQ_SUCCESS,
    FAQ_FAIL,

    NEW_FAQ_REQUEST,
    NEW_FAQ_SUCCESS,
    NEW_FAQ_RESET,
    NEW_FAQ_FAIL,

    CLEAR_ERRORS,
} from '../../types/publikasi/faq.type'

import axios from 'axios'


// get all data
export const getAllFaq = () => async (dispatch) => {
    try {

        dispatch({ type: FAQ_REQUEST })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.get(process.env.END_POINT_API + 'publikasi/api/faq')

        dispatch({
            type: FAQ_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: FAQ_FAIL,
            payload: error.message
        })
    }
}

export const newFaq = (faqData) => async (dispatch) => {
    try {

        dispatch({
            type: NEW_FAQ_REQUEST
        })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.post(process.env.END_POINT_API + 'publikasi/api/faq', faqData)

        dispatch({
            type: NEW_FAQ_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_FAQ_FAIL,
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