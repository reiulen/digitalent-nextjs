import debounce from "debounce-promise";

import {
  MANAGEMENT_COOPORATION_REQUEST,
  MANAGEMENT_COOPORATION_SUCCESS,
  MANAGEMENT_COOPORATION_FAIL,
  SEARCH_M_COORPORATION,
  SET_PAGE_M,
  SET_VALUE_MITRA_M,
  LIMIT_CONFIGURATION_M,
  SET_VALUE_STATUS_M,
  SET_VALUE_KERJA_SAMA_M,
  LIST_MITRA_REQUEST,
  LIST_MITRA_SUCCESS,
  LIST_MITRA_FAIL,
  LIST_STATUS_REQUEST,
  LIST_STATUS_SUCCESS,
  LIST_STATUS_FAIL,
  LIST_COOPERATION_REQUEST,
  LIST_COOPERATION_SUCCESS,
  LIST_COOPERATION_FAIL,
  SET_NAME_LEMBAGA,
  SUCCESS_GET_EMAIL,
  FAIL_GET_EMAIL,
  FAIL_COOPERTAION_ACTIVE_SELECT,
  SUCCESS_COOPERTAION_ACTIVE_SELECT,
  SET_VALUE_CARD_M,
  SUCCESS_COOPERTAION_ACTIVE_SELECT_BY_ID,
  FAIL_COOPERTAION_ACTIVE_SELECT_BY_ID,
  CHANGE_COOPERTAION_ACTIVE_SELECT_BY_ID,
  SUCCESS_DELETE_COOPERATION_M,
  SUCCESS_GET_SINGLE_COOPERATION_M,
  CHANGE_STATUS_LIST_M,
  CANCEL_CHANGE_CATEGORY,
  CANCEL_CHANGE_EMAIL,
  RELOAD_TABLE,
  REJECT_COOPERATION,
} from "../../types/partnership/management_cooporation.type";
import axios from "axios";
import router from "next/router";

// fetch data all Coopoeration
export async function getMCooporation(params) {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/index`,
    {
      params,
    }
  );
}
export async function getMitra() {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}api/option/mitra`
  );
}
export async function getStatus() {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}api/option/status`
  );
}
export async function getCooperation() {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}api/option/cooperation`
  );
}
// get active select list cooperation
export async function getCooperationActiveSelect() {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}api/option/cooperation-active`
  );
}
// get active select list cooperation by id
export async function getCooperationActiveSelectById(id) {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}api/option/cooperation-active-choose/${id}`
  );
}
export async function getEmail(params) {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/get-email`,
    {
      params,
    }
  );
}

export async function getCooperationActive(params) {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/count`,
    {
      params,
    }
  );
}

export async function getPengajuanActive(params) {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/count-submission`,
    {
      params,
    }
  );
}

export async function getCooperationNonaktif(params) {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/count-will-expire`,
    {
      params,
    }
  );
}

let debouncedFetchMC = debounce(getMCooporation, 0);
let debouncedFetchEmail = debounce(getEmail, 0);

