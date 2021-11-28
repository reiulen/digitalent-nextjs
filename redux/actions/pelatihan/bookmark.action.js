import axios from "axios";
import {
  SET_PAGE_VALUE,
  GET_BOOKMARK_REQUEST,
  GET_BOOKMARK_FAIL,
  CLEAR_ERRORS,
  GET_BOOKMARK_SUCCESS,
} from "../../types/pelatihan/bookmark.type";

export const getAllBookmark = (token) => async (dispatch, getState) => {
  try {
    let link =
      process.env.END_POINT_API_PELATIHAN +
      `api/v1/bookmart-peserta/list-bookmart-peserta`;
    let pageState = getState().allBookmark.page || 1;

    const params = {
      page: pageState,
    };

    const config = {
      params,
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.get(link, config);
    dispatch({
      type: GET_BOOKMARK_SUCCESS,
      payload: data,
    });

    return data;
  } catch (error) {
    dispatch({
      type: GET_BOOKMARK_FAIL,
      payload: error?.response?.data?.message || error.message,
    });
  }
};

export const setValuePage = (text) => {
  return {
    type: SET_PAGE_VALUE,
    text,
  };
};
