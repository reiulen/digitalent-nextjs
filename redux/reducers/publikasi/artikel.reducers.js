import {
    ARTIKEL_REQUEST,
    ARTIKEL_SUCCESS,
    ARTIKEL_FAIL,

    NEW_ARTIKEL_REQUEST,
    NEW_ARTIKEL_SUCCESS,
    NEW_ARTIKEL_RESET,
    NEW_ARTIKEL_FAIL,

    DELETE_ARTIKEL_REQUEST,
    DELETE_ARTIKEL_SUCCESS,
    DELETE_ARTIKEL_RESET,
    DELETE_ARTIKEL_FAIL,

    CLEAR_ERRORS,
} from '../../types/publikasi/artikel.type'

export const allArtikelReducer = (state = { artikel: [] }, action) => {
    switch (action.type) {
        case ARTIKEL_REQUEST:
            return {
                loading: true
            }

        case ARTIKEL_SUCCESS:
            return {
                loading: false,
                artikel: action.payload.data
            }

        case ARTIKEL_FAIL:
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

export const newArtikelReducer = (state = { artikel: {} }, action) => {
    switch (action.type) {
        case NEW_ARTIKEL_REQUEST:
            return {
                loading: true
            }

        case NEW_ARTIKEL_SUCCESS:
            return {
                loading: false,
                success: action.payload.message,
                artikel: action.payload.data
            }

        case NEW_ARTIKEL_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case NEW_ARTIKEL_RESET:
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

export const deleteArtikelReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_ARTIKEL_REQUEST:
            return {
                loading: true
            }

        case DELETE_ARTIKEL_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_ARTIKEL_RESET:
            return {
                loading: false,
                isDeleted: false
            }

        case DELETE_ARTIKEL_FAIL:
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