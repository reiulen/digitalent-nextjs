import {
    BERANDA_AKADEMI_REQUEST,
    BERANDA_AKADEMI_SUCCESS,
    BERANDA_AKADEMI_FAIL,

    BERANDA_TEMA_REQUEST,
    BERANDA_TEMA_SUCCESS,
    BERANDA_TEMA_FAIL,

    BERANDA_PELATIHAN_REQUEST,
    BERANDA_PELATIHAN_SUCCESS,
    BERANDA_PELATIHAN_FAIL,

    CLEAR_ERRORS
} from "../../types/beranda/beranda.type"

export const allAkademiReducer = (state = { akademi: [] }, action) => {
    switch (action.type) {
        case BERANDA_AKADEMI_REQUEST:
            return {
                loading: true
            }

        case BERANDA_AKADEMI_SUCCESS:
            return {
                loading: false,
                akademi: action.payload.data
            }

        case BERANDA_AKADEMI_FAIL:
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

export const temaByAkademiReducer = (state = { tema: [] }, action) => {
    switch (action.type) {
        case BERANDA_TEMA_REQUEST:
            return {
                loading: true
            }

        case BERANDA_TEMA_SUCCESS:
            return {
                loading: false,
                tema: action.payload.data
            }

        case BERANDA_TEMA_FAIL:
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

export const pelatihanByTemaReducer = (state = { pelatihan: [] }, action) => {
    switch (action.type) {
        case BERANDA_PELATIHAN_REQUEST:
            return {
                loading: true
            }

        case BERANDA_PELATIHAN_SUCCESS:
            return {
                loading: false,
                pelatihan: action.payload.data
            }

        case BERANDA_PELATIHAN_FAIL:
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