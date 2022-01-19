import {
  OPTION_REFERENCE_REQUEST,
  OPTION_REFERENCE_SUCCESS,
  OPTION_REFERENCE_FAIL,
  GET_PENDIDIKAN_REFERENCE_SUCCESS,
  GET_PENDIDIKAN_REFERENCE_FAIL
} from "../../../types/site-management/option/option-reference.type";
import axios from "axios";

export const getAllOptionReference = (token) => async (dispatch, getState) => {
  try {
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

export const getDataPendidikanReference = (token) => async (dispatch) => {
  try {

    let link = process.env.END_POINT_API_SITE_MANAGEMENT + 'api/option/reference-choose-name/Pendidikan?paginate=false';
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
    
    const { data } = await axios.get(
      link, config
    );

    dispatch({
      type: GET_PENDIDIKAN_REFERENCE_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: GET_PENDIDIKAN_REFERENCE_FAIL,
      payload: error.response.data.message
    })
  }
}