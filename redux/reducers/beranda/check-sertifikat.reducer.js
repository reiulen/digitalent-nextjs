import {
	CHECK_SERTIFIKAT_FAIL,
	CHECK_SERTIFIKAT_REQUEST,
	CHECK_SERTIFIKAT_SUCCESS,
} from "../../types/beranda/check-sertifikat.type";

export const CheckStatusSertifikatReducer = (state = { data: {} }, action) => {
	switch (action.type) {
		case CHECK_SERTIFIKAT_REQUEST:
			return {
				loading: true,
			};
		case CHECK_SERTIFIKAT_SUCCESS:
			return {
				loading: false,
				data: action.payload.data,
			};
		case CHECK_SERTIFIKAT_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
