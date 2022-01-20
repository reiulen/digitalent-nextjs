import {
  // SIMONAS COMPANY
  SIMONAS_COMPANY_TOTAL_REQUEST,
  SIMONAS_COMPANY_TOTAL_SUCCESS,
  SIMONAS_COMPANY_TOTAL_FAIL,
  SIMONAS_PROJECT_TOTAL_REQUEST,
  SIMONAS_PROJECT_TOTAL_SUCCESS,
  SIMONAS_PROJECT_TOTAL_FAIL,
  SIMONAS_COMPANY_AMOUNT_REQUEST,
  SIMONAS_COMPANY_AMOUNT_SUCCESS,
  SIMONAS_COMPANY_AMOUNT_FAIL,
  SIMONAS_PROJECT_AMOUNT_REQUEST,
  SIMONAS_PROJECT_AMOUNT_SUCCESS,
  SIMONAS_PROJECT_AMOUNT_FAIL,
  //   SIMONAS APPLIER
  SIMONAS_APPLIER_TOTAL_REQUEST,
  SIMONAS_APPLIER_TOTAL_SUCCESS,
  SIMONAS_APPLIER_TOTAL_FAIL,
  SIMONAS_APPLIER_TOTAL_ACTIVE_REQUEST,
  SIMONAS_APPLIER_TOTAL_ACTIVE_SUCCESS,
  SIMONAS_APPLIER_TOTAL_ACTIVE_FAIL,
  //   JUMLAH PELAMAR
  SIMONAS_APPLIER_AMOUNT_JOB_REQUEST,
  SIMONAS_APPLIER_AMOUNT_JOB_SUCCESS,
  SIMONAS_APPLIER_AMOUNT_JOB_FAIL,
  SIMONAS_APPLIER_AMOUNT_PROJECT_REQUEST,
  SIMONAS_APPLIER_AMOUNT_PROJECT_SUCCESS,
  SIMONAS_APPLIER_AMOUNT_PROJECT_FAIL,
  // UMUR PELAMAR
  SIMONAS_APPLIER_AGE_REQUEST,
  SIMONAS_APPLIER_AGE_SUCCESS,
  SIMONAS_APPLIER_AGE_FAIL,
  // JENIS KELAMIN PELAMAR
  SIMONAS_APPLIER_GENDER_REQUEST,
  SIMONAS_APPLIER_GENDER_SUCCESS,
  SIMONAS_APPLIER_GENDER_FAIL,
  // PENDIDIKAN PELAMAR
  SIMONAS_APPLIER_EDUCATION_JOB_REQUEST,
  SIMONAS_APPLIER_EDUCATION_JOB_SUCCESS,
  SIMONAS_APPLIER_EDUCATION_JOB_FAIL,
  SIMONAS_APPLIER_EDUCATION_PROJECT_REQUEST,
  SIMONAS_APPLIER_EDUCATION_PROJECT_SUCCESS,
  SIMONAS_APPLIER_EDUCATION_PROJECT_FAIL,
  // REGION PELAMAR
  SIMONAS_REGION_APPLIER_REQUEST,
  SIMONAS_REGION_APPLIER_SUCCESS,
  SIMONAS_REGION_APPLIER_FAIL,
  // DATA FILTER
  SIMONAS_FILTER_YEAR_REQUEST,
  SIMONAS_FILTER_YEAR_SUCCESS,
  SIMONAS_FILTER_YEAR_FAIL,
  SIMONAS_FILTER_STATUS_REQUEST,
  SIMONAS_FILTER_STATUS_SUCCESS,
  SIMONAS_FILTER_STATUS_FAIL,
  // PROVINSI APPLIER SIMONAS
  SIMONAS_PROVINSI_APPLIER_REQUEST,
  SIMONAS_PROVINSI_APPLIER_SUCCESS,
  SIMONAS_PROVINSI_APPLIER_FAIL,
  SIMONAS_PROVINSI_APPLIER_REQUITED_REQUEST,
  SIMONAS_PROVINSI_APPLIER_REQUITED_SUCCESS,
  SIMONAS_PROVINSI_APPLIER_REQUITED_FAIL,
  CLEAR_ERRORS,
} from "../../../types/dashboard-kabadan/dashboard/simonas.type";
import axios from "axios";

