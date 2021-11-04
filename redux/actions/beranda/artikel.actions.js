import {
    BERANDA_ARTIKEL_REQUEST,
    BERANDA_ARTIKEL_SUCCESS,
    BERANDA_ARTIKEL_FAIL,

    DETAIL_BERANDA_ARTIKEL_REQUEST,
    DETAIL_BERANDA_ARTIKEL_SUCCESS,
    DETAIL_BERANDA_ARTIKEL_FAIL,

    KATEGORI_BERANDA_ARTIKEL_REQUEST,
    KATEGORI_BERANDA_ARTIKEL_SUCCESS,
    KATEGORI_BERANDA_ARTIKEL_FAIL,

    CLEAR_ERRORS
} from "../../types/beranda/artikel.type"

import axios from "axios";

// Get all data

export const getAllBerandaArtikel = 
(
    page = 1,
    keyword = "",
    limit="",
    filterPublish="",
    sort="",
    category_id="",
    category_name="",
    category_akademi="",
    tag="",
) => 
    async dispatch => {
        try {
            dispatch({ type: BERANDA_ARTIKEL_REQUEST})

            let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/home/artikel?page=${page}`
            if (keyword) link = link.concat(`&keyword=${keyword}`);
            if (limit) link = link.concat(`&limit=${limit}`);
            if (filterPublish) link = link.concat(`&filterPublish=${filterPublish}`);
            if (sort) link = link.concat(`&sort=${sort}`);
            if (category_id) link = link.concat(`&category_id=${category_id}`);
            if (category_name) link = link.concat(`&category_name=${category_name}`);
            if (category_akademi) link = link.concat(`&category_akademi=${category_akademi}`);
            if (tag) link = link.concat(`&tag=${tag}`);

            const { data } = await axios.get(link);

            dispatch({
                type: BERANDA_ARTIKEL_SUCCESS,
                payload: data,
            })
            
        } catch (error) {
            dispatch({
                type: BERANDA_ARTIKEL_FAIL,
                payload: error.response.data.message,
            });
        }
    }

export const getDetailBerandaArtikel = (id) => async dispatch => {
    try {
        let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/artikel/${id}`

        const { data } = await axios.get(link)

        dispatch ({
            type: DETAIL_BERANDA_ARTIKEL_SUCCESS,
            payload: data.data
        })
        
    } catch (error) {
        dispatch ({
            type: DETAIL_BERANDA_ARTIKEL_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getKategoriBerandaArtikel = () => async dispatch => {
    try {
        dispatch({ type: KATEGORI_BERANDA_ARTIKEL_REQUEST})

        let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/kategori`

        const { data } = await axios.get(link)

        dispatch({
            type: KATEGORI_BERANDA_ARTIKEL_SUCCESS,
            payload: data,
        })
        
    } catch (error) {
        dispatch({
            type: KATEGORI_BERANDA_ARTIKEL_FAIL,
            payload: error.response.data.message,
        });
    }
}

// Clear Error
export const clearErrors = () => async dispatch => {
    dispatch({
      type: CLEAR_ERRORS,
    });
};