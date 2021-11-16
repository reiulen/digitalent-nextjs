import {
    KATEGORI_VIDEO_CONTENT_REQUEST,
    KATEGORI_VIDEO_CONTENT_SUCCESS,
    KATEGORI_VIDEO_CONTENT_FAIL,
    CLEAR_ERRORS
} from "../../types/publikasi/kategori.type"

export const kategoriVideoContentReducer = (state = { kategori: [] }, action) => {
    switch (action.type) {
        case KATEGORI_VIDEO_CONTENT_REQUEST:
            return {
                loading: true
            }

        case KATEGORI_VIDEO_CONTENT_SUCCESS:
            let result = []

            for (let i = 0; i < action.payload.data.kategori.length; i++) {
                if (action.payload.data.kategori[i].jenis_kategori == "Video") {
                    result.push(action.payload.data.kategori[i])
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