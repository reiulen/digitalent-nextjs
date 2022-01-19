import {
  IS_SHOW_PROFILE,
  IS_OVERLAY_PROFILE,
  IS_ASSIDE_MOBILE_SIDEBAR,
  IS_OVERLAY_SIDEBAR_MOBILE,
  IS_MINIMIZE_SIDEBAR,
  IS_ASSIDE_HEADER,
  IS_OVERLAY_ASSIDE_HEADER,
} from "../../types/utils/functionals.type";

const initialState = {
  isProfile: false,
  isOverlayProfile: false,
  isAsideMobileSidebar: false,
  isOverlayMobileSidebar: false,
  isMinimizeSidebar: false,
  isAsideHeader: false,
  isOverlayAsideHeader: false,
};

export const reducerFunctionals = (state = initialState, action) => {
  switch (action.type) {
    case IS_SHOW_PROFILE:
      return {
        ...state,
        isProfile: state.isProfile ? false : true,
      };

    case IS_OVERLAY_PROFILE:
      return {
        ...state,
        isOverlayProfile: state.isOverlayProfile ? false : true,
      };
    case IS_ASSIDE_MOBILE_SIDEBAR:
      return {
        ...state,
        isAsideMobileSidebar: state.isAsideMobileSidebar ? false : true,
      };
    case IS_OVERLAY_SIDEBAR_MOBILE:
      return {
        ...state,
        isOverlayMobileSidebar: state.isOverlayMobileSidebar ? false : true,
      };
    case IS_MINIMIZE_SIDEBAR:
      return {
        ...state,
        isMinimizeSidebar: state.isMinimizeSidebar ? false : true,
      };
    case IS_ASSIDE_HEADER:
      return {
        ...state,
        isAsideHeader: state.isAsideHeader ? false : true,
      };
    case IS_OVERLAY_ASSIDE_HEADER:
      return {
        ...state,
        isOverlayAsideHeader: state.isOverlayAsideHeader ? false : true,
      };

    default:
      return state;
  }
};
