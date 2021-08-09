import {
    NEW_SUBTANCE_QUESTION_DETAIL_REQUEST,
    NEW_SUBTANCE_QUESTION_DETAIL_SUCCESS,
    NEW_SUBTANCE_QUESTION_DETAIL_FAIL,

    CLEAR_ERRORS
} from '../../types/subvit/subtance-question-detail.type'

import axios from 'axios'

export const newSubtanceQuestionDetail = (subtanceDetailData) => async (dispatch) => {
    try {

        dispatch({
            type: NEW_SUBTANCE_QUESTION_DETAIL_REQUEST
        })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.post(process.env.END_POINT_API_SUBVIT + 'api/subtance-question-bank-details', subtanceDetailData)

        dispatch({
            type: NEW_SUBTANCE_QUESTION_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_SUBTANCE_QUESTION_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}