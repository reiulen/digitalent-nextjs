import {
  SURVEY_QUESTION_DETAIL_REQUEST,
  SURVEY_QUESTION_DETAIL_SUCCESS,
  SURVEY_QUESTION_DETAIL_FAIL,
  SURVEY_QUESTION_RANDOM_DETAIL_REQUEST,
  SURVEY_QUESTION_RANDOM_DETAIL_SUCCESS,
  SURVEY_QUESTION_RANDOM_DETAIL_FAIL,
  NEW_SURVEY_QUESTION_DETAIL_REQUEST,
  NEW_SURVEY_QUESTION_DETAIL_SUCCESS,
  NEW_SURVEY_QUESTION_DETAIL_FAIL,
  DELETE_SURVEY_QUESTION_DETAIL_REQUEST,
  DELETE_SURVEY_QUESTION_DETAIL_SUCCESS,
  DELETE_SURVEY_QUESTION_DETAIL_FAIL,
  DETAIL_SURVEY_QUESTION_DETAIL_REQUEST,
  DETAIL_SURVEY_QUESTION_DETAIL_SUCCESS,
  DETAIL_SURVEY_QUESTION_DETAIL_FAIL,
  UPDATE_SURVEY_QUESTION_DETAIL_REQUEST,
  UPDATE_SURVEY_QUESTION_DETAIL_SUCCESS,
  UPDATE_SURVEY_QUESTION_DETAIL_FAIL,
  IMPORT_FILE_SURVEY_QUESTION_DETAIL_REQUEST,
  IMPORT_FILE_SURVEY_QUESTION_DETAIL_SUCCESS,
  IMPORT_FILE_SURVEY_QUESTION_DETAIL_FAIL,
  IMPORT_IMAGES_SURVEY_QUESTION_DETAIL_REQUEST,
  IMPORT_IMAGES_SURVEY_QUESTION_DETAIL_SUCCESS,
  IMPORT_IMAGES_SURVEY_QUESTION_DETAIL_FAIL,
  CLEAR_ERRORS,
  POST_RESULT_SURVEY_REQUEST,
  POST_RESULT_SURVEY_SUCCESS,
  POST_RESULT_SURVEY_FAIL,
} from "../../types/subvit/survey-question-detail.type";

import axios from "axios";

export const getAllSurveyQuestionDetail =
  (id, page = 1, limit = null, keyword = "", token) =>
  async (dispatch) => {
    try {
      dispatch({ type: SURVEY_QUESTION_DETAIL_REQUEST });
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      let link =
        process.env.END_POINT_API_SUBVIT +
        `api/survey-question-bank-details/all/${id}?`;
      if (page) link = link.concat(`&page=${page}`);
      if (limit) link = link.concat(`&limit=${limit}`);
      if (keyword) link = link.concat(`&keyword=${keyword}`);

      const { data } = await axios.get(link, config);

      dispatch({
        type: SURVEY_QUESTION_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SURVEY_QUESTION_DETAIL_FAIL,
        payload: error.message,
      });
    }
  };

export const getRandomSurveyQuestionDetail =
  (training_id = 1, theme_id = 1, token) =>
  async (dispatch) => {
    try {
      dispatch({ type: SURVEY_QUESTION_RANDOM_DETAIL_REQUEST });

      let link =
        process.env.END_POINT_API_SUBVIT +
        `api/survey-question-bank-details/random?`;
      if (training_id) link = link.concat(`&training_id=${training_id}`);
      if (theme_id) link = link.concat(`&theme_id=${theme_id}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.get(link, config);

      dispatch({
        type: SURVEY_QUESTION_RANDOM_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SURVEY_QUESTION_RANDOM_DETAIL_FAIL,
        payload: error.message,
      });
    }
  };

export const postResultSurvey = (resultData, token) => async (dispatch) => {
  try {
    dispatch({
      type: POST_RESULT_SURVEY_REQUEST,
    });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_SUBVIT + "api/survey-question-banks/result",
      resultData,
      config
    );

    dispatch({
      type: POST_RESULT_SURVEY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_RESULT_SURVEY_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newSurveyQuestionDetail =
  (triviaDetailData, token) => async (dispatch) => {
    try {
      dispatch({
        type: NEW_SURVEY_QUESTION_DETAIL_REQUEST,
      });
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.post(
        process.env.END_POINT_API_SUBVIT + "api/survey-question-bank-details",
        triviaDetailData,
        config
      );

      dispatch({
        type: NEW_SURVEY_QUESTION_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_SURVEY_QUESTION_DETAIL_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const deleteSurveyQuestionDetail = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SURVEY_QUESTION_DETAIL_REQUEST });
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.delete(
      process.env.END_POINT_API_SUBVIT +
        `api/survey-question-bank-details/${id}`,
      config
    );

    dispatch({
      type: DELETE_SURVEY_QUESTION_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SURVEY_QUESTION_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const detailSurveyQuestionDetail = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_SURVEY_QUESTION_DETAIL_REQUEST });
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.get(
      process.env.END_POINT_API_SUBVIT +
        `api/survey-question-bank-details/${id}`,
      config
    );

    dispatch({
      type: DETAIL_SURVEY_QUESTION_DETAIL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_SURVEY_QUESTION_DETAIL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateSurveyQuestionDetail =
  (id, dataBankSoal, token) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_SURVEY_QUESTION_DETAIL_REQUEST });
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(
        process.env.END_POINT_API_SUBVIT +
          `api/survey-question-bank-details/${id}`,
        dataBankSoal,
        config
      );

      dispatch({
        type: UPDATE_SURVEY_QUESTION_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SURVEY_QUESTION_DETAIL_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const importFileSurveyQuestionDetail =
  (triviaDetailFile, token) => async (dispatch) => {
    try {
      dispatch({
        type: IMPORT_FILE_SURVEY_QUESTION_DETAIL_REQUEST,
      });
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.post(
        process.env.END_POINT_API_SUBVIT +
          "api/survey-question-bank-details/import-file",
        triviaDetailFile,
        config
      );

      dispatch({
        type: IMPORT_FILE_SURVEY_QUESTION_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: IMPORT_FILE_SURVEY_QUESTION_DETAIL_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const importImagesSurveyQuestionDetail =
  (triviaDetailImages, token) => async (dispatch) => {
    try {
      dispatch({
        type: IMPORT_IMAGES_SURVEY_QUESTION_DETAIL_REQUEST,
      });
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.post(
        process.env.END_POINT_API_SUBVIT +
          "api/survey-question-bank-details/import-image",
        triviaDetailImages,
        config
      );

      dispatch({
        type: IMPORT_IMAGES_SURVEY_QUESTION_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: IMPORT_IMAGES_SURVEY_QUESTION_DETAIL_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
