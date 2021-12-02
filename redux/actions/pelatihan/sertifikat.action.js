import axios from "axios";
import {
  SERTIFIKAT_FAIL,
  SERTIFIKAT_SUCCESS,
  SERTIFIKAT_REQUEST,
} from "../../types/pelatihan/sertifikat.type";

export const getSertifikatPeserta = (token, id) => async (dispatch) => {
  try {
    let link =
      process.env.END_POINT_API_PELATIHAN +
      `api/v1/formPendaftaran/sertifikat-peserta?pelatihan_id=${id}`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);
    dispatch({
      type: SERTIFIKAT_SUCCESS,
      payload: data,
    });
    return data;
  } catch (error) {
    dispatch({
      type: SERTIFIKAT_FAIL,
      payload: error.response.data.message || error.message,
    });
  }
};
