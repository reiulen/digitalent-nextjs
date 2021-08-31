import {
  COOPERATION_REQUEST,
  COOPERATION_SUCCESS,
  COOPERATION_ERROR,
  SET_PAGE_U,
} from "../../../types/partnership/user/cooperation.type";

import axios from "axios";

// export async function getAllProducts(params) {
//   let { token } = localStorage.getItem("auth")
//     ? JSON.parse(localStorage.getItem("auth"))
//     : {};

//   return await axios.get(`${config.api_host}/api/products`, {
//     params,
//     headers: {
//       authorization: `Bearer ${token}`,
//     },
//   });
// }

// --------------------------------------get api
export async function getMCooporationUserApi(params) {
  return await axios.get(
    `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/index`,
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

export const reqCooperationUser = () => {
  return async (dispatch, getState) => {
    dispatch({ type: COOPERATION_REQUEST });
    let pageState = getState().allCooperationUser.page || 1;
    let limitState = getState().allCooperationUser.limit || 5;
    let keywordState = getState().allCooperationUser.keyword || "";

    const params = {
      page: pageState,
      limit: limitState,
      keyword: keywordState,
    };

    try {
      let { data } = await getMCooporationUserApi(params);
      console.log("response sukses getMCooporationUserApi", data);
      dispatch(successReqCooperationUser(data));
    } catch (error) {
      console.log("response error getMCooporationUserApi", error);
      dispatch({ type: COOPERATION_ERROR });
    }
  };
};

export const successReqCooperationUser = (data) => {
  return {
    type: COOPERATION_SUCCESS,
    data,
  };
};

export const setPage = (page) => {
  return {
    type: SET_PAGE_U,
    page,
  };
};

// --------------------------------------action get
