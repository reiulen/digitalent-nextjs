import {
    VIDEO_REQUEST,
    VIDEO_SUCCESS,
    VIDEO_FAIL,

    NEW_VIDEO_REQUEST,
    NEW_VIDEO_SUCCESS,
    NEW_VIDEO_RESET,
    NEW_VIDEO_FAIL,

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