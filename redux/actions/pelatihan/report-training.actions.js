import axios from "axios";
import { GET_DATA_REPORT_TRAINING } from "../../types/pelatihan/report-training.type";

export const listsReportTraining = (token, page = 1, limit = 5, cari = "", penyelenggara = "", akademi = "", tema = "") => async (dispatch) => {
  try {
    let link =
      process.env.END_POINT_API_PELATIHAN +
      `api/v1/pelatihan/list-rekap-pendaftaran`;

    const config = {
      params: {
        cari,
        limit,
        page,
        pendaftaran_mulai: "",
        pelatihan_mulai: "",
        penyelenggara,
        akademi,
        tema,
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const {data} = await axios.get(link, config);
    dispatch({
        type: GET_DATA_REPORT_TRAINING,
        payload: data,
      });
  } catch (error) {
    throw error;
  }
};
