import {
    SETTING_REQUEST,
    SETTING_SUCCESS,
    SETTING_FAIL,

    UPDATE_SETTING_REQUEST,
    UPDATE_SETTING_SUCCESS,
    UPDATE_SETTING_RESET,
    UPDATE_SETTING_FAIL,

    CLEAR_ERRORS
} from "../../types/publikasi/setting.type"

export const allSettingPublikasiReducer = (state = { setting: [] }, action) => {
    switch (action.type) {
        case SETTING_REQUEST:
            return {
                loading: true
            }

        case SETTING_SUCCESS:
            return {
                loading: false,
                setting: action.payload.data
            }

        case SETTING_FAIL:
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

export const updateSettingPublikasiReducer = (state = {}, action) => {
    switch (action.type) {
        case UPDATE_SETTING_REQUEST:
            return {
                loading: true
            }
        
        case UPDATE_SETTING_SUCCESS:
            return {
                loading: false,
                isUpdated: action.payload,
                success: true
            }

        case UPDATE_SETTING_RESET:
            return {
                loading: false,
                isUpdated: false,
                success: false
            }

        case UPDATE_SETTING_FAIL:
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