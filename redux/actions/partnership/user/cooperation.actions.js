import {
  COOPERATION_REQUEST,
  COOPERATION_SUCCESS,
  COOPERATION_ERROR,
  SET_PAGE_U,
  SUCCESS_COOPERTAION_ACTIVE_SELECT_USER,
  FAIL_COOPERTAION_ACTIVE_SELECT_USER,
  CHANGE_COOPERTAION_ACTIVE_SELECT_BY_ID_USER,
  SUCCESS_COOPERTAION_ACTIVE_SELECT_BY_ID_USER,
  FAIL_COOPERTAION_ACTIVE_SELECT_BY_ID_USER,
  SEARCH_M_COORPORATION,
  LIST_STATUS_REQUEST,
  LIST_STATUS_SUCCESS,
  LIST_STATUS_FAIL,
  SET_VALUE_STATUS_M,
  SET_VALUE_KERJA_SAMA_M,
  LIST_COOPERATION_REQUEST,
  LIST_COOPERATION_FAIL,
  LIST_COOPERATION_SUCCESS,
  SET_VALUE_CARD_M,
  LIMIT_CONFIGURATION_M,
  SUCCESS_GET_SINGLE_COOPERATION_M,
  SUCCESS_DELETE_COOPERATION_M,
  REJECT_COOPERATION,
} from "../../../types/partnership/user/cooperation.type";
import axios from "axios";
import router from "next/router";

//

export async function getStatus() {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP_MITRA}/api/option/status`
  );
}
export async function getCooperation() {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP_MITRA}/api/option/cooperation`
  );
}
// get active select list cooperation
export async function getCooperationActiveSelect() {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP_MITRA}/api/option/cooperation-active`
  );
}
// get active select list cooperation by id
export async function getCooperationActiveSelectById(id) {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP_MITRA}/api/option/cooperation-active-choose/${id}`
  );
}

// --------------------------------------get api
export async function getMCooporationUserApi(params) {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP_MITRA}/api/cooperations/proposal/index`,
    {
      params,
      // headers: {
      //   authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9kdHMtcGFydG5lcnNoaXAtZGV2Lm1hamFwYWhpdC5pZFwvYXBpXC9hdXRoZW50aWNhdGlvblwvbG9naW4iLCJpYXQiOjE2MzAzMTEzOTksImV4cCI6MTk5MDMwNzc5OSwibmJmIjoxNjMwMzExMzk5LCJqdGkiOiI5U2xSc3l4U2c5TnZsSGN6Iiwic3ViIjoxOSwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyJ9.bK3mBYxUZuyxjwz9ovqU_Gkj7kQGkmU5-KiYGcqM8Ts`,
      // },
    }
  );
}
// --------------------------------------get api

// --------------------------------------action get

export const reqCooperationUser = () => async (dispatch, getState) => {
  let pageState = getState().allCooperationUser.page || 1;
  let cardState = getState().allCooperationUser.card || "";
  let limitState = getState().allCooperationUser.limit || 5;
  let statusState = getState().allCooperationUser.status || "";
  let categories_cooporationState =
    getState().allCooperationUser.categories_cooporation || "";
  // let partnerState = getState().allCooperationUser.partner || "";
  let keywordState = getState().allCooperationUser.keyword || "";

  // const params = {
  //   page: pageState,
  //   // card: cardState,
  //   limit: limitState,
  //   // status: statusState,
  //   // categories_cooporation: categories_cooporationState,
  //   // partner: partnerState,
  //   keyword: keywordState,
  // };

  try {
    dispatch({ type: COOPERATION_REQUEST });
    const { data } = await axios.get(
      // `${process.env.END_POINT_API_PARTNERSHIP_MITRA}/api/cooperations/proposal/index?page=${pageState}&limit=${limitState}&keyword=${keywordState}&categories_cooporation=${categories_cooporationState}&status=${statusState}&card=${cardState}`,

      `${process.env.END_POINT_API_PARTNERSHIP_MITRA}api/cooperations/proposal/index?page=${pageState}&card=${cardState}&limit=${limitState}&status=${statusState}&categories_cooporation=${categories_cooporationState}&keyword=${keywordState}`

      // {
      //   headers: {
      //     authorization: `Bearer ${process.env.TOKEN_PARTNERSHIP_TEMP}`,
      //   },
      // }
    );

    // `/api/cooperations/proposal/index?page=1&card=will_expire&limit=5&status=&categories_cooporation=&partner=&keyword=`;

    console.log("data a a a", data);
    // get data tanpa sortir
    let dataSortirAll = await axios.get(
      `${process.env.END_POINT_API_PARTNERSHIP_MITRA}/api/cooperations/proposal/index?page=1&limit=1000&keyword=&categories_cooporation=&status=&card=`,
      // params,
      {
        headers: {
          authorization: `Bearer ${process.env.TOKEN_PARTNERSHIP_TEMP}`,
        },
      }
    );

    let totalData = dataSortirAll.data.data.list_cooperations.length;
    // get total data status aktif
    let resultDataActive = dataSortirAll.data.data.list_cooperations.filter(
      (items) => items.status.name === "aktif"
    );
    // get total data status tidak aktif
    let resultDataNonActive = dataSortirAll.data.data.list_cooperations.filter(
      (items) => items.status.name === "tidak aktif"
    );
    // get total data status !-- aktif && tidak aktif
    let resultDataAnother = dataSortirAll.data.data.list_cooperations.filter(
      (items) =>
        items.status.name !== "tidak aktif" &&
        items.status.name !== "aktif" &&
        items.status.name !== "dibatalkan"
    );

    dispatch({
      type: COOPERATION_SUCCESS,
      payload: data,
      resultDataActives: resultDataActive,
      resultDataNonActives: resultDataNonActive,
      resultDataAnothers: resultDataAnother,
      totalDatas: totalData,
    });
  } catch (error) {
    console.log("error");
  }
};