export const getSimonasCompanyTotal = (token) => async (dispatch) => {
  try {
    dispatch({ type: SIMONAS_COMPANY_TOTAL_REQUEST });

    let link = process.env.END_POINT_API_SIMONAS + `jobs/count`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: SIMONAS_COMPANY_TOTAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SIMONAS_COMPANY_TOTAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getSimonasProjectTotal = (token) => async (dispatch) => {
  try {
    dispatch({ type: SIMONAS_PROJECT_TOTAL_REQUEST });

    let link = process.env.END_POINT_API_SIMONAS + `projects/count`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: SIMONAS_PROJECT_TOTAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SIMONAS_PROJECT_TOTAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getSimonasCompanyAmount =
  (token, page = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: SIMONAS_COMPANY_AMOUNT_REQUEST });

      let link = process.env.END_POINT_API_SIMONAS + `jobs/count/company`;
      if (page) link = link.concat(`?page=${page}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: SIMONAS_COMPANY_AMOUNT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SIMONAS_COMPANY_AMOUNT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getSimonasProjectAmount =
  (token, page = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: SIMONAS_PROJECT_AMOUNT_REQUEST });

      let link = process.env.END_POINT_API_SIMONAS + `projects/count/company`;
      if (page) link = link.concat(`?page=${page}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: SIMONAS_PROJECT_AMOUNT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SIMONAS_PROJECT_AMOUNT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getSimonasApplierTotal = (token) => async (dispatch) => {
  try {
    dispatch({ type: SIMONAS_APPLIER_TOTAL_REQUEST });

    let link = process.env.END_POINT_API_SIMONAS + `jobs/applier/count`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: SIMONAS_APPLIER_TOTAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SIMONAS_APPLIER_TOTAL_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getSimonasApplierTotalActive = (token) => async (dispatch) => {
  try {
    dispatch({ type: SIMONAS_APPLIER_TOTAL_ACTIVE_REQUEST });

    let link =
      process.env.END_POINT_API_SIMONAS + `jobs/applier/count?status=active`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: SIMONAS_APPLIER_TOTAL_ACTIVE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SIMONAS_APPLIER_TOTAL_ACTIVE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getSimonasApplierAmountJob = (token, page) => async (dispatch) => {
  try {
    dispatch({ type: SIMONAS_APPLIER_AMOUNT_JOB_REQUEST });

    let link = process.env.END_POINT_API_SIMONAS + `jobs/applier/count/company`;
    if (page) link = link.concat(`?page=${page}`);

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: SIMONAS_APPLIER_AMOUNT_JOB_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SIMONAS_APPLIER_AMOUNT_JOB_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getSimonasApplierAmountProject =
  (token, page) => async (dispatch) => {
    try {
      dispatch({ type: SIMONAS_APPLIER_AMOUNT_PROJECT_REQUEST });

      let link =
        process.env.END_POINT_API_SIMONAS + `projects/applier/count/company`;
      if (page) link = link.concat(`?page=${page}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: SIMONAS_APPLIER_AMOUNT_PROJECT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SIMONAS_APPLIER_AMOUNT_PROJECT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getSimonasApplierAge = (token) => async (dispatch) => {
  try {
    dispatch({ type: SIMONAS_APPLIER_AGE_REQUEST });

    let link = process.env.END_POINT_API_SIMONAS + `jobs/applier/count/age`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: SIMONAS_APPLIER_AGE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SIMONAS_APPLIER_AGE_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getSimonasApplierGender = (token) => async (dispatch) => {
  try {
    dispatch({ type: SIMONAS_APPLIER_GENDER_REQUEST });

    let link = process.env.END_POINT_API_SIMONAS + `jobs/applier/count/gender`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: SIMONAS_APPLIER_GENDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SIMONAS_APPLIER_GENDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getSimonasApplierEducationJob = (token) => async (dispatch) => {
  try {
    dispatch({ type: SIMONAS_APPLIER_EDUCATION_JOB_REQUEST });

    let link =
      process.env.END_POINT_API_SIMONAS + `jobs/applier/count/education`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: SIMONAS_APPLIER_EDUCATION_JOB_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SIMONAS_APPLIER_EDUCATION_JOB_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getSimonasApplierEducationProject =
  (token) => async (dispatch) => {
    try {
      dispatch({ type: SIMONAS_APPLIER_EDUCATION_PROJECT_REQUEST });

      let link =
        process.env.END_POINT_API_SIMONAS + `projects/applier/count/education`;

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: SIMONAS_APPLIER_EDUCATION_PROJECT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SIMONAS_APPLIER_EDUCATION_PROJECT_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getSimonasRegionApplier =
  (token, date = null, status = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: SIMONAS_REGION_APPLIER_REQUEST });

      let link =
        process.env.END_POINT_API_SIMONAS + `jobs/applier/count/province-map?`;
      if (date) link = link.concat(`&date=${date}`);
      if (status) link = link.concat(`&status=${status}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: SIMONAS_REGION_APPLIER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SIMONAS_REGION_APPLIER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getSimonasFilterYear = (token) => async (dispatch) => {
  try {
    dispatch({ type: SIMONAS_FILTER_YEAR_REQUEST });

    let link =
      process.env.END_POINT_API_SIMONAS + `jobs/applier/filtered/province`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: SIMONAS_FILTER_YEAR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SIMONAS_FILTER_YEAR_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getSimonasFilterStatus = (token) => async (dispatch) => {
  try {
    dispatch({ type: SIMONAS_FILTER_STATUS_REQUEST });

    let link = process.env.END_POINT_API_SIMONAS + `candidates/status`;

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios.get(link, config);

    dispatch({
      type: SIMONAS_FILTER_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SIMONAS_FILTER_STATUS_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const getSimonasProvinsiApplier =
  (token, page = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: SIMONAS_PROVINSI_APPLIER_REQUEST });

      let link =
        process.env.END_POINT_API_SIMONAS + `jobs/applier/count/province`;
      if (page) link = link.concat(`?page=${page}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: SIMONAS_PROVINSI_APPLIER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SIMONAS_PROVINSI_APPLIER_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const getSimonasProvinsiApplierRequired =
  (token, page = null) =>
  async (dispatch) => {
    try {
      dispatch({ type: SIMONAS_PROVINSI_APPLIER_REQUITED_REQUEST });

      let link =
        process.env.END_POINT_API_SIMONAS +
        `jobs/applier/count/province?status=reqruited`;
      if (page) link = link.concat(`&page=${page}`);

      const config = {
        headers: {
          Authorization: "Bearer " + token,
        },
      };

      const { data } = await axios.get(link, config);

      dispatch({
        type: SIMONAS_PROVINSI_APPLIER_REQUITED_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: SIMONAS_PROVINSI_APPLIER_REQUITED_FAIL,
        payload: error.response.data.message,
      });
    }
  };

export const clearErrors = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
