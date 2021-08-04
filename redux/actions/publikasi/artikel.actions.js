import {
    ARTIKEL_REQUEST,
    ARTIKEL_SUCCESS,
    ARTIKEL_FAIL,

    NEW_ARTIKEL_REQUEST,
    NEW_ARTIKEL_SUCCESS,
    NEW_ARTIKEL_RESET,
    NEW_ARTIKEL_FAIL,

    DELETE_ARTIKEL_REQUEST,
    DELETE_ARTIKEL_SUCCESS,
    DELETE_ARTIKEL_RESET,
    DELETE_ARTIKEL_FAIL,

    DETAIL_ARTIKEL_REQUEST,
    DETAIL_ARTIKEL_SUCCESS,
    DETAIL_ARTIKEL_FAIL,

    CLEAR_ERRORS,
} from '../../types/publikasi/artikel.type'

import axios from 'axios'
import absoluteUrl from 'next-absolute-url'

// get all data
export const getAllArtikel = (page = 1, keyword = '', limit = 5) => async (dispatch) => {
    try {

        dispatch({ type: ARTIKEL_REQUEST })

        let link = process.env.END_POINT_API + `api/artikel?page=${page}`
        if (keyword) link = link.concat(`&keyword=${keyword}`)
        if (limit) link = link.concat(`&limit=${limit}`)
        // let link = process.env.END_POINT_API + `api/artikel`

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.get(link)

        dispatch({
            type: ARTIKEL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ARTIKEL_FAIL,
            payload: error.message
        })
    }
}

export const getDetailArtikel = (id) => async (dispatch) => {
    try {

        let link = process.env.END_POINT_API + `api/artikel/${id}`

        const { data } = await axios.get(link)

        dispatch({
            type: DETAIL_ARTIKEL_SUCCESS,
            payload: data.data
        })

    } catch (error) {
        dispatch({
            type: DETAIL_ARTIKEL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const newArtikel = (artikelData) => async (dispatch) => {
    try {

        dispatch({
            type: NEW_ARTIKEL_REQUEST
        })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.post(process.env.END_POINT_API + 'api/artikel', artikelData)

        dispatch({
            type: NEW_ARTIKEL_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_ARTIKEL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteArtikel = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_ARTIKEL_REQUEST })

        const { data } = await axios.delete(process.env.END_POINT_API + `api/artikel/${id}`)

        dispatch({
            type: DELETE_ARTIKEL_SUCCESS,
            payload: data.status
        })

    } catch (error) {
        dispatch({
            type: DELETE_ARTIKEL_FAIL,
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
