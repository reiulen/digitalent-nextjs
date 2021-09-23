import {
    KATEGORI_REQUEST,
    KATEGORI_SUCCESS,
    KATEGORI_FAIL,
    PAGINATION_KATEGORI_REQUEST,
    PAGINATION_KATEGORI_SUCCESS,
    PAGINATION_KATEGORI_FAIL,
    NEW_KATEGORI_REQUEST,
    NEW_KATEGORI_SUCCESS,
    NEW_KATEGORI_RESET,
    NEW_KATEGORI_FAIL,
    DELETE_KATEGORI_REQUEST,
    DELETE_KATEGORI_SUCCESS,
    DELETE_KATEGORI_RESET,
    DELETE_KATEGORI_FAIL,
    DETAIL_KATEGORI_REQUEST,
    DETAIL_KATEGORI_SUCCESS,
    DETAIL_KATEGORI_FAIL,
    UPDATE_KATEGORI_REQUEST,
    UPDATE_KATEGORI_SUCCESS,
    UPDATE_KATEGORI_FAIL,
    CLEAR_ERRORS,
} from "../../types/publikasi/kategori.type";

import axios from "axios";

// get all data
// export const getAllKategori = (page = 1, keyword = "", limit = 5, startdate = '', enddate = '') => async (dispatch) => {
//     try {

//         dispatch({ type: KATEGORI_REQUEST })

//         let link = process.env.END_POINT_API_PUBLIKASI + `api/kategori?page=${page}`;
//         if (keyword) link = link.concat(`&keyword=${keyword}`);
//         if (limit) link = link.concat(`&limit=${limit}`);
//         if (startdate) link = link.concat(`&startdate=${startdate}`)
//         if (enddate) link = link.concat(`&enddate=${enddate}`)

//         // const config = {
//         //     headers: {
//         //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
//         //         'Access-Control-Allow-Origin': '*',
//         //         'apikey': process.env.END_POINT_KEY_AUTH
//         //     }
//         // }

//         const { data } = await axios.get(link)

//         dispatch({
//             type: KATEGORI_SUCCESS,
//             payload: data
//         })

//     } catch (error) {
//         dispatch({
//             type: KATEGORI_FAIL,
//             payload: error.message
//         })
//     }
// }

export const getAllKategori = token => async dispatch => {
    try {
        dispatch({ type: KATEGORI_REQUEST });

        let link = process.env.END_POINT_API_PUBLIKASI + `api/kategori`;
        // if (keyword) link = link.concat(`&keyword=${keyword}`);
        // if (limit) link = link.concat(`&limit=${limit}`);
        // if (startdate) link = link.concat(`&startdate=${startdate}`)
        // if (enddate) link = link.concat(`&enddate=${enddate}`)

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const config = {
            headers: {
                Authorization:
                    "Bearer " +
                    " eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJMOWdGbzFOOG1UMWptelg3OWJuRkZFY0IyN2NWMmM3RyIsImlhdCI6MTYzMjIwNTIyOSwiZXhwIjoxNjMyMjkxNjI5LCJuYmYiOjE2MzIyMDUyMjksImp0aSI6Im10bVdDUWs3bGdoQks3V1UiLCJzdWIiOjEsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjciLCJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkX2F0IjoiMjAyMS0wOS0yMVQwMTozNDoxMy4wMDAwMDBaIiwiY3JlYXRlZF9hdCI6IjIwMjEtMDktMjFUMDE6MzQ6MTMuMDAwMDAwWiIsInVwZGF0ZWRfYXQiOiIyMDIxLTA5LTIxVDAxOjM0OjEzLjAwMDAwMFoiLCJ2ZXJpZmlrYXRvciI6MCwidHlwZSI6MCwiZGVsZXRlZF9hdCI6bnVsbCwibm9tb3JfaGFuZHBob25lIjoiMCIsInJvbGVzIjpbXX19.Y2RwtKlO2o07VCwtPu5yMB5D0anyHLgyjxEVPuzuQkQ",
            },
        };

        console.log(`Kategori: ${token}`);

        const { data } = await axios.get(link, config);

        dispatch({
            type: KATEGORI_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: KATEGORI_FAIL,
            payload: error.message,
        });
    }
};

