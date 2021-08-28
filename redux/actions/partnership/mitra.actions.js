import axios from "axios";
import debounce from "debounce-promise";
import {
  MITRA_REQUEST,
  MITRA_SUCCESS,
  MITRA_FAIL,
  SEARCH_BY_KEY,
  SUCESS_DELETE_MITRA,
  SUCESS_PROVINCE,
  SET_PAGE_M,
  SET_LIMIT,
  CANCEL_CHANGE_PROVINCES,
  MITRA_FAIL_DETAIL,
  MITRA_REQUEST_DETAIL,
  MITRA_SUCCESS_DETAIL,
  SEARCH_BY_KEY_DETAIL,
  SET_PAGE_M_DETAIL,
  SET_LIMIT_DETAIL,
  LIST_COOPERATION_SUCCESS_DETAIL,
  LIST_STATUS_SUCCESS_DETAIL,
  SET_VALUE_KERJA_SAMA_M_DETAIL,
  SET_VALUE_STATUS_M_DETAIL,
  RELOAD_TABLE_DETAIL,
  SUCCESS_DELETE_COOPERATION_M_DETAIL,
  CHANGE_STATUS_LIST_M_DETAIL,
} from "../../types/partnership/mitra.type";
import router from "next/router";

export async function getAllMitra(params) {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}/api/partners`,
    {
      params,
    }
  );
}
// ============== GET DETAIL FETCH
export async function getCooperation() {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}/api/option/cooperation`
  );
}
export async function getStatus() {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}/api/option/status`
  );
}
// ============== GET DETAIL FETCH

let debouncedFetchMitra = debounce(getAllMitra, 0);

export const fetchMitra = (keyword) => {
  return async (dispatch, getState) => {
    dispatch({ type: MITRA_REQUEST });
    let keywordState = getState().allMitra.keyword || "";
    let limitState = getState().allMitra.limit || "";
    let pageState = getState().allMitra.page || 1;

    const params = {
      keyword: keywordState,
      limit: limitState,
      page: pageState,
    };

    try {
      const { data } = await debouncedFetchMitra(params);
      console.log("data fetch all mitra", data);
      dispatch(successFetchMitra(data, data.data.total));
    } catch (error) {
      dispatch(errorFetchMitra());
    }
  };
};

export const successFetchMitra = (data, totalData) => {
  return {
    type: MITRA_SUCCESS,
    data,
    totalData,
  };
};
export const errorFetchMitra = (data) => {
  return {
    type: MITRA_FAIL,
    data,
  };
};
export const searchByKey = (value) => {
  return {
    type: SEARCH_BY_KEY,
    value,
  };
};
export const deleteMitra = (id) => {
  return async (dispatch, getState) => {
    try {
      let { data } = await axios.delete(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/partners/${id}`
      );
      console.log("respon data delete mitra", data);
      dispatch({ type: SUCESS_DELETE_MITRA });
    } catch (error) {
      console.log("gagal delete mitra", error);
    }
  };
};
export const setPage = (page) => {
  return {
    type: SET_PAGE_M,
    page,
  };
};

export const setLimit = (value) => {
  return {
    type: SET_LIMIT,
    value,
  };
};

export const getProvinces = () => {
  return async (dispatch, getState) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/option/provinces`
      );
      console.log("respon data provinsi", data);
      dispatch(successGetProvinces(data));
    } catch (error) {
      console.log("gagal get province", error);
    }
  };
};

export const successGetProvinces = (data) => {
  return {
    type: SUCESS_PROVINCE,
    data,
  };
};

export const cancelChangeProvinces = () => {
  return {
    type: CANCEL_CHANGE_PROVINCES,
  };
};

export const exportFileCSV = () => {
  return async (dispatch, getState) => {
    try {
      let urlExport = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/partners/excel/export`
      );
      console.log("urlExport.config.url", urlExport.config.url);
      router.push(urlExport.config.url);

      // console.log("data", data);
    } catch (error) {
      console.log("object", error);
    }
  };
};

// ====================================== mitra detail

