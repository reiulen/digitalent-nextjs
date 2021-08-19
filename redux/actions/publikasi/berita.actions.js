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

    DETAIL_BERITA_REQUEST,
    DETAIL_BERITA_SUCCESS,
    DETAIL_BERITA_FAIL,

    UPDATE_BERITA_REQUEST,
    UPDATE_BERITA_SUCCESS,
    UPDATE_BERITA_RESET,
    UPDATE_BERITA_FAIL,

    CLEAR_ERRORS,
} from '../../types/publikasi/berita.type'

import axios from 'axios'


// get all data
export const getAllBerita = (page = 1, keyword = '', limit = 5, publish = null, startdate = null, enddate = null) => async (dispatch) => {
    try {

        dispatch({ type: BERITA_REQUEST })

        let link = process.env.END_POINT_API_PUBLIKASI + `api/berita?page=${page}`
        if (keyword) link = link.concat(`&keyword=${keyword}`)
        if (limit) link = link.concat(`&limit=${limit}`)
        if (publish) link = link.concat(`&publish=${publish}`);
        if (startdate) link = link.concat(`&startdate=${startdate}`);
        if (enddate) link = link.concat(`&enddate=${enddate}`);

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.get (link)

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

        const { data } = await axios.post(process.env.END_POINT_API_PUBLIKASI + 'api/berita', beritaData)

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

export const getDetailBerita = (id) => async (dispatch) => {
    try {

        dispatch({
            type: DETAIL_BERITA_REQUEST
        })

        let link = process.env.END_POINT_API_PUBLIKASI + `api/berita/${id}`

        const { data } = await axios.get(link)

        dispatch({
            type: DETAIL_BERITA_SUCCESS,
            payload: data.data
        })

        // console.log (data.data)

    } catch (error) {
        dispatch({
            type: DETAIL_BERITA_FAIL,
            payload: error.response.data.message
        })
    }
}


export const updateBerita = (beritaData) => async (dispatch) => {
    try {

        dispatch({ type: UPDATE_BERITA_REQUEST })

        let link = process.env.END_POINT_API_PUBLIKASI + `api/berita/${beritaData.id}`

        const { data } = await axios.post (link, beritaData)

        dispatch ({
            type: UPDATE_BERITA_SUCCESS,
            payload: data
        })
        
    } catch (error) {
        dispatch({
            type: UPDATE_BERITA_FAIL,
            payload: error.response.data.message
        })
    }
} 

export const deleteBerita = (id) => async (dispatch) => {
    try {
        
        dispatch({ type: DELETE_BERITA_REQUEST })

        const { data } = await axios.delete(process.env.END_POINT_API_PUBLIKASI + `api/berita/${id}`)

        // dispatch({
        //     type: DELETE_BERITA_SUCCESS,
        //     payload: data.success
        // })

        .then ((res) => {
            // console.log (res)
            
            try {
                dispatch({ type: BERITA_REQUEST })

                let link = process.env.END_POINT_API_PUBLIKASI + `api/berita?page=${1}&limit=${5}`
                axios.get (link)

                .then ((res) => {
                    dispatch({
                        type: BERITA_SUCCESS,
                        payload: res.data
                    })
                })

                .catch ((err) => {
                    dispatch({
                        type: BERITA_FAIL,
                        payload: err.message
                    })
                })
                

            } catch (error) {
                dispatch({
                    type: BERITA_FAIL,
                    payload: error.message
                })
            }
            
        })

        .catch ((err) => {
            dispatch({
                type: DELETE_BERITA_FAIL,
                payload: err.response.data.message
            })
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