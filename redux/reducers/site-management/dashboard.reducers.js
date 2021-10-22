import { DRAW_LOAD_DATA_DASHBOARD_SITE_MANAGEMENT, LOAD_DATA_DASHBOARD_SITE_MANAGEMENT } from '../../types/site-management/dashboard.type'

const initialstate= [{
    provinsi: "",
    total: ""
}]

export const allDataZonasiReducer = (state = initialstate, action) => {
    switch (action.type) {
      case LOAD_DATA_DASHBOARD_SITE_MANAGEMENT: 
        return action.payload.list_zonasi.map((item, index) => {
            return {
                ...state,
                nomor: index + 5 * (action.page - 1) + 1,
                provinsi: item.key,
                total: item.value,
                totalPage: action.payload.total,
                totalZonasi: action.payload.total
            }
        })
        
      default:
        return state;
    }
  };
  