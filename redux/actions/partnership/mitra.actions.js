import axios from "axios";
import debounce from "debounce-promise";
import {
  MITRA_REQUEST,
  MITRA_SUCCESS,
  MITRA_FAIL,
  SEARCH_BY_KEY,
  SUCESS_DELETE_MITRA,
} from "../../types/partnership/mitra.type";

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
