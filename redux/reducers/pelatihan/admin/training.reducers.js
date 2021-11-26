import {
  // GET TRAINING
  TRAINING_REQUEST,
  TRAINING_SUCCESS,
  TRAINING_FAIL,
  //CARD TRAINING
  CARD_TRAINING_SUCCESS,
  CARD_TRAINING_FAIL,
  // UPDATE STATUS PUBLISH
  REQUEST_STATUS_PUBLISH,
  UPDATE_STATUS_PUBLISH,
  CLEAR_STATUS,
  FAIL_STATUS_PUBLISH,
  // UPDATE STATUS PELATIHAN
  REQUEST_STATUS_PELATIHAN,
  UPDATE_STATUS_PELATIHAN,
  FAIL_STATUS_PELATIHAN,
  // NEW TRAINING STEP 1
  NEW_TRAINING_STEP1_REQUEST,
  NEW_TRAINING_STEP1_SUCCESS,
  NEW_TRAINING_STEP1_RESET,
  NEW_TRAINING_STEP1_FAIL,
  // NEW TRAINING STEP 2
  NEW_TRAINING_STEP2_REQUEST,
  NEW_TRAINING_STEP2_SUCCESS,
  NEW_TRAINING_STEP2_RESET,
  NEW_TRAINING_STEP2_FAIL,
  // NEW TRAINING STEP 3
  NEW_TRAINING_STEP3_REQUEST,
  NEW_TRAINING_STEP3_SUCCESS,
  NEW_TRAINING_STEP3_RESET,
  NEW_TRAINING_STEP3_FAIL,
  // DETAIL TRAINING STEP 1
  DETAIL_TRAINING_STEP1_REQUEST,
  DETAIL_TRAINING_STEP1_SUCCESS,
  DETAIL_TRAINING_STEP1_FAIL,
  // DETAIL TRAINING STEP 2
  DETAIL_TRAINING_STEP2_REQUEST,
  DETAIL_TRAINING_STEP2_SUCCESS,
  DETAIL_TRAINING_STEP2_FAIL,
  // DETAIL TRAINING STEP 3
  DETAIL_TRAINING_STEP3_REQUEST,
  DETAIL_TRAINING_STEP3_SUCCESS,
  DETAIL_TRAINING_STEP3_FAIL,
  // DETAIL TRAINING STEP 4
  DETAIL_TRAINING_STEP4_REQUEST,
  DETAIL_TRAINING_STEP4_SUCCESS,
  DETAIL_TRAINING_STEP4_FAIL,
  // UPDATE TRAINING STEP 1
  UPDATE_TRAINING_STEP1_REQUEST,
  UPDATE_TRAINING_STEP1_SUCCESS,
  UPDATE_TRAINING_STEP1_RESET,
  UPDATE_TRAINING_STEP1_FAIL,
  // UPDATE TRAINING STEP 2
  UPDATE_TRAINING_STEP2_REQUEST,
  UPDATE_TRAINING_STEP2_SUCCESS,
  UPDATE_TRAINING_STEP2_RESET,
  UPDATE_TRAINING_STEP2_FAIL,
  // UPDATE TRAINING STEP 3
  UPDATE_TRAINING_STEP3_REQUEST,
  UPDATE_TRAINING_STEP3_SUCCESS,
  UPDATE_TRAINING_STEP3_RESET,
  UPDATE_TRAINING_STEP3_FAIL,
  // DELETE TRAINING
  DELETE_TRAINING_REQUEST,
  DELETE_TRAINING_SUCCESS,
  DELETE_TRAINING_RESET,
  DELETE_TRAINING_FAIL,
  // DETAIL LPJ
  DETAIL_LPJ_REQUEST,
  DETAIL_LPJ_SUCCESS,
  DETAIL_LPJ_FAIL,
  // ADD LPJ
  ADD_LPJ_REQUEST,
  ADD_LPJ_SUCCESS,
  ADD_LPJ_RESET,
  ADD_LPJ_FAIL,
  // DETAIL EVIDENCE
  DETAIL_EVIDENCE_REQUEST,
  DETAIL_EVIDENCE_SUCCESS,
  DETAIL_EVIDENCE_FAIL,
  // ADD EVIDENCE
  ADD_EVIDENCE_REQUEST,
  ADD_EVIDENCE_SUCCESS,
  ADD_EVIDENCE_RESET,
  ADD_EVIDENCE_FAIL,
  // CLONE EVIDENCE
  CLONE_TRAINING_REQUEST,
  CLONE_TRAINING_SUCCESS,
  CLONE_TRAINING_RESET,
  CLONE_TRAINING_FAIL,
  CLEAR_ERRORS,
  GET_EDIT_DATA_TRAINING,
  GET_EDIT_DATA_TRAINING2,
  GET_EDIT_DATA_TRAINING3,
  GET_FORM_LPJ,
  GET_FORM_EVIDENCE,
  FAILED_GET_FORM_EVIDENCE,
} from "../../../types/pelatihan/training.type";

