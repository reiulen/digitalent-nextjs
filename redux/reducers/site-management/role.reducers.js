import {
  ROLE_REQUEST,
  ROLE_SUCCESS,
  ROLE_FAIL,
  NEW_ROLE_REQUEST,
  NEW_ROLE_SUCCESS,
  NEW_ROLE_RESET,
  NEW_ROLE_FAIL,
  UPDATE_ROLE_REQUEST,
  UPDATE_ROLE_SUCCESS,
  UPDATE_ROLE_RESET,
  UPDATE_ROLE_FAIL,
  DELETE_ROLE_REQUEST,
  DELETE_ROLE_SUCCESS,
  DELETE_ROLE_RESET,
  DELETE_ROLE_FAIL,
  DETAIL_ROLE_REQUEST,
  DETAIL_ROLE_SUCCESS,
  DETAIL_ROLE_FAIL,
  CLEAR_ERRORS,
} from "../../types/site-management/role.type";

export const allRolesReducer = (state = { role: [] }, action) => {
  switch (action.type) {
    case ROLE_REQUEST:
      return {
        loading: true,
      };

    case ROLE_SUCCESS:
      return {
        loading: false,
        role: action.payload.data,
      };

    case ROLE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        error: null,
      };

    default:
      return state;
  }
};

export const newRolesReducer = (state = { role: {} }, action) => {
  switch (action.type) {
    case NEW_ROLE_REQUEST:
      return {
        loading: true,
      };

    case NEW_ROLE_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        role: action.payload.data,
      };

    case NEW_ROLE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case NEW_ROLE_RESET:
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

export const detailRolesReducer = (state = { role: {} }, action) => {
  switch (action.type) {
    case DETAIL_ROLE_REQUEST:
      return {
        loading: true,
      };

    case DETAIL_ROLE_SUCCESS:
      return {
        loading: false,
        role: action.payload,
      };

    case DETAIL_ROLE_FAIL:
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

export const updateRolesReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ROLE_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_ROLE_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_ROLE_RESET:
      return {
        loading: false,
        isUpdated: false,
      };

    case UPDATE_ROLE_FAIL:
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

export const deleteRolesReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_ROLE_REQUEST:
      return {
        loading: true,
      };

    case DELETE_ROLE_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_ROLE_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case DELETE_ROLE_FAIL:
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
