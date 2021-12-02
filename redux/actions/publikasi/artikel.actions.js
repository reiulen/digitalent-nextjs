import {
  ARTIKEL_REQUEST,
  ARTIKEL_SUCCESS,
  ARTIKEL_FAIL,
  ARTIKEL_PESERTA_REQUEST,
  ARTIKEL_PESERTA_SUCCESS,
  ARTIKEL_PESERTA_FAIL,
  NEW_ARTIKEL_REQUEST,
  NEW_ARTIKEL_SUCCESS,
  NEW_ARTIKEL_RESET,
  NEW_ARTIKEL_FAIL,
  DELETE_ARTIKEL_REQUEST,
  DELETE_ARTIKEL_SUCCESS,
  DELETE_ARTIKEL_RESET,
  DELETE_ARTIKEL_FAIL,
  DETAIL_ARTIKEL_REQUEST,
  DETAIL_ARTIKEL_SUCCESS,
  DETAIL_ARTIKEL_FAIL,
  DETAIL_ARTIKEL_PESERTA_REQUEST,
  DETAIL_ARTIKEL_PESERTA_SUCCESS,
  DETAIL_ARTIKEL_PESERTA_FAIL,
  UPDATE_ARTIKEL_REQUEST,
  UPDATE_ARTIKEL_SUCCESS,
  UPDATE_ARTIKEL_RESET,
  UPDATE_ARTIKEL_FAIL,
  CLEAR_ERRORS,
} from "../../types/publikasi/artikel.type";

import Swal from "sweetalert2";

import axios from "axios";

// get all data
export const getAllArtikel =
  (
    page = 1,
    keyword = "",
    limit = 5,
    publish = null,
    startdate = null,
    enddate = null,
    token
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ARTIKEL_REQUEST });
      let link =
        process.env.END_POINT_API_PUBLIKASI + `api/artikel?page=${page}`;
      if (keyword) link = link.concat(`&keyword=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);
      if (publish) link = link.concat(`&publish=${publish}`);
      if (startdate) link = link.concat(`&startdate=${startdate}`);
      if (enddate) link = link.concat(`&enddate=${enddate}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: ARTIKEL_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ARTIKEL_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getAllArtikelsPeserta =
  (
    token,
    page = 1,
    limit = 5,
    keyword = null,
    publish = null,
    startdate = null,
    enddate = null
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: ARTIKEL_PESERTA_REQUEST });
      let link = process.env.END_POINT_API_PUBLIKASI + `api/artikel/auth/peserta`;

      const config = {
        params: {
          page,
          keyword,
          limit,
          publish,
          startdate,
          enddate,
        },
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);
      dispatch({
        type: ARTIKEL_PESERTA_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ARTIKEL_PESERTA_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getDetailArtikel = (id, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    let link = process.env.END_POINT_API_PUBLIKASI + `api/artikel/${id}`;

    const { data } = await axios.get(link, config);

    dispatch({
      type: DETAIL_ARTIKEL_SUCCESS,
      payload: data.data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_ARTIKEL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getDetailArtikelsPeserta = (id, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    let link = process.env.END_POINT_API_PUBLIKASI + `api/artikel/auth/peserta/${id}`;

    const { data } = await axios.get(link, config);

    dispatch({
      type: DETAIL_ARTIKEL_PESERTA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DETAIL_ARTIKEL_PESERTA_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newArtikel = (artikelData, token) => async (dispatch) => {
  try {
    dispatch({
      type: NEW_ARTIKEL_REQUEST,
    });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_PUBLIKASI + "api/artikel",
      artikelData,
      config
    );
    dispatch({
      type: NEW_ARTIKEL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NEW_ARTIKEL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const newArtikelPeserta = (artikelData, token) => async (dispatch) => {
  try {
    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_PUBLIKASI + "api/artikel/auth/peserta",
      artikelData,
      config
    );

    if(data.status === true){
      Swal.fire("Berhasil", "Artikel Berhasil Dibuat", "success").then(() => {
        window.location = "/peserta/artikel";
      });
    }else{
      Swal.fire("Oops !", data.message, "error").then(() => {});
    }

  } catch (error) {
    Swal.fire("Oops !", data.message, "error").then(() => {});
  }
};

export const updateArtikel = (artikelData, token) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ARTIKEL_REQUEST });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_PUBLIKASI + `api/artikel/${artikelData.id}`,
      artikelData,
      config
    );

    dispatch({
      type: UPDATE_ARTIKEL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPDATE_ARTIKEL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const updateArtikelPeserta = (artikelData, token, id) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_ARTIKEL_REQUEST });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.post(
      process.env.END_POINT_API_PUBLIKASI + "api/artikel/auth/peserta/" + id,
      artikelData,
      config
    );

    Swal.fire("Berhasil", data.message, "success").then(() => {
      window.location = "/peserta/artikel";
    });
  } catch (error) {
    Swal.fire("Gagal", data.message, "error").then(() => {});
  }
};

export const deleteArtikelPeserta = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ARTIKEL_REQUEST });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.delete(
      process.env.END_POINT_API_PUBLIKASI + "api/artikel/auth/peserta/" + id,
      config
    );

    dispatch({
      type: DELETE_ARTIKEL_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ARTIKEL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const deleteArtikel = (id, token) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_ARTIKEL_REQUEST });

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const { data } = await axios.delete(
      process.env.END_POINT_API_PUBLIKASI + `api/artikel/${id}`,
      config
    );

    dispatch({
      type: DELETE_ARTIKEL_SUCCESS,
      payload: data.status,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ARTIKEL_FAIL,
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
