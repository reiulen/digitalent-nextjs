import {
    FAQ_REQUEST,
    FAQ_SUCCESS,
    FAQ_FAIL,
    CLEAR_ERRORS
} from "../../types/publikasi/faq.type"

export const allFaqReducer = (state = { faq: [] }, action) => {
    switch (action.type) {
        case FAQ_REQUEST:
            return {
                loading: true
            }

        case FAQ_SUCCESS:
            return {
                loading: false,
                faq: action.payload.data
            }

        case FAQ_FAIL:
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