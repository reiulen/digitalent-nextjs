import {

    SURVEY_QUESTION_DETAIL_REQUEST,
    SURVEY_QUESTION_DETAIL_SUCCESS,
    SURVEY_QUESTION_DETAIL_FAIL,

    NEW_SURVEY_QUESTION_DETAIL_REQUEST,
    NEW_SURVEY_QUESTION_DETAIL_SUCCESS,
    NEW_SURVEY_QUESTION_DETAIL_RESET,
    NEW_SURVEY_QUESTION_DETAIL_FAIL,

    DELETE_SURVEY_QUESTION_DETAIL_REQUEST,
    DELETE_SURVEY_QUESTION_DETAIL_SUCCESS,
    DELETE_SURVEY_QUESTION_DETAIL_RESET,
    DELETE_SURVEY_QUESTION_DETAIL_FAIL,

    DETAIL_SURVEY_QUESTION_DETAIL_REQUEST,
    DETAIL_SURVEY_QUESTION_DETAIL_SUCCESS,
    DETAIL_SURVEY_QUESTION_DETAIL_FAIL,

    UPDATE_SURVEY_QUESTION_DETAIL_REQUEST,
    UPDATE_SURVEY_QUESTION_DETAIL_SUCCESS,
    UPDATE_SURVEY_QUESTION_DETAIL_RESET,
    UPDATE_SURVEY_QUESTION_DETAIL_FAIL,

    IMPORT_FILE_SURVEY_QUESTION_DETAIL_REQUEST,
    IMPORT_FILE_SURVEY_QUESTION_DETAIL_SUCCESS,
    IMPORT_FILE_SURVEY_QUESTION_DETAIL_RESET,
    IMPORT_FILE_SURVEY_QUESTION_DETAIL_FAIL,

    IMPORT_IMAGES_SURVEY_QUESTION_DETAIL_REQUEST,
    IMPORT_IMAGES_SURVEY_QUESTION_DETAIL_SUCCESS,
    IMPORT_IMAGES_SURVEY_QUESTION_DETAIL_RESET,
    IMPORT_IMAGES_SURVEY_QUESTION_DETAIL_FAIL,

    CLEAR_ERRORS,
} from '../../types/subvit/survey-question-detail.type'

export const allSurveyQuestionDetailReducer = (state = { survey_question_detail: [] }, action) => {
    switch (action.type) {
        case SURVEY_QUESTION_DETAIL_REQUEST:
            return {
                loading: true
            }

        case SURVEY_QUESTION_DETAIL_SUCCESS:
            return {
                loading: false,
                survey_question_detail: action.payload.data
            }

        case SURVEY_QUESTION_DETAIL_FAIL:
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


export const newSurveyQuestionDetailReducer = (state = { survey_question_detail: {} }, action) => {
    switch (action.type) {
        case NEW_SURVEY_QUESTION_DETAIL_REQUEST:
            return {
                loading: true
            }

        case NEW_SURVEY_QUESTION_DETAIL_SUCCESS:
            return {
                loading: false,
                success: action.payload.message,
                survey_question_detail: action.payload.data
            }

        case NEW_SURVEY_QUESTION_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case NEW_SURVEY_QUESTION_DETAIL_RESET:
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

export const deleteSurveyQuestionDetailReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_SURVEY_QUESTION_DETAIL_REQUEST:
            return {
                loading: true
            }

        case DELETE_SURVEY_QUESTION_DETAIL_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_SURVEY_QUESTION_DETAIL_RESET:
            return {
                loading: false,
                isDeleted: false
            }

        case DELETE_SURVEY_QUESTION_DETAIL_FAIL:
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

export const detailSurveyQuestionDetailReducer = (state = { survey_question_detail: {} }, action) => {
    switch (action.type) {
        case DETAIL_SURVEY_QUESTION_DETAIL_REQUEST:
            return {
                loading: true
            }

        case DETAIL_SURVEY_QUESTION_DETAIL_SUCCESS:
            return {
                loading: false,
                survey_question_detail: action.payload.data
            }

        case DETAIL_SURVEY_QUESTION_DETAIL_FAIL:
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

export const updateSurveyQuestionDetailReducer = (state = { survey_question_detail: {} }, action) => {
    switch (action.type) {
        case UPDATE_SURVEY_QUESTION_DETAIL_REQUEST:
            return {
                loading: true
            }

        case UPDATE_SURVEY_QUESTION_DETAIL_SUCCESS:
            return {
                loading: false,
                success: action.payload.message,
                survey_question_detail: action.payload.data
            }

        case UPDATE_SURVEY_QUESTION_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case UPDATE_SURVEY_QUESTION_DETAIL_RESET:
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

export const importFileSurveyQuestionDetailReducer = (state = { survey_question_file: {} }, action) => {
    switch (action.type) {
        case IMPORT_FILE_SURVEY_QUESTION_DETAIL_REQUEST:
            return {
                loading: true
            }

        case IMPORT_FILE_SURVEY_QUESTION_DETAIL_SUCCESS:
            return {
                loading: false,
                success: action.payload.message,
                survey_question_file: action.payload.data
            }

        case IMPORT_FILE_SURVEY_QUESTION_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case IMPORT_FILE_SURVEY_QUESTION_DETAIL_RESET:
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

export const importImagesSurveyQuestionDetailReducer = (state = { survey_question_images: {} }, action) => {
    switch (action.type) {
        case IMPORT_IMAGES_SURVEY_QUESTION_DETAIL_REQUEST:
            return {
                loading: true
            }

        case IMPORT_IMAGES_SURVEY_QUESTION_DETAIL_SUCCESS:
            return {
                loading: false,
                success: action.payload.message,
                survey_question_images: action.payload.data
            }

        case IMPORT_IMAGES_SURVEY_QUESTION_DETAIL_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case IMPORT_IMAGES_SURVEY_QUESTION_DETAIL_RESET:
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