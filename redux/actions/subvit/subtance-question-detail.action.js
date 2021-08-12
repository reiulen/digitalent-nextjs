import {
    SUBTANCE_QUESTION_DETAIL_REQUEST,
    SUBTANCE_QUESTION_DETAIL_SUCCESS,
    SUBTANCE_QUESTION_DETAIL_FAIL,

    NEW_SUBTANCE_QUESTION_DETAIL_REQUEST,
    NEW_SUBTANCE_QUESTION_DETAIL_SUCCESS,
    NEW_SUBTANCE_QUESTION_DETAIL_FAIL,

    DELETE_SUBTANCE_QUESTION_DETAIL_REQUEST,
    DELETE_SUBTANCE_QUESTION_DETAIL_SUCCESS,
    DELETE_SUBTANCE_QUESTION_DETAIL_FAIL,

    IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_REQUEST,
    IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_SUCCESS,
    IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_FAIL,

    IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_REQUEST,
    IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_SUCCESS,
    IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_FAIL,

    CLEAR_ERRORS
} from '../../types/subvit/subtance-question-detail.type'

import axios from 'axios'

export const getAllSubtanceQuestionDetail = (id, page = 1, limit = 5) => async (dispatch) => {
    try {

        dispatch({ type: SUBTANCE_QUESTION_DETAIL_REQUEST })

        let link = process.env.END_POINT_API_SUBVIT + `api/subtance-question-bank-details/all/${id}?`
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
            type: SUBTANCE_QUESTION_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SUBTANCE_QUESTION_DETAIL_FAIL,
            payload: error.message
        })
    }
}

export const newSubtanceQuestionDetail = (subtanceDetailData) => async (dispatch) => {
    try {

        dispatch({
            type: NEW_SUBTANCE_QUESTION_DETAIL_REQUEST
        })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.post(process.env.END_POINT_API_SUBVIT + 'api/subtance-question-bank-details', subtanceDetailData)

        dispatch({
            type: NEW_SUBTANCE_QUESTION_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_SUBTANCE_QUESTION_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteSubtanceQuestionDetail = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_SUBTANCE_QUESTION_DETAIL_REQUEST })

        const { data } = await axios.delete(process.env.END_POINT_API_SUBVIT + `api/subtance-question-bank-details/${id}`)

        dispatch({
            type: DELETE_SUBTANCE_QUESTION_DETAIL_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_SUBTANCE_QUESTION_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}


export const importFileSubtanceQuestionDetail = (subtanceDetailFile) => async (dispatch) => {
    try {

        dispatch({
            type: IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_REQUEST
        })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.post(process.env.END_POINT_API_SUBVIT + 'api/subtance-question-bank-details/import-file', subtanceDetailFile)

        dispatch({
            type: IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: IMPORT_FILE_SUBTANCE_QUESTION_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const importImagesSubtanceQuestionDetail = (subtanceDetailImages) => async (dispatch) => {
    try {

        dispatch({
            type: IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_REQUEST
        })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.post(process.env.END_POINT_API_SUBVIT + 'api/subtance-question-bank-details/import-images', subtanceDetailImages)

        dispatch({
            type: IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: IMPORT_IMAGES_SUBTANCE_QUESTION_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}