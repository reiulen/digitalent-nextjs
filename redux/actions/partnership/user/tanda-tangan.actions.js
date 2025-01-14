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
  CHANGE_STATUS_LIST_M,
} from "../../../types/partnership/user/tanda-tangan.type";

import axios from "axios";

export async function fetchSignatureApi(params, token) {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}api/signatures`,
    {
      params,
      headers: {
        authorization: `Bearer ${token}`,
        // Permission: Cookies.get ("token_permission")
      },
    }
  );
}

export const fetchSignature = (token) => async (dispatch, getState) => {
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
    const { data } = await axios.get(
      `${process.env.END_POINT_API_PARTNERSHIP}api/signatures`,
      {
        params,
        headers: {
          authorization: `Bearer ${token}`,
          // Permission: Cookies.get ("token_permission")
        },
      }
    );
    dispatch(successFetchSignature(data));
  } catch (error) {}
};

export const successFetchSignature = (data) => {
  return {
    type: TANDA_TANGAN_SUCCESS,
    data,
  };
};
export const errorFetchSignature = () => {
  return {
    type: TANDA_TANGAN_FAIL,
  };
};
export const reloadTable = () => {
  return {
    type: RELOAD_TABLE,
  };
};

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
        `${process.env.END_POINT_API_PARTNERSHIP}api/signatures/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            // Permission: Cookies.get ("token_permission")
          },
        }
      );
      dispatch({ type: SUCESS_DELETE_TD });
    } catch (error) {
      // //// console.log(error.response.data.message);
    }
  };
};

export const searchByKey = (value) => {
  return {
    type: SEARCH_BY_KEY_TTD,
    value,
  };
};

export const changeStatusList = (formData, id, token) => {
  return async (dispatch, getState) => {
    try {
      let { data } = await axios.post(
        `${process.env.END_POINT_API_PARTNERSHIP}api/signatures/update-status/${id}`,
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            // Permission: Cookies.get ("token_permission")
          },
        }
      );
      dispatch(successChangeStatusList());
    } catch (error) {}
  };
};

export const successChangeStatusList = () => {
  return {
    type: CHANGE_STATUS_LIST_M,
  };
};
