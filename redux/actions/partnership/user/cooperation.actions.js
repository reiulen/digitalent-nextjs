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
} from "../../../types/partnership/user/cooperation.type";
import axios from "axios";

//
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

export const reqCooperationUser = () => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `${process.env.END_POINT_API_PARTNERSHIP}/api/cooperations/proposal/index`,
      {
        headers: {
          authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJMOWdGbzFOOG1UMWptelg3OWJuRkZFY0IyN2NWMmM3RyIsImlhdCI6MTYzMTY5MjYxNywiZXhwIjoxNjMxNzc5MDE3LCJuYmYiOjE2MzE2OTI2MTcsImp0aSI6Ik5Jdm1UODU3OHJFTnk5U1YiLCJzdWIiOjEzLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3IiwidXNlciI6eyJpZCI6MTMsIm5hbWUiOiJSYWhtYXQgSGlkYXlhdHVsbGFoIiwiZW1haWwiOiJyYWhtYXRoaWRheWF0dWxsYWg5OTZAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWRfYXQiOiIyMDIxLTA5LTE1VDA3OjQzOjEyLjAwMDAwMFoiLCJyZW1lbWJlcl90b2tlbiI6IjIxNTkxMCIsInJvbGVzIjoiW21pdHJhXSIsImNyZWF0ZWRfYXQiOiIyMDIxLTA5LTE1VDA3OjM3OjQyLjAwMDAwMFoiLCJ1cGRhdGVkX2F0IjoiMjAyMS0wOS0xNVQwNzo0MzoxMi4wMDAwMDBaIn19.Kzw6Z1v33Q4AezE5F-G-9I95NpxO3SmNAysL0QkkYZQ`,
        },
      }
    );

    console.log("data test", data);

    dispatch({
      type: COOPERATION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.log("error", error);
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

// --------------------------------------action get
