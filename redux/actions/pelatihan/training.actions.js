import {
  // GET TRAINING
  TRAINING_REQUEST,
  TRAINING_SUCCESS,
  TRAINING_FAIL,
  // NEW TRAINING STEP 1
  NEW_TRAINING_STEP1_REQUEST,
  NEW_TRAINING_STEP1_SUCCESS,
  NEW_TRAINING_STEP1_FAIL,
  // NEW TRAINING STEP 2
  NEW_TRAINING_STEP2_REQUEST,
  NEW_TRAINING_STEP2_SUCCESS,
  NEW_TRAINING_STEP2_FAIL,
  // NEW TRAINING STEP 3
  NEW_TRAINING_STEP3_REQUEST,
  NEW_TRAINING_STEP3_SUCCESS,
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
  UPDATE_TRAINING_STEP1_FAIL,
  // UPDATE TRAINING STEP 2
  UPDATE_TRAINING_STEP2_REQUEST,
  UPDATE_TRAINING_STEP2_SUCCESS,
  UPDATE_TRAINING_STEP2_FAIL,
  // UPDATE TRAINING STEP 3
  UPDATE_TRAINING_STEP3_REQUEST,
  UPDATE_TRAINING_STEP3_SUCCESS,
  UPDATE_TRAINING_STEP3_FAIL,
  // DELETE TRAINING
  DELETE_TRAINING_REQUEST,
  DELETE_TRAINING_SUCCESS,
  DELETE_TRAINING_FAIL,
  // DETAIL LPJ
  DETAIL_LPJ_REQUEST,
  DETAIL_LPJ_SUCCESS,
  DETAIL_LPJ_FAIL,
  // ADD LPJ
  ADD_LPJ_REQUEST,
  ADD_LPJ_SUCCESS,
  ADD_LPJ_FAIL,
  // DETAIL EVIDENCE
  DETAIL_EVIDENCE_REQUEST,
  DETAIL_EVIDENCE_SUCCESS,
  DETAIL_EVIDENCE_FAIL,
  // ADD EVIDENCE
  ADD_EVIDENCE_REQUEST,
  ADD_EVIDENCE_SUCCESS,
  ADD_EVIDENCE_FAIL,
  // CLONE EVIDENCE
  CLONE_TRAINING_REQUEST,
  CLONE_TRAINING_SUCCESS,
  CLONE_TRAINING_FAIL,
  CLEAR_ERRORS,
  // UPDATE STATUS PUBLISH
  REQUEST_STATUS_PUBLISH,
  UPDATE_STATUS_PUBLISH,
  CLEAR_STATUS_PUBLISH,
  FAIL_STATUS_PUBLISH,
  // UPDATE STATUS PELATIHAN
  REQUEST_STATUS_PELATIHAN,
  UPDATE_STATUS_PELATIHAN,
  CLEAR_STATUS_PELATIHAN,
  FAIL_STATUS_PELATIHAN,
} from "../../types/pelatihan/training.type";

import axios from "axios";

//ALL TRAINING
export const getAllTraining =
  (
    page = 1,
    keyword = "",
    limit = 5,
    pendaftaran_mulai,
    pelatihan_mulai,
    status_substansi,
    status_pelatihan,
    penyelenggara,
    akademi,
    tema,
    token
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: TRAINING_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN +
        `/api/v1/pelatihan/find?page=${page}`;
      if (keyword) link = link.concat(`&cari=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);
      if (pendaftaran_mulai)
        link = link.concat(`&pendaftaran_mulai=${pendaftaran_mulai}`);
      if (pelatihan_mulai)
        link = link.concat(`&pelatihan_mulai=${pelatihan_mulai}`);
      if (status_substansi)
        link = link.concat(`&status_substansi=${status_substansi}`);
      if (status_pelatihan)
        link = link.concat(`&status_pelatihan=${status_pelatihan}`);
      if (penyelenggara) link = link.concat(`&penyelenggara=${penyelenggara}`);
      if (akademi) link = link.concat(`&akademi=${akademi}`);
      if (tema) link = link.concat(`&tema=${tema}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: TRAINING_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TRAINING_FAIL,
        payload: error.message,
      });
    }
  };
//END ALL TRAINING

//DETAIL TRAINING
export const getDetailTrainingStep1 = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_TRAINING_STEP1_REQUEST });

    let link = process.env.END_POINT_API_PELATIHAN + `api/pelatihan/${id}`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: DETAIL_TRAINING_STEP1_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_TRAINING_STEP1_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getDetailTrainingStep2 = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_TRAINING_STEP2_REQUEST });

    let link = process.env.END_POINT_API_PELATIHAN + `api/pelatihan/${id}`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: DETAIL_TRAINING_STEP2_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_TRAINING_STEP2_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getDetailTrainingStep3 = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_TRAINING_STEP3_REQUEST });

    let link = process.env.END_POINT_API_PELATIHAN + `api/pelatihan/${id}`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: DETAIL_TRAINING_STEP3_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_TRAINING_STEP3_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getDetailTrainingStep4 = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_TRAINING_STEP4_REQUEST });

    let link = process.env.END_POINT_API_PELATIHAN + `api/pelatihan/${id}`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: DETAIL_TRAINING_STEP4_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_TRAINING_STEP4_FAIL,
      payload: error.response.data.message,
    });
  }
};
//END DETAIL TRAINING

