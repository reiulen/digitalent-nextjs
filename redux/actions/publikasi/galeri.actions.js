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

    DETAIL_GALERI_REQUEST,
    DETAIL_GALERI_SUCCESS,
    DETAIL_GALERI_FAIL,

    UPDATE_GALERI_REQUEST,
    UPDATE_GALERI_SUCCESS,
    UPDATE_GALERI_RESET,
    UPDATE_GALERI_FAIL,

    CLEAR_ERRORS,
} from '../../types/publikasi/galeri.type'

import axios from 'axios'


// get all data
export const getAllGaleri = (page = 1, keyword = '', limit = 5, publish = null) => async (dispatch) => {
    try {

        dispatch({ type: GALERI_REQUEST })

        let link = process.env.END_POINT_API_PUBLIKASI + `api/gallery?page=${page}`
        if (keyword) link = link.concat(`&keyword=${keyword}`)
        if (limit) link = link.concat(`&limit=${limit}`)
        if (publish) link = link.concat(`&publish=${publish}`);

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        // const { data } = await axios.get(process.env.END_POINT_API_PUBLIKASI + 'publikasi/api/galeri')
        const { data } = await axios.get(link)

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

export const getDetailGaleri = (id) => async (dispatch) => {
    try {

        let link = process.env.END_POINT_API_PUBLIKASI + `api/gallery/${id}`

        const { data } = await axios.get(link)

        dispatch({
            type: DETAIL_GALERI_SUCCESS,
            payload: data.data
        })

    } catch (error) {
        dispatch({
            type: DETAIL_GALERI_FAIL,
            payload: error.response.data.message
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

        const { data } = await axios.post(process.env.END_POINT_API_PUBLIKASI + 'api/gallery', galeriData)

        dispatch({
            type: NEW_GALERI_SUCCESS,
            payload: data
        })

        console.log (data)

    } catch (error) {
        dispatch({
            type: NEW_GALERI_FAIL,
            payload: error.response.data.message
        })

        console.log (error)
    }
}

export const updateGaleri= (galeriData) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_GALERI_REQUEST })

        let link = process.env.END_POINT_API_PUBLIKASI + `api/gallery/${galeriData.id}`

        const { data } = await axios.post (link, galeriData)

        dispatch ({
            type: UPDATE_GALERI_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch ({
            type: UPDATE_GALERI_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteGaleri = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_GALERI_REQUEST })

        const { data } = await axios.delete(process.env.END_POINT_API_PUBLIKASI + `api/gallery/${id}`)

        dispatch({
            type: DELETE_GALERI_SUCCESS,
            payload: data.status
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