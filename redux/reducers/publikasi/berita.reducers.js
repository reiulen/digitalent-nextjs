import {
    BERITA_REQUEST,
    BERITA_SUCCESS,
    BERITA_FAIL,

    NEW_BERITA_REQUEST,
    NEW_BERITA_SUCCESS,
    NEW_BERITA_RESET,
    NEW_BERITA_FAIL,

    DELETE_BERITA_REQUEST,
    DELETE_BERITA_SUCCESS,
    DELETE_BERITA_RESET,
    DELETE_BERITA_FAIL,

    CLEAR_ERRORS,
} from '../../types/publikasi/berita.type'

export const allBeritaReducer = (state = { berita: [] }, action) => {
    switch (action.type) {
        case BERITA_REQUEST:
            return {
                loading: true
            }

        case BERITA_SUCCESS:
            return {
                loading: false,
                berita: action.payload.data
            }

        case BERITA_FAIL:
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

export const newBeritaReducer = (state = { berita: {} }, action) => {
    switch (action.type) {
        case NEW_BERITA_REQUEST:
            return {
                loading: true
            }

        case NEW_BERITA_SUCCESS:
            return {
                loading: false,
                success: action.payload.message,
                berita: action.payload.data
            }

        case NEW_BERITA_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case NEW_BERITA_RESET:
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

export const deleteBeritaReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_BERITA_REQUEST:
            return {
                loading: true
            }

        case DELETE_BERITA_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_BERITA_RESET:
            return {
                loading: false,
                isDeleted: false
            }

        case DELETE_BERITA_FAIL:
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