export const paginationKategori =
    (page = 1, keyword = "", limit = 5, startdate = "", enddate = "", token) =>
    async dispatch => {
        try {
            dispatch({ type: PAGINATION_KATEGORI_REQUEST });

            let link =
                process.env.END_POINT_API_PUBLIKASI +
                `api/kategori?page=${page}`;
            if (keyword) link = link.concat(`&keyword=${keyword}`);
            if (limit) link = link.concat(`&limit=${limit}`);
            if (startdate) link = link.concat(`&startdate=${startdate}`);
            if (enddate) link = link.concat(`&enddate=${enddate}`);

            const config = {
                headers: {
                    Authorization: "Bearer " + token,
                },
            };

            // const config = {
            //     headers: {
            //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
            //         'Access-Control-Allow-Origin': '*',
            //         'apikey': process.env.END_POINT_KEY_AUTH
            //     }
            // }

            const { data } = await axios.get(link, config);

            dispatch({
                type: PAGINATION_KATEGORI_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: PAGINATION_KATEGORI_FAIL,
                payload: error.message,
            });
        }
    };

export const getAllKategoriInput = (kategori, token) => async dispatch => {
    try {
        dispatch({ type: KATEGORI_REQUEST });

        let link =
            process.env.END_POINT_API_PUBLIKASI +
            `api/kategori?keyword=${kategori}`;

        const config = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const { data } = await axios.get(link, config);

        dispatch({
            type: KATEGORI_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: KATEGORI_FAIL,
            payload: error.message,
        });
    }
};

export const newKategori = (kategoriData, token) => async dispatch => {
    try {
        dispatch({
            type: NEW_KATEGORI_REQUEST,
        });

        // const config = {
        //     headers: {
        //         'Authorization': 'Bearer ' + process.env.END_POINT_TOKEN_API,
        //         'Access-Control-Allow-Origin': '*',
        //         'apikey': process.env.END_POINT_KEY_AUTH
        //     }
        // }

        const config = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };

        const { data } = await axios.post(
            process.env.END_POINT_API_PUBLIKASI + "api/kategori",
            kategoriData,
            config
        );

        dispatch({
            type: NEW_KATEGORI_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: NEW_KATEGORI_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const deleteKategori = id => async dispatch => {
    try {
        dispatch({ type: DELETE_KATEGORI_REQUEST });

        const { data } = await axios.delete(
            process.env.END_POINT_API_PUBLIKASI + `api/kategori/${id}`
        );

        dispatch({
            type: DELETE_KATEGORI_SUCCESS,
            payload: data.status,
        });
    } catch (error) {
        dispatch({
            type: DELETE_KATEGORI_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const getDetailKategori = (id, token) => async dispatch => {
    try {
        dispatch({ type: DETAIL_KATEGORI_REQUEST });

        const config = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };

        let link = process.env.END_POINT_API_PUBLIKASI + `api/kategori/${id}`;

        const { data } = await axios.get(link, config);

        dispatch({
            type: DETAIL_KATEGORI_SUCCESS,
            payload: data.data,
        });
    } catch (error) {
        dispatch({
            type: DETAIL_KATEGORI_FAIL,
            payload: error.response.data.message,
        });
    }
};

export const updateKategori = (kategori, id, token) => async dispatch => {
    try {
        dispatch({ type: UPDATE_KATEGORI_REQUEST });

        const config = {
            headers: {
                Authorization: "Bearer " + token,
            },
        };

        let link = process.env.END_POINT_API_PUBLIKASI + `api/kategori/${id}`;

        const { data } = await axios.put(link, kategori, config);

        dispatch({
            type: UPDATE_KATEGORI_SUCCESS,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type: UPDATE_KATEGORI_FAIL,
            payload: error.response.data.message,
        });
    }
};

// Clear Error
export const clearErrors = () => async dispatch => {
    dispatch({
        type: CLEAR_ERRORS,
    });
};
