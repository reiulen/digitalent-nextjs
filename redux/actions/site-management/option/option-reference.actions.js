import {
  OPTION_REFERENCE_REQUEST,
  OPTION_REFERENCE_SUCCESS,
  OPTION_REFERENCE_FAIL,
} from "../../../types/site-management/option/option-reference.type";
import axios from "axios";
export const getAllOptionReference = (token) => async (dispatch, getState) => {
  try {
    dispatch({ type: OPTION_REFERENCE_REQUEST });

    const { data } = await axios.get(
      `${process.env.END_POINT_API_SITE_MANAGEMENT}api/option/reference`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: OPTION_REFERENCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: OPTION_REFERENCE_FAIL,
    });
  }
};
