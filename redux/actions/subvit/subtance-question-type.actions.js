import {
  SUBTANCE_QUESTION_TYPE_REQUEST,
  SUBTANCE_QUESTION_TYPE_SUCCESS,
  SUBTANCE_QUESTION_TYPE_FAIL,
  NEW_SUBTANCE_QUESTION_TYPE_REQUEST,
  NEW_SUBTANCE_QUESTION_TYPE_SUCCESS,
  NEW_SUBTANCE_QUESTION_TYPE_RESET,
  NEW_SUBTANCE_QUESTION_TYPE_FAIL,
  DELETE_SUBTANCE_QUESTION_TYPE_REQUEST,
  DELETE_SUBTANCE_QUESTION_TYPE_SUCCESS,
  DELETE_SUBTANCE_QUESTION_TYPE_RESET,
  DELETE_SUBTANCE_QUESTION_TYPE_FAIL,
  DETAIL_SUBTANCE_QUESTION_TYPE_REQUEST,
  DETAIL_SUBTANCE_QUESTION_TYPE_SUCCESS,
  DETAIL_SUBTANCE_QUESTION_TYPE_FAIL,
  UPDATE_SUBTANCE_QUESTION_TYPE_REQUEST,
  UPDATE_SUBTANCE_QUESTION_TYPE_SUCCESS,
  UPDATE_SUBTANCE_QUESTION_TYPE_FAIL,
  UPDATE_SUBTANCE_QUESTION_TYPE_RESET,
  CLEAR_ERRORS,
} from "../../types/subvit/subtance-question-type.type";

import axios from "axios";

export const getAllSubtanceQuestionBanksType =
  (page = 0, keyword = "", limit = 0, token) =>
  async (dispatch) => {
    try {
      dispatch({ type: SUBTANCE_QUESTION_TYPE_REQUEST });

      let link =
        process.env.END_POINT_API_SUBVIT +
        `api/subtance-question-types?page=${page}`;
      if (keyword) link = link.concat(`&keyword=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: SUBTANCE_QUESTION_TYPE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SUBTANCE_QUESTION_TYPE_FAIL,
        payload: error.message,
      });
    }
  };

export const getDetailSubtanceQuestionBanksType =
  (id, token) => async (dispatch) => {
    try {
      let link =
        process.env.END_POINT_API_SUBVIT + `api/subtance-question-types/${id}`;

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: DETAIL_SUBTANCE_QUESTION_TYPE_SUCCESS,
        payload: data.data,
      });
    } catch (error) {
      dispatch({
        type: DETAIL_SUBTANCE_QUESTION_TYPE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const newSubtanceQuestionBanksType =
  (substanceQuestionTypeData, token) => async (dispatch) => {
    try {
      dispatch({
        type: NEW_SUBTANCE_QUESTION_TYPE_REQUEST,
      });

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.post(
        process.env.END_POINT_API_SUBVIT + "api/subtance-question-types",
        substanceQuestionTypeData,
        config
      );

      dispatch({
        type: NEW_SUBTANCE_QUESTION_TYPE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: NEW_SUBTANCE_QUESTION_TYPE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const updatewSubtanceQuestionBanksType =
  (id, substanceQuestionTypeData, token) => async (dispatch) => {
    try {
      dispatch({
        type: UPDATE_SUBTANCE_QUESTION_TYPE_REQUEST,
      });

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.post(
        process.env.END_POINT_API_SUBVIT + `api/subtance-question-types/${id}`,
        substanceQuestionTypeData,
        config
      );

      dispatch({
        type: UPDATE_SUBTANCE_QUESTION_TYPE_SUCCESS,
        payload: data.status,
      });
    } catch (error) {
      dispatch({
        type: UPDATE_SUBTANCE_QUESTION_TYPE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const deleteSubtanceQuestionBanksType =
  (id, token) => async (dispatch) => {
    try {
      dispatch({ type: DELETE_SUBTANCE_QUESTION_TYPE_REQUEST });

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.delete(
        process.env.END_POINT_API_SUBVIT + `api/subtance-question-types/${id}`,
        config
      );

      dispatch({
        type: DELETE_SUBTANCE_QUESTION_TYPE_SUCCESS,
        payload: data.status,
      });
    } catch (error) {
      dispatch({
        type: DELETE_SUBTANCE_QUESTION_TYPE_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
