import {
    KATEGORI_REQUEST,
    KATEGORI_SUCCESS,
    KATEGORI_FAIL,
    CLEAR_ERRORS
} from "../../types/publikasi/kategori.type"

import axios from "axios";

export const getAllKategori = (token) => async dispatch => {
    try {
        dispatch({ type: KATEGORI_REQUEST });
        let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/kategori`;
        const config = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };

        const { data } = await axios.get(link, config);
        // console.log("Action Kategori :", data)

        dispatch({
            type: KATEGORI_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: KATEGORI_FAIL,
            payload: error.response.data.message,
        });
    }
};