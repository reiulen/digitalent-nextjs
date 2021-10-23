import {
  SUMMARY_REQUEST,
  SUMMARY_SUCCESS,
  SUMMARY_FAIL,
  CLEAR_ERRORS,
} from "../../types/pelatihan/summary.type";

import axios from "axios";

//ALL SUMMARY
export const getAllSummary =
  (
    page = 1,
    keyword = "",
    limit = 5,
    pendaftaran_mulai,
    pelatihan_mulai,
    status_substansi,
    status_pelatihan,
    penyelenggara,
    akademi,
    tema,
    token
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: SUMMARY_REQUEST });

      let link =
        process.env.END_POINT_API_PELATIHAN +
        `/api/v1/pelatihan/find-revisi?page=${page}`;
      if (keyword) link = link.concat(`&cari=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);
      if (pendaftaran_mulai)
        link = link.concat(`&pendaftaran_mulai=${pendaftaran_mulai}`);
      if (pelatihan_mulai)
        link = link.concat(`&pelatihan_mulai=${pelatihan_mulai}`);
      if (status_substansi)
        link = link.concat(`&status_substansi=${status_substansi}`);
      if (status_pelatihan)
        link = link.concat(`&status_pelatihan=${status_pelatihan}`);
      if (penyelenggara) link = link.concat(`&penyelenggara=${penyelenggara}`);
      if (akademi) link = link.concat(`&akademi=${akademi}`);
      if (tema) link = link.concat(`&tema=${tema}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: SUMMARY_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SUMMARY_FAIL,
        payload: error.response.data.message,
      });
    }
  };
//END ALL SUMMARY

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
