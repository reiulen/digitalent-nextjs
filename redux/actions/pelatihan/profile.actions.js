import {
	//DATA PRIBADI
	UPDATE_DATA_PRIBADI_REQUEST,
	UPDATE_DATA_PRIBADI_SUCCESS,
	UPDATE_DATA_PRIBADI_RESET,
	UPDATE_DATA_PRIBADI_FAIL,
	//ALAMAT
	GET_ALAMAT_SUCCESS,
	GET_ALAMAT_FAIL,
	UPDATE_ALAMAT_REQUEST,
	UPDATE_ALAMAT_SUCCESS,
	UPDATE_ALAMAT_RESET,
	UPDATE_ALAMAT_FAIL,
	//PENDIDIKAN
	GET_PENDIDIKAN_SUCCESS,
	GET_PENDIDIKAN_FAIL,
	UPDATE_PENDIDIKAN_REQUEST,
	UPDATE_PENDIDIKAN_SUCCESS,
	UPDATE_PENDIDIKAN_RESET,
	UPDATE_PENDIDIKAN_FAIL,
	//KETERAMPILAN
	GET_KETERAMPILAN_SUCCESS,
	GET_KETERAMPILAN_FAIL,
	UPDATE_KETERAMPILAN_REQUEST,
	UPDATE_KETERAMPILAN_SUCCESS,
	UPDATE_KETERAMPILAN_RESET,
	UPDATE_KETERAMPILAN_FAIL,
	//PEKERJAAN
	GET_PEKERJAAN_SUCCESS,
	GET_PEKERJAAN_FAIL,
	GET_REF_PEKERJAAN_REQUEST,
	GET_REF_PEKERJAAN_SUCCESS,
	GET_REF_PEKERJAAN_FAIL,
	UPDATE_PEKERJAAN_REQUEST,
	UPDATE_PEKERJAAN_SUCCESS,
	UPDATE_PEKERJAAN_RESET,
	UPDATE_PEKERJAAN_FAIL,
	CLEAR_ERRORS,
	GET_ASAL_SEKOLAH,
	STORE_ALL_DATA_PRIBADI,
	GET_DATA_PRIBADI_WIZZARD,

	// UPDATE WIZZARD STATUS
	UPDATE_WIZZARD_REQUEST,
	UPDATE_WIZZARD_SUCCESS,
	UPDATE_WIZZARD_FAIL, 
	// END UPDATE WIZZARD STATUS
} from "../../types/pelatihan/profile.type";
import axios from "axios";
import { ST } from "next/dist/shared/lib/utils";

//DATA PRIBADI
export const updateProfileDataPribadi =
	(dataPribadi, token) => async (dispatch) => {
		try {
			dispatch({ type: UPDATE_DATA_PRIBADI_REQUEST });

			let link =
				process.env.END_POINT_API_PELATIHAN + `api/v1/auth/update-data-pribadi`;

			const config = {
				headers: {
					Authorization: "Bearer " + token,
				},
			};

			const { data } = await axios.post(link, dataPribadi, config);

			dispatch({
				type: UPDATE_DATA_PRIBADI_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: UPDATE_DATA_PRIBADI_FAIL,
				payload: error.response.data.message,
			});
		}
	};
//END DATA PRIBADI

