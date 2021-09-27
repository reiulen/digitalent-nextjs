import {
  // all tanda tangan
  TANDA_TANGAN_REQUEST,
  TANDA_TANGAN_SUCCESS,
  TANDA_TANGAN_FAIL,
  RELOAD_TABLE,
  SET_PAGE_M_TD,
  SET_LIMIT_TD,
  SUCESS_DELETE_TD,
  SEARCH_BY_KEY_TTD,
  FETCH_OPTION_TTD_ADMIN,
  FETCH_TTD_PARTNER_BY_ID,
  CHANGE_STATUS_LIST_M,
} from "../../types/partnership/tandaTangan.type";

import axios from "axios";

export async function fetchSignatureApi(params, token) {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}/api/signatures`,
    {
      params,
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
}

export const fetchSignature = (token) => {
  return async (dispatch, getState) => {
    dispatch({ type: TANDA_TANGAN_REQUEST });
    let keywordState = getState().allTandaTangan.keyword || "";
    let limitState = getState().allTandaTangan.limit || "";
    let pageState = getState().allTandaTangan.page || 1;

    const params = {
      keyword: keywordState,
      limit: limitState,
      page: pageState,
    };
    try {
      let { data } = await fetchSignatureApi(params, token);
      dispatch(successFetchSignature(data));
    } catch (error) {
      console.log("error data signature action", error.response.data.message);
    }
  };
};

export const successFetchSignature = (data) => {
  return {
    type: TANDA_TANGAN_SUCCESS,
    data,
  };
};
export const errorFetchSignature = (data) => {
  return {
    type: TANDA_TANGAN_FAIL,
  };
};
export const reloadTable = () => {
  return {
    type: RELOAD_TABLE,
  };
};
// =============================================
export const setPage = (page) => {
  return {
    type: SET_PAGE_M_TD,
    page,
  };
};
export const setLimit = (value) => {
  return {
    type: SET_LIMIT_TD,
    value,
  };
};
export const deleteTandaTangan = (id, token) => {
  return async (dispatch, getState) => {
    try {
      let { data } = await axios.delete(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/signatures/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: SUCESS_DELETE_TD });
    } catch (error) {
      console.log("gagal delete ttd", error);
    }
  };
};

export const searchByKey = (value) => {
  return {
    type: SEARCH_BY_KEY_TTD,
    value,
  };
};

export const fetchOptionTtdAdmin = () => {
  return async (dispatch) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/seremonial/option-admin`
      );
      console.log("data fetchOptionTtdAdmin", data);
      dispatch({
        type: FETCH_OPTION_TTD_ADMIN,
        payload: data,
      });
    } catch (error) {
      console.log("eror fetchOptionTtdAdmin", error);
    }
  };
};
export const fetchTtdPartner = (id) => {
  return async (dispatch) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/seremonial/option-mitra/${id}`
      );
      console.log("data fetchTtdPartner", data);
      dispatch({
        type: FETCH_TTD_PARTNER_BY_ID,
        payload: data,
      });
    } catch (error) {
      console.log("eror fetchTtdPartner", error);
    }
  };
};

export const changeStatusList = (token, value, id) => {
  return async (dispatch, getState) => {
    try {
      let dataSend = { _method: "put", status: value };
      let { data } = await axios.put(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/signatures/update-status/${id}`,
        dataSend,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(successChangeStatusList(value));
    } catch (error) {
      console.log("error change status list", error.response.data.message);
    }
  };
};

export const successChangeStatusList = (value) => {
  return {
    type: CHANGE_STATUS_LIST_M,
    value,
  };
};

// FETCH_OPTION_TTD_ADMIN,
//   FETCH_TTD_PARTNER_BY_ID,
