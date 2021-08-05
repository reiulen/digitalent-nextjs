import {
    BERITA_REQUEST,
    BERITA_SUCCESS,
    BERITA_FAIL,

    NEW_BERITA_REQUEST,
    NEW_BERITA_SUCCESS,
    NEW_BERITA_RESET,
    NEW_BERITA_FAIL,

    DELETE_BERITA_REQUEST,
    DELETE_BERITA_SUCCESS,
    DELETE_BERITA_RESET,
    DELETE_BERITA_FAIL,

    CLEAR_ERRORS,
} from '../../types/publikasi/berita.type'

import axios from 'axios'


// get all data
export const getAllBerita = () => async (dispatch) => {
    try {

        dispatch({ type: BERITA_REQUEST })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.get(process.env.END_POINT_API_PUBLIKASI + 'publikasi/api/index-administrator-berita')

        dispatch({
            type: BERITA_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: BERITA_FAIL,
            payload: error.message
        })
    }
}

export const newBerita = (beritaData) => async (dispatch) => {
    try {

        dispatch({
            type: NEW_BERITA_REQUEST
        })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.post(process.env.END_POINT_API_PUBLIKASI + 'publikasi/api/create-administrator-berita', beritaData)

        dispatch({
            type: NEW_BERITA_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_BERITA_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteBerita = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_BERITA_REQUEST })

        const { data } = await axios.delete(process.env.END_POINT_API_PUBLIKASI + `publikasi/api/berita/${id}`)

        dispatch({
            type: DELETE_BERITA_SUCCESS,
            payload: data.success
        })

    } catch (error) {
        dispatch({
            type: DELETE_BERITA_FAIL,
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