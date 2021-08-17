import {
    GALERI_REQUEST,
    GALERI_SUCCESS,
    GALERI_FAIL,

    NEW_GALERI_REQUEST,
    NEW_GALERI_SUCCESS,
    NEW_GALERI_RESET,
    NEW_GALERI_FAIL,

    DELETE_GALERI_REQUEST,
    DELETE_GALERI_SUCCESS,
    DELETE_GALERI_RESET,
    DELETE_GALERI_FAIL,

    DETAIL_GALERI_REQUEST,
    DETAIL_GALERI_SUCCESS,
    DETAIL_GALERI_FAIL,

    UPDATE_GALERI_REQUEST,
    UPDATE_GALERI_SUCCESS,
    UPDATE_GALERI_RESET,
    UPDATE_GALERI_FAIL,

    CLEAR_ERRORS,
} from '../../types/publikasi/galeri.type'

export const allGaleriReducer = (state = { galeri: [] }, action) => {
    switch (action.type) {
        case GALERI_REQUEST:
            return {
                loading: true
            }

        case GALERI_SUCCESS:
            return {
                loading: false,
                galeri: action.payload.data
            }

        case GALERI_FAIL:
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

export const newGaleriReducer = (state = { galeri: {} }, action) => {
    switch (action.type) {
        case NEW_GALERI_REQUEST:
            return {
                loading: true
            }

        case NEW_GALERI_SUCCESS:
            return {
                loading: false,
                success: action.payload.message,
                galeri: action.payload.data
            }

        case NEW_GALERI_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case NEW_GALERI_RESET:
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

export const detailGaleriReducer = (state = { galeri: {} }, action) => {
    switch (action.type) {
        case DETAIL_GALERI_SUCCESS:
            return {
                galeri: action.payload
            }

        case DETAIL_GALERI_FAIL:
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

export const deleteGaleriReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_GALERI_REQUEST:
            return {
                loading: true
            }

        case DELETE_GALERI_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_GALERI_RESET:
            return {
                loading: false,
                isDeleted: false
            }

        case DELETE_GALERI_FAIL:
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

export const updateGaleriReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_GALERI_REQUEST:
            return {
                loading: true
            }
        
        case UPDATE_GALERI_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload,
                success: true
            }

        case UPDATE_GALERI_RESET:
            return {
                loading: false,
                isUpdated: false,
                success: false
            }

        case UPDATE_GALERI_FAIL:
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