import {
    ARTIKEL_PESERTA_REQUEST,
    ARTIKEL_PESERTA_SUCCESS,
    ARTIKEL_PESERTA_FAIL,

    NEW_ARTIKEL_PESERTA_REQUEST,
    NEW_ARTIKEL_PESERTA_SUCCESS,
    NEW_ARTIKEL_PESERTA_RESET,
    NEW_ARTIKEL_PESERTA_FAIL,

    DELETE_ARTIKEL_PESERTA_REQUEST,
    DELETE_ARTIKEL_PESERTA_SUCCESS,
    DELETE_ARTIKEL_PESERTA_RESET,
    DELETE_ARTIKEL_PESERTA_FAIL,

    DETAIL_ARTIKEL_PESERTA_REQUEST,
    DETAIL_ARTIKEL_PESERTA_SUCCESS,
    DETAIL_ARTIKEL_PESERTA_FAIL,

    UPDATE_ARTIKEL_PESERTA_REQUEST,
    UPDATE_ARTIKEL_PESERTA_SUCCESS,
    UPDATE_ARTIKEL_PESERTA_RESET,
    UPDATE_ARTIKEL_PESERTA_FAIL,

    CLEAR_ERRORS,
} from '../../types/publikasi/artikel-peserta.type'


export const allArtikelPesertaReducer = (state = { artikel_peserta: [] }, action) => {
    switch (action.type) {
        case ARTIKEL_PESERTA_REQUEST:
            return {
                loading: true
            }

        case ARTIKEL_PESERTA_SUCCESS:
            return {
                loading: false,
                artikel_peserta: action.payload.data
            }

        case ARTIKEL_PESERTA_FAIL:
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

export const newArtikelPesertaReducer = (state = { artikel_peserta: {} }, action) => {
    switch (action.type) {
        case NEW_ARTIKEL_PESERTA_REQUEST:
            return {
                loading: true
            }

        case NEW_ARTIKEL_PESERTA_SUCCESS:
            return {
                loading: false,
                success: action.payload.message,
                artikel_peserta: action.payload.data
            }

        case NEW_ARTIKEL_PESERTA_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case NEW_ARTIKEL_PESERTA_RESET:
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

export const detailArtikelPesertaReducer = (state = { artikel_peserta: {} }, action) => {
    switch (action.type) {
        case DETAIL_ARTIKEL_PESERTA_SUCCESS:
            return {
                artikel_peserta: action.payload
            }

        case DETAIL_ARTIKEL_PESERTA_FAIL:
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

export const deleteArtikelPesertaReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_ARTIKEL_PESERTA_REQUEST:
            return {
                loading: true
            }

        case DELETE_ARTIKEL_PESERTA_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_ARTIKEL_PESERTA_RESET:
            return {
                loading: false,
                isDeleted: false
            }

        case DELETE_ARTIKEL_PESERTA_FAIL:
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

export const updateArtikelPesertaReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_ARTIKEL_PESERTA_REQUEST:
            return {
                loading: true
            }
        
        case UPDATE_ARTIKEL_PESERTA_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload,
                success: true
            }

        case UPDATE_ARTIKEL_PESERTA_RESET:
            return {
                loading: false,
                isUpdated: false,
                success: false
            }

        case UPDATE_ARTIKEL_PESERTA_FAIL:
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