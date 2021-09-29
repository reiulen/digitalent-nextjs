import {
  MASTER_SATUAN_KERJA_PENYELENGGARA_REQUEST,
  MASTER_SATUAN_KERJA_PENYELENGGARA_SUCCESS,
  MASTER_SATUAN_KERJA_PENYELENGGARA_FAIL,
  NEW_MASTER_SATUAN_KERJA_PENYELENGGARA_REQUEST,
  NEW_MASTER_SATUAN_KERJA_PENYELENGGARA_SUCCESS,
  NEW_MASTER_SATUAN_KERJA_PENYELENGGARA_RESET,
  NEW_MASTER_SATUAN_KERJA_PENYELENGGARA_FAIL,
  UPDATE_MASTER_SATUAN_KERJA_PENYELENGGARA_REQUEST,
  UPDATE_MASTER_SATUAN_KERJA_PENYELENGGARA_SUCCESS,
  UPDATE_MASTER_SATUAN_KERJA_PENYELENGGARA_RESET,
  UPDATE_MASTER_SATUAN_KERJA_PENYELENGGARA_FAIL,
  DELETE_MASTER_SATUAN_KERJA_PENYELENGGARA_REQUEST,
  DELETE_MASTER_SATUAN_KERJA_PENYELENGGARA_SUCCESS,
  DELETE_MASTER_SATUAN_KERJA_PENYELENGGARA_RESET,
  DELETE_MASTER_SATUAN_KERJA_PENYELENGGARA_FAIL,
  DETAIL_MASTER_SATUAN_KERJA_PENYELENGGARA_REQUEST,
  DETAIL_MASTER_SATUAN_KERJA_PENYELENGGARA_SUCCESS,
  DETAIL_MASTER_SATUAN_KERJA_PENYELENGGARA_FAIL,
  CLEAR_ERRORS,
} from "../../types/site-management/master-satuan-kerja-penyelenggara.type";

export const allMasterSatuanKerjaPenyelenggarasReducer = (
  state = { master_satuan_kerja_penyelenggara: [] },
  action
) => {
  switch (action.type) {
    case MASTER_SATUAN_KERJA_PENYELENGGARA_REQUEST:
      return {
        loading: true,
      };

    case MASTER_SATUAN_KERJA_PENYELENGGARA_SUCCESS:
      return {
        loading: false,
        master_satuan_kerja_penyelenggara: action.payload.data,
      };

    case MASTER_SATUAN_KERJA_PENYELENGGARA_FAIL:
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

export const newMasterSatuanKerjaPenyelenggarasReducer = (
  state = { master_satuan_kerja_penyelenggara: {} },
  action
) => {
  switch (action.type) {
    case NEW_MASTER_SATUAN_KERJA_PENYELENGGARA_REQUEST:
      return {
        loading: true,
      };

    case NEW_MASTER_SATUAN_KERJA_PENYELENGGARA_SUCCESS:
      return {
        loading: false,
        success: action.payload.message,
        master_satuan_kerja_penyelenggara: action.payload.data,
      };

    case NEW_MASTER_SATUAN_KERJA_PENYELENGGARA_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case NEW_MASTER_SATUAN_KERJA_PENYELENGGARA_RESET:
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

export const detailMasterSatuanKerjaPenyelenggarasReducer = (
  state = { master_satuan_kerja_penyelenggara: {} },
  action
) => {
  switch (action.type) {
    case DETAIL_MASTER_SATUAN_KERJA_PENYELENGGARA_REQUEST:
      return {
        loading: true,
      };

    case DETAIL_MASTER_SATUAN_KERJA_PENYELENGGARA_SUCCESS:
      return {
        loading: false,
        master_satuan_kerja_penyelenggara: action.payload,
      };

    case DETAIL_MASTER_SATUAN_KERJA_PENYELENGGARA_FAIL:
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

export const updateMasterSatuanKerjaPenyelenggaraReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case UPDATE_MASTER_SATUAN_KERJA_PENYELENGGARA_REQUEST:
      return {
        loading: true,
      };

    case UPDATE_MASTER_SATUAN_KERJA_PENYELENGGARA_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };

    case UPDATE_MASTER_SATUAN_KERJA_PENYELENGGARA_RESET:
      return {
        loading: false,
        isUpdated: false,
      };

    case UPDATE_MASTER_SATUAN_KERJA_PENYELENGGARA_FAIL:
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

export const deleteMasterSatuanKerjaPenyelenggarasReducer = (
  state = {},
  action
) => {
  switch (action.type) {
    case DELETE_MASTER_SATUAN_KERJA_PENYELENGGARA_REQUEST:
      return {
        loading: true,
      };

    case DELETE_MASTER_SATUAN_KERJA_PENYELENGGARA_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };

    case DELETE_MASTER_SATUAN_KERJA_PENYELENGGARA_RESET:
      return {
        loading: false,
        isDeleted: false,
      };

    case DELETE_MASTER_SATUAN_KERJA_PENYELENGGARA_FAIL:
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
