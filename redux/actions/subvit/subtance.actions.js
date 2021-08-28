import {
  SUBTANCE_QUESTION_BANKS_REQUEST,
  SUBTANCE_QUESTION_BANKS_SUCCESS,
  SUBTANCE_QUESTION_BANKS_FAIL,
  NEW_SUBTANCE_QUESTION_BANKS_REQUEST,
  NEW_SUBTANCE_QUESTION_BANKS_SUCCESS,
  NEW_SUBTANCE_QUESTION_BANKS_FAIL,
  DELETE_SUBTANCE_QUESTION_BANKS_REQUEST,
  DELETE_SUBTANCE_QUESTION_BANKS_SUCCESS,
  DELETE_SUBTANCE_QUESTION_BANKS_FAIL,
  DETAIL_SUBTANCE_QUESTION_BANKS_REQUEST,
  DETAIL_SUBTANCE_QUESTION_BANKS_SUCCESS,
  DETAIL_SUBTANCE_QUESTION_BANKS_FAIL,
  DETAIL_ONE_SUBTANCE_QUESTION_BANKS_REQUEST,
  DETAIL_ONE_SUBTANCE_QUESTION_BANKS_SUCCESS,
  DETAIL_ONE_SUBTANCE_QUESTION_BANKS_FAIL,
  UPDATE_SUBTANCE_QUESTION_BANKS_REQUEST,
  UPDATE_SUBTANCE_QUESTION_BANKS_SUCCESS,
  UPDATE_SUBTANCE_QUESTION_BANKS_RESET,
  UPDATE_SUBTANCE_QUESTION_BANKS_FAIL,
  UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_REQUEST,
  UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_SUCCESS,
  UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_RESET,
  UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_FAIL,
  REPORT_SUBTANCE_QUESTION_BANKS_REQUEST,
  REPORT_SUBTANCE_QUESTION_BANKS_SUCCESS,
  REPORT_SUBTANCE_QUESTION_BANKS_FAIL,
  NEW_CLONE_SUBTANCE_QUESTION_BANKS_REQUEST,
  NEW_CLONE_SUBTANCE_QUESTION_BANKS_SUCCESS,
  NEW_CLONE_SUBTANCE_QUESTION_BANKS_RESET,
  NEW_CLONE_SUBTANCE_QUESTION_BANKS_FAIL,
  DELETE_CLONE_SUBTANCE_QUESTION_BANKS_REQUEST,
  DELETE_CLONE_SUBTANCE_QUESTION_BANKS_SUCCESS,
  DELETE_CLONE_SUBTANCE_QUESTION_BANKS_RESET,
  DELETE_CLONE_SUBTANCE_QUESTION_BANKS_FAIL,
  CLEAR_ERRORS,
} from "../../types/subvit/subtance.type";

import axios from "axios";

