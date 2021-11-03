import axios from "axios";
import { GET_DATA_REPORT_TRAINING, GET_DETAIL_REPORT_TRAINING } from "../../types/pelatihan/report-training.type";
import Swal from "sweetalert2";

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

export const getDetailReportTraining = (token, pelatian_id, page = 1, limit = 5, search = "", administrasi = "", substansi = "", sertifikat = "", peserta = "") => async (dispatch) => {
  try {
    let link =
      process.env.END_POINT_API_PELATIHAN +
      `api/v1/formPendaftaran/rekap-pendaftaran`;

    const config = {
      params: {
        pelatian_id,
        administrasi,
        peserta: search,
        sertifikat,
        page,
        limit
      },
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const {data} = await axios.get(link, config);
    dispatch({
        type: GET_DETAIL_REPORT_TRAINING,
        payload: data,
      });
  } catch (error) {
    throw error;
  }
};

export const uploadSertifikat = (token, data, pelatian_id) => async (dispatch) => {
  try {
    let link =
      process.env.END_POINT_API_PELATIHAN +
      `api/v1/formPendaftaran/update-sertifikat
      `;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    Swal.fire("Berhasil", "Sertifikat berhasil di Upload", "success").then(() => {
      window.location = "/pelatihan/report-pelatihan/detail-report-pelatihan/" + pelatian_id
    });

  await axios.post(link, data, config);
  } catch (error) {
    throw error;
  }
};
