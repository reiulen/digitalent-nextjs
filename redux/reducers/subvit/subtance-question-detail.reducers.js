import {
    NEW_SUBTANCE_QUESTION_DETAIL_REQUEST,
    NEW_SUBTANCE_QUESTION_DETAIL_SUCCESS,
    NEW_SUBTANCE_QUESTION_DETAIL_RESET,
    NEW_SUBTANCE_QUESTION_DETAIL_FAIL,

    CLEAR_ERRORS,
} from '../../types/subvit/subtance-question-detail.type'

export const newSubtanceQuestionDetailReducer = (state = { subtance_question_detail: {} }, action) => {
    switch (action.type) {
        case NEW_SUBTANCE_QUESTION_DETAIL_REQUEST:
            return {
                loading: true
            }

        case NEW_SUBTANCE_QUESTION_DETAIL_SUCCESS:
            return {
                loading: false,
                success: action.payload.message,
                subtance_question_detail: action.payload.data
            }

        case NEW_SUBTANCE_QUESTION_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case NEW_SUBTANCE_QUESTION_DETAIL_RESET:
            return {
                success: false
            }

        case CLEAR_ERRORS:
            return {
                error: null
            }

        default:
            return state
    }
}