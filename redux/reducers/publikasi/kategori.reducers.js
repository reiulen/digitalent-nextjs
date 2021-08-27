import {
    KATEGORI_REQUEST,
    KATEGORI_SUCCESS,
    KATEGORI_FAIL,

    PAGINATION_KATEGORI_REQUEST,
    PAGINATION_KATEGORI_SUCCESS,
    PAGINATION_KATEGORI_FAIL,

    NEW_KATEGORI_REQUEST,
    NEW_KATEGORI_SUCCESS,
    NEW_KATEGORI_RESET,
    NEW_KATEGORI_FAIL,

    DELETE_KATEGORI_REQUEST,
    DELETE_KATEGORI_SUCCESS,
    DELETE_KATEGORI_RESET,
    DELETE_KATEGORI_FAIL,

    DETAIL_KATEGORI_REQUEST,
    DETAIL_KATEGORI_SUCCESS,
    DETAIL_KATEGORI_FAIL,

    UPDATE_KATEGORI_REQUEST,
    UPDATE_KATEGORI_SUCCESS,
    UPDATE_KATEGORI_FAIL,
    UPDATE_KATEGORI_RESET,

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

export const paginationKategoriReducer = (state = { paginateKategori: [] }, action) => {
    switch (action.type) {
        case PAGINATION_KATEGORI_REQUEST:
            return {
                loading: true
            }

        case PAGINATION_KATEGORI_SUCCESS:
            return {
                loading: false,
                paginateKategori: action.payload.data
            }

        case PAGINATION_KATEGORI_FAIL:
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

export const deleteKategoriReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_KATEGORI_REQUEST:
            return {
                loading: true
            }

        case DELETE_KATEGORI_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_KATEGORI_RESET:
            return {
                loading: false,
                isDeleted: false
            }

        case DELETE_KATEGORI_FAIL:
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

export const detailKategoriReducer = (state = { kategori: {} }, action) => {
    switch (action.type) {
        case DETAIL_KATEGORI_SUCCESS:
            return {
                kategori: action.payload
            }

        case DETAIL_KATEGORI_FAIL:
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

export const updateKategoriReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_KATEGORI_REQUEST:
            return {
                loading: true
            }

        case UPDATE_KATEGORI_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload,
                success: true
            }

        case UPDATE_KATEGORI_RESET:
            return {
                loading: false,
                isUpdated: false,
                success: false
            }

        case UPDATE_KATEGORI_FAIL:
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