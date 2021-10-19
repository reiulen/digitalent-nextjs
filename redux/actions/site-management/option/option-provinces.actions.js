import {
  PROVINCES_REQUEST,
  PROVINCES_SUCCESS,
  PROVINCES_FAIL,
} from "../../../types/site-management/option/option-provinces.type";
import axios from "axios";
export const getAllOptionProvinces = (token) => async (dispatch, getState) => {
  try {
    dispatch({ type: PROVINCES_REQUEST });

    const { data } = await axios.get(
      `${process.env.END_POINT_API_SITE_MANAGEMENT}api/option/provinsi`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    console.log("data", data);

    dispatch({
      type: PROVINCES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROVINCES_FAIL,
    });
  }
};
