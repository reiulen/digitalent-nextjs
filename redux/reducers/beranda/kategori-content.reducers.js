import {
    KATEGORI_REQUEST,
    KATEGORI_SUCCESS,
    KATEGORI_FAIL,
    CLEAR_ERRORS
} from "../../types/publikasi/kategori.type"

export const allKategoriReducer = (state = { kategori: [] }, action) => {
    switch (action.type) {
        case KATEGORI_REQUEST:
            return {
                loading: true
            }

        case KATEGORI_SUCCESS:
            return {
                loading: false,
                kategori: action.payload.data
            }

        case KATEGORI_FAIL:
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