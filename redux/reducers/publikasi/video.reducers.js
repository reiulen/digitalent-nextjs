import {
    VIDEO_REQUEST,
    VIDEO_SUCCESS,
    VIDEO_FAIL,

    NEW_VIDEO_REQUEST,
    NEW_VIDEO_SUCCESS,
    NEW_VIDEO_RESET,
    NEW_VIDEO_FAIL,

    DETAIL_VIDEO_REQUEST,
    DETAIL_VIDEO_SUCCESS,
    DETAIL_VIDEO_FAIL,

    DELETE_VIDEO_REQUEST,
    DELETE_VIDEO_SUCCESS,
    DELETE_VIDEO_RESET,
    DELETE_VIDEO_FAIL,

    UPDATE_VIDEO_REQUEST,
    UPDATE_VIDEO_SUCCESS,
    UPDATE_VIDEO_RESET,
    UPDATE_VIDEO_FAIL,

    CLEAR_ERRORS,
} from '../../types/publikasi/video.type'

export const allVideoReducer = (state = { video: [] }, action) => {
    switch (action.type) {
        case VIDEO_REQUEST:
            return {
                loading: true
            }

        case VIDEO_SUCCESS:
            return {
                loading: false,
                video: action.payload.data
            }

        case VIDEO_FAIL:
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

export const detailVideoReducer = (state = { video: {} }, action) => {
    switch (action.type) {
        case DETAIL_VIDEO_SUCCESS:
            return {
                video: action.payload
            }

        case DETAIL_VIDEO_FAIL:
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

export const newVideoReducer = (state = { video: {} }, action) => {
    switch (action.type) {
        case NEW_VIDEO_REQUEST:
            return {
                loading: true
            }

        case NEW_VIDEO_SUCCESS:
            return {
                loading: false,
                success: action.payload.message,
                video: action.payload.data
            }

        case NEW_VIDEO_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case NEW_VIDEO_RESET:
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

export const deleteVideoReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_VIDEO_REQUEST:
            return {
                loading: true
            }

        case DELETE_VIDEO_SUCCESS:
            return {
                loading: false,
                isDeleted: action.payload
            }

        case DELETE_VIDEO_RESET:
            return {
                loading: false,
                isDeleted: false
            }

        case DELETE_VIDEO_FAIL:
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

export const updateVideoReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_VIDEO_REQUEST:
            return {
                loading: true
            }
        
        case UPDATE_VIDEO_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload,
                success: true
            }

        case UPDATE_VIDEO_RESET:
            return {
                loading: false,
                isUpdated: false,
                success: false
            }

        case UPDATE_VIDEO_FAIL:
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