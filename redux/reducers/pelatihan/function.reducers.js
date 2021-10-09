import {
  GET_TRAINING_STEP1,
  STORE_TRAINING_STEP1,
  RESET_TRAINING_STEP1,
  GET_REGISTRATION_STEP2,
  STORE_REGISTRATION_STEP2,
  RESET_REGISTRATION_STEP2,
  GET_COMMITMENT_STEP3,
  STORE_COMMITMENT_STEP3,
  RESET_COMMITMENT_STEP3,
  //dropdown
  GET_DROPDOWN_AKADEMI,
  ERROR_DROPDOWN_AKADEMI,
  GET_DROPDOWN_TEMA,
  ERROR_DROPDOWN_TEMA,
  GET_DROPDOWN_PELATIHAN,
  ERROR_DROPDOWN_PELATIHAN,
  CLEAR_ERRORS,
} from "../../types/pelatihan/function.type";

export const trainingStep1Reducer = (state = { trainingData: {} }, action) => {
  switch (action.type) {
    case GET_TRAINING_STEP1:
      return {
        ...state,
        trainingData: action.payload,
      };
    case STORE_TRAINING_STEP1:
      return {
        ...state,
        trainingData: action.payload,
      };
    case RESET_TRAINING_STEP1:
      return {
        ...state,
        trainingData: {},
      };
    default:
      return state;
  }
};

export const registrationStep2Reducer = (
  state = { registrationData: {} },
  action
) => {
  switch (action.type) {
    case GET_REGISTRATION_STEP2:
      return {
        ...state,
        registrationData: action.payload,
      };
    case STORE_REGISTRATION_STEP2:
      return {
        ...state,
        registrationData: action.payload,
      };
    case RESET_REGISTRATION_STEP2:
      return {
        ...state,
        registrationData: {},
      };
    default:
      return state;
  }
};

export const commitmentStep3Reducer = (
  state = { commitmentData: {} },
  action
) => {
  switch (action.type) {
    case GET_COMMITMENT_STEP3:
      return {
        ...state,
        commitmentData: action.payload,
      };
    case STORE_COMMITMENT_STEP3:
      return {
        ...state,
        commitmentData: action.payload,
      };
    case RESET_COMMITMENT_STEP3:
      return {
        ...state,
        commitmentData: {},
      };
    default:
      return state;
  }
};

export const drowpdownReducers = (state = { data: [] }, action) => {
  switch (action.type) {
    case GET_DROPDOWN_AKADEMI:
      return {
        ...state,
        data: action.payload.data,
      };
      break;
    case ERROR_DROPDOWN_AKADEMI:
      return {
        ...state,
        error: action.payload,
      };
      break;
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