export const allTrainingReducer = (state = { training: [] }, action) => {
  switch (action.type) {
    case TRAINING_REQUEST:
      return {
        loading: true,
      };

    case TRAINING_SUCCESS:
      return {
        loading: false,
        training: action.payload.data,
      };

    case TRAINING_FAIL:
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

export const cardTrainingReducer = (state = { training: {} }, action) => {
  switch (action.type) {
    case CARD_TRAINING_SUCCESS:
      return {
        training: action.payload.data,
      };

    case CARD_TRAINING_FAIL:
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

export const newTrainingReducer = (state = { training: {} }, action) => {
  switch (action.type) {
    case NEW_TRAINING_STEP1_REQUEST:
    case NEW_TRAINING_STEP2_REQUEST:
    case NEW_TRAINING_STEP3_REQUEST:
      return {
        loading: true,
      };

    case NEW_TRAINING_STEP1_SUCCESS:
    case NEW_TRAINING_STEP2_SUCCESS:
    case NEW_TRAINING_STEP3_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        training: action.payload.data,
      };

    case NEW_TRAINING_STEP1_FAIL:
    case NEW_TRAINING_STEP2_FAIL:
    case NEW_TRAINING_STEP3_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case NEW_TRAINING_STEP1_RESET:
    case NEW_TRAINING_STEP2_RESET:
    case NEW_TRAINING_STEP3_RESET:
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

export const detailTrainingReducer = (state = { training: {} }, action) => {
  switch (action.type) {
    case DETAIL_TRAINING_STEP1_REQUEST:
    case DETAIL_TRAINING_STEP2_REQUEST:
    case DETAIL_TRAINING_STEP3_REQUEST:
    case DETAIL_TRAINING_STEP4_REQUEST:
      return {
        loading: true,
      };

    case DETAIL_TRAINING_STEP1_SUCCESS:
    case DETAIL_TRAINING_STEP2_SUCCESS:
    case DETAIL_TRAINING_STEP3_SUCCESS:
    case DETAIL_TRAINING_STEP4_SUCCESS:
      return {
        loading: false,
        training: action.payload,
      };

    case DETAIL_TRAINING_STEP1_FAIL:
    case DETAIL_TRAINING_STEP2_FAIL:
    case DETAIL_TRAINING_STEP3_FAIL:
    case DETAIL_TRAINING_STEP4_FAIL:
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

export const deleteTrainingReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TRAINING_REQUEST:
      return {
        loading: true,
      };

    case DELETE_TRAINING_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_TRAINING_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case DELETE_TRAINING_FAIL:
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

export const updateTrainingReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_TRAINING_STEP1_REQUEST:
    case UPDATE_TRAINING_STEP2_REQUEST:
    case UPDATE_TRAINING_STEP3_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_TRAINING_STEP1_SUCCESS:
    case UPDATE_TRAINING_STEP2_SUCCESS:
    case UPDATE_TRAINING_STEP3_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload.status,
      };

    case UPDATE_TRAINING_STEP1_RESET:
    case UPDATE_TRAINING_STEP2_RESET:
    case UPDATE_TRAINING_STEP3_RESET:
      return {
        loading: false,
        isUpdated: false,
      };

    case UPDATE_TRAINING_STEP1_FAIL:
    case UPDATE_TRAINING_STEP2_FAIL:
    case UPDATE_TRAINING_STEP3_FAIL:
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

export const detailLpjReducer = (state = { lpj: {} }, action) => {
  switch (action.type) {
    case DETAIL_LPJ_REQUEST:
      return {
        loading: true,
      };

    case DETAIL_LPJ_SUCCESS:
      return {
        loading: false,
        lpj: action.payload,
      };

    case DETAIL_LPJ_FAIL:
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

export const addLpjReducer = (state = { lpj: {} }, action) => {
  switch (action.type) {
    case ADD_LPJ_REQUEST:
      return {
        loading: true,
      };

    case ADD_LPJ_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        lpj: action.payload.data,
      };

    case ADD_LPJ_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ADD_LPJ_RESET:
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

export const detailEvidenceReducer = (state = { evidence: {} }, action) => {
  switch (action.type) {
    case DETAIL_EVIDENCE_REQUEST:
      return {
        loading: true,
      };

    case DETAIL_EVIDENCE_SUCCESS:
      return {
        loading: false,
        evidence: action.payload,
      };

    case DETAIL_EVIDENCE_FAIL:
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

export const addEvidenceReducer = (state = { evidence: {} }, action) => {
  switch (action.type) {
    case ADD_EVIDENCE_REQUEST:
      return {
        loading: true,
      };

    case ADD_EVIDENCE_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        evidence: action.payload.data,
      };

    case ADD_EVIDENCE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ADD_EVIDENCE_RESET:
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

export const cloneTrainingReducer = (state = {}, action) => {
  switch (action.type) {
    case CLONE_TRAINING_REQUEST:
      return {
        loading: true,
      };

    case CLONE_TRAINING_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        training: action.payload.data,
      };

    case CLONE_TRAINING_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLONE_TRAINING_RESET:
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

export const updateStatusReducer = (state = { status: {} }, action) => {
  switch (action.type) {
    case REQUEST_STATUS_PUBLISH:
    case REQUEST_STATUS_PELATIHAN:
      return {
        loading: true,
      };

    case UPDATE_STATUS_PUBLISH:
    case UPDATE_STATUS_PELATIHAN:
      return {
        loading: false,
        success: action.payload.message,
        status: action.payload.data,
      };

    case FAIL_STATUS_PUBLISH:
    case FAIL_STATUS_PELATIHAN:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_STATUS:
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

export const getEditTrainingReducer = (
  state = { data: { name: "" } },
  action
) => {
  switch (action.type) {
    case GET_EDIT_DATA_TRAINING:
      return {
        ...state,
        data: action.payload.data,
      };

    default:
      return state;
  }
};

export const getEditTraining2Reducer = (
  state = { data: { name: "" } },
  action
) => {
  switch (action.type) {
    case GET_EDIT_DATA_TRAINING2:
      return {
        ...state,
        data: action.payload.data,
      };

    default:
      return state;
  }
};

export const getEditTraining3Reducer = (state = { data: {} }, action) => {
  switch (action.type) {
    case GET_EDIT_DATA_TRAINING3:
      return {
        ...state,
        data: action.payload.data,
      };

    default:
      return state;
  }
};

export const getFormLPJReducer = (state = { data: {} }, action) => {
  switch (action.type) {
    case GET_FORM_LPJ:
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
};

export const getFormEvidenceReducer = (state = { data: {} }, action) => {
  switch (action.type) {
    case GET_FORM_EVIDENCE:
      return {
        ...state,
        data: action.payload.data,
      };

    case FAILED_GET_FORM_EVIDENCE:
      return {
        ...state,
        data: {},
      };
    default:
      return state;
  }
};
