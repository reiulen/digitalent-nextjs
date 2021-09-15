import {
    DASHBOARD_PUBLIKASI_REQUEST,
    DASHBOARD_PUBLIKASI_SUCCESS,
    DASHBOARD_PUBLIKASI_FAIL,

    CLEAR_ERRORS
} from '../../types/publikasi/dashboard-publikasi.type'

export const allDashboardPublikasiReducer = (state = { dashboard_publikasi: [] }, action) => {
    switch (action.type) {
        case DASHBOARD_PUBLIKASI_REQUEST:
            return {
                loading: true
            }

        case DASHBOARD_PUBLIKASI_SUCCESS:
            return {
                loading: false,
                dashboard_publikasi: action.payload.data
            }

        case DASHBOARD_PUBLIKASI_FAIL:
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