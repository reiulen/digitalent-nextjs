import { GET_DATA_PROMPT } from '../../../types/site-management/settings/pelatihan.type'

const initialState = {
  notification: 0,
  email: 0
}

export const allPromptReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_DATA_PROMPT:
        return {
          ...state,
          notification: action.payload.data.training_rules.notification.status,

        }
  
     
      default:
        return state;
    }
  };
  
  