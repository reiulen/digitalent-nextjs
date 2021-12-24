import {
    BERANDA_TESTIMONI_REQUEST,
    BERANDA_TESTIMONI_SUCCESS,
    BERANDA_TESTIMONI_FAIL,

    DETAIL_BERANDA_TESTIMONI_REQUEST,
    DETAIL_BERANDA_TESTIMONI_SUCCESS,
    DETAIL_BERANDA_TESTIMONI_FAIL,

    KATEGORI_BERANDA_TESTIMONI_REQUEST,
    KATEGORI_BERANDA_TESTIMONI_SUCCESS,
    KATEGORI_BERANDA_TESTIMONI_FAIL,

    TAG_BERANDA_TESTIMONI_REQUEST,
    TAG_BERANDA_TESTIMONI_SUCCESS,
    TAG_BERANDA_TESTIMONI_FAIL,

    CEK_LULUS_PELATIHAN_REQUEST,
    CEK_LULUS_PELATIHAN,
    CEK_LULUS_FAIL,

    CLEAR_ERRORS,
} from "../../types/beranda/testimoni.type"

export const allBerandaTestimoniReducer = (state = { testimoni: [] }, action) => {
    switch (action.type) {
        case BERANDA_TESTIMONI_REQUEST:
            return {
                loading: true
            }

        case BERANDA_TESTIMONI_SUCCESS:
            return {
                loading: false,
                testimoni: action.payload.data
            }

        case BERANDA_TESTIMONI_FAIL:
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

export const detailBerandaTestimoniReducer = (state = { detail: {} }, action) => {
    switch (action.type) {
        case DETAIL_BERANDA_TESTIMONI_SUCCESS:
            return {
                detail: action.payload,
            }

        case DETAIL_BERANDA_TESTIMONI_FAIL:
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

export const kategoriBerandaTestimoniReducer = (state = { kategori: [] }, action) => {
    switch (action.type) {
        case KATEGORI_BERANDA_TESTIMONI_REQUEST:
            return {
                loading: true
            }

        case KATEGORI_BERANDA_TESTIMONI_SUCCESS:
            let result = []

            for (let i = 0; i < action.payload.data.kategori.length; i++) {
                if (action.payload.data.kategori[i].jenis_kategori == "Artikel") {
                    result.push(action.payload.data.kategori[i])
                }
            }

            return {
                loading: false,
                kategori: result
            }

        case KATEGORI_BERANDA_TESTIMONI_FAIL:
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

export const allTagBerandaTestimoniReducer = (state = { tags: [] }, action) => {
    switch (action.type) {
        case TAG_BERANDA_TESTIMONI_REQUEST:
            return {
                loading: true
            }

        case TAG_BERANDA_TESTIMONI_SUCCESS:
            return {
                loading: false,
                tags: action.payload.data
            }

        case TAG_BERANDA_TESTIMONI_FAIL:
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

export const cekLulusPelatihanTestimoniReducer = (state = { cekLulus: [] }, action) => {
    switch (action.type) {

        case CEK_LULUS_PELATIHAN_REQUEST:
            return {
                loading: true
            }

        case CEK_LULUS_PELATIHAN:
            return {
                loading: false,
                cekLulus: action.payload.data,
                status: true
            }

        case CEK_LULUS_FAIL:
            return {
                loading: false,
                error: action.payload,
                status: false
            }

        case CLEAR_ERRORS:
            return {
                error: null
            }

        default:
            return state
    }
}