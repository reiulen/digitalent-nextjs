import {
    SUBTANCE_QUESTION_TYPE_REQUEST,
    SUBTANCE_QUESTION_TYPE_SUCCESS,
    SUBTANCE_QUESTION_TYPE_FAIL,

    CLEAR_ERRORS,
} from '../../types/subvit/subtance-question-type.type'

import axios from 'axios'

export const getAllSubtanceQuestionBanks = (page = 1, keyword = '', limit = 5) => async (dispatch) => {
    try {

        dispatch({ type: SUBTANCE_QUESTION_TYPE_REQUEST })

        let link = process.env.END_POINT_API_SUBVIT + `api/subtance-question-types?page=${page}`
        if (keyword) link = link.concat(`&keyword=${keyword}`)
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
            type: SUBTANCE_QUESTION_TYPE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SUBTANCE_QUESTION_TYPE_FAIL,
            payload: error.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}
