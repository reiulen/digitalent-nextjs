import {
    SUBTANCE_QUESTION_TYPE_REQUEST,
    SUBTANCE_QUESTION_TYPE_SUCCESS,
    SUBTANCE_QUESTION_TYPE_FAIL,

    NEW_SUBTANCE_QUESTION_TYPE_REQUEST,
    NEW_SUBTANCE_QUESTION_TYPE_SUCCESS,
    NEW_SUBTANCE_QUESTION_TYPE_RESET,
    NEW_SUBTANCE_QUESTION_TYPE_FAIL,

    DELETE_SUBTANCE_QUESTION_TYPE_REQUEST,
    DELETE_SUBTANCE_QUESTION_TYPE_SUCCESS,
    DELETE_SUBTANCE_QUESTION_TYPE_RESET,
    DELETE_SUBTANCE_QUESTION_TYPE_FAIL,

    DETAIL_SUBTANCE_QUESTION_TYPE_REQUEST,
    DETAIL_SUBTANCE_QUESTION_TYPE_SUCCESS,
    DETAIL_SUBTANCE_QUESTION_TYPE_FAIL,

    UPDATE_SUBTANCE_QUESTION_TYPE_REQUEST,
    UPDATE_SUBTANCE_QUESTION_TYPE_SUCCESS,
    UPDATE_SUBTANCE_QUESTION_TYPE_FAIL,
    UPDATE_SUBTANCE_QUESTION_TYPE_RESET,

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
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const newSubtanceQuestionTypeReducer = (state = { subtance_question_type: {} }, action) => {
    switch (action.type) {
        case NEW_SUBTANCE_QUESTION_TYPE_REQUEST:
            return {
                loading: true
            }

        case NEW_SUBTANCE_QUESTION_TYPE_SUCCESS:
            return {
                loading: false,
                success: action.payload.message,
                subtance_question_type: action.payload.data
            }

        case NEW_SUBTANCE_QUESTION_TYPE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case NEW_SUBTANCE_QUESTION_TYPE_RESET:
            return {
                success: false
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const detailSubtanceQuestionTypeReducer = (state = { subtance_question_type: {} }, action) => {
    switch (action.type) {
        case DETAIL_SUBTANCE_QUESTION_TYPE_REQUEST:
            return {
                loading: true,
            }

        case DETAIL_SUBTANCE_QUESTION_TYPE_SUCCESS:
            return {
                loading: false,
                subtance_question_type: action.payload
            }

        case DETAIL_SUBTANCE_QUESTION_TYPE_FAIL:
            return {
                loading: false,
                error: action.payload

            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const deleteSubtanceQuestionTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_SUBTANCE_QUESTION_TYPE_REQUEST:
            return {
                loading: true
            }

        case DELETE_SUBTANCE_QUESTION_TYPE_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_SUBTANCE_QUESTION_TYPE_RESET:
            return {
                loading: false,
                isDeleted: false
            }

        case DELETE_SUBTANCE_QUESTION_TYPE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}

export const updateSubtanceQuestionTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_SUBTANCE_QUESTION_TYPE_REQUEST:
            return {
                loading: true
            }

        case UPDATE_SUBTANCE_QUESTION_TYPE_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload
            }

        case UPDATE_SUBTANCE_QUESTION_TYPE_RESET:
            return {
                loading: false,
                isUpdated: false
            }

        case UPDATE_SUBTANCE_QUESTION_TYPE_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state
    }
}