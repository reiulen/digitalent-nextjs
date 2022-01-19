import { GET_DATA_REPORT_TRAINING, GET_DETAIL_REPORT_TRAINING } from "../../../types/pelatihan/report-training.type";

export const getDataReportTrainingReducer = (state = {data: {}}, action) => {
    switch (action.type) {
      case GET_DATA_REPORT_TRAINING:
        return {
          ...state,
          data: action.payload.data
        }
  
      
  
      default:
        return state;
    }
  };

  export const detailReportTrainingReducer = (state = {data: {}}, action) => {
    switch (action.type) {
      case GET_DETAIL_REPORT_TRAINING:
        return {
          ...state,
          data: action.payload.data
        }
  
      
  
      default:
        return state;
    }
  };