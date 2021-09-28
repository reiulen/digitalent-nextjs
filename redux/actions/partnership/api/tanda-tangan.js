import axios from "axios";
let config = process.env.END_POINT_API_PARTNERSHIP;

export async function fetchSignatureApi(params, token) {
  return await axios.get(`${config}/api/signatures`, {
    params,
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

export async function deleteTtd(id, token) {
  return await axios.delete(`${config}/api/signatures/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

export async function getOptionTtdAdmin(token) {
  return await axios.get(`${config}/api/seremonial/option-admin`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

export async function getOptionTtdPartner(token, id) {
  return await axios.get(`${config}/api/seremonial/option-mitra/${id}`, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}

export async function statusListChange(token, dataSend, id) {
  return await axios.post(
    `${config}/api/signatures/update-status/${id}`,
    dataSend,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );
}

export async function ttdAdd(token, data) {
  return await axios.post(`${config}/api/signatures/create`, data, {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
}
