import {
    SUBTANCE_QUESTION_TYPE_REQUEST,
    SUBTANCE_QUESTION_TYPE_SUCCESS,
    SUBTANCE_QUESTION_TYPE_FAIL,

    CLEAR_ERRORS,
} from '../../types/subvit/subtance-question-type.type'

export const allSubtanceQuestionTypeReducer = (state = { subtance_question_type: [] }, action) => {
    switch (action.type) {
        case SUBTANCE_QUESTION_TYPE_REQUEST:
            return {
                loading: true
            }

        case SUBTANCE_QUESTION_TYPE_SUCCESS:
            return {
                loading: false,
                subtance_question_type: action.payload.data
            }

        case SUBTANCE_QUESTION_TYPE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                error: null
            }

        default:
            return state
    }
}