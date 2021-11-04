import {
    VIDEO_REQUEST,
    VIDEO_SUCCESS,
    VIDEO_FAIL,
    CLEAR_ERRORS
} from "../../types/publikasi/video.type"

export const allVideoReducer = (state = { video: [] }, action) => {
    switch (action.type) {
        case VIDEO_REQUEST:
            return {
                loading: true
            }

        case VIDEO_SUCCESS:
            return {
                // ...state,
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