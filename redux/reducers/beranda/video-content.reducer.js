
import {
    BERANDA_VIDEO_REQUEST,
    BERANDA_VIDEO_SUCCESS,
    BERANDA_VIDEO_FAIL,

    DETAIL_BERANDA_VIDEO_REQUEST,
    DETAIL_BERANDA_VIDEO_SUCCESS,
    DETAIL_BERANDA_VIDEO_FAIL,

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

import moment from "moment";

export const allVideoContentReducer = (state = { video: [] }, action) => {
    switch (action.type) {
        case BERANDA_VIDEO_REQUEST:
            return {
                loading: true
            }

        case BERANDA_VIDEO_SUCCESS:
            // let today = new Date
            // let momentToday = moment(today).format ("YYYY-MM-DD")

            // let arr = action.payload.data.video
            // let result = {
            //     video : [],
            //     total: 0,
            //     perPage: action.payload.data.perPage,
            //     totalFiltered: action.payload.data.totalFiltered
            // }

            // if (action.payload.data.video){
            //     for (let i = 0; i < arr.length; i++){
            //         if (arr[i].tanggal_publish <= momentToday){
            //             result.video.push (arr[i])
            //             result.total ++
            //         }
            //     }
            // }

            return {
                loading: false,
                video: action.payload.data
                // video: result
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

export const detailBerandaVideoReducer = (state = {detail: {} }, action) => {
    switch (action.type) {
        case DETAIL_BERANDA_VIDEO_REQUEST:
            return {
                loading: true
            }

        case DETAIL_BERANDA_VIDEO_SUCCESS:
            return {
                detail: action.payload,
                loading: false,
            }

        case DETAIL_BERANDA_VIDEO_FAIL:
            return {
                error: action.payload,
                loading: false,
            }

        case CLEAR_ERRORS:
            return {
                error: null,
            };
        
        default:
            return state;
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