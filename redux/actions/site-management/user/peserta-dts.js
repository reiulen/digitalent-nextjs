import {
  LIST_PESERTA_REQUEST,
  LIST_PESERTA_SUCCESS,
  LIST_PESERTA_FAIL,
  DETAIL_PESERTA_SUCCESS,
  DETAIL_PESERTA_FAIL
} from "../../../types/site-management/user/peserta-dts.type";
import axios from 'axios'

export const getAllListsPeserta =
  (token, limit = 5, page = 1, search = "") =>
  async (dispatch) => {
    try {
      dispatch({ type: LIST_PESERTA_REQUEST });

      const params = {
        page: page,
        limit: limit,
        cari: search,
      };

      const { data } = await axios.get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}/api/participant/all`,
        {
          params,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: LIST_PESERTA_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: LIST_PESERTA_FAIL,
      });
    }
  };

  export const getDetailPesertaManage =
  (token, id) =>
  async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}/api/participant/detail/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: DETAIL_PESERTA_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: DETAIL_PESERTA_FAIL,
      });
    }
  };