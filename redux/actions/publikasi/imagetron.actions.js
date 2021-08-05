import {
    IMAGETRON_REQUEST,
    IMAGETRON_SUCCESS,
    IMAGETRON_FAIL,

    NEW_IMAGETRON_REQUEST,
    NEW_IMAGETRON_SUCCESS,
    NEW_IMAGETRON_RESET,
    NEW_IMAGETRON_FAIL,

    DELETE_IMAGETRON_REQUEST,
    DELETE_IMAGETRON_SUCCESS,
    DELETE_IMAGETRON_RESET,
    DELETE_IMAGETRON_FAIL,

    CLEAR_ERRORS,
} from '../../types/publikasi/imagetron.type'

import axios from 'axios'


// get all data
export const getAllImagetron = () => async (dispatch) => {
    try {

        dispatch({ type: IMAGETRON_REQUEST })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.get(process.env.END_POINT_API_PUBLIKASI + 'publikasi/api/imagetron')

        dispatch({
            type: IMAGETRON_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: IMAGETRON_FAIL,
            payload: error.message
        })
    }
}

export const newImagetron = (imagetronData) => async (dispatch) => {
    try {

        dispatch({
            type: NEW_IMAGETRON_REQUEST
        })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.post(process.env.END_POINT_API_PUBLIKASI + 'publikasi/api/imagetron', imagetronData)

        dispatch({
            type: NEW_IMAGETRON_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_IMAGETRON_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteImagetron = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_IMAGETRON_REQUEST })

        const { data } = await axios.delete(process.env.END_POINT_API_PUBLIKASI + `publikasi/api/imagetron/${id}`)

        dispatch({
            type: DELETE_IMAGETRON_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_IMAGETRON_FAIL,
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