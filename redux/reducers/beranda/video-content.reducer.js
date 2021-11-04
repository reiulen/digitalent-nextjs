import {
    VIDEO_REQUEST,
    VIDEO_SUCCESS,
    VIDEO_FAIL,
    TAG_REQUEST,
    TAG_SUCCESS,
    TAG_FAIL,
    PLAY_REQUEST,
    PLAY_SUCCESS,
    PLAY_FAIL,
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

export const allTagReducer = (state = { dataTag: [] }, action) => {
    switch (action.type) {
        case TAG_REQUEST:
            return {
                loading: true
            }

        case TAG_SUCCESS:
            return {
                // ...state,
                loading: false,
                dataTag: action.payload.data
            }

        case TAG_FAIL:
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

export const playVideoContentReducer = (state = {}, action) => {
    switch (action.type) {
        case PLAY_REQUEST:
            return {
                loading: true
            }

        case PLAY_SUCCESS:
            return {
                loading: false,
                isPlayed: action.payload,
                success: true
            }

        case PLAY_FAIL:
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