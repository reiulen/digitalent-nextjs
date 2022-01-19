import {
  IS_SHOW_PROFILE,
  IS_OVERLAY_PROFILE,
} from "../../types/utils/functionals.type";

export const fetchReducerFunc = () => {
  return (dispatch) => {
    dispatch({ type: IS_SHOW_PROFILE });
    dispatch({ type: IS_OVERLAY_PROFILE });
  };
};
