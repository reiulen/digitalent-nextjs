import {
    FAQ_REQUEST,
    FAQ_SUCCESS,
    FAQ_FAIL,

    PAGINATION_FAQ_REQUEST,
    PAGINATION_FAQ_SUCCESS,
    PAGINATION_FAQ_FAIL,

    NEW_FAQ_REQUEST,
    NEW_FAQ_SUCCESS,
    NEW_FAQ_RESET,
    NEW_FAQ_FAIL,

    DELETE_FAQ_REQUEST,
    DELETE_FAQ_SUCCESS,
    DELETE_FAQ_RESET,
    DELETE_FAQ_FAIL,

    DETAIL_FAQ_REQUEST,
    DETAIL_FAQ_SUCCESS,
    DETAIL_FAQ_FAIL,

    UPDATE_FAQ_REQUEST,
    UPDATE_FAQ_SUCCESS,
    UPDATE_FAQ_FAIL,
    UPDATE_FAQ_RESET,

    UPDATE_PIN_FAQ_REQUEST,
    UPDATE_PIN_FAQ_SUCCESS,
    UPDATE_PIN_FAQ_RESET,
    UPDATE_PIN_FAQ_FAIL,

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

export const paginationFaqReducer = (state = { paginateFaq: [] }, action) => {
    switch (action.type) {
        case PAGINATION_FAQ_REQUEST:
            return {
                loading: true
            }

        case PAGINATION_FAQ_SUCCESS:
            return {
                loading: false,
                faq: action.payload.data
            }

        case PAGINATION_FAQ_FAIL:
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

export const deleteFaqReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_FAQ_REQUEST:
            return {
                loading: true
            }

        case DELETE_FAQ_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_FAQ_RESET:
            return {
                loading: false,
                isDeleted: false
            }

        case DELETE_FAQ_FAIL:
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

export const detailFaqReducer = (state = { faq: {} }, action) => {
    switch (action.type) {
        case DETAIL_FAQ_SUCCESS:
            return {
                faq: action.payload
            }

        case DETAIL_FAQ_FAIL:
            return {
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

export const updateFaqReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_FAQ_REQUEST:
            return {
                loading: true
            }

        case UPDATE_FAQ_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload,
                success: true
            }

        case UPDATE_FAQ_RESET:
            return {
                loading: false,
                isUpdated: false,
                success: false
            }

        case UPDATE_FAQ_FAIL:
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

export const updatePinFaqReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_PIN_FAQ_REQUEST:
            return {
                loading: true
            }

        case UPDATE_PIN_FAQ_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload,
                success: true
            }

        case UPDATE_PIN_FAQ_RESET:
            return {
                loading: false,
                isUpdated: false,
                success: false
            }

        case UPDATE_PIN_FAQ_FAIL:
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