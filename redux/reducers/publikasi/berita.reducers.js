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

    DETAIL_BERITA_REQUEST,
    DETAIL_BERITA_SUCCESS,
    DETAIL_BERITA_FAIL,

    UPDATE_BERITA_REQUEST,
    UPDATE_BERITA_SUCCESS,
    UPDATE_BERITA_RESET,
    UPDATE_BERITA_FAIL,

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

export const detailBeritaReducer = (state = {berita: {} }, action) => {
    switch (action.type) {
        case  DETAIL_BERITA_SUCCESS:
            return {
                berita: action.payload
            }

        case DETAIL_BERITA_FAIL: 
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

export const deleteBeritaReducer = (state = {berita: {}}, action) => {
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

export const updateBeritaReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_BERITA_REQUEST:
            return {
                loading: true
            }

        case UPDATE_BERITA_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload,
                success: true
            }

        case UPDATE_BERITA_RESET:
            return {
                loading: false,
                isUpdated: false,
                success: false
            }

        case UPDATE_BERITA_FAIL:
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