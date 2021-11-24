import {
    BERANDA_FAQ_REQUEST,
    BERANDA_FAQ_SUCCESS,
    BERANDA_FAQ_FAIL,

    KATEGORI_BERANDA_FAQ_REQUEST,
    KATEGORI_BERANDA_FAQ_SUCCESS,
    KATEGORI_BERANDA_FAQ_FAIL,

    CLEAR_ERRORS
} from "../../types/beranda/faq-content.type"

export const allFaqContentReducer = (state = { data: {} }, action) => {
    switch (action.type) {
        case BERANDA_FAQ_REQUEST:
            return {
                loading: true
            }

        case BERANDA_FAQ_SUCCESS:
            return {
                loading: false,
                faq: action.payload.data
            }

        case BERANDA_FAQ_FAIL:
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

export const kategoriBerandaFaqReducer = (state = {kategori: [] }, action) => {
    switch (action.type) {
        case KATEGORI_BERANDA_FAQ_REQUEST:
            return {
                loading: true
            }

        case KATEGORI_BERANDA_FAQ_SUCCESS:
            let result = []

            for (let i = 0; i < action.payload.data.kategori.length; i++){
                if (action.payload.data.kategori[i].jenis_kategori == "Faq"){
                    result.push (action.payload.data.kategori[i])
                }
            }

            return {
                loading: false,
                kategori: result
            }

        case KATEGORI_BERANDA_FAQ_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case CLEAR_ERRORS:
            return {
                error: null,
            };
        
        default:
            return state;
    }
}