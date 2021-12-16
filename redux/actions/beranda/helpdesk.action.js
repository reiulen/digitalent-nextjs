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
		console.log(link);

		const data = await axios.get(link);

		console.log(data, "ini data");
		dispatch({
			type: DROPDOWN_HELPDESK_SUCCESS,
			payload: data,
		});
		return data;
	} catch (error) {
		console.log(error.message, "ini errornay");
		dispatch({
			type: DROPDOWN_HELPDESK_FAIL,
			payload: error.response.data.message || error.message,
		});
	}
};
