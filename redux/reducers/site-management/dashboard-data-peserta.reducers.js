import { DRAW_LOAD_DATA_PESERTA_CITY_DASHBOARD_SITE_MANAGEMENT, DRAW_LOAD_DATA_PESERTA_DASHBOARD_SITE_MANAGEMENT, LOAD_DATA_DASHBOARD_SITE_MANAGEMENT } from '../../types/site-management/dashboard.type'

const initialstate= [{
    nomor: 0,
    provinsi: "",
    total: 0,
    totalPage: 0,
    totalPeserta: 0
}]

export const allDataPesertaReducer = (state = initialstate, action) => {
    switch (action.type) {
      case DRAW_LOAD_DATA_PESERTA_DASHBOARD_SITE_MANAGEMENT: 
          return action.payload.data.list_zonasi.map((item, index) => {
              return {
                  ...state,
                  nomor: index + 5 * (action.page - 1) + 1,
                  provinsi: item.province,
                  total: item.count,
                  totalPage: action.payload.data.total,
                  totalPeserta: action.payload.totalAll
              }
          })

      case DRAW_LOAD_DATA_PESERTA_CITY_DASHBOARD_SITE_MANAGEMENT: 
        return action.payload.data.list_zonasi.map((item, index) => {
            return {
                ...state,
                nomor: index + 5 * (action.page - 1) + 1,
                provinsi: item.city,
                total: item.count,
                totalPage: action.payload.data.total,
                totalPeserta: action.payload.totalAll
            }
        })
      

      default:
        return state;
    }
  };
  