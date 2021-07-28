import {
    KATEGORI_REQUEST,
    KATEGORI_SUCCESS,
    KATEGORI_FAIL,

    NEW_KATEGORI_REQUEST,
    NEW_KATEGORI_SUCCESS,
    NEW_KATEGORI_RESET,
    NEW_KATEGORI_FAIL,

    CLEAR_ERRORS,
} from '../../types/publikasi/kategori.type'

export const allKategoriReducer = (state = { kategori: [] }, action) => {
    switch (action.type) {
        case KATEGORI_REQUEST:
            return {
                loading: true
            }

        case KATEGORI_SUCCESS:
            return {
                loading: false,
                kategori: action.payload.data
            }

        case KATEGORI_FAIL:
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

export const newKategoriReducer = (state = { kategori: {} }, action) => {
    switch (action.type) {
        case NEW_KATEGORI_REQUEST:
            return {
                loading: true
            }

        case NEW_KATEGORI_SUCCESS:
            return {
                loading: false,
                success: action.payload.message,
                kategori: action.payload.data
            }

        case NEW_KATEGORI_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case NEW_KATEGORI_RESET:
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