import axios from "axios";
import debounce from "debounce-promise";
import {
  MITRA_REQUEST,
  MITRA_SUCCESS,
  MITRA_FAIL,
  SEARCH_BY_KEY,
  SUCESS_DELETE_MITRA,
  SUCESS_PROVINCE,
  SET_PAGE_M,
  SET_LIMIT,
  CANCEL_CHANGE_PROVINCES,
  MITRA_FAIL_DETAIL,
  MITRA_REQUEST_DETAIL,
  MITRA_SUCCESS_DETAIL,
  SEARCH_BY_KEY_DETAIL,
  SET_PAGE_M_DETAIL,
  SET_LIMIT_DETAIL,
  LIST_COOPERATION_SUCCESS_DETAIL,
  LIST_STATUS_SUCCESS_DETAIL,
  SET_VALUE_KERJA_SAMA_M_DETAIL,
  SET_VALUE_STATUS_M_DETAIL,
  RELOAD_TABLE_DETAIL,
  SUCCESS_DELETE_COOPERATION_M_DETAIL,
  CHANGE_STATUS_LIST_M_DETAIL,
  CHANGE_STATUS_LIST_M,
} from "../../types/partnership/mitra.type";
import router from "next/router";

export async function getAllMitra(params) {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}api/partners`,
    {
      params,
    }
  );
}
// ============== GET DETAIL FETCH
export async function getCooperation() {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}api/option/cooperation`
  );
}
export async function getStatus() {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}api/option/status`
  );
}
// ============== GET DETAIL FETCH

let debouncedFetchMitra = debounce(getAllMitra, 0);

export const fetchMitra = (token) => {
  return async (dispatch, getState) => {
    dispatch({ type: MITRA_REQUEST });
    let keywordState = getState().allMitra.keyword || "";
    let limitState = getState().allMitra.limit || "";
    let pageState = getState().allMitra.page || 1;

    const params = {
      keyword: keywordState,
      limit: limitState,
      page: pageState,
    };

    try {
      const { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}api/partners`,
        {
          params,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(successFetchMitra(data, data.data.total));
    } catch (error) {
      dispatch(errorFetchMitra());
    }
  };
};

export const successFetchMitra = (data, totalData) => {
  return {
    type: MITRA_SUCCESS,
    data,
    totalData,
  };
};
export const errorFetchMitra = (data) => {
  return {
    type: MITRA_FAIL,
    data,
  };
};
export const searchByKey = (value) => {
  return {
    type: SEARCH_BY_KEY,
    value,
  };
};
export const deleteMitra = (token, id) => {
  return async (dispatch, getState) => {
    try {
      let { data } = await axios.delete(
        `${process.env.END_POINT_API_PARTNERSHIP}api/partners/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: SUCESS_DELETE_MITRA });
    } catch (error) {
      console.log("gagal delete mitra", error);
    }
  };
};
export const setPage = (page) => {
  return {
    type: SET_PAGE_M,
    page,
  };
};

export const setLimit = (value) => {
  console.log("value", value);
  return {
    type: SET_LIMIT,
    limitValue: value,
  };
};

export const getProvinces = (token) => {
  return async (dispatch, getState) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}api/option/provinces`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      let dataNewProvinces = data.data.map((items) => {
        return { ...items, label: items.name, value: items.id };
      });
      dataNewProvinces.splice(0, 0, { label: "Pilih Provinsi", value: "" });

      dispatch(successGetProvinces(dataNewProvinces));
    } catch (error) {
      console.log("gagal get province", error);
    }
  };
};

export const successGetProvinces = (data) => {
  return {
    type: SUCESS_PROVINCE,
    data,
  };
};

export const cancelChangeProvinces = () => {
  return {
    type: CANCEL_CHANGE_PROVINCES,
  };
};

export const exportFileCSV = (token) => {
  return async () => {
    try {
      let urlExport = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}api/partners/excel/export`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      var url = urlExport.config.url + `?authorization=Bearer ${token}`;

      fetch(url, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.blob())
        .then((blob) => {
          var _url = window.URL.createObjectURL(blob);
          window.open(_url, "_blank").focus();
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log("object", error);
    }
  };
};

// ====================================== mitra detail

export async function getAllMitraDetail(paramsID, id) {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}api/partners/cooperation/${id}?categories_cooporation=${paramsID.categories_cooporation}&status=${paramsID.status}&page=${paramsID.page}&limit=${paramsID.limit}&keyword=${paramsID.keyword}`
  );
}

export const getSingleValue = (token, id) => {
  return async (dispatch, getState) => {
    dispatch({ type: MITRA_REQUEST_DETAIL });
    let keywordState = getState().allMitra.keywordDetail || "";
    let limitState = getState().allMitra.limitDetail || "";
    let pageState = getState().allMitra.pageDetail || 1;
    let categoryState = getState().allMitra.categories_cooporation;
    let statusState = getState().allMitra.statusDetail;

    const paramsID = {
      keyword: keywordState,
      limit: limitState,
      page: pageState,
      categories_cooporation: categoryState,
      status: statusState,
    };

    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}api/partners/cooperation/${id}?categories_cooporation=${paramsID.categories_cooporation}&status=${paramsID.status}&page=${paramsID.page}&limit=${paramsID.limit}&keyword=${paramsID.keyword}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(successGetSingleValue(data, data.data.total));
    } catch (error) {
      dispatch({ type: MITRA_FAIL_DETAIL });
    }
  };
};

