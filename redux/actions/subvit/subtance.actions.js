import {
    SUBTANCE_QUESTION_BANKS_REQUEST,
    SUBTANCE_QUESTION_BANKS_SUCCESS,
    SUBTANCE_QUESTION_BANKS_FAIL,

    NEW_SUBTANCE_QUESTION_BANKS_REQUEST,
    NEW_SUBTANCE_QUESTION_BANKS_SUCCESS,
    NEW_SUBTANCE_QUESTION_BANKS_RESET,
    NEW_SUBTANCE_QUESTION_BANKS_FAIL,

    DELETE_SUBTANCE_QUESTION_BANKS_REQUEST,
    DELETE_SUBTANCE_QUESTION_BANKS_SUCCESS,
    DELETE_SUBTANCE_QUESTION_BANKS_RESET,
    DELETE_SUBTANCE_QUESTION_BANKS_FAIL,

    CLEAR_ERRORS,
} from '../../types/subvit/subtance.type'

import axios from 'axios'


// get all data
export const getAllSubtanceQuestionBanks = () => async (dispatch) => {
    try {

        dispatch({ type: SUBTANCE_QUESTION_BANKS_REQUEST })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        // const { data } = await axios.get(process.env.END_POINT_API + 'publikasi/api/artikel')
        const data = {
            status: true,
            message: "Berhasil",
            data: [
                {
                    no: 1,
                    academy: "FGA",
                    theme: "UI/UX Designer",
                    start_at: "2021-02-01",
                    category: "Mid Test",
                    status: true,
                },
                {
                    no: 2,
                    academy: "FGA",
                    theme: "UI/UX Designer",
                    start_at: "2021-02-01",
                    category: "Mid Test",
                    status: true,
                },
                {
                    no: 3,
                    academy: "FGA",
                    theme: "UI/UX Designer",
                    start_at: "2021-02-01",
                    category: "Mid Test",
                    status: true,
                },
                {
                    no: 4,
                    academy: "FGA",
                    theme: "UI/UX Designer",
                    start_at: "2021-02-01",
                    category: "Mid Test",
                    status: true,
                },
                {
                    no: 5,
                    academy: "FGA",
                    theme: "UI/UX Designer",
                    start_at: "2021-02-01",
                    category: "Mid Test",
                    status: true,
                },
            ]
        }
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

        const { data } = await axios.post(process.env.END_POINT_API + 'publikasi/api/artikel', artikelData)

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

        const { data } = await axios.delete(process.env.END_POINT_API + `publikasi/api/artikel/${id}`)

        dispatch({
            type: DELETE_SUBTANCE_QUESTION_BANKS_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_ROOM_FAIL,
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