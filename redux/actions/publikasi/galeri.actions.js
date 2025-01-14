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

    VIEW_GALERI_REQUEST,
    VIEW_GALERI_SUCCESS,
    VIEW_GALERI_FAIL,

    CLEAR_ERRORS,
} from '../../types/publikasi/galeri.type'

import axios from 'axios'


// get all data
export const getAllGaleri = (page = 1, keyword = '', limit = 5, publish = null, startdate = null, enddate = null, token, permission) => async (dispatch) => {
    try {

        dispatch({ type: GALERI_REQUEST })

        let link = process.env.END_POINT_API_PUBLIKASI + `api/gallery?page=${page}`
        if (keyword) link = link.concat(`&keyword=${keyword}`)
        if (limit) link = link.concat(`&limit=${limit}`)
        if (publish) link = link.concat(`&publish=${publish}`);
        if (startdate) link = link.concat(`&startdate=${startdate}`);
        if (enddate) link = link.concat(`&enddate=${enddate}`);

        const config = {
            headers: {
                Authorization: 'Bearer ' + token,
                "Permission": permission
            },
        };
        const { data } = await axios.get(link, config)

        dispatch({
            type: GALERI_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: GALERI_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getDetailGaleri = (id, token, permission) => async (dispatch) => {
    try {

        const config = {
            headers: {
                Authorization: 'Bearer ' + token,
                "Permission": permission
            },
        };

        let link = process.env.END_POINT_API_PUBLIKASI + `api/gallery/${id}`
        const { data } = await axios.get(link, config)

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

export const newGaleri = (galeriData, token, permission) => async (dispatch) => {
    try {

        dispatch({
            type: NEW_GALERI_REQUEST
        })

        const config = {
            headers: {
                Authorization: 'Bearer ' + token,
                "Permission": permission
            },
        };

        const { data } = await axios.post(process.env.END_POINT_API_PUBLIKASI + 'api/gallery', galeriData, config)
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

export const updateGaleri = (galeriData, token, permission) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_GALERI_REQUEST })

        const config = {
            headers: {
                Authorization: 'Bearer ' + token,
                "Permission": permission
            },
        };

        let link = process.env.END_POINT_API_PUBLIKASI + `api/gallery/${galeriData.id}`

        const { data } = await axios.post(link, galeriData, config)

        dispatch({
            type: UPDATE_GALERI_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: UPDATE_GALERI_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteGaleri = (id, token, permission) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_GALERI_REQUEST })

        const config = {
            headers: {
                Authorization: 'Bearer ' + token,
                "Permission": permission
            },
        };

        const { data } = await axios.delete(process.env.END_POINT_API_PUBLIKASI + `api/gallery/${id}`, config)

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

export const viewGaleri = (galeriData, token, permission) => async (dispatch) => {
    try {
        dispatch({ type: VIEW_GALERI_REQUEST })

        const config = {
            headers: {
                Authorization: 'Bearer ' + token,
                "Permission": permission
            },
        };

        let link = process.env.END_POINT_API_PUBLIKASI + `api/gallery/show/${galeriData.id}`
        const { data } = await axios.get(link, config)

        dispatch({
            type: VIEW_GALERI_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: VIEW_GALERI_FAIL,
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