export const successGetSingleValue = (data, totalData) => {
  return {
    type: MITRA_SUCCESS_DETAIL,
    data,
    totalData,
  };
};

export const searchByKeyDetail = (value) => {
  return {
    type: SEARCH_BY_KEY_DETAIL,
    value,
  };
};

export const setPageDetail = (page) => {
  return {
    type: SET_PAGE_M_DETAIL,
    page,
  };
};
export const setLimitDetail = (value) => {
  return {
    type: SET_LIMIT_DETAIL,
    value,
  };
};

export const exportFileCSVDetail = (token, id) => {
  return async (dispatch, getState) => {
    let statusState = getState().allMitra.statusDetail || "";
    let cooperationState = getState().allMitra.categories_cooporation || "";
    try {
      let urlExport = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}api/partners/excel/export-cooperation/${id}?categories_cooporation=${statusState}&status=${cooperationState}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      router.push(urlExport.config.url);
    } catch (error) {
      console.log("object", error);
    }
  };
};
export const fetchListSelectCooperation = (token) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}api/option/cooperation`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      let dataNewKerjasama = data.data.map((items) => {
        return {
          ...items,
          label: items.cooperation_categories,
          value: items.id,
        };
      });
      dispatch(successFetchListSelectCooperation(dataNewKerjasama));
    } catch (error) {
      console.log("eror get list cooperation", error);
    }
  };
};
export const successFetchListSelectCooperation = (data) => {
  return {
    type: LIST_COOPERATION_SUCCESS_DETAIL,
    data,
  };
};
export const fetchListSelectStatus = (token) => {
  return async (dispatch, getState) => {
    try {
      const { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}api/option/status`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      let dataNewStateus = data.data.map((items) => {
        return {
          ...items,
          label: items.name,
          value: items.id,
        };
      });
      dispatch(successFetchListSelectStatus(dataNewStateus));
    } catch (error) {
      console.log("eror get list status", error);
    }
  };
};
export const successFetchListSelectStatus = (data) => {
  return {
    type: LIST_STATUS_SUCCESS_DETAIL,
    data,
  };
};
export const changeValueKerjaSama = (value) => {
  return {
    type: SET_VALUE_KERJA_SAMA_M_DETAIL,
    value,
  };
};
export const changeValueStatus = (value) => {
  return {
    type: SET_VALUE_STATUS_M_DETAIL,
    value,
  };
};

export const deleteCooperation = (token, id) => {
  return async (dispatch, getState) => {
    try {
      let { data } = await axios.delete(
        `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(successDeleteCooperation());
    } catch (error) {
      console.log("action delete gagal", error);
    }
  };
};

export const successDeleteCooperation = () => {
  return {
    type: SUCESS_DELETE_MITRA,
  };
};

export const reloadTable = () => {
  return {
    type: RELOAD_TABLE_DETAIL,
  };
};

export const changeStatusList = (token, formData, id) => {
  return async (dispatch, getState) => {
    try {
      let { data } = await axios.post(
        `${process.env.END_POINT_API_PARTNERSHIP}api/partners/update-status/${id}`,
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(successChangeStatusList());
    } catch (error) {
      console.log("error change status list");
    }
  };
};

export const successChangeStatusList = () => {
  return {
    type: CHANGE_STATUS_LIST_M_DETAIL,
  };
};

export const changeStatusListCooperation = (token, formData, id) => {
  return async (dispatch, getState) => {
    try {
      let { data } = await axios.post(
        `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/update-status/${id}`,
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(successChangeStatusListCooperation());
    } catch (error) {
      console.log("error change status list");
    }
  };
};

export const successChangeStatusListCooperation = () => {
  return {
    type: CHANGE_STATUS_LIST_M_DETAIL,
  };
};
