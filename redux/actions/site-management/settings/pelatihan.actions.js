import {
  GET_DATA_PROMPT,
  PUT_DATA_PROMPT,
} from "../../../types/site-management/settings/pelatihan.type";

import axios from "axios";
import Swal from "sweetalert2";

const drawDataPrompt = (data) => ({
  type: GET_DATA_PROMPT,
  notification: data.notification.status,
  email: data.email.status,
});

export const loadDataPrompt = (token) => {
  return async (dispatch) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-trainings/list-propt`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({
        type: GET_DATA_PROMPT,
        payload: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const postTemplate = (token, subject, body, status) => {
  return (dispatch) => {
    axios
      .post(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-trainings/update-template-email/tes substansi`,
        {
          status: status,
          subject: subject,
          body: body,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        Swal.fire("Berhasil", "Data berhasil tersimpan", "success").then(() => {
          router.push("/partnership/user/auth/login");
        });
      })
      .catch((error) => {
        Swal.fire("Gagal", "Gagal tidak berhasil tersimpan", "error");
      });
  };
};

export const putDataPrompt = (token, notification, email) => {
  return async (dispatch) => {
    try {
      await axios.post(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-trainings/update-propt`,
        {
          notification: [
            {
              status: notification,
            },
          ],
          email: [
            {
              status: email,
            },
          ],
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire("Berhasil", "Data berhasil tersimpan", "success").then(() => {
        router.push("/partnership/user/auth/login");
      });
    } catch (error) {
      Swal.fire("Gagal", "Gagal tidak berhasil tersimpan", "error");
    }
  };
};

export const postKetentuan = (
  token,
  numberOfTraining,
  trainingPassStatus,
  completeFinalAdministrativeStatus,
  statusNotPassedTraining,
  noTrainingAccepted
) => {
  console.log("action", numberOfTraining);
  return (dispatch) => {
    axios
      .post(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-trainings/update-training-condition`,
        {
          numberOfTraining: numberOfTraining,
          trainingPassStatus: trainingPassStatus,
          completeFinalAdministrativeStatus: completeFinalAdministrativeStatus,
          statusNotPassedTraining: statusNotPassedTraining,
          noTrainingAccepted: noTrainingAccepted,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        Swal.fire("Berhasil", "Data berhasil tersimpan", "success").then(() => {
          router.push("/partnership/user/auth/login");
        });
      })
      .catch((error) => {
        Swal.fire("Gagal", "Gagal tidak berhasil tersimpan", "error");
      });
  };
};

export const postViaFilter = (token) => {
  const via = {
    status_types: "via filter",
  };
  const data = {
    title: "jobs",
    year: "2021",
    academy: "01",
    theme: "02",
    organizer: "03",
    training: "04",
    profileStatus: "05",
    selectionStatus: "06",
    participantSelectionStatusUpdate: "1",
    status: "lulus",
    broadcastEmailSendNotification: "1",
    emailSubject: "DTS",
    emailContent: "Sebuah lembaga amal jariyah",
  };

  return (dispatch) => {
    axios
      .post(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-trainings/subm`,
        {
          status_types: "via filter",
          training_rules: data,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then(() => {
        Swal.fire("Berhasil", "Data berhasil tersimpan", "success").then(() => {
          router.push("/partnership/user/auth/login");
        });
      })
      .catch((error) => {
        Swal.fire("Gagal", "Gagal tidak berhasil tersimpan", "error");
      });
  };
};
