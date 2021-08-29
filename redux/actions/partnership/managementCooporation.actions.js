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
  COOPERATION_ACTIVE_REQUEST,
  COOPERATION_ACTIVE_SUCCESS,
  COOPERATION_ACTIVE_FAIL,
  COOPERATION_PENGAJUAN_REQUEST,
  COOPERATION_PENGAJUAN_SUCCESS,
  COOPERATION_PENGAJUAN_FAIL,
  COOPERATION_NONAKTIF_REQUEST,
  COOPERATION_NONAKTIF_SUCCESS,
  COOPERATION_NONAKTIF_FAIL,
  GET_COOPERTAION_ACTIVE_SELECT,
  FAIL_COOPERTAION_ACTIVE_SELECT,
  SUCCESS_COOPERTAION_ACTIVE_SELECT,
  SET_VALUE_CARD_M,
  GET_COOPERTAION_ACTIVE_SELECT_BY_ID,
  SUCCESS_COOPERTAION_ACTIVE_SELECT_BY_ID,
  FAIL_COOPERTAION_ACTIVE_SELECT_BY_ID,
  CHANGE_COOPERTAION_ACTIVE_SELECT_BY_ID,
  SUCCESS_DELETE_COOPERATION_M,
  SUCCESS_GET_SINGLE_COOPERATION_M,
  CHANGE_STATUS_LIST_M,
  CANCEL_CHANGE_CATEGORY,
  CANCEL_CHANGE_EMAIL,
  RELOAD_TABLE,
} from "../../types/partnership/management_cooporation.type";
import axios from "axios";
import router from "next/router";

// fetch data all Coopoeration
export async function getMCooporation(params) {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/index`,
    {
      params,
    }
  );
}
export async function getMitra() {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}/api/option/mitra`
  );
}
export async function getStatus() {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}/api/option/status`
  );
}
export async function getCooperation() {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}/api/option/cooperation`
  );
}
// get active select list cooperation
export async function getCooperationActiveSelect() {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}/api/option/cooperation-active`
  );
}
// get active select list cooperation by id
export async function getCooperationActiveSelectById(id) {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}/api/option/cooperation-active-choose/${id}`
  );
}
export async function getEmail(params) {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/get-email`,
    {
      params,
    }
  );
}

export async function getCooperationActive(params) {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/count`,
    {
      params,
    }
  );
}

export async function getPengajuanActive(params) {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/count-submission`,
    {
      params,
    }
  );
}

export async function getCooperationNonaktif(params) {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/count-will-expire`,
    {
      params,
    }
  );
}

let debouncedFetchMC = debounce(getMCooporation, 0);
let debouncedFetchEmail = debounce(getEmail, 0);

