import {
    DETAIL_AKADEMI_REQUEST,
    DETAIL_AKADEMI_SUCCESS,
    DETAIL_AKADEMI_FAIL,

    PELATIHAN_AKADEMI_REQUEST,
    PELATIHAN_AKADEMI_SUCCESS,
    PELATIHAN_AKADEMI_FAIL,

    CLEAR_ERRORS
} from "../../types/beranda/detail-akademi.type"

import axios from "axios";

// Get Detail Akademi
export const getDetailAkademi = (id) => async dispatch => {
    try {
  
      let link = process.env.END_POINT_API_PELATIHAN + `api/v1/akademi/kategori-akademi?akademi_id=${id}`;
  
      const { data } = await axios.get(link);
  
      dispatch({
        type: DETAIL_AKADEMI_SUCCESS,
        payload: data.data,
      });

    } catch (error) {
      dispatch({
        type: DETAIL_AKADEMI_FAIL,
        payload: error.message,
      });
    }
};

// Get All Pelatihan By Akademi
export const getAllPelatihanByAkademi =
  (
    id = null,
    tema_id = null,
    provinsi = null,
    tipe_pelatihan = null,
    penyelenggara = null,
    kategori_peserta = null,
    kata_kunci = null,
    tanggal_mulai = null,
    tanggal_akhir = null,
    page = null
  ) =>
  async dispatch => {
    try {
      dispatch({ type: PELATIHAN_AKADEMI_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN + `api/v1/akademi/kategori-akademi?akademi_id=${id}`;

      if (tema_id) link = link.concat(`&tema_id=${tema_id}`);
      if (provinsi) link = link.concat(`&provinsi=${provinsi}`);
      if (tipe_pelatihan) link = link.concat(`&tipe_pelatihan=${tipe_pelatihan}`);
      if (penyelenggara) link = link.concat(`&penyelenggara=${penyelenggara}`);
      if (kategori_peserta) link = link.concat(`&kategori_peserta=${kategori_peserta}`);
      if (kata_kunci) link = link.concat(`&kata_kunci=${kata_kunci}`);
      if (tanggal_mulai) link = link.concat(`&tanggal_mulai=${tanggal_mulai}`);
      if (tanggal_akhir) link = link.concat(`&tanggal_akhir=${tanggal_akhir}`);
      if (page) link = link.concat(`&page=${page}`);

      const { data } = await axios.get(link);

      dispatch({
        type: PELATIHAN_AKADEMI_SUCCESS,
        payload: data.data,
      });

    } catch (error) {
      dispatch({
        type: PELATIHAN_AKADEMI_FAIL,
        payload: error.message,
      });
    }
};

// Clear Error
export const clearErrors = () => async dispatch => {
    dispatch({
      type: CLEAR_ERRORS,
    });
  };


