import {
    MITRA_REQUEST,
    MITRA_SUCCESS,
    MITRA_FAIL,

    CLEAR_ERRORS,
} from '../../types/partnership/manajemen-kerjasama.type'

export const allMitraReducer = (state = { mitra: [] }, action) => {
    switch (action.type) {
        case MITRA_REQUEST:
            return {
                loading: true
            }

        case MITRA_SUCCESS:
            return {
                loading: false,
                mitra: action.payload.data
            }

        case MITRA_FAIL:
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