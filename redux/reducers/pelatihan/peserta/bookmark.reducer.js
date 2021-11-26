import {
  SET_PAGE_VALUE,
  GET_BOOKMARK_REQUEST,
  GET_BOOKMARK_FAIL,
  CLEAR_ERRORS,
  GET_BOOKMARK_SUCCESS,
} from "../../../types/pelatihan/bookmark.type";

const initialStates = {
  bookmark: {},
  page: 1,
};

export const getAllBookmarkPesertaReducer = (state = initialStates, action) => {
  switch (action.type) {
    case GET_BOOKMARK_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case GET_BOOKMARK_SUCCESS:
      return {
        ...state,
        bookmark: action.payload.data,
        loading: false,
      };
    case GET_BOOKMARK_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case SET_PAGE_VALUE: {
      return {
        ...state,
        keyword: action.text,
        page: 1,
      };
    }

    default:
      return state;
  }
};