export const fetchAllMK = (keyword) => {
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
    console.log("cardState", cardState);

    const params = {
      page: pageState,
      card: cardState,
      limit: limitState,
      status: statusState,
      categories_cooporation: categories_cooporationState,
      partner: partnerState,
      keyword: keyword === "clear keyword" ? "" : keywordState,
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
      const { data } = await debouncedFetchMC(params);
      console.log("object", data);
      let dataSortirAll = await debouncedFetchMC(paramss);

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
          items.status.name !== "tidak aktif" && items.status.name !== "aktif"
      );

      // handle ketika data berubah
      // if (partnerState === "") {
      //   let listMitra = data.data.list_cooperations.map(
      //     (items) => items.partner.user.name
      //   );
      //   // remove duplicate name
      //   listMitra = listMitra.filter(function (value, index, array) {
      //     return array.indexOf(value) === index;
      //   });
      //   sessionStorage.setItem("list-mitra", JSON.stringify(listMitra));
      // }
      // handle ketika data berubah
      // if (statusState === "") {
      //   let listStatus = data.data.list_cooperations.map(
      //     (items) => items.status.name
      //   );
      //   // remove duplicate name
      //   listStatus = listStatus.filter(function (value, index, array) {
      //     return array.indexOf(value) === index;
      //   });
      //   sessionStorage.setItem("list-status", JSON.stringify(listStatus));
      // }
      // handle ketika data berubah
      // if (categories_cooporationState === "") {
      //   let listKerjaSama = data.data.list_cooperations.map((items) => {
      //     items.cooperation_category === null
      //       ? (items.cooperation_category = {
      //           id: null,
      //           cooperation_categories: "kosong",
      //         })
      //       : "";
      //     return items.cooperation_category.cooperation_categories;
      //     // console.log("items", items.cooperation_category);
      //   });
      // console.log("listKerjaSama", listKerjaSama);
      // remove duplicate name
      // console.log("listKerjaSama", listKerjaSama);
      // let listKerjaSamaSort = listKerjaSama.filter(
      //   (items) => items !== "kosong"
      // );
      // console.log("listKerjaSama f", listKerjaSamaSort);
      // listKerjaSamaSort = listKerjaSamaSort.filter(function (
      //   value,
      //   index,
      //   array
      // ) {
      //   return array.indexOf(value) === index;
      // });
      // sessionStorage.setItem(
      //   "list-kerja-sama",
      //   JSON.stringify(listKerjaSamaSort)
      // );
      // }
      // let stateListMitra = JSON.parse(sessionStorage.getItem("list-mitra"));
      // let stateListStatus = JSON.parse(sessionStorage.getItem("list-status"));
      // let stateListKerjaSama = JSON.parse(
      //   sessionStorage.getItem("list-kerja-sama")
      // );

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

export const fetchListSelectMitra = () => {
  return async (dispatch, getState) => {
    dispatch({ type: LIST_MITRA_REQUEST });
    try {
      const { data } = await getMitra();
      dispatch(successFetchListSelectMitra(data));
    } catch (error) {
      console.log("eror get list all mitra", error);
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
export const fetchListSelectCooperation = () => {
  return async (dispatch, getState) => {
    dispatch({ type: LIST_COOPERATION_REQUEST });
    try {
      const { data } = await getCooperation();
      dispatch(successFetchListSelectCooperation(data));
    } catch (error) {
      console.log("eror get list cooperation", error);
      dispatch(errorFetchListSelectCooperation());
    }
  };
};
export const successFetchListSelectCooperation = (data) => {
  return {
    type: LIST_COOPERATION_SUCCESS,
    data,
  };
};
//
export const fetchListCooperationSelect = () => {
  return async (dispatch, getState) => {
    // dispatch({ type: GET_COOPERTAION_ACTIVE_SELECT });
    try {
      const { data } = await getCooperationActiveSelect();
      console.log("data select active cooperation", data);
      dispatch(successFetchListCooperationSelect(data));
    } catch (error) {
      console.log("eror get list cooperation", error);
      dispatch(errorFetchListCooperationSelect());
    }
  };
};
export const successFetchListCooperationSelect = (data) => {
  console.log("asdasd", data);
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
export const fetchListCooperationSelectById = (id) => {
  return async (dispatch, getState) => {
    console.log(id);
    // dispatch({ type: GET_COOPERTAION_ACTIVE_SELECT });
    try {
      const { data } = await getCooperationActiveSelectById(id);
      console.log("data select active cooperation by id", data);
      dispatch(successFetchListCooperationSelectByID(data));
    } catch (error) {
      console.log("eror get list cooperation by id", error);
      dispatch(errorFetchListCooperationSelectByID());
    }
  };
};
export const successFetchListCooperationSelectByID = (data) => {
  console.log("asdasd", data);
  return {
    type: SUCCESS_COOPERTAION_ACTIVE_SELECT_BY_ID,
    data,
  };
};
export const changeCooperationSelectByID = (value) => {
  console.log("asdasd", value);
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
export const errorFetchListSelectCooperation = () => {
  return {
    type: LIST_COOPERATION_FAIL,
  };
};
export const fetchListSelectStatus = () => {
  return async (dispatch, getState) => {
    dispatch({ type: LIST_STATUS_REQUEST });
    try {
      const { data } = await getStatus();
      dispatch(successFetchListSelectStatus(data));
    } catch (error) {
      console.log("eror get list status", error);
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

export const fetchDataEmail = (value) => {
  return async (dispatch, getState) => {
    try {
      let institution_nameState = getState().allMK.institution_name;
      const params = {
        institution_name: institution_nameState,
      };
      let { data } = await debouncedFetchEmail(params);
      if (data.data.email === null) {
        return;
      } else {
        dispatch(successGetEmail(data.data.email));
      }
    } catch (error) {
      console.log("error get email", error);
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
export const deleteCooperation = (id) => {
  return async (dispatch, getState) => {
    try {
      let { data } = await axios.delete(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/${id}`
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

export const getSingleCooperation = (id) => {
  return async (dispatch, getState) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/${id}`
      );
      console.log("data single", data);
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

export const changeStatusList = (value, id) => {
  console.log(value, id);
  return async (dispatch, getState) => {
    try {
      let dataSend = { status: value };
      let { data } = await axios.put(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/update-status/${id}`,
        dataSend
      );
      console.log("status list data value", data);
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
export const exportFileCSV = () => {
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
        `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/excel/export`,
        {
          paramssz,
        }
      );
      router.push(
        urlExport.config.url +
          `?partner=${partnerState}&categories_cooporation=${categories_cooporationState}&status=${statusState}`
      );

      // console.log("data", data);
    } catch (error) {
      console.log("object", error);
    }
  };
};
// fetch select
// export const fetchCooperationActive = () =>{
// }
