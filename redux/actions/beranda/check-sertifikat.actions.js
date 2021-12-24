import axios from "axios";
import {
	CHECK_SERTIFIKAT_FAIL,
	CHECK_SERTIFIKAT_SUCCESS,
	CHECK_SERTIFIKAT_REQUEST,
} from "../../types/beranda/check-sertifikat.type";

export const getCheckStatusSertifikat =
	(registrasi = "") =>
	async (dispatch) => {
		try {
			dispatch({ type: CHECK_SERTIFIKAT_REQUEST });
			let link =
				process.env.END_POINT_API_PELATIHAN +
				`api/v1/formPendaftaran/get-sertifikat`;
			if (registrasi) {
				link = link.concat(`?registrasi=${registrasi}`);
			}

			const { data } = await axios.get(link);
			if (data) {
				dispatch({ type: CHECK_SERTIFIKAT_SUCCESS, payload: data });
			}
			return data;
		} catch (error) {
			dispatch({
				type: CHECK_SERTIFIKAT_FAIL,
				payload: error?.response?.data?.message || error.message,
			});
		}
	};