// get all data
export const getAllSubtanceQuestionBanks =
  (page = 1, keyword = "", limit = 5) =>
  async (dispatch) => {
    try {
      dispatch({ type: SUBTANCE_QUESTION_BANKS_REQUEST });

      let link =
        process.env.END_POINT_API_SUBVIT +
        `api/subtance-question-banks?page=${page}`;
      if (keyword) link = link.concat(`&keyword=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);

      // const config = {
      //     headers: {
      //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
      //         'Access-Control-Allow-Origin': '*',
      //         'apikey': process.env.END_POINT_KEY_AUTH
      //     }
      // }

      const { data } = await axios.get(link);

      dispatch({
        type: SUBTANCE_QUESTION_BANKS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SUBTANCE_QUESTION_BANKS_FAIL,
        payload: error.message,
      });
    }
  };

export const newSubtanceQuestionBanks = (subtanceData) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_SUBTANCE_QUESTION_BANKS_REQUEST,
    });

    // const config = {
    //     headers: {
    //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
    //         'Access-Control-Allow-Origin': '*',
    //         'apikey': process.env.END_POINT_KEY_AUTH
    //     }
    // }

    const { data } = await axios.post(
      process.env.END_POINT_API_SUBVIT + "api/subtance-question-banks",
      subtanceData
    );

    dispatch({
      type: NEW_SUBTANCE_QUESTION_BANKS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_SUBTANCE_QUESTION_BANKS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getDetailSubtanceQuestionBanks = (id) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_SUBTANCE_QUESTION_BANKS_REQUEST });

    let link =
      process.env.END_POINT_API_SUBVIT +
      `api/subtance-question-banks/detail/${id}`;

    const { data } = await axios.get(link);

    dispatch({
      type: DETAIL_SUBTANCE_QUESTION_BANKS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_SUBTANCE_QUESTION_BANKS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getOneSubtanceQuestionBanks = (id) => async (dispatch) => {
  try {
    dispatch({ type: DETAIL_ONE_SUBTANCE_QUESTION_BANKS_REQUEST });

    let link =
      process.env.END_POINT_API_SUBVIT + `api/subtance-question-banks/${id}`;

    const { data } = await axios.get(link);

    dispatch({
      type: DETAIL_ONE_SUBTANCE_QUESTION_BANKS_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_ONE_SUBTANCE_QUESTION_BANKS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updatewSubtanceQuestionBanks =
  (id, substanceQuestionData) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_SUBTANCE_QUESTION_BANKS_REQUEST,
      });

      const { data } = await axios.post(
        process.env.END_POINT_API_SUBVIT + `api/subtance-question-banks/${id}`,
        substanceQuestionData
      );

      dispatch({
        type: UPDATE_SUBTANCE_QUESTION_BANKS_SUCCESS,
        payload: data.status,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SUBTANCE_QUESTION_BANKS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const deleteSubtanceQuestionBanks = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_SUBTANCE_QUESTION_BANKS_REQUEST });

    const data = await axios.delete(
      process.env.END_POINT_API_SUBVIT + `api/subtance-question-banks/${id}`
    );

    dispatch({
      type: DELETE_SUBTANCE_QUESTION_BANKS_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SUBTANCE_QUESTION_BANKS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteCloneSubtanceQuestionBanks =
  (dataId) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_CLONE_SUBTANCE_QUESTION_BANKS_REQUEST });

      const data = await axios.post(
        process.env.END_POINT_API_SUBVIT +
          `api/subtance-question-bank-details/multiple-delete`,
        dataId
      );

      dispatch({
        type: DELETE_CLONE_SUBTANCE_QUESTION_BANKS_SUCCESS,
        payload: data.status,
      });
    } catch (error) {
      dispatch({
        type: DELETE_CLONE_SUBTANCE_QUESTION_BANKS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const updateSubtanceQuestionBanksPublish =
  (subtanceData, id) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_REQUEST,
      });

      // const config = {
      //     headers: {
      //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
      //         'Access-Control-Allow-Origin': '*',
      //         'apikey': process.env.END_POINT_KEY_AUTH
      //     }
      // }

      const { data } = await axios.post(
        process.env.END_POINT_API_SUBVIT +
          `api/subtance-question-banks/publish/${id}`,
        subtanceData
      );

      dispatch({
        type: UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const allReportSubtanceQuestionBanks =
  (
    id,
    page = 1,
    keyword = "",
    limit = null,
    pelatihan = null,
    status = null,
    nilai = null,
    card = null
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: REPORT_SUBTANCE_QUESTION_BANKS_REQUEST });

      let link =
        process.env.END_POINT_API_SUBVIT +
        `api/subtance-question-banks/report/${id}?page=${page}`;
      if (keyword) link = link.concat(`&keyword=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);
      if (pelatihan) link = link.concat(`&pelatihan=${pelatihan}`);
      if (status) link = link.concat(`&status=${status}`);
      if (nilai) link = link.concat(`&nilai=${nilai}`);
      if (card) link = link.concat(`&card=${card}`);

      // const config = {
      //     headers: {
      //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
      //         'Access-Control-Allow-Origin': '*',
      //         'apikey': process.env.END_POINT_KEY_AUTH
      //     }
      // }

      const { data } = await axios.get(link);

      dispatch({
        type: REPORT_SUBTANCE_QUESTION_BANKS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: REPORT_SUBTANCE_QUESTION_BANKS_FAIL,
        payload: error.message,
      });
    }
  };

export const newCloneSubtanceQuestionBanks =
  (subtanceData) => async (dispatch) => {
    try {
      dispatch({
        type: NEW_CLONE_SUBTANCE_QUESTION_BANKS_REQUEST,
      });

      // const config = {
      //     headers: {
      //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
      //         'Access-Control-Allow-Origin': '*',
      //         'apikey': process.env.END_POINT_KEY_AUTH
      //     }
      // }

      const { data } = await axios.post(
        process.env.END_POINT_API_SUBVIT + "api/subtance-question-banks/clone",
        subtanceData
      );

      dispatch({
        type: NEW_CLONE_SUBTANCE_QUESTION_BANKS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_CLONE_SUBTANCE_QUESTION_BANKS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Clear Error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
