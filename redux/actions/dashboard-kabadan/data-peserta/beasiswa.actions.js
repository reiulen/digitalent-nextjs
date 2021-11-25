import {
  BEASISWA_KANDIDAT_REQUEST,
  BEASISWA_KANDIDAT_SUCCESS,
  BEASISWA_KANDIDAT_FAIL,
} from "../../../types/dashboard-kabadan/data-peserta/beasiswa.type";

import axios from "axios";

export const getAllBeasiswaKandidat =
  (token, page = null, keyword = "", limit = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: BEASISWA_KANDIDAT_REQUEST });

      let link = process.env.END_POINT_API_PELATIHAN + `api/kandidat/beasiswa?`;
      if (page) link = link.concat(`&page=${page}`);
      if (keyword) link = link.concat(`&cari=${keyword}`);
      if (limit) link = link.concat(`&limit=${limit}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: BEASISWA_KANDIDAT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: BEASISWA_KANDIDAT_FAIL,
        payload: error.message,
      });
    }
  };