export async function getAllMitraDetail(paramsID, id) {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}/api/partners/cooperation/${id}?categories_cooporation=${paramsID.categories_cooporation}&status=${paramsID.status}&page=${paramsID.page}&limit=${paramsID.limit}&keyword=${paramsID.keyword}`
  );
}

export const getSingleValue = (id) => {
  return async (dispatch, getState) => {
    dispatch({ type: MITRA_REQUEST_DETAIL });
    let keywordState = getState().allMitra.keywordDetail || "";
    let limitState = getState().allMitra.limitDetail || "";
    let pageState = getState().allMitra.pageDetail || 1;
    let categoryState = getState().allMitra.categories_cooporation;
    let statusState = getState().allMitra.statusDetail;
    console.log(categoryState, statusState);

    const paramsID = {
      keyword: keywordState,
      limit: limitState,
      page: pageState,
      categories_cooporation: categoryState,
      status: statusState,
    };

    try {
      let { data } = await getAllMitraDetail(paramsID, id);
      dispatch(successGetSingleValue(data, data.data.total));
      console.log("data", data);
    } catch (error) {
      console.log("error get single mitra list");
      dispatch({ type: MITRA_FAIL_DETAIL });
    }
  };
};

export const successGetSingleValue = (data, totalData) => {
  return {
    type: MITRA_SUCCESS_DETAIL,
    data,
    totalData,
  };
};

export const searchByKeyDetail = (value) => {
  return {
    type: SEARCH_BY_KEY_DETAIL,
    value,
  };
};

export const setPageDetail = (page) => {
  return {
    type: SET_PAGE_M_DETAIL,
    page,
  };
};
export const setLimitDetail = (value) => {
  return {
    type: SET_LIMIT_DETAIL,
    value,
  };
};

export const exportFileCSVDetail = (id) => {
  return async (dispatch, getState) => {
    let statusState = getState().allMitra.statusDetail || "";
    let cooperationState = getState().allMitra.categories_cooporation || "";
    try {
      let urlExport = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/partners/excel/export-cooperation/${id}?categories_cooporation=${statusState}&status=${cooperationState}`
      );
      router.push(urlExport.config.url);

      // console.log("data", data);
    } catch (error) {
      console.log("object", error);
    }
  };
};
export const fetchListSelectCooperation = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await getCooperation();
      dispatch(successFetchListSelectCooperation(data));
    } catch (error) {
      console.log("eror get list cooperation", error);
    }
  };
};
export const successFetchListSelectCooperation = (data) => {
  return {
    type: LIST_COOPERATION_SUCCESS_DETAIL,
    data,
  };
};
export const fetchListSelectStatus = () => {
  return async (dispatch, getState) => {
    try {
      const { data } = await getStatus();
      dispatch(successFetchListSelectStatus(data));
    } catch (error) {
      console.log("eror get list status", error);
    }
  };
};
export const successFetchListSelectStatus = (data) => {
  return {
    type: LIST_STATUS_SUCCESS_DETAIL,
    data,
  };
};
export const changeValueKerjaSama = (value) => {
  return {
    type: SET_VALUE_KERJA_SAMA_M_DETAIL,
    value,
  };
};
export const changeValueStatus = (value) => {
  return {
    type: SET_VALUE_STATUS_M_DETAIL,
    value,
  };
};

export const deleteCooperation = (id) => {
  return async (dispatch, getState) => {
    try {
      let { data } = await axios.delete(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/${id}`
      );
      dispatch(successDeleteCooperation());
    } catch (error) {
      console.log("action delete gagal", error);
    }
  };
};

export const successDeleteCooperation = () => {
  return {
    type: SUCESS_DELETE_MITRA,
  };
};

export const reloadTable = () => {
  return {
    type: RELOAD_TABLE_DETAIL,
  };
};

export const changeStatusList = (value, id) => {
  console.log(value, id);
  return async (dispatch, getState) => {
    try {
      let dataSend = { status: value };
      let { data } = await axios.put(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/update-status/${id}`,
        dataSend
      );
      console.log("status list data value", data);
      dispatch(successChangeStatusList(value));
    } catch (error) {
      console.log("error change status list");
    }
  };
};

export const successChangeStatusList = (value) => {
  return {
    type: CHANGE_STATUS_LIST_M_DETAIL,
    value,
  };
};
