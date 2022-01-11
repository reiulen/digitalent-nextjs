import axios from "axios";
import {
  BERANDA_FAQ_REQUEST,
  BERANDA_FAQ_SUCCESS,
  BERANDA_FAQ_FAIL,
  KATEGORI_BERANDA_FAQ_REQUEST,
  KATEGORI_BERANDA_FAQ_SUCCESS,
  KATEGORI_BERANDA_FAQ_FAIL,
  CLEAR_ERRORS,
} from "../../types/beranda/faq-content.type";

export const getAllFaq =
  (pinned = "", category_name = "", keyword = "", token = "") =>
    async (dispatch) => {
      try {
        dispatch({ type: BERANDA_FAQ_REQUEST });

        let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/home/faq`;

        if (pinned) link = link.concat(`?pinned=${pinned}`);
        if (category_name) link = link.concat(`?category_name=${category_name}`);
        if (keyword) link = link.concat(`?keyword=${keyword}`);

        const config = {
          headers: {
            // Authorization: "Bearer " + token,
            apiKey: process.env.API_KEY_PUBLIKASI,
          },
        };
        const { data } = await axios.get(link, config);

        dispatch({
          type: BERANDA_FAQ_SUCCESS,
          payload: data,
        });
        return data;
      } catch (error) {
        dispatch({
          type: BERANDA_FAQ_FAIL,
          payload: error.response.data.message,
        });
      }
    };

export const getKategoriBerandaFaq = () => async (dispatch) => {
  try {
    dispatch({ type: KATEGORI_BERANDA_FAQ_REQUEST });

    let link = process.env.END_POINT_API_PUBLIKASI_1 + `api/kategori`;

    const config = {
      headers: {
        apikey: process.env.API_KEY_PUBLIKASI,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: KATEGORI_BERANDA_FAQ_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: KATEGORI_BERANDA_FAQ_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear Error
export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
