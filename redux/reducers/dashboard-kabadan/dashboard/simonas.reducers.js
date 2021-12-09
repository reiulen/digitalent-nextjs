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
  CLEAR_ERRORS,
} from "../../../types/dashboard-kabadan/dashboard/simonas.type";

export const simonasCompanyTotalReducer = (
  state = { companyTotal: [] },
  action
) => {
  switch (action.type) {
    case SIMONAS_COMPANY_TOTAL_REQUEST:
      return {
        loading: true,
      };

    case SIMONAS_COMPANY_TOTAL_SUCCESS:
      return {
        loading: false,
        companyTotal: action.payload.data,
      };

    case SIMONAS_COMPANY_TOTAL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const simonasProjectTotalReducer = (
  state = { projectTotal: [] },
  action
) => {
  switch (action.type) {
    case SIMONAS_PROJECT_TOTAL_REQUEST:
      return {
        loading: true,
      };

    case SIMONAS_PROJECT_TOTAL_SUCCESS:
      return {
        loading: false,
        projectTotal: action.payload.data,
      };

    case SIMONAS_PROJECT_TOTAL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const simonasCompanyAmountReducer = (
  state = { companyAmount: [] },
  action
) => {
  switch (action.type) {
    case SIMONAS_COMPANY_AMOUNT_REQUEST:
      return {
        loading: true,
      };

    case SIMONAS_COMPANY_AMOUNT_SUCCESS:
      return {
        loading: false,
        companyAmount: action.payload.data,
      };

    case SIMONAS_COMPANY_AMOUNT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const simonasProjectAmountReducer = (
  state = { projectAmount: [] },
  action
) => {
  switch (action.type) {
    case SIMONAS_PROJECT_AMOUNT_REQUEST:
      return {
        loading: true,
      };

    case SIMONAS_PROJECT_AMOUNT_SUCCESS:
      return {
        loading: false,
        projectAmount: action.payload.data,
      };

    case SIMONAS_PROJECT_AMOUNT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const simonasApplierTotalReducer = (
  state = { applierTotal: [] },
  action
) => {
  switch (action.type) {
    case SIMONAS_APPLIER_TOTAL_REQUEST:
      return {
        loading: true,
      };

    case SIMONAS_APPLIER_TOTAL_SUCCESS:
      return {
        loading: false,
        applierTotal: action.payload.data,
      };

    case SIMONAS_APPLIER_TOTAL_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const simonasApplierTotalActiveReducer = (
  state = { applierTotalActive: [] },
  action
) => {
  switch (action.type) {
    case SIMONAS_APPLIER_TOTAL_ACTIVE_REQUEST:
      return {
        loading: true,
      };

    case SIMONAS_APPLIER_TOTAL_ACTIVE_SUCCESS:
      return {
        loading: false,
        applierTotalActive: action.payload.data,
      };

    case SIMONAS_APPLIER_TOTAL_ACTIVE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const simonasApplierAmountJobReducer = (
  state = { applierAmountJob: [] },
  action
) => {
  switch (action.type) {
    case SIMONAS_APPLIER_AMOUNT_JOB_REQUEST:
      return {
        loading: true,
      };

    case SIMONAS_APPLIER_AMOUNT_JOB_SUCCESS:
      return {
        loading: false,
        applierAmountJob: action.payload.data,
      };

    case SIMONAS_APPLIER_AMOUNT_JOB_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const simonasApplierAmountProjectReducer = (
  state = { applierAmountProject: [] },
  action
) => {
  switch (action.type) {
    case SIMONAS_APPLIER_AMOUNT_PROJECT_REQUEST:
      return {
        loading: true,
      };

    case SIMONAS_APPLIER_AMOUNT_PROJECT_SUCCESS:
      return {
        loading: false,
        applierAmountProject: action.payload.data,
      };

    case SIMONAS_APPLIER_AMOUNT_PROJECT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const simonasApplierAgeReducer = (
  state = { applierAge: [] },
  action
) => {
  switch (action.type) {
    case SIMONAS_APPLIER_AGE_REQUEST:
      return {
        loading: true,
      };

    case SIMONAS_APPLIER_AGE_SUCCESS:
      return {
        loading: false,
        applierAge: action.payload.data,
      };

    case SIMONAS_APPLIER_AGE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const simonasApplierGenderReducer = (
  state = { applierGender: [] },
  action
) => {
  switch (action.type) {
    case SIMONAS_APPLIER_GENDER_REQUEST:
      return {
        loading: true,
      };

    case SIMONAS_APPLIER_GENDER_SUCCESS:
      return {
        loading: false,
        applierGender: action.payload.data,
      };

    case SIMONAS_APPLIER_GENDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const simonasApplierEducationJobReducer = (
  state = { applierEducationJob: [] },
  action
) => {
  switch (action.type) {
    case SIMONAS_APPLIER_EDUCATION_JOB_REQUEST:
      return {
        loading: true,
      };

    case SIMONAS_APPLIER_EDUCATION_JOB_SUCCESS:
      return {
        loading: false,
        applierEducationJob: action.payload.data,
      };

    case SIMONAS_APPLIER_EDUCATION_JOB_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const simonasApplierEducationProjectReducer = (
  state = { applierEducationProject: [] },
  action
) => {
  switch (action.type) {
    case SIMONAS_APPLIER_EDUCATION_PROJECT_REQUEST:
      return {
        loading: true,
      };

    case SIMONAS_APPLIER_EDUCATION_PROJECT_SUCCESS:
      return {
        loading: false,
        applierEducationProject: action.payload.data,
      };

    case SIMONAS_APPLIER_EDUCATION_PROJECT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const simonasRegionApplierReducer = (
  state = { regionApplier: [] },
  action
) => {
  switch (action.type) {
    case SIMONAS_REGION_APPLIER_REQUEST:
      return {
        loading: true,
      };

    case SIMONAS_REGION_APPLIER_SUCCESS:
      return {
        loading: false,
        regionApplier: action.payload.data,
      };

    case SIMONAS_REGION_APPLIER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const simonasFilterYearReducer = (
  state = { filterYear: [] },
  action
) => {
  switch (action.type) {
    case SIMONAS_FILTER_YEAR_REQUEST:
      return {
        loading: true,
      };

    case SIMONAS_FILTER_YEAR_SUCCESS:
      return {
        loading: false,
        filterYear: action.payload.data,
      };

    case SIMONAS_FILTER_YEAR_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const simonasFilterStatusReducer = (
  state = { filterStatus: [] },
  action
) => {
  switch (action.type) {
    case SIMONAS_FILTER_STATUS_REQUEST:
      return {
        loading: true,
      };

    case SIMONAS_FILTER_STATUS_SUCCESS:
      return {
        loading: false,
        filterStatus: action.payload.data,
      };

    case SIMONAS_FILTER_STATUS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
