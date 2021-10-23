import {
  GET_DASHBOARD_PESERTA_SUCCESS,
  GET_DASHBOARD_PESERTA_FAIL,
} from "../../../redux/types/pelatihan/dashboard-peserta.type";
import axios from "axios";

export const getDashboardPeserta = (token) => async (dispatch) => {
  try {
    let link =
      process.env.END_POINT_API_PELATIHAN +
      `/api/v1/formPendaftaran/dasboard-peserta`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: GET_DASHBOARD_PESERTA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_DASHBOARD_PESERTA_FAIL,
      payload: error.response.data.message,
    });
  }
};
