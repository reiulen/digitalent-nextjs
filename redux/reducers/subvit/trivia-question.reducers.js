import {
    TRIVIA_QUESTION_BANKS_REQUEST,
    TRIVIA_QUESTION_BANKS_SUCCESS,
    TRIVIA_QUESTION_BANKS_FAIL,

    NEW_TRIVIA_QUESTION_BANKS_REQUEST,
    NEW_TRIVIA_QUESTION_BANKS_SUCCESS,
    NEW_TRIVIA_QUESTION_BANKS_RESET,
    NEW_TRIVIA_QUESTION_BANKS_FAIL,

    UPDATE_TRIVIA_QUESTION_BANKS_REQUEST,
    UPDATE_TRIVIA_QUESTION_BANKS_SUCCESS,
    UPDATE_TRIVIA_QUESTION_BANKS_RESET,
    UPDATE_TRIVIA_QUESTION_BANKS_FAIL,

    DELETE_TRIVIA_QUESTION_BANKS_REQUEST,
    DELETE_TRIVIA_QUESTION_BANKS_SUCCESS,
    DELETE_TRIVIA_QUESTION_BANKS_RESET,
    DELETE_TRIVIA_QUESTION_BANKS_FAIL,

    DETAIL_TRIVIA_QUESTION_BANKS_REQUEST,
    DETAIL_TRIVIA_QUESTION_BANKS_SUCCESS,
    DETAIL_TRIVIA_QUESTION_BANKS_FAIL,

    DETAIL_ONE_TRIVIA_QUESTION_BANKS_REQUEST,
    DETAIL_ONE_TRIVIA_QUESTION_BANKS_SUCCESS,
    DETAIL_ONE_TRIVIA_QUESTION_BANKS_FAIL,

    UPDATE_TRIVIA_QUESTION_BANKS_PUBLISH_REQUEST,
    UPDATE_TRIVIA_QUESTION_BANKS_PUBLISH_SUCCESS,
    UPDATE_TRIVIA_QUESTION_BANKS_PUBLISH_RESET,
    UPDATE_TRIVIA_QUESTION_BANKS_PUBLISH_FAIL,

    REPORT_TRIVIA_QUESTION_BANKS_REQUEST,
    REPORT_TRIVIA_QUESTION_BANKS_SUCCESS,
    REPORT_TRIVIA_QUESTION_BANKS_FAIL,

    CLEAR_ERRORS,
} from '../../types/subvit/trivia-question.type'

export const allTriviaQuestionBanksReducer = (state = { trivia: [] }, action) => {
    switch (action.type) {
        case TRIVIA_QUESTION_BANKS_REQUEST:
            return {
                loading: true
            }

        case TRIVIA_QUESTION_BANKS_SUCCESS:
            return {
                loading: false,
                trivia: action.payload.data
            }

        case TRIVIA_QUESTION_BANKS_FAIL:
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

export const newTriviaQuestionBanksReducer = (state = { trivia: {} }, action) => {
    switch (action.type) {
        case NEW_TRIVIA_QUESTION_BANKS_REQUEST:
            return {
                loading: true
            }

        case NEW_TRIVIA_QUESTION_BANKS_SUCCESS:
            return {
                loading: false,
                success: action.payload.message,
                trivia: action.payload.data
            }

        case NEW_TRIVIA_QUESTION_BANKS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case NEW_TRIVIA_QUESTION_BANKS_RESET:
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

export const detailTriviaQuestionBanksReducer = (state = { trivia: {} }, action) => {
    switch (action.type) {
        case DETAIL_TRIVIA_QUESTION_BANKS_REQUEST:
        case DETAIL_ONE_TRIVIA_QUESTION_BANKS_REQUEST:
            return {
                loading: true
            }

        case DETAIL_TRIVIA_QUESTION_BANKS_SUCCESS:
        case DETAIL_ONE_TRIVIA_QUESTION_BANKS_SUCCESS:
            return {
                loading: false,
                trivia: action.payload
            }

        case DETAIL_TRIVIA_QUESTION_BANKS_FAIL:
        case DETAIL_ONE_TRIVIA_QUESTION_BANKS_FAIL:
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

export const updateTriviaQuestionReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_TRIVIA_QUESTION_BANKS_REQUEST:
            return {
                loading: true
            }

        case UPDATE_TRIVIA_QUESTION_BANKS_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload
            }

        case UPDATE_TRIVIA_QUESTION_BANKS_RESET:
            return {
                loading: false,
                isUpdated: false
            }

        case UPDATE_TRIVIA_QUESTION_BANKS_FAIL:
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

export const deleteTriviaQuestionBanksReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_TRIVIA_QUESTION_BANKS_REQUEST:
            return {
                loading: true
            }

        case DELETE_TRIVIA_QUESTION_BANKS_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_TRIVIA_QUESTION_BANKS_RESET:
            return {
                loading: false,
                isDeleted: false
            }

        case DELETE_TRIVIA_QUESTION_BANKS_FAIL:
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
export const updateTriviaQuestionBanksPublishReducer = (state = { trivia: {} }, action) => {
    switch (action.type) {
        case UPDATE_TRIVIA_QUESTION_BANKS_PUBLISH_REQUEST:
            return {
                loading: true
            }

        case UPDATE_TRIVIA_QUESTION_BANKS_PUBLISH_SUCCESS:
            return {
                loading: false,
                success: action.payload.message,
                trivia: action.payload.data
            }

        case UPDATE_TRIVIA_QUESTION_BANKS_PUBLISH_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case UPDATE_TRIVIA_QUESTION_BANKS_PUBLISH_RESET:
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

export const allReportTriviaQuestionBanksReducer = (state = { trivia: [] }, action) => {
    switch (action.type) {
        case REPORT_TRIVIA_QUESTION_BANKS_REQUEST:
            return {
                loading: true
            }

        case REPORT_TRIVIA_QUESTION_BANKS_SUCCESS:
            return {
                loading: false,
                trivia: action.payload.data
            }

        case REPORT_TRIVIA_QUESTION_BANKS_FAIL:
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