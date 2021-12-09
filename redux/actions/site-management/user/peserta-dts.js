import {
  LIST_PESERTA_REQUEST,
  LIST_PESERTA_SUCCESS,
  LIST_PESERTA_FAIL,
  DETAIL_PESERTA_SUCCESS,
  DETAIL_PESERTA_FAIL,
  LIST_PELATIHAN_BY_PESERTA_FAIL,
  LIST_PELATIHAN_BY_PESERTA_REQUEST,
  LIST_PELATIHAN_BY_PESERTA_SUCCESS,
  LIST_PELATIHAN_PAGINATION_REQUEST,
  LIST_PELATIHAN_PAGINATION_SUCCESS,
  LIST_PELATIHAN_PAGINATION_FAIL
} from "../../../types/site-management/user/peserta-dts.type";
import axios from 'axios'

export const getAllListsPeserta =
  (token, limit = 5, page = 1, search = "", tokenPermission) =>
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
            "Permission": tokenPermission
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
  (token, id, tokenPermission) =>
  async (dispatch) => {
    try {
      const { data } = await axios.get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}/api/participant/detail/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Permission": tokenPermission
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

  export const getPelatihanWithPagination =
  (token,id, search = "", limit = 5, page = 1, tokenPermission) =>
  async (dispatch) => {
    try {

      dispatch({ type: LIST_PELATIHAN_PAGINATION_REQUEST });
      const { data } = await axios.get(
        `${process.env.END_POINT_API_PELATIHAN}api/v1/formPendaftaran/list-pendaftaran-user-id`,
        {
          params: {
            user_id: id,
            cari: search,
            limit,
            page
          },
          headers: {
            authorization: `Bearer ${token}`,
            "Permission": tokenPermission
          },
        }
      );

      dispatch({
        type: LIST_PELATIHAN_PAGINATION_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: LIST_PELATIHAN_PAGINATION_FAIL,
      });
    }
  };



  export const getPelatihanByPeserta =
  (token, id, tokenPermission) =>
  async (dispatch) => {
    try {

      dispatch({ type: LIST_PELATIHAN_BY_PESERTA_REQUEST });
      const { data } = await axios.get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/participant/training/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Permission": tokenPermission
          },
        }
      );

      dispatch({
        type: LIST_PELATIHAN_BY_PESERTA_SUCCESS,
        payload: data,
      });

    } catch (error) {
      dispatch({
        type: LIST_PELATIHAN_BY_PESERTA_FAIL,
      });
    }
  };

  export const updatePesertaDts =
  (token, datas, tokenPermission) =>
  async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/participant/update/data-diri`,datas,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Permission": tokenPermission
          },
        }
      );
      if(data.status){
        Swal.fire("Berhasil", data.message, "success").then(() => {
          window.location = "/site-management/user/user-dts";
        });

      }else{
        Swal.fire("Ooopss  !", data.message, "error").then(() => {
        });
      }


    } catch (error) {
      Swal.fire("Ooopss  !", JSON.stringify(error.message), "error").then(() => {
      });
    }
  };

  export const pindahPelatihan =
  (token, datas, tokenPermission) =>
  async (dispatch) => {
    try {
      const { data } = await axios.post(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/participant/update/ubah-pelatihan`,datas,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Permission": tokenPermission
          },
        }
      );
      if(data.status){
        Swal.fire("Berhasil", data.message, "success").then(() => {
          window.location = `/site-management/user/user-dts/detail-peserta-dts/${datas.id_peserta}`;
        });

      }else{
        Swal.fire("Ooopss  !", data.message, "error").then(() => {
        });
      }


    } catch (error) {
      Swal.fire("Ooopss  !", JSON.stringify(error.message), "error").then(() => {
      });
    }
  };