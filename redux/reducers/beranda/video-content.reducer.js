// import {
//     VIDEO_REQUEST,
//     VIDEO_SUCCESS,
//     VIDEO_FAIL,
//     TAG_REQUEST,
//     TAG_SUCCESS,
//     TAG_FAIL,
//     PLAY_REQUEST,
//     PLAY_SUCCESS,
//     PLAY_FAIL,
//     KATEGORI_VIDEO_CONTENT_REQUEST,
//     KATEGORI_VIDEO_CONTENT_SUCCESS,
//     KATEGORI_VIDEO_CONTENT_FAIL,
//     CLEAR_ERRORS
// } from "../../types/publikasi/video.type"

import {
    BERANDA_VIDEO_REQUEST,
    BERANDA_VIDEO_SUCCESS,
    BERANDA_VIDEO_FAIL,

    KATEGORI_BERANDA_VIDEO_REQUEST,
    KATEGORI_BERANDA_VIDEO_SUCCESS,
    KATEGORI_BERANDA_VIDEO_FAIL,

    TAG_BERANDA_VIDEO_REQUEST,
    TAG_BERANDA_VIDEO_SUCCESS,
    TAG_BERANDA_VIDEO_FAIL,

    PLAY_BERANDA_VIDEO_REQUEST,
    PLAY_BERANDA_VIDEO_SUCCESS,
    PLAY_BERANDA_VIDEO_FAIL,

    CLEAR_ERRORS
} from "../../types/beranda/video-content.type"

export const allVideoContentReducer = (state = { video: [] }, action) => {
    switch (action.type) {
        case BERANDA_VIDEO_REQUEST:
            return {
                loading: true
            }

        case BERANDA_VIDEO_SUCCESS:
            return {
                loading: false,
                video: action.payload.data
            }

        case BERANDA_VIDEO_FAIL:
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
        case KATEGORI_BERANDA_VIDEO_REQUEST:
            return {
                loading: true
            }

        case KATEGORI_BERANDA_VIDEO_SUCCESS:
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

        case KATEGORI_BERANDA_VIDEO_FAIL:
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

export const allTagVideoContentReducer = (state = { dataTag: [] }, action) => {
    switch (action.type) {
        case TAG_BERANDA_VIDEO_REQUEST:
            return {
                loading: true
            }

        case TAG_BERANDA_VIDEO_SUCCESS:
            return {
                loading: false,
                dataTag: action.payload.data
            }

        case TAG_BERANDA_VIDEO_FAIL:
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
        case PLAY_BERANDA_VIDEO_REQUEST:
            return {
                loading: true
            }

        case PLAY_BERANDA_VIDEO_SUCCESS:
            return {
                loading: false,
                isPlayed: action.payload,
                success: true
            }

        case PLAY_BERANDA_VIDEO_FAIL:
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