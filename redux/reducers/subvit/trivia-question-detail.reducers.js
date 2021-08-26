import {

    TRIVIA_QUESTION_DETAIL_REQUEST,
    TRIVIA_QUESTION_DETAIL_SUCCESS,
    TRIVIA_QUESTION_DETAIL_FAIL,

    NEW_TRIVIA_QUESTION_DETAIL_REQUEST,
    NEW_TRIVIA_QUESTION_DETAIL_SUCCESS,
    NEW_TRIVIA_QUESTION_DETAIL_RESET,
    NEW_TRIVIA_QUESTION_DETAIL_FAIL,

    DELETE_TRIVIA_QUESTION_DETAIL_REQUEST,
    DELETE_TRIVIA_QUESTION_DETAIL_SUCCESS,
    DELETE_TRIVIA_QUESTION_DETAIL_RESET,
    DELETE_TRIVIA_QUESTION_DETAIL_FAIL,

    DETAIL_TRIVIA_QUESTION_DETAIL_REQUEST,
    DETAIL_TRIVIA_QUESTION_DETAIL_SUCCESS,
    DETAIL_TRIVIA_QUESTION_DETAIL_FAIL,

    UPDATE_TRIVIA_QUESTION_DETAIL_REQUEST,
    UPDATE_TRIVIA_QUESTION_DETAIL_SUCCESS,
    UPDATE_TRIVIA_QUESTION_DETAIL_RESET,
    UPDATE_TRIVIA_QUESTION_DETAIL_FAIL,

    IMPORT_FILE_TRIVIA_QUESTION_DETAIL_REQUEST,
    IMPORT_FILE_TRIVIA_QUESTION_DETAIL_SUCCESS,
    IMPORT_FILE_TRIVIA_QUESTION_DETAIL_RESET,
    IMPORT_FILE_TRIVIA_QUESTION_DETAIL_FAIL,

    IMPORT_IMAGES_TRIVIA_QUESTION_DETAIL_REQUEST,
    IMPORT_IMAGES_TRIVIA_QUESTION_DETAIL_SUCCESS,
    IMPORT_IMAGES_TRIVIA_QUESTION_DETAIL_RESET,
    IMPORT_IMAGES_TRIVIA_QUESTION_DETAIL_FAIL,

    CLEAR_ERRORS,
} from '../../types/subvit/trivia-question-detail.type'

export const allTriviaQuestionDetailReducer = (state = { trivia_question_detail: [] }, action) => {
    switch (action.type) {
        case TRIVIA_QUESTION_DETAIL_REQUEST:
            return {
                loading: true
            }

        case TRIVIA_QUESTION_DETAIL_SUCCESS:
            return {
                loading: false,
                trivia_question_detail: action.payload.data
            }

        case TRIVIA_QUESTION_DETAIL_FAIL:
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


export const newTriviaQuestionDetailReducer = (state = { trivia_question_detail: {} }, action) => {
    switch (action.type) {
        case NEW_TRIVIA_QUESTION_DETAIL_REQUEST:
            return {
                loading: true
            }

        case NEW_TRIVIA_QUESTION_DETAIL_SUCCESS:
            return {
                loading: false,
                success: action.payload.message,
                trivia_question_detail: action.payload.data
            }

        case NEW_TRIVIA_QUESTION_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case NEW_TRIVIA_QUESTION_DETAIL_RESET:
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

export const deleteTriviaQuestionDetailReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_TRIVIA_QUESTION_DETAIL_REQUEST:
            return {
                loading: true
            }

        case DELETE_TRIVIA_QUESTION_DETAIL_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_TRIVIA_QUESTION_DETAIL_RESET:
            return {
                loading: false,
                isDeleted: false
            }

        case DELETE_TRIVIA_QUESTION_DETAIL_FAIL:
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

export const detailTriviaQuestionDetailReducer = (state = { trivia_question_detail: {} }, action) => {
    switch (action.type) {
        case DETAIL_TRIVIA_QUESTION_DETAIL_REQUEST:
            return {
                loading: true
            }

        case DETAIL_TRIVIA_QUESTION_DETAIL_SUCCESS:
            return {
                loading: false,
                trivia_question_detail: action.payload.data
            }

        case DETAIL_TRIVIA_QUESTION_DETAIL_FAIL:
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

export const updateTriviaQuestionDetailReducer = (state = { trivia_question_detail: {} }, action) => {
    switch (action.type) {
        case UPDATE_TRIVIA_QUESTION_DETAIL_REQUEST:
            return {
                loading: true
            }

        case UPDATE_TRIVIA_QUESTION_DETAIL_SUCCESS:
            return {
                loading: false,
                success: action.payload.message,
                trivia_question_detail: action.payload.data
            }

        case UPDATE_TRIVIA_QUESTION_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case UPDATE_TRIVIA_QUESTION_DETAIL_RESET:
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

export const importFileTriviaQuestionDetailReducer = (state = { trivia_question_file: {} }, action) => {
    switch (action.type) {
        case IMPORT_FILE_TRIVIA_QUESTION_DETAIL_REQUEST:
            return {
                loading: true
            }

        case IMPORT_FILE_TRIVIA_QUESTION_DETAIL_SUCCESS:
            return {
                loading: false,
                success: action.payload.message,
                trivia_question_file: action.payload.data
            }

        case IMPORT_FILE_TRIVIA_QUESTION_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case IMPORT_FILE_TRIVIA_QUESTION_DETAIL_RESET:
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

export const importImagesTriviaQuestionDetailReducer = (state = { trivia_question_images: {} }, action) => {
    switch (action.type) {
        case IMPORT_IMAGES_TRIVIA_QUESTION_DETAIL_REQUEST:
            return {
                loading: true
            }

        case IMPORT_IMAGES_TRIVIA_QUESTION_DETAIL_SUCCESS:
            return {
                loading: false,
                success: action.payload.message,
                trivia_question_images: action.payload.data
            }

        case IMPORT_IMAGES_TRIVIA_QUESTION_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case IMPORT_IMAGES_TRIVIA_QUESTION_DETAIL_RESET:
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