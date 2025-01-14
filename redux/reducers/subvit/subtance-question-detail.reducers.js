import {
  SUBTANCE_QUESTION_DETAIL_REQUEST,
  SUBTANCE_QUESTION_DETAIL_SUCCESS,
  SUBTANCE_QUESTION_DETAIL_FAIL,
  SUBTANCE_QUESTION_RANDOM_DETAIL_REQUEST,
  SUBTANCE_QUESTION_RANDOM_DETAIL_SUCCESS,
  SUBTANCE_QUESTION_RANDOM_DETAIL_FAIL,
  DASHBOARD_SUBVIT_REQUEST,
  DASHBOARD_SUBVIT_SUCCESS,
  DASHBOARD_SUBVIT_FAIL,
  NEW_SUBTANCE_QUESTION_DETAIL_REQUEST,
  NEW_SUBTANCE_QUESTION_DETAIL_SUCCESS,
  NEW_SUBTANCE_QUESTION_DETAIL_RESET,
  NEW_SUBTANCE_QUESTION_DETAIL_FAIL,
  POST_RESULT_REQUEST,
  POST_RESULT_SUCCESS,
  POST_RESULT_RESET,
  POST_RESULT_FAIL,
  DELETE_SUBTANCE_QUESTION_DETAIL_REQUEST,
  DELETE_SUBTANCE_QUESTION_DETAIL_SUCCESS,
  DELETE_SUBTANCE_QUESTION_DETAIL_RESET,
  DELETE_SUBTANCE_QUESTION_DETAIL_FAIL,
  UPDATE_SUBTANCE_QUESTION_DETAIL_REQUEST,
  UPDATE_SUBTANCE_QUESTION_DETAIL_SUCCESS,
  UPDATE_SUBTANCE_QUESTION_DETAIL_RESET,
  UPDATE_SUBTANCE_QUESTION_DETAIL_FAIL,
  DETAIL_SUBTANCE_QUESTION_DETAIL_REQUEST,
  DETAIL_SUBTANCE_QUESTION_DETAIL_SUCCESS,
  DETAIL_SUBTANCE_QUESTION_DETAIL_FAIL,
  IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_REQUEST,
  IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_SUCCESS,
  IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_RESET,
  IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_FAIL,
  IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_REQUEST,
  IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_SUCCESS,
  IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_RESET,
  IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_FAIL,
  CLEAR_ERRORS,
} from "../../types/subvit/subtance-question-detail.type";

export const allSubtanceQuestionDetailReducer = (
  state = { subtance_question_detail: [] },
  action
) => {
  switch (action.type) {
    case SUBTANCE_QUESTION_DETAIL_REQUEST:
      return {
        loading: true,
      };

    case SUBTANCE_QUESTION_DETAIL_SUCCESS:
      return {
        loading: false,
        subtance_question_detail: action.payload.data,
      };

    case SUBTANCE_QUESTION_DETAIL_FAIL:
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

export const randomSubtanceQuestionDetailReducer = (
  state = { random_subtance_question_detail: [] },
  action
) => {
  switch (action.type) {
    case SUBTANCE_QUESTION_RANDOM_DETAIL_REQUEST:
      return {
        loading: true,
      };

    case SUBTANCE_QUESTION_RANDOM_DETAIL_SUCCESS:
      return {
        loading: false,
        random_subtance_question_detail: action.payload.data,
      };

    case SUBTANCE_QUESTION_RANDOM_DETAIL_FAIL:
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

export const getDashboardReducer = (
  state = { dashboard_subvit: [] },
  action
) => {
  switch (action.type) {
    case DASHBOARD_SUBVIT_REQUEST:
      return {
        loading: true,
      };

    case DASHBOARD_SUBVIT_SUCCESS:
      return {
        loading: false,
        dashboard_subvit: action.payload.data,
      };

    case DASHBOARD_SUBVIT_FAIL:
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

export const newSubtanceQuestionDetailReducer = (
  state = { subtance_question_detail: {} },
  action
) => {
  switch (action.type) {
    case NEW_SUBTANCE_QUESTION_DETAIL_REQUEST:
      return {
        loading: true,
      };

    case NEW_SUBTANCE_QUESTION_DETAIL_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        subtance_question_detail: action.payload.data,
      };

    case NEW_SUBTANCE_QUESTION_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case NEW_SUBTANCE_QUESTION_DETAIL_RESET:
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

export const postResultReducer = (state = { post_result: {} }, action) => {
  switch (action.type) {
    case POST_RESULT_REQUEST:
      return {
        loading: true,
      };

    case POST_RESULT_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        post_result: action.payload.data,
      };

    case POST_RESULT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case POST_RESULT_RESET:
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

export const updateSubtanceQuestionDetailReducer = (
  state = { subtance_question_detail: {} },
  action
) => {
  switch (action.type) {
    case UPDATE_SUBTANCE_QUESTION_DETAIL_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_SUBTANCE_QUESTION_DETAIL_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        subtance_question_detail: action.payload.data,
      };

    case UPDATE_SUBTANCE_QUESTION_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case UPDATE_SUBTANCE_QUESTION_DETAIL_RESET:
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

export const deleteSubtanceQuestionDetailReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SUBTANCE_QUESTION_DETAIL_REQUEST:
      return {
        loading: true,
      };

    case DELETE_SUBTANCE_QUESTION_DETAIL_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_SUBTANCE_QUESTION_DETAIL_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case DELETE_SUBTANCE_QUESTION_DETAIL_FAIL:
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

export const detailSubtanceQuestionDetailReducer = (
  state = { subtance_question_detail: {} },
  action
) => {
  switch (action.type) {
    case DETAIL_SUBTANCE_QUESTION_DETAIL_REQUEST:
      return {
        loading: true,
      };

    case DETAIL_SUBTANCE_QUESTION_DETAIL_SUCCESS:
      return {
        loading: false,
        subtance_question_detail: action.payload.data,
      };

    case DETAIL_SUBTANCE_QUESTION_DETAIL_FAIL:
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

export const importFileSubtanceQuestionDetailReducer = (
  state = { subtance_question_file: {} },
  action
) => {
  switch (action.type) {
    case IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_REQUEST:
      return {
        loading: true,
      };

    case IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        subtance_question_file: action.payload.data,
      };

    case IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_RESET:
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

export const importImagesSubtanceQuestionDetailReducer = (
  state = { subtance_question_images: {} },
  action
) => {
  switch (action.type) {
    case IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_REQUEST:
      return {
        loading: true,
      };

    case IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        subtance_question_images: action.payload,
      };

    case IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_RESET:
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
