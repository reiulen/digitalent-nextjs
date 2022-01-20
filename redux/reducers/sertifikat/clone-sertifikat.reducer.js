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

export const allOptionsAcademyCloneSertifikatReducer = (
	state = { academy: {} },
	action
) => {
	switch (action.type) {
		case OPTION_ACADEMY_REQUEST:
			return {
				loading: true,
			};
		case OPTION_ACADEMY_SUCCESS:
			return {
				loading: false,
				academy: action.payload,
			};
		case OPTION_ACADEMY_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const allOptionsThemeCloneSertifikatReducer = (
	state = { theme: {} },
	action
) => {
	switch (action.type) {
		case OPTION_THEME_REQUEST:
			return {
				loading: true,
			};
		case OPTION_THEME_SUCCESS:
			return {
				loading: false,
				theme: action.payload,
			};
		case OPTION_THEME_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export const allOptionsTrainingCloneSertifikatReducer = (
	state = { training: {} },
	action
) => {
	switch (action.type) {
		case OPTION_TRAINING_REQUEST:
			return {
				loading: true,
			};
		case OPTION_TRAINING_SUCCESS:
			return {
				loading: false,
				training: action.payload,
			};
		case OPTION_TRAINING_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
