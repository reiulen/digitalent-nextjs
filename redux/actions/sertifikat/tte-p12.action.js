import axios from "axios";
import {
  TTE_P12_FAIL,
  TTE_P12_SUCCESS,
  TTE_P12_REQUEST,
  SIGN_PDF_SUCCESS,
  SIGN_PDF_REQUEST,
  SIGN_PDF_FAIL,
  NEW_TTE_P12_SUCCESS,
  NEW_TTE_P12_REQUEST,
  NEW_TTE_P12_FAIL,
} from "../../types/sertifikat/TTE-P12.type";

export const getTTEP12 = (token) => async (dispatch, getState) => {
  try {
    dispatch({ type: TTE_P12_REQUEST });
    let link = process.env.END_POINT_API_SERTIFIKAT + `api/tte-p12/show`;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(link, config);
    if (data) {
      dispatch({ type: SERTIFIKAT_SUCCESS, payload: data });
    }

    return data;
  } catch (error) {
    dispatch({
      type: SERTIFIKAT_FAIL,
      payload: error?.response?.data?.message || error.message,
    });
  }
};

export const PostTTEP12 = (token, data) => async (dispatch, getState) => {
  try {
    dispatch({ type: NEW_TTE_P12_REQUEST });
    let link = process.env.END_POINT_API_SERTIFIKAT + `api/tte-p12/store`;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(link, data, config);
    if (data) {
      dispatch({ type: NEW_TTE_P12_SUCCESS, payload: data });
    }

    return data;
  } catch (error) {
    dispatch({
      type: NEW_TTE_P12_FAIL,
      payload: error?.response?.data?.message || error.message,
    });
  }
};
