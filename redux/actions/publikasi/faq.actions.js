import {
    FAQ_REQUEST,
    FAQ_SUCCESS,
    FAQ_FAIL,

    PAGINATION_FAQ_REQUEST,
    PAGINATION_FAQ_SUCCESS,
    PAGINATION_FAQ_FAIL,

    NEW_FAQ_REQUEST,
    NEW_FAQ_SUCCESS,
    NEW_FAQ_RESET,
    NEW_FAQ_FAIL,

    DELETE_FAQ_REQUEST,
    DELETE_FAQ_SUCCESS,
    DELETE_FAQ_RESET,
    DELETE_FAQ_FAIL,

    DETAIL_FAQ_REQUEST,
    DETAIL_FAQ_SUCCESS,
    DETAIL_FAQ_FAIL,

    UPDATE_FAQ_REQUEST,
    UPDATE_FAQ_SUCCESS,
    UPDATE_FAQ_FAIL,
    UPDATE_FAQ_RESET,

    UPDATE_PIN_FAQ_REQUEST,
    UPDATE_PIN_FAQ_SUCCESS,
    UPDATE_PIN_FAQ_FAIL,

    CLEAR_ERRORS,
} from '../../types/publikasi/faq.type'

import axios from 'axios'

// get all data
export const getAllFaq = () => async (dispatch) => {
    try {

        dispatch({ type: FAQ_REQUEST })

        let link = process.env.END_POINT_API_PUBLIKASI + `api/faq`;
        // if (keyword) link = link.concat(`&keyword=${keyword}`);
        // if (limit) link = link.concat(`&limit=${limit}`);
        // if (publish) link = link.concat(`&publish=${publish}`);
        // if (startdate) link = link.concat(`&startdate=${startdate}`)
        // if (enddate) link = link.concat(`&enddate=${enddate}`)

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.get(link)

        dispatch({
            type: FAQ_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: FAQ_FAIL,
            payload: error.message
        })
    }
}

export const getAllFaqPagination = (page = 1, keyword = "", limit = 5, publish = null, startdate = null, enddate = null) => async (dispatch) => {
    try {

        dispatch({ type: PAGINATION_FAQ_REQUEST })

        let link = process.env.END_POINT_API_PUBLIKASI + `api/faq?page=${page}`;
        if (keyword) link = link.concat(`&keyword=${keyword}`);
        if (limit) link = link.concat(`&limit=${limit}`);
        if (publish) link = link.concat(`&publish=${publish}`);
        if (startdate) link = link.concat(`&startdate=${startdate}`)
        if (enddate) link = link.concat(`&enddate=${enddate}`)

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.get(link)

        dispatch({
            type: PAGINATION_FAQ_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PAGINATION_FAQ_FAIL,
            payload: error.message
        })
    }
}

export const newFaq = (faqData) => async (dispatch) => {
    try {

        dispatch({
            type: NEW_FAQ_REQUEST
        })

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.post(process.env.END_POINT_API_PUBLIKASI + 'api/faq', faqData)

        dispatch({
            type: NEW_FAQ_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_FAQ_FAIL,
            payload: error.response.data.message
        })
    }
}

export const deleteFaq = (id) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_FAQ_REQUEST })

        const { data } = await axios.delete(process.env.END_POINT_API_PUBLIKASI + `api/faq/${id}`)

        dispatch({
            type: DELETE_FAQ_SUCCESS,
            payload: data.status
        })

    } catch (error) {
        dispatch({
            type: DELETE_FAQ_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getDetailFaq = (id) => async (dispatch) => {
    try {
        dispatch({ type: DETAIL_FAQ_REQUEST })

        let link = process.env.END_POINT_API_PUBLIKASI + `api/faq/${id}`;

        const { data } = await axios.get(link);

        dispatch({
            type: DETAIL_FAQ_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: DETAIL_FAQ_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const updateFaq = (faqData, id) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_FAQ_REQUEST });

        let link =
            process.env.END_POINT_API_PUBLIKASI + `api/faq/${id}`;

        const { data } = await axios.post(link, faqData);

        dispatch({
            type: UPDATE_FAQ_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_FAQ_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const updatePinFaq = (faq, id) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_PIN_FAQ_REQUEST });

        let link =
            process.env.END_POINT_API_PUBLIKASI + `api/faq/${id}`;

        const { data } = await axios.post(link, faq);

        dispatch({
            type: UPDATE_PIN_FAQ_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PIN_FAQ_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clear Error
export const clearErrors = () => async (dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}