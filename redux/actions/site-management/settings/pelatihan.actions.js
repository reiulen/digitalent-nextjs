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
      notify(error.response.data.message);
    }
  };
};

export const postTemplate = (token, subject, body, status) => {
  return (dispatch) => {
    axios
      .post(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-trainings/update-template-email/${status}`,
        {
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

export const postViaFilter = (
  token,
  title,
  year,
  academy,
  theme,
  organizer,
  training,
  profileStatus,
  selectionStatus,
  participantSelectionStatusUpdate,
  status,
  broadcastEmailSendNotification,
  emailSubject,
  emailContent,
  via
) => {
  let data = {
    title,
    year,
    academy,
    theme,
    organizer,
    training,
    profileStatus,
    selectionStatus,
    participantSelectionStatusUpdate,
    status,
    broadcastEmailSendNotification,
    emailSubject,
    emailContent,
  };

  let subm = new FormData();
  subm.append("status_types", via);
  subm.append("training_rules", JSON.stringify(data));

  return (dispatch) => {
    axios
      .post(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-trainings/subm`,
        subm,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        Swal.fire("Berhasil", "Data berhasil tersimpan", "success").then(() => {
          router.push("/partnership/user/auth/login");
        });
      })
      .catch((error) => {
        Swal.fire("Gagal", "Gagal tidak berhasil tersimpan, mohon isi data yang lengkap", "error");

      });
  };
};

export const postViaTemplate = (token,title, file, participantSelectionStatusUpdate,
  status,
  broadcastEmailSendNotification,
  emailSubject,
  emailContent, via) => {
  const data = {
    title,
    year: "",
    academy: "",
    theme: "",
    organizer: "",
    training: "",
    profileStatus: "",
    selectionStatus: "",
    participantSelectionStatusUpdate,
    status,
    broadcastEmailSendNotification,
    emailSubject,
    emailContent,
  };


  let subm = new FormData();

  subm.append("status_types", via);
  subm.append("participant", file);
  subm.append("training_rules", JSON.stringify(data));

  return (dispatch) => {
    axios
      .post(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-trainings/subm`,
        subm,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "content-type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        Swal.fire("Berhasil", "Data berhasil tersimpan", "success").then(() => {
          router.push("/partnership/user/auth/login");
        });
        console.log(response)
      })
      .catch((error) => {
        Swal.fire("Gagal", "Gagal tidak berhasil tersimpan, mohon isi data dengan lengkap", "error");
      });
  };
};

export const postFileSize = (
  token,
  image, document
) => {
  return (dispatch) => {
    axios
      .post(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting-trainings/update-file-size`,
        {
          image: [
            {
              size: image,
            },
          ],
          document: [
            {
              size: document,
            },
          ],
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