export const fetchListCooperationSelect = () => {
  return async (dispatch, getState) => {
    // dispatch({ type: GET_COOPERTAION_ACTIVE_SELECT });
    try {
      const { data } = await getCooperationActiveSelect();

      dispatch(successFetchListCooperationSelect(data));
    } catch (error) {
      dispatch(errorFetchListCooperationSelect());
    }
  };
};
export const successFetchListCooperationSelect = (data) => {
  return {
    type: SUCCESS_COOPERTAION_ACTIVE_SELECT_USER,
    data,
  };
};
export const errorFetchListCooperationSelect = () => {
  return {
    type: FAIL_COOPERTAION_ACTIVE_SELECT_USER,
  };
};

export const changeCooperationSelectByID = (value) => {
  return {
    type: CHANGE_COOPERTAION_ACTIVE_SELECT_BY_ID_USER,
    value,
  };
};

// by id
export const fetchListCooperationSelectById = (id) => {
  return async (dispatch, getState) => {
    console.log(id);
    // dispatch({ type: GET_COOPERTAION_ACTIVE_SELECT });
    try {
      const { data } = await getCooperationActiveSelectById(id);

      dispatch(successFetchListCooperationSelectByID(data));
    } catch (error) {
      dispatch(errorFetchListCooperationSelectByID());
    }
  };
};

export const successFetchListCooperationSelectByID = (data) => {
  return {
    type: SUCCESS_COOPERTAION_ACTIVE_SELECT_BY_ID_USER,
    data,
  };
};

export const errorFetchListCooperationSelectByID = () => {
  return {
    type: FAIL_COOPERTAION_ACTIVE_SELECT_BY_ID_USER,
  };
};

export const setPage = (page) => {
  return {
    type: SET_PAGE_U,
    page,
  };
};

export const searchCooporation = (text) => {
  return {
    type: SEARCH_M_COORPORATION,
    text,
  };
};

export const fetchListSelectStatus = () => {
  return async (dispatch, getState) => {
    dispatch({ type: LIST_STATUS_REQUEST });
    try {
      const { data } = await getStatus();
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
export const changeValueStatus = (value) => {
  return {
    type: SET_VALUE_STATUS_M,
    value,
  };
};
export const changeValueKerjaSama = (value) => {
  return {
    type: SET_VALUE_KERJA_SAMA_M,
    value,
  };
};

export const fetchListSelectCooperation = () => {
  return async (dispatch, getState) => {
    dispatch({ type: LIST_COOPERATION_REQUEST });
    try {
      const { data } = await getCooperation();
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

export const changeValueStatusCard = (value) => {
  return {
    type: SET_VALUE_CARD_M,
    value,
  };
};

export const limitCooporation = (value) => {
  return {
    type: LIMIT_CONFIGURATION_M,
    limitValue: value,
  };
};

export const getSingleCooperation = (id) => {
  return async (dispatch, getState) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP_MITRA}/api/cooperations/proposal/${id}`,
        {
          headers: {
            authorization: `Bearer ${process.env.TOKEN_PARTNERSHIP_TEMP}`,
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

export const deleteCooperation = (id) => {
  return async (dispatch, getState) => {
    try {
      let { data } = await axios.delete(
        `${process.env.END_POINT_API_PARTNERSHIP_MITRA}/api/cooperations/proposal/${id}`,
        {
          headers: {
            authorization: `Bearer ${process.env.TOKEN_PARTNERSHIP_TEMP}`,
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

export const rejectCooperation = (id) => {
  return async (dispatch) => {
    try {
      let { data } = await axios.put(
        `${process.env.END_POINT_API_PARTNERSHIP_MITRA}/api/cooperations/proposal/reject/${id}`,
        {
          headers: {
            authorization: `Bearer ${process.env.TOKEN_PARTNERSHIP_TEMP}`,
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

export const reloadTable = () => {
  return {
    type: RELOAD_TABLE,
  };
};

export const exportFileCSV = () => {
  return async (dispatch, getState) => {
    let statusState = getState().allCooperationUser.status || "";
    let categories_cooporationState =
      getState().allCooperationUser.categories_cooporation || "";

    const paramssz = {
      status: statusState,
      categories_cooporation: categories_cooporationState,
    };
    try {
      let urlExport = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP_MITRA}/api/cooperations/proposal/excel/export`,
        {
          paramssz,
          headers: {
            authorization: `Bearer ${process.env.TOKEN_PARTNERSHIP_TEMP}`,
          },
        }
      );
      router.push(
        urlExport.config.url +
          `?&categories_cooporation=${categories_cooporationState}&status=${statusState}`
      );

      // console.log("data", data);
    } catch (error) {
      console.log("object", error);
    }
  };
};

// --------------------------------------action get