//ALAMAT
export const getProfileAlamat = (token) => async (dispatch) => {
	try {
		let link =
			process.env.END_POINT_API_PELATIHAN + `api/v1/auth/get-data-alamat`;

		const config = {
			headers: {
				Authorization: "Bearer " + token,
			},
		};

		const { data } = await axios.get(link, config);

		dispatch({
			type: GET_ALAMAT_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: GET_ALAMAT_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const updateProfileAlamat = (dataAlamat, token) => async (dispatch) => {
	try {
		dispatch({ type: UPDATE_ALAMAT_REQUEST });

		let link =
			process.env.END_POINT_API_PELATIHAN + `api/v1/auth/update-data-alamat`;

		const config = {
			headers: {
				Authorization: "Bearer " + token,
			},
		};

		const { data } = await axios.post(link, dataAlamat, config);

		dispatch({
			type: UPDATE_ALAMAT_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: UPDATE_ALAMAT_FAIL,
			payload: error.response.data.message,
		});
	}
};
//END ALAMAT

//PENDIDIKAN
export const getProfilePendidikan = (token) => async (dispatch) => {
	try {
		let link =
			process.env.END_POINT_API_PELATIHAN + `api/v1/auth/get-data-pendidikan`;

		const config = {
			headers: {
				Authorization: "Bearer " + token,
			},
		};

		const { data } = await axios.get(link, config);

		dispatch({
			type: GET_PENDIDIKAN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: GET_PENDIDIKAN_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const updateProfilePendidikan =
	(dataPendidikan, token) => async (dispatch) => {
		try {
			dispatch({ type: UPDATE_PENDIDIKAN_REQUEST });

			let link =
				process.env.END_POINT_API_PELATIHAN +
				`api/v1/auth/update-data-pendidikan`;

			const config = {
				headers: {
					Authorization: "Bearer " + token,
				},
			};

			const { data } = await axios.post(link, dataPendidikan, config);

			dispatch({
				type: UPDATE_PENDIDIKAN_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: UPDATE_PENDIDIKAN_FAIL,
				payload: error.response.data.message,
			});
		}
	};

export const getDataAsalSekolah =
	(token, search = "") =>
	async (dispatch) => {
		try {
			let link =
				process.env.END_POINT_API_SITE_MANAGEMENT +
				`api/option/origin-of-school?keyword=${search}`;

			const config = {
				headers: {
					Authorization: "Bearer " + token,
				},
			};

			const { data } = await axios.get(link, config);
			dispatch({
				type: GET_ASAL_SEKOLAH,
				payload: data.data.list_signatures,
			});
			return data.data.list_signatures;
		} catch (error) {
			throw error;
		}
	};

//END PENDIDIKAN

//KETERAMPILAN
export const getProfileKeterampilan = (token) => async (dispatch) => {
	try {
		let link =
			process.env.END_POINT_API_PELATIHAN + `api/v1/auth/get-data-keterampilan`;

		const config = {
			headers: {
				Authorization: "Bearer " + token,
			},
		};

		const { data } = await axios.get(link, config);

		dispatch({
			type: GET_KETERAMPILAN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: GET_KETERAMPILAN_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const updateProfileKeterampilan =
	(dataKeterampilan, token) => async (dispatch) => {
		try {
			dispatch({ type: UPDATE_KETERAMPILAN_REQUEST });

			let link =
				process.env.END_POINT_API_PELATIHAN +
				`api/v1/auth/update-data-keterampilan`;

			const config = {
				headers: {
					Authorization: "Bearer " + token,
				},
			};

			const { data } = await axios.post(link, dataKeterampilan, config);

			dispatch({
				type: UPDATE_KETERAMPILAN_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: UPDATE_KETERAMPILAN_FAIL,
				payload: error.response.data.message,
			});
		}
	};
//END KETERAMPILAN

//PEKERJAAN
export const getProfilePekerjaan = (token) => async (dispatch) => {
	try {
		let link =
			process.env.END_POINT_API_PELATIHAN + `api/v1/auth/get-data-pekerjaan`;

		const config = {
			headers: {
				Authorization: "Bearer " + token,
			},
		};

		const { data } = await axios.get(link, config);
		dispatch({
			type: GET_PEKERJAAN_SUCCESS,
			payload: data,
		});
		return data;
	} catch (error) {
		dispatch({
			type: GET_PEKERJAAN_FAIL,
			payload: error.response.data.message,
		});
	}
};

export const updateProfilePekerjaan =
	(dataPekerjaan, token) => async (dispatch) => {
		try {
			dispatch({ type: UPDATE_PEKERJAAN_REQUEST });

			let link =
				process.env.END_POINT_API_PELATIHAN +
				`api/v1/auth/update-data-pekerjaan`;

			const config = {
				headers: {
					Authorization: "Bearer " + token,
				},
			};

			const { data } = await axios.post(link, dataPekerjaan, config);

			dispatch({
				type: UPDATE_PEKERJAAN_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: UPDATE_PEKERJAAN_FAIL,
				payload: error.response.data.message,
			});
		}
	};

export const getDataRefPekerjaan = (token) => async (dispatch) => {
	try {
		dispatch({ type: GET_REF_PEKERJAAN_REQUEST });

		let link =
			process.env.END_POINT_API_SITE_MANAGEMENT +
			`api/option/reference-choose-name/Bidang Pekerjaan?paginate=false`;

		const config = {
			headers: {
				Authorization: "Bearer " + token,
			},
		};

		const { data } = await axios.get(link, config);
		dispatch({
			type: GET_REF_PEKERJAAN_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: GET_REF_PEKERJAAN_FAIL,
			payload: error.response.data.message,
		});
	}
};

//END PEKERJAAN

// UPDATE WIZZARD STATUS
export const updateWizzardStatus =
	(status, token) => async (dispatch) => {
		try {
			dispatch({ type: UPDATE_WIZZARD_REQUEST });

			let link =
				process.env.END_POINT_API_PELATIHAN +
				`/api/v1/auth/update-wizard?wizard=${status}`;

			const config = {
				headers: {
					Authorization: "Bearer " + token,
				},
			};

			const { data } = await axios.get(link, config);

			dispatch({
				type: UPDATE_WIZZARD_SUCCESS,
				payload: data,
			});

			if (data) {
				return data;
			}
			
		} catch (error) {
			dispatch({
				type: UPDATE_WIZZARD_FAIL,
				payload: error.response.data.message,
			});
		}
	};

// END UPDATE WIZZARD STATUS

export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};

// export const getDataInformasiWizzard = () => async (dispatch, getState) => {
//   dispatch({
//     type: GET_DATA_PRIBADI_WIZZARD,
//     payload: data,
//   });
// };

// export const updateDataWizzard =
//   (dataPribadi, params) => async (dispatch, getState) => {
//     const current = getState().getDataPribadiWizzard;

//     dispatch({
//       type: STORE_ALL_DATA_PRIBADI,
//       payload: data,
//     });
//   };
