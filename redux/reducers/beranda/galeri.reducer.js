import {
    BERANDA_GALERI_REQUEST,
    BERANDA_GALERI_SUCCESS,
    BERANDA_GALERI_FAIL,

    DETAIL_BERANDA_GALERI_REQUEST,
    DETAIL_BERANDA_GALERI_SUCCESS,
    DETAIL_BERANDA_GALERI_FAIL,

    KATEGORI_BERANDA_GALERI_REQUEST,
    KATEGORI_BERANDA_GALERI_SUCCESS,
    KATEGORI_BERANDA_GALERI_FAIL,

    CLEAR_ERRORS
} from "../../types/beranda/galeri.type"

export const allBerandaGaleriReducer = (state = { galeri: [] }, action) => {
    switch (action.type) {
        case BERANDA_GALERI_REQUEST:
            return {
                loading: true
            }

        case BERANDA_GALERI_SUCCESS:
            return {
                loading: false,
                galeri: action.payload.data
            }

        case BERANDA_GALERI_FAIL:
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

export const detailBerandaGaleriReducer = (state = {detail: {} }, action) => {
    switch (action.type) {
        case DETAIL_BERANDA_GALERI_SUCCESS:
            return {
                detail: action.payload,
            }

        case DETAIL_BERANDA_GALERI_FAIL:
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

export const kategoriBerandaGaleriReducer = (state = {kategori: [] }, action) => {
    switch (action.type) {
        case KATEGORI_BERANDA_GALERI_REQUEST:
            return {
                loading: true
            }

        case KATEGORI_BERANDA_GALERI_SUCCESS:
            let result = []

            for (let i = 0; i < action.payload.data.kategori.length; i++){
                if (action.payload.data.kategori[i].jenis_kategori == "Galeri"){
                    result.push (action.payload.data.kategori[i])
                }
            }

            return {
                loading: false,
                kategori: result
            }

        case KATEGORI_BERANDA_GALERI_FAIL:
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