import {
  RIWAYAT_PELATIHAN_FAIL,
  RIWAYAT_PELATIHAN_REQUEST,
  RIWAYAT_PELATIHAN_SUCCESS,
} from "../../../types/pelatihan/riwayat-pelatihan.type";

export const riwayatPelatihanReducer = (
  state = { listPelatihan: [] },
  action
) => {
  switch (action.type) {
    case RIWAYAT_PELATIHAN_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case RIWAYAT_PELATIHAN_SUCCESS:
      return {
        ...state,
        listPelatihan: action.payload.data,
        loading: false,
      };
    case RIWAYAT_PELATIHAN_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
