import {
    GALERI_REQUEST,
    GALERI_SUCCESS,
    GALERI_FAIL,

    NEW_GALERI_REQUEST,
    NEW_GALERI_SUCCESS,
    NEW_GALERI_RESET,
    NEW_GALERI_FAIL,

    DELETE_GALERI_REQUEST,
    DELETE_GALERI_SUCCESS,
    DELETE_GALERI_RESET,
    DELETE_GALERI_FAIL,

    CLEAR_ERRORS,
} from '../../types/publikasi/galeri.type'

import axios from 'axios'


// get all data
export const getAllGaleri = () => async (dispatch) => {
    try {

        dispatch({ type: GALERI_REQUEST })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.get(process.env.END_POINT_API + 'publikasi/api/galeri')

        dispatch({
            type: GALERI_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GALERI_FAIL,
            payload: error.message
        })
    }
}

export const newGaleri = (galeriData) => async (dispatch) => {
    try {

        dispatch({
            type: NEW_GALERI_REQUEST
        })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.post(process.env.END_POINT_API + 'publikasi/api/galeri', galeriData)

        dispatch({
            type: NEW_GALERI_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_GALERI_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteGaleri = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_GALERI_REQUEST })

        const { data } = await axios.delete(process.env.END_POINT_API + `publikasi/api/galeri/${id}`)

        dispatch({
            type: DELETE_GALERI_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_GALERI_FAIL,
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