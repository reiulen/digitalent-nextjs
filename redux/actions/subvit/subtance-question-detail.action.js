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
  NEW_SUBTANCE_QUESTION_DETAIL_FAIL,
  POST_RESULT_REQUEST,
  POST_RESULT_SUCCESS,
  POST_RESULT_FAIL,
  DELETE_SUBTANCE_QUESTION_DETAIL_REQUEST,
  DELETE_SUBTANCE_QUESTION_DETAIL_SUCCESS,
  DELETE_SUBTANCE_QUESTION_DETAIL_FAIL,
  UPDATE_SUBTANCE_QUESTION_DETAIL_REQUEST,
  UPDATE_SUBTANCE_QUESTION_DETAIL_SUCCESS,
  UPDATE_SUBTANCE_QUESTION_DETAIL_FAIL,
  DETAIL_SUBTANCE_QUESTION_DETAIL_REQUEST,
  DETAIL_SUBTANCE_QUESTION_DETAIL_SUCCESS,
  DETAIL_SUBTANCE_QUESTION_DETAIL_FAIL,
  IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_REQUEST,
  IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_SUCCESS,
  IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_FAIL,
  IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_REQUEST,
  IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_SUCCESS,
  IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_FAIL,
  CLEAR_ERRORS,
} from "../../types/subvit/subtance-question-detail.type";

import axios from "axios";

export const getAllSubtanceQuestionDetail =
  (
    id,
    page = 1,
    keyword = null,
    limit = null,
    status = "",
    category = "",
    pelatihan = "",
    token
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: SUBTANCE_QUESTION_DETAIL_REQUEST });

      let link =
        process.env.END_POINT_API_SUBVIT +
        `api/subtance-question-bank-details/all/${id}?`;
      if (page) link = link.concat(`&page=${page}`);
      if (limit) link = link.concat(`&limit=${limit}`);
      if (keyword) link = link.concat(`&keyword=${keyword}`);
      if (status) link = link.concat(`&status=${status}`);
      if (category) link = link.concat(`&kategori=${category}`);
      if (pelatihan) link = link.concat(`&pelatihan=${pelatihan}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: SUBTANCE_QUESTION_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SUBTANCE_QUESTION_DETAIL_FAIL,
        payload: error.message,
      });
    }
  };

export const getRandomSubtanceQuestionDetail =
  (training_id = 1, theme_id = 1, category = "", token) =>
  async (dispatch) => {
    try {
      dispatch({ type: SUBTANCE_QUESTION_RANDOM_DETAIL_REQUEST });

      let link =
        process.env.END_POINT_API_SUBVIT +
        `api/subtance-question-bank-details/random?`;
      if (training_id) link = link.concat(`&training_id=${training_id}`);
      if (category) link = link.concat(`&category=${category}`);
      if (theme_id) link = link.concat(`&theme_id=${theme_id}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);
      dispatch({
        type: SUBTANCE_QUESTION_RANDOM_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SUBTANCE_QUESTION_RANDOM_DETAIL_FAIL,
        payload: error.message,
      });
    }
  };

export const getDashboardSubvit =
  (page_substansi = 1, page_trivia = 1, page_survey = 1, token) =>
  async (dispatch) => {
    try {
      dispatch({ type: DASHBOARD_SUBVIT_REQUEST });

      let link = process.env.END_POINT_API_SUBVIT + `api/dashboard?`;

      if (page_survey) link = link.concat(`&page_survey=${page_survey}`);
      if (page_trivia) link = link.concat(`&page_trivia=${page_trivia}`);
      if (page_substansi)
        link = link.concat(`&page_substansi=${page_substansi}`);
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);
      console.log(link);
      dispatch({
        type: DASHBOARD_SUBVIT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DASHBOARD_SUBVIT_FAIL,
        payload: error.message,
      });
    }
  };

export const newSubtanceQuestionDetail =
  (subtanceDetailData, token) => async (dispatch) => {
    try {
      dispatch({
        type: NEW_SUBTANCE_QUESTION_DETAIL_REQUEST,
      });

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.post(
        process.env.END_POINT_API_SUBVIT + "api/subtance-question-bank-details",
        subtanceDetailData,
        config
      );

      dispatch({
        type: NEW_SUBTANCE_QUESTION_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_SUBTANCE_QUESTION_DETAIL_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const postResult = (resultData, token) => async (dispatch) => {
  try {
    dispatch({
      type: POST_RESULT_REQUEST,
    });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_SUBVIT + "api/subtance-question-banks/result",
      resultData,
      config
    );

    dispatch({
      type: POST_RESULT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_RESULT_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const detailSubtanceQuestionDetail = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_SUBTANCE_QUESTION_DETAIL_REQUEST });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(
      process.env.END_POINT_API_SUBVIT +
        `api/subtance-question-bank-details/${id}`,
      config
    );

    dispatch({
      type: DETAIL_SUBTANCE_QUESTION_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_SUBTANCE_QUESTION_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteSubtanceQuestionDetail = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SUBTANCE_QUESTION_DETAIL_REQUEST });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.delete(
      process.env.END_POINT_API_SUBVIT +
        `api/subtance-question-bank-details/${id}`,
      config
    );

    dispatch({
      type: DELETE_SUBTANCE_QUESTION_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SUBTANCE_QUESTION_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateSubtanceQuestionDetail =
  (id, dataBankSoal, token) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SUBTANCE_QUESTION_DETAIL_REQUEST });

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.put(
        process.env.END_POINT_API_SUBVIT +
          `api/subtance-question-bank-details/${id}`,
        dataBankSoal,
        config
      );

      dispatch({
        type: UPDATE_SUBTANCE_QUESTION_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SUBTANCE_QUESTION_DETAIL_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const importFileSubtanceQuestionDetail =
  (subtanceDetailFile, token) => async (dispatch) => {
    try {
      dispatch({
        type: IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_REQUEST,
      });

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.post(
        process.env.END_POINT_API_SUBVIT +
          "api/subtance-question-bank-details/import-file",
        subtanceDetailFile,
        config
      );

      dispatch({
        type: IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const importImagesSubtanceQuestionDetail =
  (subtanceDetailImages, token) => async (dispatch) => {
    try {
      dispatch({
        type: IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_REQUEST,
      });

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.post(
        process.env.END_POINT_API_SUBVIT +
          "api/subtance-question-bank-details/import-images",
        subtanceDetailImages,
        config
      );

      dispatch({
        type: IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
