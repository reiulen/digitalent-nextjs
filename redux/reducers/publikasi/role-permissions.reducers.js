import {
    ROLE_PERMISSION_REQUEST,
    ROLE_PERMISSION_SUCCESS,
    ROLE_PERMISSION_FAIL,

    CLEAR_ERRORS
} from '../../types/publikasi/role-permissions.type'

export const allRolePermissionReducer = (state = { role_permission: [] }, action) => {
    switch (action.type) {
        case ROLE_PERMISSION_REQUEST:
            return {
                loading: true
            }

        case ROLE_PERMISSION_SUCCESS:
            return {
                loading: false,
                role_permission: action.payload.data
            }

        case ROLE_PERMISSION_FAIL:
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