import {
    BERANDA_AKADEMI_REQUEST,
    BERANDA_AKADEMI_SUCCESS,
    BERANDA_AKADEMI_FAIL,

    BERANDA_TEMA_REQUEST,
    BERANDA_TEMA_SUCCESS,
    BERANDA_TEMA_FAIL,

    BERANDA_PELATIHAN_REQUEST,
    BERANDA_PELATIHAN_SUCCESS,
    BERANDA_PELATIHAN_FAIL,

    BERANDA_PUBLIKASI_REQUEST,
    BERANDA_PUBLIKASI_SUCCESS,
    BERANDA_PUBLIKASI_FAIL,

    CLEAR_ERRORS
} from "../../types/beranda/beranda.type"

import axios from "axios";

// GET AKADEMI
export const getAllAkademi = () => async dispatch => {
    try {
        dispatch({ type: BERANDA_AKADEMI_REQUEST });

        let link = process.env.END_POINT_API_PELATIHAN + `api/v1/akademi/dasboard-akademi`

        const { data } = await axios.get(link);

        dispatch({
            type: BERANDA_AKADEMI_SUCCESS,
            payload: data,
        });
        
    } catch (error) {
        dispatch({
            type: BERANDA_AKADEMI_FAIL,
            payload: error.message,
        });
    }
}

// GET TEMA
export const getTemaByAkademi = (akademi_id) => async dispatch => {
    try {
        dispatch({ type: BERANDA_TEMA_REQUEST });

        let link = process.env.END_POINT_API_PELATIHAN + `api/v1/tema/FilterAkademi?akademi_id=${akademi_id}`

        const { data } = await axios.get (link);

        dispatch({
            type: BERANDA_TEMA_SUCCESS,
            payload: data,
        });
        
    } catch (error) {
        dispatch({
            type: BERANDA_TEMA_FAIL,
            payload: error.message,
        });
    }
}

// GET PELATIHAN
export const getPelatihanByTema =(
    akademi = 1,
    tema = 1, 
    page = 1
)  => async dispatch => {
    try {
        dispatch({ type: BERANDA_PELATIHAN_REQUEST });

        let link = process.env.END_POINT_API_PELATIHAN + `api/v1/pelatihan/dasboard-pelatihan?akademi=${akademi}&tema=${tema}&page=${page}`

        const { data } = await axios.get (link);

        dispatch({
            type: BERANDA_PELATIHAN_SUCCESS,
            payload: data,
        });
        
    } catch (error) {
        dispatch({
            type: BERANDA_PELATIHAN_FAIL,
            payload: error.message,
        });
    }
}

// GET PUBLIKASI
export const getAllPublikasi = () => async dispatch => {
    try {
        dispatch({ type: BERANDA_PUBLIKASI_REQUEST });

        let link = process.env.END_POINT_API_PUBLIKASI_1 +`api/home`

        const { data } = await axios.get(link);

        dispatch({
            type: BERANDA_PUBLIKASI_SUCCESS,
            payload: data,
        });
        
    } catch (error) {
        dispatch({
            type: BERANDA_PUBLIKASI_FAIL,
            payload: error.message,
        });
    }
}

// Clear Error
export const clearErrors = () => async dispatch => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
