import {
  RIWAYAT_PELATIHAN_FAIL,
  RIWAYAT_PELATIHAN_REQUEST,
  RIWAYAT_PELATIHAN_SUCCESS,
} from "../../types/pelatihan/riwayat-pelatihan.type";
import axios from "axios";

export const getAllRiwayatPelatihanPeserta =
  (token) => async (dispatch, getState) => {
    try {
      dispatch({ type: RIWAYAT_PELATIHAN_REQUEST });
      let link =
        process.env.END_POINT_API_PELATIHAN +
        `api/v1/formPendaftaran/list-pendaftaran-user`;
      let pesertaState = getState().getAllRiwayatPelatihanPeserta.peserta;
      let keywordState = getState().getAllRiwayatPelatihanPeserta.keyword || "";

      const params = {
        peserta: pesertaState,
        keyword: keywordState,
      };
      const config = {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(link, config);
      if (data) {
        dispatch({ type: RIWAYAT_PELATIHAN_SUCCESS, payload: data });
      }
    } catch (error) {
      dispatch({
        type: RIWAYAT_PELATIHAN_FAIL,
        payload: error,
      });
    }
  };
