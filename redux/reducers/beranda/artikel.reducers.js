import {
    BERANDA_ARTIKEL_REQUEST,
    BERANDA_ARTIKEL_SUCCESS,
    BERANDA_ARTIKEL_FAIL,

    DETAIL_BERANDA_ARTIKEL_REQUEST,
    DETAIL_BERANDA_ARTIKEL_SUCCESS,
    DETAIL_BERANDA_ARTIKEL_FAIL,

    KATEGORI_BERANDA_ARTIKEL_REQUEST,
    KATEGORI_BERANDA_ARTIKEL_SUCCESS,
    KATEGORI_BERANDA_ARTIKEL_FAIL,

    TAG_BERANDA_ARTIKEL_REQUEST,
    TAG_BERANDA_ARTIKEL_SUCCESS,
    TAG_BERANDA_ARTIKEL_FAIL,

    CLEAR_ERRORS
} from "../../types/beranda/artikel.type"

export const allBerandaArtikelReducer = (state = { artikel: [] }, action) => {
    switch (action.type) {
        case BERANDA_ARTIKEL_REQUEST:
            return {
                loading: true
            }

        case BERANDA_ARTIKEL_SUCCESS:
            return {
                loading: false,
                artikel: action.payload.data
            }

        case BERANDA_ARTIKEL_FAIL:
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

export const detailBerandaArtikelReducer = (state = {detail: {} }, action) => {
    switch (action.type) {
        case DETAIL_BERANDA_ARTIKEL_SUCCESS:
            return {
                detail: action.payload,
            }

        case DETAIL_BERANDA_ARTIKEL_FAIL:
            return {
                error: action.payload,
            }

        case CLEAR_ERRORS:
            return {
                error: null,
            };
        
        default:
            return state;
    }
}

export const kategoriBerandaArtikelReducer = (state = {kategori: [] }, action) => {
    switch (action.type) {
        case KATEGORI_BERANDA_ARTIKEL_REQUEST:
            return {
                loading: true
            }

        case KATEGORI_BERANDA_ARTIKEL_SUCCESS:
            let result = []

            for (let i = 0; i < action.payload.data.kategori.length; i++){
                if (action.payload.data.kategori[i].jenis_kategori == "Artikel"){
                    result.push (action.payload.data.kategori[i])
                }
            }

            return {
                loading: false,
                kategori: result
            }

        case KATEGORI_BERANDA_ARTIKEL_FAIL:
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

export const allTagBerandaArtikelReducer = (state = { tags: [] }, action) => {
    switch (action.type) {
        case TAG_BERANDA_ARTIKEL_REQUEST:
            return {
                loading: true
            }

        case TAG_BERANDA_ARTIKEL_SUCCESS:
            return {
                loading: false,
                tags: action.payload.data
            }

        case TAG_BERANDA_ARTIKEL_FAIL:
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