export const fetchAllMK = (token) => {
  console.log("token", token);
  return async (dispatch, getState) => {
    dispatch({ type: MANAGEMENT_COOPORATION_REQUEST });

    let pageState = getState().allMK.page || 1;
    let cardState = getState().allMK.card || "";
    let limitState = getState().allMK.limit || 5;
    let statusState = getState().allMK.status || "";
    let categories_cooporationState =
      getState().allMK.categories_cooporation || "";
    let partnerState = getState().allMK.partner || "";
    let keywordState = getState().allMK.keyword || "";

    const params = {
      page: pageState,
      card: cardState,
      limit: limitState,
      status: statusState,
      categories_cooporation: categories_cooporationState,
      partner: partnerState,
      keyword: keywordState,
    };
    const paramss = {
      page: 1,
      limit: 1000,
      status: "",
      categories_cooporation: "",
      partner: "",
      keyword: "",
      card: "",
    };
    const paramssz = {
      page: 1,
      limit: 1000,
      status: "",
      categories_cooporation: "",
      partner: "",
      keyword: "",
      card: "will_expire",
    };

    try {
      const { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/index`,
        {
          params,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      let dataSortirAll = await await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/index`,
        {
          paramss,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      let totalData = dataSortirAll.data.data.list_cooperations.length;
      // get total data status aktif
      let resultDataActive = dataSortirAll.data.data.list_cooperations.filter(
        (items) => items.status.name === "aktif"
      );
      // get total data status tidak aktif
      let resultDataNonActive =
        dataSortirAll.data.data.list_cooperations.filter(
          (items) => items.status.name === "tidak aktif"
        );
      // get total data status !-- aktif && tidak aktif
      let resultDataAnother = dataSortirAll.data.data.list_cooperations.filter(
        (items) =>
          items.status.name !== "tidak aktif" &&
          items.status.name !== "aktif" &&
          items.status.name !== "dibatalkan"
      );

      dispatch(
        successFetchAllMK(
          data,
          resultDataActive,
          resultDataNonActive,
          resultDataAnother,
          totalData
        )
      );
    } catch (error) {
      console.log(error);
      dispatch(errorfetchAllMK());
    }
  };
};

export const fetchListSelectMitra = (token) => {
  return async (dispatch, getState) => {
    dispatch({ type: LIST_MITRA_REQUEST });
    try {
      const { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}api/option/mitra`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      let dataNewLembaga = data.data.map((items) => {
        return { ...items, label: items.name, value: items.id };
      });
      dataNewLembaga.splice(0, 0, { label: "Semua", value: "" });

      dispatch(successFetchListSelectMitra(dataNewLembaga));
    } catch (error) {
      dispatch(errorFetchListSelectMitra());
    }
  };
};
export const successFetchListSelectMitra = (data) => {
  return {
    type: LIST_MITRA_SUCCESS,
    data,
  };
};
export const errorFetchListSelectMitra = () => {
  return {
    type: LIST_MITRA_FAIL,
  };
};
export const fetchListSelectCooperation = (token) => {
  return async (dispatch, getState) => {
    dispatch({ type: LIST_COOPERATION_REQUEST });
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
      dispatch(errorFetchListSelectCooperation());
    }
  };
};
export const errorFetchListSelectCooperation = () => {
  return {
    type: LIST_COOPERATION_FAIL,
  };
};
export const successFetchListSelectCooperation = (data) => {
  return {
    type: LIST_COOPERATION_SUCCESS,
    data,
  };
};
//
export const fetchListCooperationSelect = (token) => {
  return async (dispatch, getState) => {
    // dispatch({ type: GET_COOPERTAION_ACTIVE_SELECT });
    try {
      const { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}api/option/cooperation-active`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(successFetchListCooperationSelect(data));
    } catch (error) {
      dispatch(errorFetchListCooperationSelect());
    }
  };
};
export const successFetchListCooperationSelect = (data) => {
  return {
    type: SUCCESS_COOPERTAION_ACTIVE_SELECT,
    data,
  };
};
export const errorFetchListCooperationSelect = () => {
  return {
    type: FAIL_COOPERTAION_ACTIVE_SELECT,
  };
};
// by id
export const fetchListCooperationSelectById = (token, id) => {
  return async (dispatch, getState) => {
    // dispatch({ type: GET_COOPERTAION_ACTIVE_SELECT });
    try {
      const { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}api/option/cooperation-active-choose/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(successFetchListCooperationSelectByID(data));
    } catch (error) {
      dispatch(errorFetchListCooperationSelectByID());
    }
  };
};
export const successFetchListCooperationSelectByID = (data) => {
  return {
    type: SUCCESS_COOPERTAION_ACTIVE_SELECT_BY_ID,
    data,
  };
};
export const changeCooperationSelectByID = (value) => {
  return {
    type: CHANGE_COOPERTAION_ACTIVE_SELECT_BY_ID,
    value,
  };
};
export const errorFetchListCooperationSelectByID = () => {
  return {
    type: FAIL_COOPERTAION_ACTIVE_SELECT_BY_ID,
  };
};
//

export const fetchListSelectStatus = (token) => {
  return async (dispatch, getState) => {
    dispatch({ type: LIST_STATUS_REQUEST });
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
      dispatch(errorFetchListSelectStatus());
    }
  };
};
export const successFetchListSelectStatus = (data) => {
  return {
    type: LIST_STATUS_SUCCESS,
    data,
  };
};
export const errorFetchListSelectStatus = () => {
  return {
    type: LIST_STATUS_FAIL,
  };
};

export const successFetchAllMK = (
  data,
  resultDataActive,
  resultDataNonActive,
  resultDataAnother,
  totalData
) => {
  return {
    type: MANAGEMENT_COOPORATION_SUCCESS,
    data,
    resultDataActive,
    resultDataNonActive,
    resultDataAnother,
    totalData,
  };
};
export const errorfetchAllMK = () => {
  return {
    type: MANAGEMENT_COOPORATION_FAIL,
  };
};

export const searchCooporation = (text) => {
  return {
    type: SEARCH_M_COORPORATION,
    text,
  };
};

export const setPage = (page) => {
  return {
    type: SET_PAGE_M,
    page,
  };
};
export const changeValueMitra = (value) => {
  return {
    type: SET_VALUE_MITRA_M,
    value,
  };
};
export const changeValueStatus = (value) => {
  return {
    type: SET_VALUE_STATUS_M,
    value,
  };
};
export const changeValueStatusCard = (value) => {
  return {
    type: SET_VALUE_CARD_M,
    value,
  };
};
export const changeValueKerjaSama = (value) => {
  return {
    type: SET_VALUE_KERJA_SAMA_M,
    value,
  };
};
export const limitCooporation = (value) => {
  return {
    type: LIMIT_CONFIGURATION_M,
    limitValue: value,
  };
};

export const fetchDataEmail = (token) => {
  return async (dispatch, getState) => {
    try {
      let institution_nameState = getState().allMK.institution_name;
      const params = {
        institution_name: institution_nameState,
      };
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/get-email`,
        {
          params,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.data.email === null) {
        return;
      } else {
        dispatch(successGetEmail(data.data.email));
      }
    } catch (error) {
      dispatch(failGetEmail());
    }
  };
};

export const successGetEmail = (email) => {
  return {
    type: SUCCESS_GET_EMAIL,
    email,
  };
};
export const failGetEmail = () => {
  return {
    type: FAIL_GET_EMAIL,
  };
};
export const setNameLembaga = (value) => {
  return {
    type: SET_NAME_LEMBAGA,
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
    type: SUCCESS_DELETE_COOPERATION_M,
  };
};

export const getSingleCooperation = (token, id) => {
  return async (dispatch, getState) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/${id}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(successGetSingleCooperation(data));
    } catch (error) {
      console.log("action getSIngle gagal", error);
    }
  };
};
export const successGetSingleCooperation = (data) => {
  return {
    type: SUCCESS_GET_SINGLE_COOPERATION_M,
    data,
  };
};

export const changeStatusList = (token, value, id) => {
  return async (dispatch, getState) => {
    try {
      let dataSend = { _method: "PUT", status: value };
      let { data } = await axios.post(
        `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/update-status/${id}`,
        dataSend,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch(successChangeStatusList(value));
    } catch (error) {
      console.log("error change status list");
    }
  };
};

export const successChangeStatusList = (value) => {
  return {
    type: CHANGE_STATUS_LIST_M,
    value,
  };
};
export const reloadTable = () => {
  return {
    type: RELOAD_TABLE,
  };
};
export const cancelChangeCategory = () => {
  return {
    type: CANCEL_CHANGE_CATEGORY,
  };
};
export const cancelChangeNamaLembaga = () => {
  return {
    type: CANCEL_CHANGE_EMAIL,
  };
};
export const exportFileCSV = (token) => {
  return async (dispatch, getState) => {
    let statusState = getState().allMK.status || "";
    let categories_cooporationState =
      getState().allMK.categories_cooporation || "";
    let partnerState = getState().allMK.partner || "";

    const paramssz = {
      status: statusState,
      categories_cooporation: categories_cooporationState,
      partner: partnerState,
    };
    try {
      let urlExport = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/excel/export`,
        {
          paramssz,
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      router.push(
        urlExport.config.url +
          `?partner=${partnerState}&categories_cooporation=${categories_cooporationState}&status=${statusState}`
        // {
        //   headers: {
        //     authorization: `Bearer ${token}`,
        //   },
        // }
      );

      // console.log("data", data);
    } catch (error) {
      console.log("object", error);
    }
  };
};

export const rejectCooperation = (token, id) => {
  console.log("token mm", token);
  return async (dispatch) => {
    try {
      let { data } = await axios.put(
        `${process.env.END_POINT_API_PARTNERSHIP}api/cooperations/proposal/reject/${id}`,
        null,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: REJECT_COOPERATION });
      console.log("berhasil");
    } catch (error) {
      console.log("error rejectCooperation", error);
    }
  };
};

// fetch select
// export const fetchCooperationActive = () =>{
// }
