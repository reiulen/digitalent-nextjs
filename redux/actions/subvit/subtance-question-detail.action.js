import {
    SUBTANCE_QUESTION_DETAIL_REQUEST,
    SUBTANCE_QUESTION_DETAIL_SUCCESS,
    SUBTANCE_QUESTION_DETAIL_FAIL,

    NEW_SUBTANCE_QUESTION_DETAIL_REQUEST,
    NEW_SUBTANCE_QUESTION_DETAIL_SUCCESS,
    NEW_SUBTANCE_QUESTION_DETAIL_RESET,
    NEW_SUBTANCE_QUESTION_DETAIL_FAIL,

    DELETE_SUBTANCE_QUESTION_DETAIL_REQUEST,
    DELETE_SUBTANCE_QUESTION_DETAIL_SUCCESS,
    DELETE_SUBTANCE_QUESTION_DETAIL_RESET,
    DELETE_SUBTANCE_QUESTION_DETAIL_FAIL,

    CLEAR_ERRORS,
} from '../../types/subvit/subtance-question-detail.type'

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