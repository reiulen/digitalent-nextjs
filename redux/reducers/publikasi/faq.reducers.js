import {
    FAQ_REQUEST,
    FAQ_SUCCESS,
    FAQ_FAIL,

    NEW_FAQ_REQUEST,
    NEW_FAQ_SUCCESS,
    NEW_FAQ_RESET,
    NEW_FAQ_FAIL,

    CLEAR_ERRORS,
} from '../../types/publikasi/faq.type'

export const allFaqReducer = (state = { faq: [] }, action) => {
    switch (action.type) {
        case FAQ_REQUEST:
            return {
                loading: true
            }

        case FAQ_SUCCESS:
            return {
                loading: false,
                faq: action.payload.data
            }

        case FAQ_FAIL:
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

export const newFaqReducer = (state = { faq: {} }, action) => {
    switch (action.type) {
        case NEW_FAQ_REQUEST:
            return {
                loading: true
            }

        case NEW_FAQ_SUCCESS:
            return {
                loading: false,
                success: action.payload.message,
                faq: action.payload.data
            }

        case NEW_FAQ_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case NEW_FAQ_RESET:
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