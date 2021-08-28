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
} from "../../types/partnership/tandaTangan.type";

import axios from "axios";

export async function fetchSignatureApi(params) {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}/api/signatures`,
    {
      params,
    }
  );
}

export const fetchSignature = () => {
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
      let { data } = await fetchSignatureApi(params);
      console.log("data signature action", data);
      dispatch(successFetchSignature(data));
    } catch (error) {
      console.log("error data signature action", error);
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
export const deleteTandaTangan = (id) => {
  return async (dispatch, getState) => {
    try {
      let { data } = await axios.delete(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/signatures/${id}`
      );
      console.log("respon data delete ttd", data);
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
