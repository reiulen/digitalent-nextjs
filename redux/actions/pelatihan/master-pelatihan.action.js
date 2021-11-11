import axios from "axios";
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
  RESET_VALUE_FILTER,
  SET_KEYWORD_VALUE,
  SET_LIMIT_VALUE,
  SET_PAGE_VALUE,
  FAIL_STATUS_PUBLISH,
  REQUEST_STATUS_PUBLISH,
  UPDATE_STATUS_PUBLISH,
} from "../../types/pelatihan/master-pelatihan.type";

export const getAllListMasterPelatihan =
  (token) => async (dispatch, getState) => {
    try {
      dispatch({ type: LIST_MASTER_TRAINING_REQUEST });
      let link =
        process.env.END_POINT_API_PELATIHAN + `api/v1/formBuilder/find`;
      let pageState = getState().getAllMasterPelatihan.page || 1;
      let limitState = getState().getAllMasterPelatihan.limit || 5;
      let statusState = getState().getAllMasterPelatihan.theme || 0;
      let keywordState = getState().allCertificates.cari || "";
      //    getAllMasterPelatihan: allMasterPelatihanListReducer,
      //   deleteMasterPelatihan: deleteMasterPelatihanReducer,
      //   getDetailMasterPelatihan: detailMasterPelatihanReducer,
      //   newMasterPelatihan: newMasterTrainingReducer,
      //   updateMasterPelatihan: updateMasterPelatihanReducer,
      console.log("^^ ini getState");
      const params = {
        page: pageState,
        limit: limitState,
        status: statusState,
        cari: keywordState,
      };

      const config = {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      //   const { data } = await axios.get(link, config);
      //   if (data) {
      //     dispatch({ type: LIST_MASTER_TRAINING_SUCCESS, payload: data });
      //   }
    } catch (error) {
      //   dispatch({
      //     type: LIST_MASTER_TRAINING_FAIL,
      //     payload: error.response.data.message,
      //   });
    }
  };

export const searchKeyword = (text) => {
  return {
    type: SET_KEYWORD_VALUE,
    text,
  };
};

export const setValuePage = (text) => {
  return {
    type: SET_PAGE_VALUE,
    text,
  };
};

export const setValueLimit = (text) => {
  return {
    type: SET_LIMIT_VALUE,
    text,
  };
};

export const getDetailMasterPelatihan = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_MASTER_TRAINING_REQUEST });
    let link =
      process.env.END_POINT_API_SERTIFIKAT + `api/manage_certificates/${id}`;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.get(link, config);

    if (data) {
      dispatch({ type: DETAIL_MASTER_TRAINING_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: DETAIL_MASTER_TRAINING_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newSertifikat = (id, formData, token) => async (dispatch) => {
  try {
    dispatch({ type: NEW_SERTIFIKAT_REQUEST });
    let link =
      process.env.END_POINT_API_SERTIFIKAT +
      `api/manage_certificates/store/${id}`;

    const config = {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };

    const { data } = await axios.post(link, formData, config);

    if (data) {
      dispatch({ type: NEW_SERTIFIKAT_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: NEW_SERTIFIKAT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};

export const updateSertifikat = (id, formData, token) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_SERTIFIKAT_REQUEST });

    let link =
      process.env.END_POINT_API_SERTIFIKAT +
      `api/manage_certificates/update/${id}`;

    const config = {
      headers: {
        Authorization: `Bearer ${token.token}`,
      },
    };

    const { data } = await axios.post(link, formData, config);

    if (data) {
      dispatch({ type: UPDATE_SERTIFIKAT_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({
      type: UPDATE_SERTIFIKAT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteTraining = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_MASTER_TRAINING_REQUEST });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.delete(
      process.env.END_POINT_API_PELATIHAN +
        `api/v1/formBuilder/delete?id=${id}`,
      config
    );

    dispatch({
      type: DELETE_MASTER_TRAINING_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: DELETE_MASTER_TRAINING_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateStatusPublishMaster =
  (dataStatus, token) => async (dispatch) => {
    try {
      dispatch({
        type: REQUEST_STATUS_PUBLISH,
      });

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.post(
        process.env.END_POINT_API_PELATIHAN +
          "api/v1/formBuilder/update-status-publish",
        dataStatus,
        config
      );

      dispatch({
        type: UPDATE_STATUS_PUBLISH,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FAIL_STATUS_PUBLISH,
        payload: error.response.data.message,
      });
    }
  };