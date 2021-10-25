import {
  ZONASI_REQUEST,
  ZONASI_SUCCESS,
  ZONASI_FAIL,
  DETAIL_ZONASI_REQUEST,
  DETAIL_ZONASI_SUCCESS,
  DETAIL_ZONASI_FAIL,
  DETAIL_ZONASI_RESET,
  DELETE_ZONASI_SUCCESS,
  DELETE_ZONASI_FAIL,
  DELETE_ZONASI_REQUEST,
  DELETE_ZONASI_RESET,
  POST_ZONASI_REQUEST,
  POST_ZONASI_SUCCESS,
  POST_ZONASI_FAIL,
  POST_ZONASI_RESET,
  UPDATE_ZONASI_REQUEST,
  UPDATE_ZONASI_SUCCESS,
  UPDATE_ZONASI_FAIL,
  UPDATE_ZONASI_RESET,
  LIMIT_CONFIGURATION,
  SET_PAGE,
  SEARCH_COORPORATION,
  CLEAR_ERRORS,
} from "../../types/site-management/zonasi.type";

import axios from "axios";

export const getAllZonasi = (token) => async (dispatch, getState) => {
  try {
    dispatch({ type: ZONASI_REQUEST });

    let pageState = getState().allZonasi.page || 1;
    let cariState = getState().allZonasi.cari || "";
    let limitState = getState().allZonasi.limit || 5;

    const params = {
      page: pageState,
      cari: cariState,
      limit: limitState,
    };

    const { data } = await axios.get(
      `${process.env.END_POINT_API_SITE_MANAGEMENT}api/zonasi/list`,
      {
        params,
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );

    dispatch({
      type: ZONASI_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ZONASI_FAIL,
    });
  }
};

// delete zonasi tidak ada
export const deleteZonasi = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ZONASI_REQUEST });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.delete(
      process.env.END_POINT_API_SITE_MANAGEMENT +
        `api/setting-page/delete/${id}`,
      config
    );

    dispatch({
      type: DELETE_ZONASI_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ZONASI_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const postZonasi = (sendData, token) => {
  return async (dispatch) => {
    try {
      dispatch({
        type: POST_ZONASI_REQUEST,
      });
      const { data } = await axios.post(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}/api/zonasi/store`,
        sendData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({
        type: POST_ZONASI_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: POST_ZONASI_FAIL,
        payload: error.response.data.message,
      });
    }
  };
};

// export const getDetailZonasi = (id, token) => async (dispatch) => {
//   try {
//     dispatch({
//       type: DETAIL_ZONASI_REQUEST,
//     });
//     const config = {
//       headers: {
//         Authorization: "Bearer " + token,
//       },
//     };

//     let link =
//       process.env.END_POINT_API_SITE_MANAGEMENT + `api/zonasi/detail/${id}`;

//     const { data } = await axios.get(link, config);

//     dispatch({
//       type: DETAIL_ZONASI_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: DETAIL_ZONASI_FAIL,
//     });
//   }
// };

export const getDetailZonasi = (id, token) => {
  return async (dispatch) => {
    dispatch({
      type: DETAIL_ZONASI_REQUEST,
    });
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/zonasi/detail/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: DETAIL_ZONASI_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DETAIL_ZONASI_FAIL,
      });
    }
  };
};

export const updateZonasi = (sendData, id, token) => async (dispatch) => {
  try {
    dispatch({
      type: UPDATE_ZONASI_REQUEST,
    });
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_SITE_MANAGEMENT +
        `api/setting-page/update/${id}`,
      sendData,
      config
    );

    dispatch({
      type: UPDATE_ZONASI_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ZONASI_FAIL,
      payload: error.response.data.message,
    });
  }
};

// belom dicek udah dubuat belom di type nya
export const setPage = (page) => {
  return {
    type: SET_PAGE,
    page,
  };
};

export const searchCooporation = (text) => {
  return {
    type: SEARCH_COORPORATION,
    text,
  };
};

export const limitCooporation = (value) => {
  return {
    type: LIMIT_CONFIGURATION,
    limitValue: value,
  };
};
