import {
    DETAIL_PELATIHAN_REQUEST,
    DETAIL_PELATIHAN_SUCCESS,
    DETAIL_PELATIHAN_FAIL,

    CEK_REGISTER_PELATIHAN_REQUEST,
    CEK_REGISTER_PELATIHAN_SUCCESS,
    CEK_REGISTER_PELATIHAN_FAIL,

    CLEAR_ERRORS
} from "../../types/beranda/detail-pelatihan.type"

export const detailPelatihanReducer = (state = { pelatihan: {} }, action) => {
    switch (action.type) {
      case DETAIL_PELATIHAN_SUCCESS:
        return {
          pelatihan: action.payload.data,
        };
  
      case DETAIL_PELATIHAN_FAIL:
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

export const checkRegisteredPelatihanReducer = (state = { cekPelatihan: {} }, action) => {
    switch (action.type) {
        case CEK_REGISTER_PELATIHAN_REQUEST:
            return {
                loading: true,
            };
        case CEK_REGISTER_PELATIHAN_SUCCESS:
            return {
                loading: false,
                cekPelatihan: action.payload.data,
            };
  
        case CEK_REGISTER_PELATIHAN_FAIL:
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