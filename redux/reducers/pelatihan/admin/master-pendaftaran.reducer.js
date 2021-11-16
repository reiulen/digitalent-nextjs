import {
  LIST_MASTER_TRAINING_REQUEST,
  LIST_MASTER_TRAINING_SUCCESS,
  LIST_MASTER_TRAINING_FAIL,
  NEW_MASTER_TRAINING_SUCCESS,
  NEW_MASTER_TRAINING_FAIL,
  NEW_MASTER_TRAINING_REQUEST,
  NEW_MASTER_TRAINING_RESET,
  DELETE_MASTER_TRAINING_FAIL,
  DELETE_MASTER_TRAINING_REQUEST,
  DELETE_MASTER_TRAINING_RESET,
  DELETE_MASTER_TRAINING_SUCCESS,
  DETAIL_MASTER_TRAINING_FAIL,
  DETAIL_MASTER_TRAINING_REQUEST,
  DETAIL_MASTER_TRAINING_SUCCESS,
  UPDATE_MASTER_TRAINING_FAIL,
  UPDATE_MASTER_TRAINING_REQUEST,
  UPDATE_MASTER_TRAINING_RESET,
  UPDATE_MASTER_TRAINING_SUCCESS,
  CLEAR_ERRORS,
  RESET_STATUS_FILTER,
  SET_KEYWORD_VALUE,
  SET_LIMIT_VALUE,
  SET_PAGE_VALUE,
  REQUEST_STATUS_PUBLISH,
  UPDATE_STATUS_PUBLISH,
  FAIL_STATUS_PUBLISH,
  SET_STATUS_VALUE,
} from "../../../types/pelatihan/master-pendaftaran.type";

const initialStates = {
  list: [],
  //
  page: 1,
  limit: 5,
  status: "",
  cari: "",
};

export const allMasterPelatihanListReducer = (
  state = initialStates,
  action
) => {
  switch (action.type) {
    case LIST_MASTER_TRAINING_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case LIST_MASTER_TRAINING_SUCCESS:
      return {
        ...state,
        loading: false,
        list: action.payload.data,
      };

    case LIST_MASTER_TRAINING_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SET_KEYWORD_VALUE: {
      return {
        ...state,
        cari: action.text,
        page: 1,
      };
    }

    case SET_PAGE_VALUE: {
      return {
        ...state,
        page: action.text,
      };
    }

    case SET_LIMIT_VALUE: {
      return {
        ...state,
        limit: action.text,
      };
    }

    case SET_STATUS_VALUE: {
      return {
        ...state,
        status: action.text,
      };
    }

    case RESET_STATUS_FILTER: {
      return {
        ...state,
        status: "",
        page: 1,
        limit: 5,
        cari: "",
      };
    }

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const newMasterTrainingReducer = (state = {}, action) => {
  switch (action.type) {
    case NEW_MASTER_TRAINING_REQUEST:
      return {
        loading: true,
      };

    case NEW_MASTER_TRAINING_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        form: action.payload,
      };

    case NEW_MASTER_TRAINING_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case NEW_MASTER_TRAINING_RESET:
      return {
        success: false,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
      };

    default:
      return state;
  }
};

export const detailMasterPelatihanReducer = (state = { form: {} }, action) => {
  switch (action.type) {
    case DETAIL_MASTER_TRAINING_REQUEST:
      return {
        loading: true,
      };
    case DETAIL_MASTER_TRAINING_SUCCESS:
      return {
        loading: false,
        form: action.payload,
      };

    case DETAIL_MASTER_TRAINING_FAIL:
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

export const deleteMasterPelatihanReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_MASTER_TRAINING_REQUEST:
      return {
        loading: true,
      };

    case DELETE_MASTER_TRAINING_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_MASTER_TRAINING_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case DELETE_MASTER_TRAINING_FAIL:
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

export const updateMasterPelatihanReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_MASTER_TRAINING_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_MASTER_TRAINING_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
        success: true,
      };

    case UPDATE_MASTER_TRAINING_RESET:
      return {
        loading: false,
        isUpdated: false,
        success: false,
      };

    case UPDATE_MASTER_TRAINING_FAIL:
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

export const updateStatusMasterReducer = (state = { status: {} }, action) => {
  switch (action.type) {
    case REQUEST_STATUS_PUBLISH:
      return {
        loading: true,
      };

    case UPDATE_STATUS_PUBLISH:
      return {
        loading: false,
        success: action.payload.message,
        status: action.payload.data,
      };

    case FAIL_STATUS_PUBLISH:
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
