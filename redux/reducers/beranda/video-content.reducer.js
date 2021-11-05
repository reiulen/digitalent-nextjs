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
    KATEGORI_VIDEO_CONTENT_REQUEST,
    KATEGORI_VIDEO_CONTENT_SUCCESS,
    KATEGORI_VIDEO_CONTENT_FAIL,
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

export const kategoriVideoContentReducer = (state = { kategori: [] }, action) => {
    switch (action.type) {
        case KATEGORI_VIDEO_CONTENT_REQUEST:
            return {
                loading: true
            }

        case KATEGORI_VIDEO_CONTENT_SUCCESS:
            let result = []

            for (let i = 0; i < action.payload.data.kategori.length; i++){
                if (action.payload.data.kategori[i].jenis_kategori == "Video"){
                    result.push (action.payload.data.kategori[i])
                }
            }

            return {
                loading: false,
                kategori: result
            }
            // return {
            //     // ...state,
            //     loading: false,
            //     dataTag: action.payload.data
            // }

        case KATEGORI_VIDEO_CONTENT_FAIL:
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