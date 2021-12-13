import {
	FETCH_PARTNERSHIP_PERMISSION_REQUEST,
	FETCH_PARTNERSHIP_PERMISSION_SUCCESS,
	FETCH_PARTNERSHIP_PERMISSION_FAIL,
	CLEAR_ERRORS,
} from "../../types/partnership/partnership_permission.type";

import axios from "axios";
import Cookies from "js-cookie";

export const getPartnershipPermissions =
	(token, permission) => async (dispatch) => {
		try {
			const config = {
				headers: {
					Authorization: "Bearer " + token,
					//   permissionToken: localStorage.getItem("token-permission")
				},
			};

			const config = {
				headers: {
					Authorization: "Bearer " + token,
					Permission: permission,
				},
			};

			const { data } = await axios.get(link, config);
			dispatch({
				type: FETCH_PARTNERSHIP_PERMISSION_SUCCESS,
				payload: data,
			});
		} catch (error) {
			dispatch({
				type: FETCH_PARTNERSHIP_PERMISSION_FAIL,
				payload: error.response.data.message,
			});
		}
	};

// Clear Error
export const clearErrors = () => async (dispatch) => {
	dispatch({
		type: CLEAR_ERRORS,
	});
};
