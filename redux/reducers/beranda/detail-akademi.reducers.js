import {
    DETAIL_AKADEMI_REQUEST,
    DETAIL_AKADEMI_SUCCESS,
    DETAIL_AKADEMI_FAIL,

    PELATIHAN_AKADEMI_REQUEST,
    PELATIHAN_AKADEMI_SUCCESS,
    PELATIHAN_AKADEMI_FAIL,

    CLEAR_ERRORS
} from "../../types/beranda/detail-akademi.type"

export const detailAkademiReducer = (state = { akademi: {} }, action) => {
    switch (action.type) {
      case DETAIL_AKADEMI_SUCCESS:
        return {
          akademi: action.payload.Akademi,
        };
  
      case DETAIL_AKADEMI_FAIL:
        return {
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          error: null,
        };
  
      default:
        return state;
    }
};

export const allPelatihanReducer = (state = { pelatihan: [] }, action) => {
    switch (action.type) {
        case PELATIHAN_AKADEMI_REQUEST:
            return {
                loading: true
            }

        case PELATIHAN_AKADEMI_SUCCESS:
            return {
                loading: false,
                pelatihan: action.payload.Pelatihan
            }

        case PELATIHAN_AKADEMI_FAIL:
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