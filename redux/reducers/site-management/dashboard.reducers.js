import { DRAW_LOAD_DATA_DASHBOARD_SITE_MANAGEMENT, DRAW_LOAD_DATA_PESERTA_DASHBOARD_SITE_MANAGEMENT, LOAD_DATA_DASHBOARD_SITE_MANAGEMENT } from '../../types/site-management/dashboard.type'

const initialstate= [{
    nomor: 0,
    provinsi: "",
    total: 0,
    totalPage: 0,
    totalZonasi: 0
}]

export const allDataZonasiReducer = (state = initialstate, action) => {
    switch (action.type) {
      case LOAD_DATA_DASHBOARD_SITE_MANAGEMENT: 
        return action.payload.data.list_zonasi.map((item, index) => {
            return {
                nomor: index + 5 * (action.page - 1) + 1,
                provinsi: item.key,
                total: item.value,
                totalPage: action.payload.data.total,
                totalZonasi: action.payload.totalAll
            }
        })
        
      default:
        return state;
    }
  };
  