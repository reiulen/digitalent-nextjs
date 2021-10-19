import {
  LIST_REVIEW_REQUEST,
  LIST_REVIEW_SUCCESS,
  LIST_REVIEW_FAIL,
  CARD_REVIEW_SUCCESS,
  CARD_REVIEW_FAIL,
  GET_LIST_REVISI_SUCCESS,
  GET_LIST_REVISI_FAIL,
  GET_REVIEW_STEP1_SUCCESS,
  GET_REVIEW_STEP1_FAIL,
  GET_REVIEW_STEP2_SUCCESS,
  GET_REVIEW_STEP2_FAIL,
  GET_REVIEW_STEP3_SUCCESS,
  GET_REVIEW_STEP3_FAIL,
  REVISI_REVIEW_REQUEST,
  REVISI_REVIEW_SUCCESS,
  REVISI_REVIEW_FAIL,
  REVISI_REVIEW_RESET,
  TOLAK_REVIEW_REQUEST,
  TOLAK_REVIEW_SUCCESS,
  TOLAK_REVIEW_FAIL,
  TOLAK_REVIEW_RESET,
  CLEAR_ERRORS,
} from "../../../types/pelatihan/review.type";

export const allListReviewReducer = (state = { review: [] }, action) => {
  switch (action.type) {
    case LIST_REVIEW_REQUEST:
      return {
        loading: true,
      };

    case LIST_REVIEW_SUCCESS:
      return {
        loading: false,
        review: action.payload.data,
      };

    case LIST_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const cardReviewReducer = (state = { review: {} }, action) => {
  switch (action.type) {
    case CARD_REVIEW_SUCCESS:
      return {
        review: action.payload.data,
      };

    case CARD_REVIEW_FAIL:
      return {
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const listRevisiReducer = (state = { revisi: [] }, action) => {
  switch (action.type) {
    case GET_LIST_REVISI_SUCCESS:
      return {
        revisi: action.payload.data,
      };

    case GET_LIST_REVISI_FAIL:
      return {
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getReviewStep1Reducer = (state = { review: {} }, action) => {
  switch (action.type) {
    case GET_REVIEW_STEP1_SUCCESS:
      return {
        review: action.payload.data,
      };

    case GET_REVIEW_STEP1_FAIL:
      return {
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getReviewStep2Reducer = (state = { review: {} }, action) => {
  switch (action.type) {
    case GET_REVIEW_STEP2_SUCCESS:
      return {
        review: action.payload.data,
      };

    case GET_REVIEW_STEP2_FAIL:
      return {
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const getReviewStep3Reducer = (state = { review: {} }, action) => {
  switch (action.type) {
    case GET_REVIEW_STEP3_SUCCESS:
      return {
        review: action.payload.data,
      };

    case GET_REVIEW_STEP3_FAIL:
      return {
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const revisiReviewReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case REVISI_REVIEW_REQUEST:
      return {
        loading: true,
      };

    case REVISI_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload.data,
      };

    case REVISI_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case REVISI_REVIEW_RESET:
      return {
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const tolakReviewReducer = (state = { success: false }, action) => {
  switch (action.type) {
    case TOLAK_REVIEW_REQUEST:
      return {
        loading: true,
      };

    case TOLAK_REVIEW_SUCCESS:
      return {
        loading: false,
        success: action.payload.data,
      };

    case TOLAK_REVIEW_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case TOLAK_REVIEW_RESET:
      return {
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
