import {
    IMAGETRON_REQUEST,
    IMAGETRON_SUCCESS,
    IMAGETRON_FAIL,

    NEW_IMAGETRON_REQUEST,
    NEW_IMAGETRON_SUCCESS,
    NEW_IMAGETRON_RESET,
    NEW_IMAGETRON_FAIL,

    DELETE_IMAGETRON_REQUEST,
    DELETE_IMAGETRON_SUCCESS,
    DELETE_IMAGETRON_RESET,
    DELETE_IMAGETRON_FAIL,

    DETAIL_IMAGETRON_REQUEST,
    DETAIL_IMAGETRON_SUCCESS,
    DETAIL_IMAGETRON_FAIL,

    UPDATE_IMAGETRON_REQUEST,
    UPDATE_IMAGETRON_SUCCESS,
    UPDATE_IMAGETRON_RESET,
    UPDATE_IMAGETRON_FAIL,

    CLEAR_ERRORS,
} from '../../types/publikasi/imagetron.type'

import axios from 'axios'

export const getAllImagetron = (page = 1, keyword = "", limit = 5, publish = null, startdate = null, enddate = null, token, permission) => async (dispatch) => {
    try {

        dispatch({ type: IMAGETRON_REQUEST })

        let link = process.env.END_POINT_API_PUBLIKASI + `api/imagetron?page=${page}`;
        if (keyword) link = link.concat(`&keyword=${keyword}`);
        if (limit) link = link.concat(`&limit=${limit}`);
        if (publish) link = link.concat(`&publish=${publish}`);
        if (startdate) link = link.concat(`&startdate=${startdate}`);
        if (enddate) link = link.concat(`&enddate=${enddate}`);

        const config = {
            headers: {
                Authorization: "Bearer " + token,
                "Permission": permission
            },
        };

        const data = await axios.get(link, config);

        dispatch({
            type: IMAGETRON_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: IMAGETRON_FAIL,
            payload: error.response.data.message
        })
    }
}

export const getDetailImagetron = (id, token, permission) => async (dispatch) => {
    try {
        let link = process.env.END_POINT_API_PUBLIKASI + `api/imagetron/${id}`;

        const config = {
            headers: {
                Authorization: "Bearer " + token,
                "Permission": permission
            },
        };

        const { data } = await axios.get(link, config);
        dispatch({
            type: DETAIL_IMAGETRON_SUCCESS,
            payload: data.data,
        });

    } catch (error) {
        dispatch({
            type: DETAIL_IMAGETRON_FAIL,
            payload: error.response.data.message,
        });
    }
};


export const newImagetron = (imagetronData, token, permission) => async (dispatch) => {
    try {

        dispatch({
            type: NEW_IMAGETRON_REQUEST
        })

        const config = {
            headers: {
                Authorization: "Bearer " + token,
                "Permission": permission
            },
        };
        const { data } = await axios.post(process.env.END_POINT_API_PUBLIKASI + 'api/imagetron', imagetronData, config)

        dispatch({
            type: NEW_IMAGETRON_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: NEW_IMAGETRON_FAIL,
            payload: error.response.data.message
        })
    }
}

export const updateImagetron = (imagetronData, token, permission) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_IMAGETRON_REQUEST });

        let link = process.env.END_POINT_API_PUBLIKASI + `api/imagetron/${imagetronData.id}`;

        const config = {
            headers: {
                Authorization: "Bearer " + token,
                "Permission": permission
            },
        };

        const { data } = await axios.post(link, imagetronData, config);

        dispatch({
            type: UPDATE_IMAGETRON_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_IMAGETRON_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const deleteImagetron = (id, token, permission) => async (dispatch) => {
    try {

        dispatch({ type: DELETE_IMAGETRON_REQUEST })

        const config = {
            headers: {
                Authorization: "Bearer " + token,
                "Permission": permission
            },
        };

        const { data } = await axios.delete(process.env.END_POINT_API_PUBLIKASI + "api/imagetron/" + id, config)

        dispatch({
            type: DELETE_IMAGETRON_SUCCESS,
            payload: data.status
        })
    } catch (error) {
        dispatch({
            type: DELETE_IMAGETRON_FAIL,
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