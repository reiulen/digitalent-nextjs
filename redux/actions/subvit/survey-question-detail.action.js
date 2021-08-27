import {
    SURVEY_QUESTION_DETAIL_REQUEST,
    SURVEY_QUESTION_DETAIL_SUCCESS,
    SURVEY_QUESTION_DETAIL_FAIL,

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

    CLEAR_ERRORS
} from '../../types/subvit/survey-question-detail.type'

import axios from 'axios'

export const getAllSurveyQuestionDetail = (id, page = 1, limit = null, keyword = '') => async (dispatch) => {
    try {

        dispatch({ type: SURVEY_QUESTION_DETAIL_REQUEST })

        let link = process.env.END_POINT_API_SUBVIT + `api/survey-question-bank-details/all/${id}?`
        if (page) link = link.concat(`&page=${page}`)
        if (limit) link = link.concat(`&limit=${limit}`)

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.get(link)

        dispatch({
            type: SURVEY_QUESTION_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SURVEY_QUESTION_DETAIL_FAIL,
            payload: error.message
        })
    }
}

export const newSurveyQuestionDetail = (triviaDetailData) => async (dispatch) => {
    try {

        dispatch({
            type: NEW_SURVEY_QUESTION_DETAIL_REQUEST
        })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.post(process.env.END_POINT_API_SUBVIT + 'api/survey-question-bank-details', triviaDetailData)

        dispatch({
            type: NEW_SURVEY_QUESTION_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_SURVEY_QUESTION_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteSurveyQuestionDetail = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_SURVEY_QUESTION_DETAIL_REQUEST })

        const { data } = await axios.delete(process.env.END_POINT_API_SUBVIT + `api/survey-question-bank-details/${id}`)

        dispatch({
            type: DELETE_SURVEY_QUESTION_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_SURVEY_QUESTION_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const detailSurveyQuestionDetail = (id) => async (dispatch) => {
    try {

        dispatch({ type: DETAIL_SURVEY_QUESTION_DETAIL_REQUEST })

        const { data } = await axios.get(process.env.END_POINT_API_SUBVIT + `api/survey-question-bank-details/${id}`)

        console.log(data)
        dispatch({
            type: DETAIL_SURVEY_QUESTION_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DETAIL_SURVEY_QUESTION_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateSurveyQuestionDetail = (id, dataBankSoal) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_SURVEY_QUESTION_DETAIL_REQUEST })

        const { data } = await axios.post(process.env.END_POINT_API_SUBVIT + `api/survey-question-bank-details/${id}`, dataBankSoal)

        dispatch({
            type: UPDATE_SURVEY_QUESTION_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_SURVEY_QUESTION_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const importFileSurveyQuestionDetail = (triviaDetailFile) => async (dispatch) => {
    try {

        dispatch({
            type: IMPORT_FILE_SURVEY_QUESTION_DETAIL_REQUEST
        })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.post(process.env.END_POINT_API_SUBVIT + 'api/survey-question-bank-details/import-file', triviaDetailFile)

        dispatch({
            type: IMPORT_FILE_SURVEY_QUESTION_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: IMPORT_FILE_SURVEY_QUESTION_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const importImagesSurveyQuestionDetail = (triviaDetailImages) => async (dispatch) => {
    try {

        dispatch({
            type: IMPORT_IMAGES_SURVEY_QUESTION_DETAIL_REQUEST
        })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.post(process.env.END_POINT_API_SUBVIT + 'api/survey-question-bank-details/import-images', triviaDetailImages)

        dispatch({
            type: IMPORT_IMAGES_SURVEY_QUESTION_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: IMPORT_IMAGES_SURVEY_QUESTION_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}