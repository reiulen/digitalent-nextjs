import {
  TRIVIA_QUESTION_BANKS_REQUEST,
  TRIVIA_QUESTION_BANKS_SUCCESS,
  TRIVIA_QUESTION_BANKS_FAIL,
  NEW_TRIVIA_QUESTION_BANKS_REQUEST,
  NEW_TRIVIA_QUESTION_BANKS_SUCCESS,
  NEW_TRIVIA_QUESTION_BANKS_RESET,
  NEW_TRIVIA_QUESTION_BANKS_FAIL,
  UPDATE_TRIVIA_QUESTION_BANKS_REQUEST,
  UPDATE_TRIVIA_QUESTION_BANKS_SUCCESS,
  UPDATE_TRIVIA_QUESTION_BANKS_RESET,
  UPDATE_TRIVIA_QUESTION_BANKS_FAIL,
  DELETE_TRIVIA_QUESTION_BANKS_REQUEST,
  DELETE_TRIVIA_QUESTION_BANKS_SUCCESS,
  DELETE_TRIVIA_QUESTION_BANKS_RESET,
  DELETE_TRIVIA_QUESTION_BANKS_FAIL,
  DETAIL_TRIVIA_QUESTION_BANKS_REQUEST,
  DETAIL_TRIVIA_QUESTION_BANKS_SUCCESS,
  DETAIL_TRIVIA_QUESTION_BANKS_FAIL,
  DETAIL_ONE_TRIVIA_QUESTION_BANKS_REQUEST,
  DETAIL_ONE_TRIVIA_QUESTION_BANKS_SUCCESS,
  DETAIL_ONE_TRIVIA_QUESTION_BANKS_FAIL,
  UPDATE_TRIVIA_QUESTION_BANKS_PUBLISH_REQUEST,
  UPDATE_TRIVIA_QUESTION_BANKS_PUBLISH_SUCCESS,
  UPDATE_TRIVIA_QUESTION_BANKS_PUBLISH_RESET,
  UPDATE_TRIVIA_QUESTION_BANKS_PUBLISH_FAIL,
  REPORT_TRIVIA_QUESTION_BANKS_REQUEST,
  REPORT_TRIVIA_QUESTION_BANKS_SUCCESS,
  REPORT_TRIVIA_QUESTION_BANKS_FAIL,
  CLEAR_ERRORS,
} from "../../types/subvit/trivia-question.type";

import axios from "axios";

// get all data
export const getAllTriviaQuestionBanks =
  (page = 1, keyword = "", limit = 5, token, tokenPermission) =>
  async (dispatch) => {
    try {
      dispatch({ type: TRIVIA_QUESTION_BANKS_REQUEST });

      let link =
        process.env.END_POINT_API_SUBVIT +
        `api/trivia-question-banks?page=${page}`;
      if (keyword) link = link.concat(`&keyword=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
          permissionToken: tokenPermission,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: TRIVIA_QUESTION_BANKS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: TRIVIA_QUESTION_BANKS_FAIL,
        payload: error.message,
      });
    }
  };

export const newTriviaQuestionBanks =
  (triviaData, token) => async (dispatch) => {
    try {
      dispatch({
        type: NEW_TRIVIA_QUESTION_BANKS_REQUEST,
      });
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.post(
        process.env.END_POINT_API_SUBVIT + "api/trivia-question-banks",
        triviaData,
        config
      );

      dispatch({
        type: NEW_TRIVIA_QUESTION_BANKS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_TRIVIA_QUESTION_BANKS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getDetailTriviaQuestionBanks =
  (id, token, tokenPermission) => async (dispatch) => {
    try {
      dispatch({ type: DETAIL_TRIVIA_QUESTION_BANKS_REQUEST });

      let link =
        process.env.END_POINT_API_SUBVIT +
        `api/trivia-question-banks/detail/${id}`;

      const config = {
        headers: {
          Authorization: "Bearer " + token,
          permissionToken: tokenPermission,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: DETAIL_TRIVIA_QUESTION_BANKS_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: DETAIL_TRIVIA_QUESTION_BANKS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getOneTriviaQuestionBanks =
  (id, token, tokenPermission) => async (dispatch) => {
    try {
      dispatch({ type: DETAIL_ONE_TRIVIA_QUESTION_BANKS_REQUEST });

      let link =
        process.env.END_POINT_API_SUBVIT + `api/trivia-question-banks/${id}`;
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          permissionToken: tokenPermission,
        },
      };
      const { data } = await axios.get(link, config);

      dispatch({
        type: DETAIL_ONE_TRIVIA_QUESTION_BANKS_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: DETAIL_ONE_TRIVIA_QUESTION_BANKS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const updatewTriviaQuestionBanks =
  (id, triviaData, token) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_TRIVIA_QUESTION_BANKS_REQUEST,
      });
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(
        process.env.END_POINT_API_SUBVIT + `api/trivia-question-banks/${id}`,
        triviaData,
        config
      );

      dispatch({
        type: UPDATE_TRIVIA_QUESTION_BANKS_SUCCESS,
        payload: data.status,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_TRIVIA_QUESTION_BANKS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const deleteTriviaQuestionBanks = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_TRIVIA_QUESTION_BANKS_REQUEST });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.delete(
      process.env.END_POINT_API_SUBVIT + `api/trivia-question-banks/${id}`,
      config
    );

    dispatch({
      type: DELETE_TRIVIA_QUESTION_BANKS_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: DELETE_TRIVIA_QUESTION_BANKS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateTriviaQuestionBanksPublish =
  (subtanceData, id, token) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_TRIVIA_QUESTION_BANKS_PUBLISH_REQUEST,
      });
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      // const config = {
      //     headers: {
      //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
      //         'Access-Control-Allow-Origin': '*',
      //         'apikey': process.env.END_POINT_KEY_AUTH
      //     }
      // }

      const { data } = await axios.post(
        process.env.END_POINT_API_SUBVIT +
          `api/trivia-question-banks/publish/${id}`,
        subtanceData,
        config
      );

      dispatch({
        type: UPDATE_TRIVIA_QUESTION_BANKS_PUBLISH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_TRIVIA_QUESTION_BANKS_PUBLISH_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const allReportTriviaQuestionBanks =
  (
    id,
    page = 1,
    keyword = "",
    limit = null,
    card = null,
    token,
    tokenPermission
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: REPORT_TRIVIA_QUESTION_BANKS_REQUEST });
      const config = {
        headers: {
          Authorization: "Bearer " + token,
          permissionToken: tokenPermission,
        },
      };
      let link =
        process.env.END_POINT_API_SUBVIT +
        `api/trivia-question-banks/report/${id}?page=${page}`;
      if (keyword) link = link.concat(`&keyword=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);
      if (card) link = link.concat(`&card=${card}`);

      const { data } = await axios.get(link, config);

      dispatch({
        type: REPORT_TRIVIA_QUESTION_BANKS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REPORT_TRIVIA_QUESTION_BANKS_FAIL,
        payload: error.message,
      });
    }
  };

// Clear Error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
