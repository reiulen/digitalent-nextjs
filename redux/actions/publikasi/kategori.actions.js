import {
    KATEGORI_REQUEST,
    KATEGORI_SUCCESS,
    KATEGORI_FAIL,

    NEW_KATEGORI_REQUEST,
    NEW_KATEGORI_SUCCESS,
    NEW_KATEGORI_RESET,
    NEW_KATEGORI_FAIL,

    DELETE_KATEGORI_REQUEST,
    DELETE_KATEGORI_SUCCESS,
    DELETE_KATEGORI_RESET,
    DELETE_KATEGORI_FAIL,

    CLEAR_ERRORS,
} from '../../types/publikasi/kategori.type'

import axios from 'axios'


// get all data
export const getAllKategori = () => async (dispatch) => {
    try {

        dispatch({ type: KATEGORI_REQUEST })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.get(process.env.END_POINT_API_PUBLIKASI + 'api/kategori')

        dispatch({
            type: KATEGORI_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: KATEGORI_FAIL,
            payload: error.message
        })
    }
}

export const newKategori = (kategoriData) => async (dispatch) => {
    try {

        dispatch({
            type: NEW_KATEGORI_REQUEST
        })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.post(process.env.END_POINT_API_PUBLIKASI + 'api/kategori', kategoriData)

        dispatch({
            type: NEW_KATEGORI_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_KATEGORI_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteKategori = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_KATEGORI_REQUEST })

        const { data } = await axios.delete(process.env.END_POINT_API_PUBLIKASI + `api/kategori/${id}`)

        dispatch({
            type: DELETE_KATEGORI_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_KATEGORI_FAIL,
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