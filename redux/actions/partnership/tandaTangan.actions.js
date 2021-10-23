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
  SUCCESS_ADD_TTD,
  FAIL_ADD_TTD,
} from "../../types/partnership/tandaTangan.type";

import {
  fetchSignatureApi,
  deleteTtd,
  getOptionTtdAdmin,
  getOptionTtdPartner,
  statusListChange,
  ttdAdd,
} from "../partnership/api/tanda-tangan";

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
      dispatch({
        type: TANDA_TANGAN_FAIL,
      });
    }
  };
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
  return async (dispatch) => {
    try {
      let { data } = await deleteTtd(id, token);
      dispatch({ type: SUCESS_DELETE_TD });
    } catch (error) {
      notify(error.response.data.message);
    }
  };
};

export const searchByKey = (value) => {
  return {
    type: SEARCH_BY_KEY_TTD,
    value,
  };
};

export const fetchOptionTtdAdmin = (token) => {
  return async (dispatch) => {
    try {
      let { data } = await getOptionTtdAdmin(token);
      dispatch({
        type: FETCH_OPTION_TTD_ADMIN,
        payload: data,
      });
    } catch (error) {
      notify(error.response.data.message);
    }
  };
};
export const fetchTtdPartner = (token, id) => {
  return async (dispatch) => {
    try {
      let { data } = await getOptionTtdPartner(token, id);
      dispatch({
        type: FETCH_TTD_PARTNER_BY_ID,
        payload: data,
      });
    } catch (error) {
      notify(error.response.data.message);
    }
  };
};

export const changeStatusList = (token, formData, id) => {
  return async (dispatch) => {
    try {
      let { data } = await statusListChange(token, formData, id);
      dispatch(successChangeStatusList());
    } catch (error) {
      notify(error.response.data.message);
    }
  };
};

export const successChangeStatusList = () => {
  return {
    type: CHANGE_STATUS_LIST_M,
  };
};

export const addTttd = (token, formData) => {
  return async (dispatch) => {
    try {
      let { data } = await ttdAdd(token, formData);
      // router.push({
      //   pathname: "/partnership/tanda-tangan",
      //   query: { success: true },
      // });
      dispatch({
        type: SUCCESS_ADD_TTD,
        payload: data,
      });
    } catch (error) {
      notify(error.response.data.message);
    }
  };
};

// FETCH_OPTION_TTD_ADMIN,
//   FETCH_TTD_PARTNER_BY_ID,
