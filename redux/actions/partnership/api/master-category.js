import axios from "axios";
import Cookies from "js-cookie";
let config = process.env.END_POINT_API_PARTNERSHIP;

export async function getAllMasterCategory(params, token, permission) {
  return await axios.get(`${config}api/cooperations`, {
    params,
    headers: {
      authorization: `Bearer ${token}`,
      Permission: permission
    },
  });
}

export async function masterCategorySingle(token, id) {
  return await axios.get(`${config}api/cooperations/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
      Permission: Cookies.get("token_permission")
    },
  });
}

export async function deleteMasterCategory(token, formData, id, permission) {
  return await axios.post(`${config}api/cooperations/delete/${id}`, formData, {
    headers: {
      authorization: `Bearer ${token}`,
      Permission: permission
    },
  });
}

export async function masterCategoryUpdate(token, formData, id) {
  return await axios.post(`${config}api/cooperations/${id}`, formData, {
    headers: {
      authorization: `Bearer ${token}`,
      Permission: Cookies.get("token_permission")
    },
  });
}
