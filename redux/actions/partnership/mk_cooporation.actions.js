import debounce from "debounce-promise";

import {
  MK_COOPORATION_REQUEST,
  MK_COOPORATION_SUCCESS,
  MK_COOPORATION_FAIL,
  SEARCH_COORPORATION,
  LIMIT_CONFIGURATION,
  SUCCESS_GET_SINGLE_COOPORATION,
  SUCCESS_DELETE_COOPORATION_REQUEST,
  SUCCESS_CHANGE_STATUS_LIST,
  SET_PAGE,
} from "../../types/partnership/mk_cooporation.type";
import axios from "axios";

// func get data from api
export async function getAllMKCooporation(params) {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations`,
    {
      params,
    }
  );
}
let debouncedFetchProduct = debounce(getAllMKCooporation, 0);

// func fetch data and validate
export const fetchAllMKCooporation = (keyword) => {
  return async (dispatch, getState) => {
    dispatch({ type: MK_COOPORATION_REQUEST });
    let keywordState = getState().allMKCooporation.keyword || "";
    let limitState = getState().allMKCooporation.limit || "";
    let pageState = getState().allMKCooporation.page || 1;

    const params = {
      keyword: keyword === "clear keyword" ? "" : keywordState,
      limit: limitState,
      page: pageState,
    };

    try {
      const { data } = await debouncedFetchProduct(params);
      dispatch(successFetchAllMKCooporation(data));
    } catch (error) {
      dispatch(errorfetchAllMKCooporation());
    }
  };
};

export const successFetchAllMKCooporation = (data) => {
  return {
    type: MK_COOPORATION_SUCCESS,
    data,
  };
};
export const errorfetchAllMKCooporation = () => {
  return {
    type: MK_COOPORATION_FAIL,
  };
};

export const searchCooporation = (text) => {
  return {
    type: SEARCH_COORPORATION,
    text,
  };
};

export const limitCooporation = (value) => {
  console.log("value limit", value);
  return {
    type: LIMIT_CONFIGURATION,
    limitValue: value,
  };
};

export const getSingleCooporation = (id) => {
  return async (dispatch, getState) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/${id}`
      );
      dispatch(successGetSingleCooporation(data));
    } catch (error) {}
  };
};

export const successGetSingleCooporation = (data) => {
  return {
    type: SUCCESS_GET_SINGLE_COOPORATION,
    data,
  };
};

export const deleteCooporation = (id) => {
  return async (dispatch, getState) => {
    try {
      let { data } = await axios.delete(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/${id}`
      );
      dispatch(successDeleteCooporation(data));
    } catch (error) {
      console.log(error);
    }
  };
};

export const successDeleteCooporation = (data) => {
  return {
    type: SUCCESS_DELETE_COOPORATION_REQUEST,
    data,
  };
};

export const changeStatusList = (value, id, index_list) => {
  return async (dispatch, getState) => {
    try {
      let dataSend = { status: value };
      let { data } = await axios.put(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/update-status/${id}`,
        dataSend
      );
      dispatch(successChangeStatusList(data, index_list));
    } catch (error) {
      console.log(error);
    }
  };
};

export const successChangeStatusList = (data, index_list) => {
  return {
    type: SUCCESS_CHANGE_STATUS_LIST,
    data,
    index_list,
  };
};
export const setPage = (page) => {
  console.log(page);
  return {
    type: SET_PAGE,
    page,
  };
};

// export const getAllMKCooporation = () => async (dispatch, getState) => {
//   try {
//     dispatch({ type: MK_COOPORATION_REQUEST });

//     let keyword = getState().allMKCooporation.keyword || "";

//     let link = process.env.END_POINT_API_PARTNERSHIP + `api/cooperation`;
//     // if (keyword) link = link.concat(`&keyword=${keyword}`)
//     // if (limit) link = link.concat(`&limit=${limit}`)

//     // const config = {
//     //     headers: {
//     //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
//     //         'Access-Control-Allow-Origin': '*',
//     //         'apikey': process.env.END_POINT_KEY_AUTH
//     //     }
//     // }

//     const { data } = await axios.get(link);

//     dispatch({
//       type: MK_COOPORATION_SUCCESS,
//       payload: data,
//     });
//   } catch (error) {
//     dispatch({
//       type: MK_COOPORATION_FAIL,
//       payload: error.message,
//     });
//   }
// };
