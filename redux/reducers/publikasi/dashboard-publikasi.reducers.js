import {
    DASHBOARD_PUBLIKASI_REQUEST,
    DASHBOARD_PUBLIKASI_SUCCESS,
    DASHBOARD_PUBLIKASI_FAIL,

    ROLE_ADMIN_REQUEST,
    ROLE_ADMIN_SUCCESS,
    ROLE_ADMIN_FAIL,

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

export const allRoleAdminPublikasiReducer = (state = { role_publikasi: [] }, action) => {
    switch (action.type) {
        case ROLE_ADMIN_REQUEST:
            return {
                loading: true
            }

        case ROLE_ADMIN_SUCCESS:
            return {
                loading: false,
                role_publikasi: action.payload.data
            }

        case ROLE_ADMIN_FAIL:
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