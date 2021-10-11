import {
  API_REQUEST,
  API_SUCCESS,
  API_FAIL,

  DETAIL_API_REQUEST,
  DETAIL_API_SUCCESS,
  DETAIL_API_FAIL,
  DETAIL_API_RESET,

  DELETE_API_SUCCESS,
  DELETE_API_FAIL,
  DELETE_API_REQUEST,
  DELETE_API_RESET,

  POST_API_REQUEST,
  POST_API_SUCCESS,
  POST_API_FAIL,
  POST_API_RESET,

  UPDATE_API_REQUEST,
  UPDATE_API_SUCCESS,
  UPDATE_API_FAIL,
  UPDATE_API_RESET,
  
  LIMIT_CONFIGURATION,
  SET_PAGE,
  SEARCH_COORPORATION,
  CLEAR_ERRORS,
} from "../../../types/site-management/settings/api.type";

import axios from "axios";

export const getAllApi =
  (page = 1, cari = "", limit = 5, token) =>
  async (dispatch) => {
    try {
      dispatch({ type: API_REQUEST });
      let link =
        process.env.END_POINT_API_SITE_MANAGEMENT +
        `api/setting-api/all?page=${page}`;
      if (cari) link = link.concat(`&cari=${cari}`);
      if (limit) link = link.concat(`&limit=${limit}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);
      console.log("GET data ALL API", data);

      dispatch({
        type: API_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: API_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const deleteApi = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_API_REQUEST });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.delete(
      process.env.END_POINT_API_SITE_MANAGEMENT +
        `api/setting-api/delete/${id}`,
      config
    );

    dispatch({
      type: DELETE_API_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: DELETE_API_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const postApi = (sendData, token) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: POST_API_REQUEST,
      });
      const { data } = await axios.post(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-api/store`,
        sendData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: POST_API_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_API_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

// get detail belom ada endpoint
// export const getDetailPages = (id, token) => async (dispatch) => {
//   try {
//     dispatch({
//       type: DETAIL_API_REQUEST,
//     });
//     const config = {
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     };

//     let link =
//       process.env.END_POINT_API_SITE_MANAGEMENT +
//       `api/setting-page/detail/${id}`;

//     const { data } = await axios.get(link, config);

//     dispatch({
//       type: DETAIL_API_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: DETAIL_API_FAIL,
//       payload: error.response.data.message,
//     });
//   }
// };