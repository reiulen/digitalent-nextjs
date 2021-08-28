import {
    SURVEY_QUESTION_BANKS_REQUEST,
    SURVEY_QUESTION_BANKS_SUCCESS,
    SURVEY_QUESTION_BANKS_FAIL,

    NEW_SURVEY_QUESTION_BANKS_REQUEST,
    NEW_SURVEY_QUESTION_BANKS_SUCCESS,
    NEW_SURVEY_QUESTION_BANKS_RESET,
    NEW_SURVEY_QUESTION_BANKS_FAIL,

    UPDATE_SURVEY_QUESTION_BANKS_REQUEST,
    UPDATE_SURVEY_QUESTION_BANKS_SUCCESS,
    UPDATE_SURVEY_QUESTION_BANKS_RESET,
    UPDATE_SURVEY_QUESTION_BANKS_FAIL,

    DELETE_SURVEY_QUESTION_BANKS_REQUEST,
    DELETE_SURVEY_QUESTION_BANKS_SUCCESS,
    DELETE_SURVEY_QUESTION_BANKS_RESET,
    DELETE_SURVEY_QUESTION_BANKS_FAIL,

    DETAIL_SURVEY_QUESTION_BANKS_REQUEST,
    DETAIL_SURVEY_QUESTION_BANKS_SUCCESS,
    DETAIL_SURVEY_QUESTION_BANKS_FAIL,

    DETAIL_ONE_SURVEY_QUESTION_BANKS_REQUEST,
    DETAIL_ONE_SURVEY_QUESTION_BANKS_SUCCESS,
    DETAIL_ONE_SURVEY_QUESTION_BANKS_FAIL,

    UPDATE_SURVEY_QUESTION_BANKS_PUBLISH_REQUEST,
    UPDATE_SURVEY_QUESTION_BANKS_PUBLISH_SUCCESS,
    UPDATE_SURVEY_QUESTION_BANKS_PUBLISH_RESET,
    UPDATE_SURVEY_QUESTION_BANKS_PUBLISH_FAIL,

    REPORT_SURVEY_QUESTION_BANKS_REQUEST,
    REPORT_SURVEY_QUESTION_BANKS_SUCCESS,
    REPORT_SURVEY_QUESTION_BANKS_FAIL,

    CLEAR_ERRORS,
} from '../../types/subvit/survey-question.type'

export const allSurveyQuestionBanksReducer = (state = { survey: [] }, action) => {
    switch (action.type) {
        case SURVEY_QUESTION_BANKS_REQUEST:
            return {
                loading: true
            }

        case SURVEY_QUESTION_BANKS_SUCCESS:
            return {
                loading: false,
                survey: action.payload.data
            }

        case SURVEY_QUESTION_BANKS_FAIL:
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

export const newSurveyQuestionBanksReducer = (state = { survey: {} }, action) => {
    switch (action.type) {
        case NEW_SURVEY_QUESTION_BANKS_REQUEST:
            return {
                loading: true
            }

        case NEW_SURVEY_QUESTION_BANKS_SUCCESS:
            return {
                loading: false,
                success: action.payload.message,
                survey: action.payload.data
            }

        case NEW_SURVEY_QUESTION_BANKS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case NEW_SURVEY_QUESTION_BANKS_RESET:
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

export const detailSurveyQuestionBanksReducer = (state = { survey: {} }, action) => {
    switch (action.type) {
        case DETAIL_SURVEY_QUESTION_BANKS_REQUEST:
        case DETAIL_ONE_SURVEY_QUESTION_BANKS_REQUEST:
            return {
                loading: true
            }

        case DETAIL_SURVEY_QUESTION_BANKS_SUCCESS:
        case DETAIL_ONE_SURVEY_QUESTION_BANKS_SUCCESS:
            return {
                loading: false,
                survey: action.payload
            }

        case DETAIL_SURVEY_QUESTION_BANKS_FAIL:
        case DETAIL_ONE_SURVEY_QUESTION_BANKS_FAIL:
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

export const updateSurveyQuestionReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_SURVEY_QUESTION_BANKS_REQUEST:
            return {
                loading: true
            }

        case UPDATE_SURVEY_QUESTION_BANKS_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload
            }

        case UPDATE_SURVEY_QUESTION_BANKS_RESET:
            return {
                loading: false,
                isUpdated: false
            }

        case UPDATE_SURVEY_QUESTION_BANKS_FAIL:
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

export const deleteSurveyQuestionBanksReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_SURVEY_QUESTION_BANKS_REQUEST:
            return {
                loading: true
            }

        case DELETE_SURVEY_QUESTION_BANKS_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_SURVEY_QUESTION_BANKS_RESET:
            return {
                loading: false,
                isDeleted: false
            }

        case DELETE_SURVEY_QUESTION_BANKS_FAIL:
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
export const updateSurveyQuestionBanksPublishReducer = (state = { survey: {} }, action) => {
    switch (action.type) {
        case UPDATE_SURVEY_QUESTION_BANKS_PUBLISH_REQUEST:
            return {
                loading: true
            }

        case UPDATE_SURVEY_QUESTION_BANKS_PUBLISH_SUCCESS:
            return {
                loading: false,
                success: action.payload.message,
                survey: action.payload.data
            }

        case UPDATE_SURVEY_QUESTION_BANKS_PUBLISH_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case UPDATE_SURVEY_QUESTION_BANKS_PUBLISH_RESET:
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

export const allReportSurveyQuestionBanksReducer = (state = { survey: [] }, action) => {
    switch (action.type) {
        case REPORT_SURVEY_QUESTION_BANKS_REQUEST:
            return {
                loading: true
            }

        case REPORT_SURVEY_QUESTION_BANKS_SUCCESS:
            return {
                loading: false,
                survey: action.payload.data
            }

        case REPORT_SURVEY_QUESTION_BANKS_FAIL:
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