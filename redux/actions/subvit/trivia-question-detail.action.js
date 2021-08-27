import {
    TRIVIA_QUESTION_DETAIL_REQUEST,
    TRIVIA_QUESTION_DETAIL_SUCCESS,
    TRIVIA_QUESTION_DETAIL_FAIL,

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

    CLEAR_ERRORS
} from '../../types/subvit/trivia-question-detail.type'

import axios from 'axios'

export const getAllTriviaQuestionDetail = (id, page = 1, keyword = '', limit = null) => async (dispatch) => {
    try {

        dispatch({ type: TRIVIA_QUESTION_DETAIL_REQUEST })

        let link = process.env.END_POINT_API_SUBVIT + `api/trivia-question-bank-details/all/${id}?`
        if (page) link = link.concat(`&page=${page}`)
        if (limit) link = link.concat(`&limit=${limit}`)
        if (keyword) link = link.concat(`&keyword=${keyword}`)

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.get(link)

        dispatch({
            type: TRIVIA_QUESTION_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: TRIVIA_QUESTION_DETAIL_FAIL,
            payload: error.message
        })
    }
}

export const newTriviaQuestionDetail = (triviaDetailData) => async (dispatch) => {
    try {

        dispatch({
            type: NEW_TRIVIA_QUESTION_DETAIL_REQUEST
        })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.post(process.env.END_POINT_API_SUBVIT + 'api/trivia-question-bank-details', triviaDetailData)

        dispatch({
            type: NEW_TRIVIA_QUESTION_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_TRIVIA_QUESTION_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteTriviaQuestionDetail = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_TRIVIA_QUESTION_DETAIL_REQUEST })

        const { data } = await axios.delete(process.env.END_POINT_API_SUBVIT + `api/trivia-question-bank-details/${id}`)

        dispatch({
            type: DELETE_TRIVIA_QUESTION_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DELETE_TRIVIA_QUESTION_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const detailTriviaQuestionDetail = (id) => async (dispatch) => {
    try {

        dispatch({ type: DETAIL_TRIVIA_QUESTION_DETAIL_REQUEST })

        const { data } = await axios.get(process.env.END_POINT_API_SUBVIT + `api/trivia-question-bank-details/${id}`)

        dispatch({
            type: DETAIL_TRIVIA_QUESTION_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: DETAIL_TRIVIA_QUESTION_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateTriviaQuestionDetail = (id, dataBankSoal) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_TRIVIA_QUESTION_DETAIL_REQUEST })

        const { data } = await axios.post(process.env.END_POINT_API_SUBVIT + `api/trivia-question-bank-details/${id}`, dataBankSoal)

        dispatch({
            type: UPDATE_TRIVIA_QUESTION_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_TRIVIA_QUESTION_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const importFileTriviaQuestionDetail = (triviaDetailFile) => async (dispatch) => {
    try {

        dispatch({
            type: IMPORT_FILE_TRIVIA_QUESTION_DETAIL_REQUEST
        })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.post(process.env.END_POINT_API_SUBVIT + 'api/trivia-question-bank-details/import-file', triviaDetailFile)

        dispatch({
            type: IMPORT_FILE_TRIVIA_QUESTION_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: IMPORT_FILE_TRIVIA_QUESTION_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const importImagesTriviaQuestionDetail = (triviaDetailImages) => async (dispatch) => {
    try {

        dispatch({
            type: IMPORT_IMAGES_TRIVIA_QUESTION_DETAIL_REQUEST
        })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.post(process.env.END_POINT_API_SUBVIT + 'api/trivia-question-bank-details/import-images', triviaDetailImages)

        dispatch({
            type: IMPORT_IMAGES_TRIVIA_QUESTION_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: IMPORT_IMAGES_TRIVIA_QUESTION_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}