import {
    NEW_SUBTANCE_QUESTION_DETAIL_REQUEST,
    NEW_SUBTANCE_QUESTION_DETAIL_SUCCESS,
    NEW_SUBTANCE_QUESTION_DETAIL_RESET,
    NEW_SUBTANCE_QUESTION_DETAIL_FAIL,

    IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_REQUEST,
    IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_SUCCESS,
    IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_RESET,
    IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_FAIL,

    IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_REQUEST,
    IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_SUCCESS,
    IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_RESET,
    IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_FAIL,

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

export const importFileSubtanceQuestionDetailReducer = (state = { subtance_question_file: {} }, action) => {
    switch (action.type) {
        case IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_REQUEST:
            return {
                loading: true
            }

        case IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_SUCCESS:
            return {
                loading: false,
                success: action.payload.message,
                subtance_question_file: action.payload.data
            }

        case IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_RESET:
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

export const importImagesSubtanceQuestionDetailReducer = (state = { subtance_question_images: {} }, action) => {
    switch (action.type) {
        case IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_REQUEST:
            return {
                loading: true
            }

        case IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_SUCCESS:
            return {
                loading: false,
                success: action.payload.message,
                subtance_question_images: action.payload.data
            }

        case IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_RESET:
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