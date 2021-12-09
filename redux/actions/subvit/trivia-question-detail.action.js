import {
  TRIVIA_QUESTION_DETAIL_REQUEST,
  TRIVIA_QUESTION_DETAIL_SUCCESS,
  TRIVIA_QUESTION_DETAIL_FAIL,
  TRIVIA_QUESTION_RANDOM_DETAIL_REQUEST,
  TRIVIA_QUESTION_RANDOM_DETAIL_SUCCESS,
  TRIVIA_QUESTION_RANDOM_DETAIL_FAIL,
  NEW_TRIVIA_QUESTION_DETAIL_REQUEST,
  NEW_TRIVIA_QUESTION_DETAIL_SUCCESS,
  NEW_TRIVIA_QUESTION_DETAIL_FAIL,
  DELETE_TRIVIA_QUESTION_DETAIL_REQUEST,
  DELETE_TRIVIA_QUESTION_DETAIL_SUCCESS,
  DELETE_TRIVIA_QUESTION_DETAIL_FAIL,
  DETAIL_TRIVIA_QUESTION_DETAIL_REQUEST,
  DETAIL_TRIVIA_QUESTION_DETAIL_SUCCESS,
  DETAIL_TRIVIA_QUESTION_DETAIL_FAIL,
  UPDATE_TRIVIA_QUESTION_DETAIL_REQUEST,
  UPDATE_TRIVIA_QUESTION_DETAIL_SUCCESS,
  UPDATE_TRIVIA_QUESTION_DETAIL_RESET,
  UPDATE_TRIVIA_QUESTION_DETAIL_FAIL,
  IMPORT_FILE_TRIVIA_QUESTION_DETAIL_REQUEST,
  IMPORT_FILE_TRIVIA_QUESTION_DETAIL_SUCCESS,
  IMPORT_FILE_TRIVIA_QUESTION_DETAIL_FAIL,
  IMPORT_IMAGES_TRIVIA_QUESTION_DETAIL_REQUEST,
  IMPORT_IMAGES_TRIVIA_QUESTION_DETAIL_SUCCESS,
  IMPORT_IMAGES_TRIVIA_QUESTION_DETAIL_FAIL,
  CLEAR_ERRORS,
  POST_RESULT_TRIVIA_REQUEST,
  POST_RESULT_TRIVIA_SUCCESS,
  POST_RESULT_TRIVIA_FAIL,
} from "../../types/subvit/trivia-question-detail.type";

import axios from "axios";

export const getAllTriviaQuestionDetail =
  (id, page = 1, keyword = "", limit = null, token, tokenPermission) =>
  async (dispatch) => {
    try {
      dispatch({ type: TRIVIA_QUESTION_DETAIL_REQUEST });

      let link =
        process.env.END_POINT_API_SUBVIT +
        `api/trivia-question-bank-details/all/${id}?`;
      if (page) link = link.concat(`&page=${page}`);
      if (limit) link = link.concat(`&limit=${limit}`);
      if (keyword) link = link.concat(`&keyword=${keyword}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
          Permission: tokenPermission,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: TRIVIA_QUESTION_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TRIVIA_QUESTION_DETAIL_FAIL,
        payload: error.message,
      });
    }
  };

export const getRandomTriviaQuestionDetail =
  (training_id = 1, theme_id = 1, token) =>
  async (dispatch) => {
    try {
      dispatch({ type: TRIVIA_QUESTION_RANDOM_DETAIL_REQUEST });

      let link =
        process.env.END_POINT_API_SUBVIT +
        `api/trivia-question-bank-details/random?`;
      if (training_id) link = link.concat(`&training_id=${training_id}`);
      if (theme_id) link = link.concat(`&theme_id=${theme_id}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: TRIVIA_QUESTION_RANDOM_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TRIVIA_QUESTION_RANDOM_DETAIL_FAIL,
        payload: error.response.data.message || error.message,
      });
    }
  };

export const postResultTrivia = (resultData, token) => async (dispatch) => {
  try {
    dispatch({
      type: POST_RESULT_TRIVIA_REQUEST,
    });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_SUBVIT + "api/trivia-question-banks/result",
      resultData,
      config
    );

    dispatch({
      type: POST_RESULT_TRIVIA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: POST_RESULT_TRIVIA_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newTriviaQuestionDetail =
  (triviaDetailData, token, tokenPermission) => async (dispatch) => {
    try {
      dispatch({
        type: NEW_TRIVIA_QUESTION_DETAIL_REQUEST,
      });

      const config = {
        headers: {
          Authorization: "Bearer " + token,
          Permission: tokenPermission,
        },
      };

      const { data } = await axios.post(
        process.env.END_POINT_API_SUBVIT + "api/trivia-question-bank-details",
        triviaDetailData,
        config
      );

      dispatch({
        type: NEW_TRIVIA_QUESTION_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_TRIVIA_QUESTION_DETAIL_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const deleteTriviaQuestionDetail =
  (id, token, tokenPermission) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_TRIVIA_QUESTION_DETAIL_REQUEST });
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          Permission: tokenPermission,
        },
      };
      const { data } = await axios.delete(
        process.env.END_POINT_API_SUBVIT +
          `api/trivia-question-bank-details/${id}`,
        config
      );

      dispatch({
        type: DELETE_TRIVIA_QUESTION_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_TRIVIA_QUESTION_DETAIL_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const detailTriviaQuestionDetail =
  (id, token, tokenPermission) => async (dispatch) => {
    try {
      dispatch({ type: DETAIL_TRIVIA_QUESTION_DETAIL_REQUEST });
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          Permission: tokenPermission,
        },
      };

      const { data } = await axios.get(
        process.env.END_POINT_API_SUBVIT +
          `api/trivia-question-bank-details/${id}`,
        config
      );

      dispatch({
        type: DETAIL_TRIVIA_QUESTION_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DETAIL_TRIVIA_QUESTION_DETAIL_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const updateTriviaQuestionDetail =
  (id, dataBankSoal, token) => async (dispatch) => {
    try {
      dispatch({ type: UPDATE_TRIVIA_QUESTION_DETAIL_REQUEST });
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(
        process.env.END_POINT_API_SUBVIT +
          `api/trivia-question-bank-details/${id}`,
        dataBankSoal,
        config
      );

      dispatch({
        type: UPDATE_TRIVIA_QUESTION_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_TRIVIA_QUESTION_DETAIL_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const importFileTriviaQuestionDetail =
  (triviaDetailFile, token) => async (dispatch) => {
    try {
      dispatch({
        type: IMPORT_FILE_TRIVIA_QUESTION_DETAIL_REQUEST,
      });

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.post(
        process.env.END_POINT_API_SUBVIT +
          "api/trivia-question-bank-details/import-file",
        triviaDetailFile,
        config
      );

      dispatch({
        type: IMPORT_FILE_TRIVIA_QUESTION_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: IMPORT_FILE_TRIVIA_QUESTION_DETAIL_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const importImagesTriviaQuestionDetail =
  (triviaDetailImages, token) => async (dispatch) => {
    try {
      dispatch({
        type: IMPORT_IMAGES_TRIVIA_QUESTION_DETAIL_REQUEST,
      });
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.post(
        process.env.END_POINT_API_SUBVIT +
          "api/trivia-question-bank-details/import-images",
        triviaDetailImages,
        config
      );

      dispatch({
        type: IMPORT_IMAGES_TRIVIA_QUESTION_DETAIL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: IMPORT_IMAGES_TRIVIA_QUESTION_DETAIL_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
