import {
  REGISTER_SUCCESS,
  REGISTER_ERROR,
  REGISTER_PROCESS,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_PROCESS,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_PROCESS,
  RECOVERY_PASSWORD_SUCCESS,
  RECOVERY_PASSWORD_ERROR,
  RECOVERY_PASSWORD_PROCESS,
  RESET_STATUS,
} from "../../../types/partnership/user/authentication.type";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  status: statuslist.idle,
  data_login: [],
  data_register: [],
  data_reset: [],
  data_recorvery: [],
};

export const authenticationReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        data_register: action.payload,
      };
    case REGISTER_ERROR:
      return {
        ...state,
        status: statuslist.error,
        errorRegister: action.payload,
      };
    case REGISTER_PROCESS:
      return {
        ...state,
        status: statuslist.process,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        data_login: action.payload,
      };
    case LOGIN_ERROR:
      return {
        ...state,
        status: statuslist.error,
        errorLogin: action.payload,
      };
    case LOGIN_PROCESS:
      return {
        ...state,
        status: statuslist.process,
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        data_reset: action.payload,
      };
    case RESET_PASSWORD_ERROR:
      return {
        ...state,
        status: statuslist.error,
        errorReset: action.payload,
      };
    case RESET_PASSWORD_PROCESS:
      return {
        ...state,
        status: statuslist.process,
      };
    case RECOVERY_PASSWORD_SUCCESS:
      return {
        ...state,
        status: statuslist.success,
        data_recorvery: action.payload,
      };
    case RECOVERY_PASSWORD_ERROR:
      return {
        ...state,
        status: statuslist.error,
        errorRecorvery: action.payload,
      };
    case RECOVERY_PASSWORD_PROCESS:
      return {
        ...state,
        status: statuslist.process,
      };
    case RESET_STATUS:
      return {
        ...state,
        status: statuslist.idle,
      };

    default:
      return state;
  }
};
