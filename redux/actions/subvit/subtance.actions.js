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

    UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_REQUEST,
    UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_SUCCESS,
    UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_RESET,
    UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_FAIL,

    CLEAR_ERRORS,
} from '../../types/subvit/subtance.type'

import axios from 'axios'


// get all data
export const getAllSubtanceQuestionBanks = (page = 1, keyword = '', limit = 5) => async (dispatch) => {
    try {

        dispatch({ type: SUBTANCE_QUESTION_BANKS_REQUEST })

        let link = process.env.END_POINT_API_SUBVIT + `api/subtance-question-banks?page=${page}`
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
            type: SUBTANCE_QUESTION_BANKS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SUBTANCE_QUESTION_BANKS_FAIL,
            payload: error.message
        })
    }
}

export const newSubtanceQuestionBanks = (subtanceData) => async (dispatch) => {
    try {

        dispatch({
            type: NEW_SUBTANCE_QUESTION_BANKS_REQUEST
        })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.post(process.env.END_POINT_API_SUBVIT + 'api/subtance-question-banks', subtanceData)

        dispatch({
            type: NEW_SUBTANCE_QUESTION_BANKS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_SUBTANCE_QUESTION_BANKS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteRoom = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_SUBTANCE_QUESTION_BANKS_REQUEST })

        const { data } = await axios.delete(process.env.END_POINT_API_SUBVIT + `api/subtance-question-banks/${id}`)

        dispatch({
            type: DELETE_SUBTANCE_QUESTION_BANKS_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_SUBTANCE_QUESTION_BANKS_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateSubtanceQuestionBanksPublish = (subtanceData, id) => async (dispatch) => {
    try {

        dispatch({
            type: UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_REQUEST
        })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.post(process.env.END_POINT_API_SUBVIT + `api/subtance-question-banks/publish/${id}`, subtanceData)

        dispatch({
            type: UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_SUBTANCE_QUESTION_BANKS_PUBLISH_FAIL,
            payload: error.response.data.message
        })
    }
}

// Clear Error
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}