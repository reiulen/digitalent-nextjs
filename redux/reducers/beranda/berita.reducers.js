import {
    BERANDA_BERITA_REQUEST,
    BERANDA_BERITA_SUCCESS,
    BERANDA_BERITA_FAIL,

    DETAIL_BERANDA_BERITA_REQUEST,
    DETAIL_BERANDA_BERITA_SUCCESS,
    DETAIL_BERANDA_BERITA_FAIL,

    KATEGORI_BERANDA_BERITA_REQUEST,
    KATEGORI_BERANDA_BERITA_SUCCESS,
    KATEGORI_BERANDA_BERITA_FAIL,

    TAG_BERANDA_BERITA_REQUEST,
    TAG_BERANDA_BERITA_SUCCESS,
    TAG_BERANDA_BERITA_FAIL,

    CLEAR_ERRORS
} from "../../types/beranda/berita.type"

export const allBerandaBeritaReducer = (state = { berita: [] }, action) => {
    switch (action.type) {
        case BERANDA_BERITA_REQUEST:
            return {
                loading: true
            }

        case BERANDA_BERITA_SUCCESS:
            return {
                loading: false,
                berita: action.payload.data
            }

        case BERANDA_BERITA_FAIL:
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

export const detailBerandaBeritaReducer = (state = {detail: {} }, action) => {
    switch (action.type) {
        case DETAIL_BERANDA_BERITA_SUCCESS:
            return {
                detail: action.payload,
            }

        case DETAIL_BERANDA_BERITA_FAIL:
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

export const kategoriBerandaBeritaReducer = (state = {kategori: [] }, action) => {
    switch (action.type) {
        case KATEGORI_BERANDA_BERITA_REQUEST:
            return {
                loading: true
            }

        case KATEGORI_BERANDA_BERITA_SUCCESS:
            let result = []

            for (let i = 0; i < action.payload.data.kategori.length; i++){
                if (action.payload.data.kategori[i].jenis_kategori == "Berita"){
                    result.push (action.payload.data.kategori[i])
                }
            }

            return {
                loading: false,
                kategori: result
            }

        case KATEGORI_BERANDA_BERITA_FAIL:
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

export const allTagBerandaBeritaReducer = (state = { tags: [] }, action) => {
    switch (action.type) {
        case TAG_BERANDA_BERITA_REQUEST:
            return {
                loading: true
            }

        case TAG_BERANDA_BERITA_SUCCESS:
            return {
                loading: false,
                tags: action.payload.data
            }

        case TAG_BERANDA_BERITA_FAIL:
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