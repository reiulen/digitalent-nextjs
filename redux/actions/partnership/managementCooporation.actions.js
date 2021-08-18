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
} from "../../types/partnership/management_cooporation.type";
import axios from "axios";

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

let debouncedFetchMC = debounce(getMCooporation, 1000);
let debouncedFetchEmail = debounce(getEmail, 1000);

export const fetchAllMK = (keyword) => {
  console.log("dispatch");
  return async (dispatch, getState) => {
    dispatch({ type: MANAGEMENT_COOPORATION_REQUEST });

    let pageState = getState().allMK.page || 1;
    let limitState = getState().allMK.limit || 5;
    let statusState = getState().allMK.status || "";
    let categories_cooporationState =
      getState().allMK.categories_cooporation || "";
    let partnerState = getState().allMK.partner || "";
    let keywordState = getState().allMK.keyword || "";

    const params = {
      page: pageState,
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
    };

    try {
      const { data } = await debouncedFetchMC(params);
      let dataSortirAll = await debouncedFetchMC(paramss);
      console.log("dataSortirAll");
      console.log(dataSortirAll);
      // get total data status aktif
      let resultDataActive = dataSortirAll.data.data.list_cooperations.filter(
        (items) => items.status.name === "aktif"
      );
      console.log(resultDataActive);
      // get total data status tidak aktif
      let resultDataNonActive =
        dataSortirAll.data.data.list_cooperations.filter(
          (items) => items.status.name === "tidak aktif"
        );
      console.log(resultDataNonActive);
      // get total data status !-- aktif && tidak aktif
      let resultDataAnother = dataSortirAll.data.data.list_cooperations.filter(
        (items) =>
          items.status.name !== "tidak aktif" && items.status.name !== "aktif"
      );
      console.log(resultDataAnother);

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
          resultDataAnother
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
  resultDataAnother
) => {
  return {
    type: MANAGEMENT_COOPORATION_SUCCESS,
    data,
    resultDataActive,
    resultDataNonActive,
    resultDataAnother,
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
  console.log("changeValueMitra");
  console.log(value);
  return {
    type: SET_VALUE_MITRA_M,
    value,
  };
};
export const changeValueStatus = (value) => {
  console.log("changeValueStatus");
  console.log(value);
  return {
    type: SET_VALUE_STATUS_M,
    value,
  };
};
export const changeValueKerjaSama = (value) => {
  console.log("changeValueKerjaSama");
  console.log(value);
  return {
    type: SET_VALUE_KERJA_SAMA_M,
    value,
  };
};
export const limitCooporation = (value) => {
  console.log("value limit", value);
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
      dispatch(successGetEmail(data.data.email));
      console.log("res data get email", data.data.email);
    } catch (error) {
      console.log("error get email", error);
      dispatch(failGetEmail());
    }
  };
};

export const successGetEmail = (email) => {
  console.log("email", email);
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

// fetch select
// export const fetchCooperationActive = () =>{

// }
