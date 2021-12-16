import axios from "axios";
import {
	DROPDOWN_HELPDESK_FAIL,
	DROPDOWN_HELPDESK_REQUEST,
	DROPDOWN_HELPDESK_SUCCESS,
} from "../../types/beranda/helpdesk.type";

export const getDropdownHelpdesk = () => async (dispatch) => {
	try {
		dispatch({ type: DROPDOWN_HELPDESK_REQUEST });

		let link =
			process.env.END_POINT_API_PELATIHAN +
			`api/v1/helpdesk/list-data?type=dropdown`;

		const data = await axios.get(link);

		dispatch({
			type: DROPDOWN_HELPDESK_SUCCESS,
			payload: data,
		});
		console.log(data);
		return data;
	} catch (error) {
		// console.log(error, "ini errornay");
		dispatch({
			type: DROPDOWN_HELPDESK_FAIL,
			payload: error.response.data.message || error.message,
		});
	}
};
