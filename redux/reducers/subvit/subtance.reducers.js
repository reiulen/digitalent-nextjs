import {
    SUBTANCE_QUESTION_BANKS_REQUEST,
    SUBTANCE_QUESTION_BANKS_SUCCESS,
    SUBTANCE_QUESTION_BANKS_FAIL,

    NEW_SUBTANCE_QUESTION_BANKS_REQUEST,
    NEW_SUBTANCE_QUESTION_BANKS_SUCCESS,
    NEW_SUBTANCE_QUESTION_BANKS_RESET,
    NEW_SUBTANCE_QUESTION_BANKS_FAIL,

    DELETE_SUBTANCE_QUESTION_BANKS_REQUEST,
    DELETE_SUBTANCE_QUESTION_BANKS_SUCCESS,
    DELETE_SUBTANCE_QUESTION_BANKS_RESET,
    DELETE_SUBTANCE_QUESTION_BANKS_FAIL,

    UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_REQUEST,
    UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_SUCCESS,
    UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_RESET,
    UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_FAIL,

    CLEAR_ERRORS,
} from '../../types/subvit/subtance.type'

export const allSubtanceQuestionBanksReducer = (state = { subtance: [] }, action) => {
    switch (action.type) {
        case SUBTANCE_QUESTION_BANKS_REQUEST:
            return {
                loading: true
            }

        case SUBTANCE_QUESTION_BANKS_SUCCESS:
            return {
                loading: false,
                subtance: action.payload.data
            }

        case SUBTANCE_QUESTION_BANKS_FAIL:
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

export const newSubtanceQuestionBanksReducer = (state = { subtance: {} }, action) => {
    switch (action.type) {
        case NEW_SUBTANCE_QUESTION_BANKS_REQUEST:
            return {
                loading: true
            }

        case NEW_SUBTANCE_QUESTION_BANKS_SUCCESS:
            return {
                loading: false,
                success: action.payload.message,
                subtance: action.payload.data
            }

        case NEW_SUBTANCE_QUESTION_BANKS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case NEW_SUBTANCE_QUESTION_BANKS_RESET:
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

export const deleteSubtanceQuestionBanksReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_SUBTANCE_QUESTION_BANKS_REQUEST:
            return {
                loading: true
            }

        case DELETE_SUBTANCE_QUESTION_BANKS_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_SUBTANCE_QUESTION_BANKS_RESET:
            return {
                loading: false,
                isDeleted: false
            }

        case DELETE_SUBTANCE_QUESTION_BANKS_FAIL:
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

// ======================================================================================================================
export const updateSubtanceQuestionBanksPublishReducer = (state = { subtance: {} }, action) => {
    switch (action.type) {
        case UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_REQUEST:
            return {
                loading: true
            }

        case UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_SUCCESS:
            return {
                loading: false,
                success: action.payload.message,
                subtance: action.payload.data
            }

        case UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_RESET:
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