//NEW TRAINING
export const newTrainingStep1 = (dataTraining, token) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_TRAINING_STEP1_REQUEST,
    });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_PELATIHAN + "api/v1/pelatihan/step-all",
      dataTraining,
      config
    );

    dispatch({
      type: NEW_TRAINING_STEP1_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_TRAINING_STEP1_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newTrainingStep2 = (dataTraining, token) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_TRAINING_STEP2_REQUEST,
    });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_PELATIHAN + "api/pelatihan",
      dataTraining,
      config
    );

    dispatch({
      type: NEW_TRAINING_STEP2_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_TRAINING_STEP2_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newTrainingStep3 = (dataTraining, token) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_TRAINING_STEP3_REQUEST,
    });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_PELATIHAN + "api/pelatihan",
      dataTraining,
      config
    );

    dispatch({
      type: NEW_TRAINING_STEP3_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_TRAINING_STEP3_FAIL,
      payload: error.response.data.message,
    });
  }
};
//END NEW TRAINING

//UPDATE TRAINING
export const updateTrainingStep1 =
  (id, dataTraining, token) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_TRAINING_STEP1_REQUEST,
      });

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.post(
        process.env.END_POINT_API_PELATIHAN + `api/pelatihan/${id}`,
        dataTraining,
        config
      );

      dispatch({
        type: UPDATE_TRAINING_STEP1_SUCCESS,
        payload: data.status,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_TRAINING_STEP1_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const updateTrainingStep2 =
  (id, dataTraining, token) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_TRAINING_STEP2_REQUEST,
      });

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.post(
        process.env.END_POINT_API_PELATIHAN + `api/pelatihan/${id}`,
        dataTraining,
        config
      );

      dispatch({
        type: UPDATE_TRAINING_STEP2_SUCCESS,
        payload: data.status,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_TRAINING_STEP2_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const updateTrainingStep3 =
  (id, dataTraining, token) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_TRAINING_STEP3_REQUEST,
      });

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.post(
        process.env.END_POINT_API_PELATIHAN + `api/pelatihan/${id}`,
        dataTraining,
        config
      );

      dispatch({
        type: UPDATE_TRAINING_STEP3_SUCCESS,
        payload: data.status,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_TRAINING_STEP3_FAIL,
        payload: error.response.data.message,
      });
    }
  };
//END UPDATE TRAINING

//DELETE TRAINING
export const deleteTraining = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TRAINING_REQUEST });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.delete(
      process.env.END_POINT_API_PELATIHAN + `api/pelatihan/${id}`,
      config
    );

    dispatch({
      type: DELETE_TRAINING_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TRAINING_FAIL,
      payload: error.response.data.message,
    });
  }
};
//END DELETE TRAINING

//DETAIL LPJ
export const getDetailLpj = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_LPJ_REQUEST });

    let link = process.env.END_POINT_API_PELATIHAN + `api/pelatihan/${id}`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: DETAIL_LPJ_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_LPJ_FAIL,
      payload: error.response.data.message,
    });
  }
};
//END DETAIL LPJ

//ADD LPJ
export const addLpj = (dataLpj, token) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_LPJ_REQUEST,
    });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_PELATIHAN + "api/pelatihan",
      dataLpj,
      config
    );

    dispatch({
      type: ADD_LPJ_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_LPJ_FAIL,
      payload: error.response.data.message,
    });
  }
};
//END ADD LPJ

//DETAIL EVIDENCE
export const getDetailEvidence = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_EVIDENCE_REQUEST });

    let link = process.env.END_POINT_API_PELATIHAN + `api/pelatihan/${id}`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: DETAIL_EVIDENCE_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_EVIDENCE_FAIL,
      payload: error.response.data.message,
    });
  }
};
//END DETAIL EVIDENCE

//ADD EVIDENCE
export const addEvidence = (dataEvidence, token) => async (dispatch) => {
  try {
    dispatch({
      type: ADD_EVIDENCE_REQUEST,
    });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_PELATIHAN + "api/pelatihan",
      dataEvidence,
      config
    );

    dispatch({
      type: ADD_EVIDENCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_EVIDENCE_FAIL,
      payload: error.response.data.message,
    });
  }
};
//END ADD EVIDENCE

//CLONE TRAINING
export const cloneTraining = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: CLONE_TRAINING_REQUEST });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_PELATIHAN + `api/pelatihan/${id}`,
      config
    );

    dispatch({
      type: CLONE_TRAINING_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: CLONE_TRAINING_FAIL,
      payload: error.response.data.message,
    });
  }
};
//END CLONE TRAINING

//UPDATE STATUS PUBLISH
export const updateStatusPublish = (dataStatus, token) => async (dispatch) => {
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
        "api/v1/pelatihan/update-status-publish",
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

//UPDATE STATUS PELATIHAN
export const updateStatusPelatihan =
  (dataStatus, token) => async (dispatch) => {
    try {
      dispatch({
        type: REQUEST_STATUS_PELATIHAN,
      });

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.post(
        process.env.END_POINT_API_PELATIHAN +
          "api/v1/pelatihan/update-status-pelatihan",
        dataStatus,
        config
      );

      dispatch({
        type: UPDATE_STATUS_PELATIHAN,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: FAIL_STATUS_PELATIHAN,
        payload: error.response.data.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
