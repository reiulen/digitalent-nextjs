import {
  SURVEY_QUESTION_BANKS_REQUEST,
  SURVEY_QUESTION_BANKS_SUCCESS,
  SURVEY_QUESTION_BANKS_FAIL,
  NEW_SURVEY_QUESTION_BANKS_REQUEST,
  NEW_SURVEY_QUESTION_BANKS_SUCCESS,
  NEW_SURVEY_QUESTION_BANKS_RESET,
  NEW_SURVEY_QUESTION_BANKS_FAIL,
  UPDATE_SURVEY_QUESTION_BANKS_REQUEST,
  UPDATE_SURVEY_QUESTION_BANKS_SUCCESS,
  UPDATE_SURVEY_QUESTION_BANKS_RESET,
  UPDATE_SURVEY_QUESTION_BANKS_FAIL,
  DELETE_SURVEY_QUESTION_BANKS_REQUEST,
  DELETE_SURVEY_QUESTION_BANKS_SUCCESS,
  DELETE_SURVEY_QUESTION_BANKS_RESET,
  DELETE_SURVEY_QUESTION_BANKS_FAIL,
  DETAIL_SURVEY_QUESTION_BANKS_REQUEST,
  DETAIL_SURVEY_QUESTION_BANKS_SUCCESS,
  DETAIL_SURVEY_QUESTION_BANKS_FAIL,
  DETAIL_ONE_SURVEY_QUESTION_BANKS_REQUEST,
  DETAIL_ONE_SURVEY_QUESTION_BANKS_SUCCESS,
  DETAIL_ONE_SURVEY_QUESTION_BANKS_FAIL,
  UPDATE_SURVEY_QUESTION_BANKS_PUBLISH_REQUEST,
  UPDATE_SURVEY_QUESTION_BANKS_PUBLISH_SUCCESS,
  UPDATE_SURVEY_QUESTION_BANKS_PUBLISH_RESET,
  UPDATE_SURVEY_QUESTION_BANKS_PUBLISH_FAIL,
  REPORT_SURVEY_QUESTION_BANKS_REQUEST,
  REPORT_SURVEY_QUESTION_BANKS_SUCCESS,
  REPORT_SURVEY_QUESTION_BANKS_FAIL,
  CLEAR_ERRORS,
} from "../../types/subvit/survey-question.type";

import axios from "axios";

// get all data
export const getAllSurveyQuestionBanks =
  (page = 1, keyword = "", limit = 5, token) =>
  async (dispatch) => {
    try {
      dispatch({ type: SURVEY_QUESTION_BANKS_REQUEST });

      let link =
        process.env.END_POINT_API_SUBVIT +
        `api/survey-question-banks?page=${page}`;
      if (keyword) link = link.concat(`&keyword=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: SURVEY_QUESTION_BANKS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SURVEY_QUESTION_BANKS_FAIL,
        payload: error.message,
      });
    }
  };

export const newSurveyQuestionBanks =
  (subtanceData, token) => async (dispatch) => {
    try {
      dispatch({
        type: NEW_SURVEY_QUESTION_BANKS_REQUEST,
      });

      // const config = {
      //     headers: {
      //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
      //         'Access-Control-Allow-Origin': '*',
      //         'apikey': process.env.END_POINT_KEY_AUTH
      //     }
      // }
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(
        process.env.END_POINT_API_SUBVIT + "api/survey-question-banks",
        subtanceData,
        config
      );

      dispatch({
        type: NEW_SURVEY_QUESTION_BANKS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_SURVEY_QUESTION_BANKS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getDetailSurveyQuestionBanks = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_SURVEY_QUESTION_BANKS_REQUEST });
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    let link =
      process.env.END_POINT_API_SUBVIT +
      `api/survey-question-banks/detail/${id}`;

    const { data } = await axios.get(link, config);

    dispatch({
      type: DETAIL_SURVEY_QUESTION_BANKS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_SURVEY_QUESTION_BANKS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getOneSurveyQuestionBanks = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_ONE_SURVEY_QUESTION_BANKS_REQUEST });
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    let link =
      process.env.END_POINT_API_SUBVIT + `api/survey-question-banks/${id}`;

    const { data } = await axios.get(link, config);

    dispatch({
      type: DETAIL_ONE_SURVEY_QUESTION_BANKS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_ONE_SURVEY_QUESTION_BANKS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateSurveyQuestionBanks =
  (id, substanceQuestionData, token) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_SURVEY_QUESTION_BANKS_REQUEST,
      });
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(
        process.env.END_POINT_API_SUBVIT + `api/survey-question-banks/${id}`,
        substanceQuestionData,
        config
      );

      dispatch({
        type: UPDATE_SURVEY_QUESTION_BANKS_SUCCESS,
        payload: data.status,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SURVEY_QUESTION_BANKS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const deleteSurveyQuestionBanks = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SURVEY_QUESTION_BANKS_REQUEST });
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.delete(
      process.env.END_POINT_API_SUBVIT + `api/survey-question-banks/${id}`,
      config
    );

    dispatch({
      type: DELETE_SURVEY_QUESTION_BANKS_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SURVEY_QUESTION_BANKS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateSurveyQuestionBanksPublish =
  (subtanceData, id, token) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_SURVEY_QUESTION_BANKS_PUBLISH_REQUEST,
      });

      // const config = {
      //     headers: {
      //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
      //         'Access-Control-Allow-Origin': '*',
      //         'apikey': process.env.END_POINT_KEY_AUTH
      //     }
      // }
      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      const { data } = await axios.post(
        process.env.END_POINT_API_SUBVIT +
          `api/survey-question-banks/publish/${id}`,
        subtanceData,
        config
      );

      dispatch({
        type: UPDATE_SURVEY_QUESTION_BANKS_PUBLISH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SURVEY_QUESTION_BANKS_PUBLISH_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const allReportSurveyQuestionBanks =
  (
    id,
    page = 1,
    keyword = "",
    limit = null,
    pelatihan = null,
    status = null,
    card = null,
    token
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: REPORT_SURVEY_QUESTION_BANKS_REQUEST });

      let link =
        process.env.END_POINT_API_SUBVIT +
        `api/survey-question-banks/report/${id}?page=${page}`;
      if (keyword) link = link.concat(`&keyword=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);
      if (pelatihan) link = link.concat(`&pelatihan=${pelatihan}`);
      if (status) link = link.concat(`&status=${status}`);
      if (card) link = link.concat(`&card=${card}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: REPORT_SURVEY_QUESTION_BANKS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REPORT_SURVEY_QUESTION_BANKS_FAIL,
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
