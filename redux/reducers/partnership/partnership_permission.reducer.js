import {
    FETCH_PARTNERSHIP_PERMISSION_REQUEST,
    FETCH_PARTNERSHIP_PERMISSION_SUCCESS,
    FETCH_PARTNERSHIP_PERMISSION_FAIL,

    CLEAR_ERRORS,

} from "../../types/partnership/partnership_permission.type"

export const partnershipPermissionsReducer = ( state = { permission: {} }, action ) => {
    switch (action.type) {
        case FETCH_PARTNERSHIP_PERMISSION_REQUEST:
            return {
                loading: true,
            }

        case FETCH_PARTNERSHIP_PERMISSION_SUCCESS:
            return {
                loading: false,
                permission: action.payload.data,
            };

        case FETCH_PARTNERSHIP_PERMISSION_FAIL:
            return {
                loading: false,
                error: action.payload,
            };

        case CLEAR_ERRORS:
            return {
                error: null,
            };
        
        default:
            return state;
    }
}