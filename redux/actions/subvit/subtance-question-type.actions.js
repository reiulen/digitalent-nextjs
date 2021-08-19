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
} from '../../types/subvit/subtance-question-type.type'

import axios from 'axios'

export const getAllSubtanceQuestionBanksType = (page = 1, keyword = '', limit = 5) => async (dispatch) => {
    try {

        dispatch({ type: SUBTANCE_QUESTION_TYPE_REQUEST })

        let link = process.env.END_POINT_API_SUBVIT + `api/subtance-question-types?page=${page}`
        if (keyword) link = link.concat(`&keyword=${keyword}`)
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
            type: SUBTANCE_QUESTION_TYPE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SUBTANCE_QUESTION_TYPE_FAIL,
            payload: error.message
        })
    }
}

export const getDetailSubtanceQuestionBanksType = (id) => async (dispatch) => {
    try {

        let link = process.env.END_POINT_API_SUBVIT + `api/subtance-question-types/${id}`

        const { data } = await axios.get(link)

        dispatch({
            type: DETAIL_SUBTANCE_QUESTION_TYPE_SUCCESS,
            payload: data.data
        })

    } catch (error) {
        dispatch({
            type: DETAIL_SUBTANCE_QUESTION_TYPE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newSubtanceQuestionBanksType = (substanceQuestionTypeData) => async (dispatch) => {
    try {

        dispatch({
            type: NEW_SUBTANCE_QUESTION_TYPE_REQUEST
        })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.post(process.env.END_POINT_API_SUBVIT + 'api/subtance-question-types', substanceQuestionTypeData)

        dispatch({
            type: NEW_SUBTANCE_QUESTION_TYPE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_SUBTANCE_QUESTION_TYPE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updatewSubtanceQuestionBanksType = (id, substanceQuestionTypeData) => async (dispatch) => {
    try {

        dispatch({
            type: UPDATE_SUBTANCE_QUESTION_TYPE_REQUEST
        })

        const { data } = await axios.post(process.env.END_POINT_API_SUBVIT + `api/subtance-question-types/${id}`, substanceQuestionTypeData)

        dispatch({
            type: UPDATE_SUBTANCE_QUESTION_TYPE_SUCCESS,
            payload: data.status
        })
    } catch (error) {
        dispatch({
            type: UPDATE_SUBTANCE_QUESTION_TYPE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteSubtanceQuestionBanksType = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_SUBTANCE_QUESTION_TYPE_REQUEST })

        const { data } = await axios.delete(process.env.END_POINT_API_SUBVIT + `api/subtance-question-types/${id}`)

        dispatch({
            type: DELETE_SUBTANCE_QUESTION_TYPE_SUCCESS,
            payload: data.status
        })

    } catch (error) {
        dispatch({
            type: DELETE_SUBTANCE_QUESTION_TYPE_FAIL,
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}
