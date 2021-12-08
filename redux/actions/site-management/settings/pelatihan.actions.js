import {
  GET_DATA_PROMPT,
  PUT_DATA_PROMPT,
} from "../../../types/site-management/settings/pelatihan.type";

import axios from "axios";
import Swal from "sweetalert2";

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
      Swal.fire("Oops...", "Isi data dengan benar !", "error");
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
        Swal.fire("Oops...", error.response.data.message, "error");
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
      Swal.fire("Oops...", "Isi data dengan benar !", "error");
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
        Swal.fire("Oops...", "Isi data dengan benar !", "error");
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
    tahun: year,
    akademi: academy,
    tema: theme,
    penyelenggara: organizer,
    pelatihan: training,
    status_profile: profileStatus,
    status_seleksi: selectionStatus,
    status_update: participantSelectionStatusUpdate,
    status_peserta: status,
    broadcast_email: broadcastEmailSendNotification,
    subjek_email: emailSubject,
    konten_email: emailContent,
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
        if(response.data.status){
          Swal.fire("Berhasil", response.data.message, "success").then(() => {
            router.push("/partnership/user/auth/login");
          });

        }else{
          Swal.fire("Ooopss", response.data.message, "error").then(() => {
            router.push("/partnership/user/auth/login");
          });
        }
      })
      .catch((error) => {
        Swal.fire("Oops...", "Isi data dengan benar !", "error");

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
    tahun: "",
    akademi: "",
    tema: "",
    penyelenggara: "",
    pelatihan: "",
    status_profile: "",
    status_seleksi: "",
    status_update: participantSelectionStatusUpdate,
    status_peserta: status,
    broadcast_email: broadcastEmailSendNotification,
    subjek_email: emailSubject,
    konten_email: emailContent,
  };


  let subm = new FormData();

  subm.append("status_types", via);
  subm.append("file", file);
  subm.append("status_update", data.status_update);
  subm.append("status_peserta", data.status_peserta);
  subm.append("broadcast_email", data.broadcast_email);
  subm.append("subjek_email", data.subjek_email);
  subm.append("konten_email", data.konten_email);

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
        if(response.data.status){
          Swal.fire("Berhasil", response.data.message, "success").then(() => {
            router.push("/partnership/user/auth/login");
          });

        }else{
          Swal.fire("Ooopss", response.data.message, "error").then(() => {
            router.push("/partnership/user/auth/login");
          });
        }
      })
      .catch((error) => {
        Swal.fire("Oops...", "Isi data dengan benar !", "error");
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
        Swal.fire("Oops...", "Isi data dengan benar !", "error");
      });
  };
};
