import {
  // provinsi
  PROVINSI_REQUEST,
  PROVINSI_SUCCESS,
  PROVINSI_FAIL,

  // kota
  KOTA_REQUEST,
  KOTA_SUCCESS,
  KOTA_FAIL,
  CLEAR_ERRORS,
  GET_SUPERADMIN_PERMISSION_FAIL,
  GET_SUPERADMIN_PERMISSION_SUCCESS,
  GET_SUPERADMIN_PERMISSION_REQUEST,
} from "../../types/utils/utils.type";

import axios from "axios";

export const getAllProvinsi = () => async dispatch => {
  try {
    dispatch({ type: PROVINSI_REQUEST });

    let link = process.env.END_POINT_API_PARTNERSHIP + `/api/option/provinces`;
    //   if (keyword) link = link.concat(`&keyword=${keyword}`);
    //   if (limit) link = link.concat(`&limit=${limit}`);
    // let link = process.env.END_POINT_API_PUBLIKASI + `api/artikel`

    // const config = {
    //     headers: {
    //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
    //         'Access-Control-Allow-Origin': '*',
    //         'apikey': process.env.END_POINT_KEY_AUTH
    //     }
    // }

    const { data } = await axios.get(link);

    dispatch({
      type: PROVINSI_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROVINSI_FAIL,
      payload: error.message,
    });
  }
};

export const getAllKota = id => async dispatch => {
  try {
    dispatch({ type: KOTA_REQUEST });

    let link =
      process.env.END_POINT_API_PARTNERSHIP + `/api/option/cities/${id}`;
    //   if (keyword) link = link.concat(`&keyword=${keyword}`);
    //   if (limit) link = link.concat(`&limit=${limit}`);
    // let link = process.env.END_POINT_API_PUBLIKASI + `api/artikel`

    // const config = {
    //     headers: {
    //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
    //         'Access-Control-Allow-Origin': '*',
    //         'apikey': process.env.END_POINT_KEY_AUTH
    //     }
    // }

    const { data } = await axios.get(link);

    dispatch({
      type: KOTA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: KOTA_FAIL,
      payload: error.message,
    });
  }
};

export const getAllPermission = token => async dispatch => {
  try {
    dispatch({ type: GET_SUPERADMIN_PERMISSION_REQUEST });

    let link =
      process.env.END_POINT_API_SITE_MANAGEMENT + `api/user/permissions`;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: GET_SUPERADMIN_PERMISSION_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: GET_SUPERADMIN_PERMISSION_FAIL,
      payload: error.message,
    });
  }
};
