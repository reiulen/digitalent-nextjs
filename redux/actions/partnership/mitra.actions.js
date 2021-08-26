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
