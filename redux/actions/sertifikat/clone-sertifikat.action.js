import axios from "axios";
import {
	OPTION_ACADEMY_FAIL,
	OPTION_ACADEMY_REQUEST,
	OPTION_ACADEMY_SUCCESS,
	OPTION_THEME_FAIL,
	OPTION_THEME_REQUEST,
	OPTION_THEME_SUCCESS,
	OPTION_TRAINING_FAIL,
	OPTION_TRAINING_REQUEST,
	OPTION_TRAINING_SUCCESS,
} from "../../types/sertifikat/clone-sertifikat.type";

export const getOptionsAcademyCloneSertifikat =
	(token, token_permission = "") =>
	async (dispatch) => {
		try {
			dispatch({ type: OPTION_ACADEMY_REQUEST });
			let link = process.env.END_POINT_API_SERTIFIKAT + `api/option/academy`;

			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
					// Permission: token_permission,
				},
			};

			const { data } = await axios.get(link, config);

			if (data) {
				dispatch({ type: OPTION_ACADEMY_SUCCESS, payload: data });
			}
			return data;
		} catch (error) {
			console.log(error.message);
			dispatch({
				type: OPTION_ACADEMY_FAIL,
				payload: error?.response?.data?.message || error.message,
			});
		}
	};

export const getOptionsThemeCloneSertifikat =
	(token, id, token_permission = "") =>
	async (dispatch) => {
		try {
			dispatch({ type: OPTION_THEME_REQUEST });
			let link =
				process.env.END_POINT_API_SERTIFIKAT + `api/option/clone-theme/${id}`;

			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
					// Permission: token_permission,
				},
			};

			const { data } = await axios.get(link, config);
			if (data) {
				dispatch({ type: OPTION_THEME_SUCCESS, payload: data });
			}
			return data;
		} catch (error) {
			dispatch({
				type: OPTION_THEME_FAIL,
				payload: error?.response?.data?.message || error.message,
			});
		}
	};

export const getOptionsTrainingCloneSertifikat =
	(token, id_academy, id_theme, token_permission = "") =>
	async (dispatch) => {
		try {
			dispatch({ type: OPTION_TRAINING_REQUEST });
			let link =
				process.env.END_POINT_API_SERTIFIKAT +
				`api/option/clone-training/${id_academy}/${id_theme}`;

			const config = {
				headers: {
					Authorization: `Bearer ${token}`,
					// Permission: token_permission,
				},
			};

			const { data } = await axios.get(link, config);
			if (data) {
				dispatch({ type: OPTION_TRAINING_SUCCESS, payload: data });
			}
			return data;
		} catch (error) {
			dispatch({
				type: OPTION_TRAINING_FAIL,
				payload: error?.response?.data?.message || error.message,
			});
		}
	};
