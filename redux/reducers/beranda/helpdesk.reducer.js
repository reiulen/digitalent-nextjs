import {
	DROPDOWN_HELPDESK_FAIL,
	DROPDOWN_HELPDESK_SUCCESS,
	DROPDOWN_HELPDESK_REQUEST,
} from "../../types/beranda/helpdesk.type";

export const dropdownHelpdeskReducer = (state = { dropdown: [] }, action) => {
	switch (action.type) {
		case DROPDOWN_HELPDESK_REQUEST:
			return {
				loading: true,
			};

		case DROPDOWN_HELPDESK_SUCCESS:
			return {
				loading: false,
				dropdown: action.payload.data,
			};
		case DROPDOWN_HELPDESK_FAIL:
			return {
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
