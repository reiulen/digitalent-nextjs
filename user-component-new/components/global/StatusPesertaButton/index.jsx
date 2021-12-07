import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import CustomButton from "../../../content/peserta/riwayat-pelatihan/card/Buttons/CustomButton";
import axios from "axios";
import { Col, Row, Card, Button, Modal } from "react-bootstrap";

export default function ButtonStatusPeserta({ data, token }) {
  const router = useRouter();
  const [imageSertifikasi, setImageSertifikasi] = useState();
  const [statusSertifikasi, setStatusSertifikasi] = useState(1);
  const [fileName, setFileName] = useState();

  const config = {
    headers: {
      authorization: "Bearer " + token,
    },
  };
  const [showModalSertifikasi, setShowModalSertifikasi] = useState(false);

  // upload sertifikasi
  const uploadSertifikasi = async (sertifikasi, id) => {
    try {
      const link = `${process.env.END_POINT_API_PELATIHAN}api/v1/formPendaftaran/update-sertifikat`;
      const body = {
        id: +id,
        sertifikasi: statusSertifikasi.toString(),
        file_sertifikat: sertifikasi,
      };

      const { data } = await axios.post(link, body, config);
      if (data) {
        Swal.fire(data?.message, "Berhasil upload sertifikasi", "success");
      }
    } catch (error) {
      Swal.fire("Gagal", `${error.response.data?.message}`, "error");
    }
  };

  const onChangeFile = (e) => {
    setFileName(e.target.files[0].name);
    if (e.target.files[0].size > 5000000) {
      e.target.value = null;
      Swal.fire("Oops !", "Gambar maksimal 5 MB.", "error");
    } else {
      const type = ["image/jpg", "image/png", "image/jpeg"];
      if (type.includes(e.target.files[0].type)) {
        const reader = new FileReader();
        reader.onload = () => {
          if (reader.readyState === 2) {
            setImageSertifikasi(reader.result);
          }
        };
        reader.readAsDataURL(e.target.files[0]);
      } else {
        e.target.value = null;
        Swal.fire(
          "Oops !",
          "Data yang bisa dimasukkan hanya berupa data background.",
          "error"
        );
      }
    }
  };

  const handleClick = async (name, id) => {
    if (name == "download") {
      try {
        const { data } = await axios.get(
          `${process.env.END_POINT_API_PELATIHAN}api/v1/formPendaftaran/export-pdf?id=${id}`,
          config
        );
        if (data) {
          const link = document.createElement("a");
          link.download = `Bukti Pendaftaran.pdf`;
          link.target = "_blank";
          link.href = data?.data;
          link.click();
          document.body.removeChild(link);
        }
      } catch (error) {
        Swal.fire("Gagal", `${error.response.data?.message}`, "error");
      }
    }
  };

  return (
    <Fragment>
      {data?.lpj ? (
        <Fragment>
          <CustomButton
            outline
            click={() => handleClick("download", data?.id_pendaftaran)}
          >
            <i className="ri-download-2-fill mr-2"></i>
            Bukti Pendaftaran
          </CustomButton>
          <CustomButton
            click={() => {
              Cookies.set("id_pelatihan", data?.id);
              Cookies.set("id_tema", data?.tema_id);
              router.push(`/peserta/form-lpj`);
            }}
          >
            <i className="ri-file-text-line mr-2"></i>
            Isi Laporan Pertangungjawaban
          </CustomButton>
        </Fragment>
      ) : data?.survei || data?.status == "survey belum tersedia" ? (
        <Fragment>
          <CustomButton
            outline
            click={() => handleClick("download", data?.id_pendaftaran)}
          >
            <i className="ri-download-2-fill mr-2"></i>
            Bukti Pendaftaran
          </CustomButton>

          <CustomButton
            disabled={!data?.survei}
            click={() => {
              router.push("/peserta/survey");
              Cookies.set("id_pelatihan", data?.id);
              Cookies.set("id_tema", data?.tema_id);
            }}
          >
            Isi Survei
            <i className="ri-arrow-right-s-line mr-2"></i>
          </CustomButton>
        </Fragment>
      ) : data?.lpj || data?.status == "lpj belum tersedia" ? (
        <Fragment>
          <CustomButton
            outline
            click={() => handleClick("download", data?.id_pendaftaran)}
          >
            <i className="ri-download-2-fill mr-2"></i>
            Bukti Pendaftaran
          </CustomButton>
          <CustomButton
            disabled={!data?.lpj}
            click={() => handleClick("download", data?.id_pendaftaran)}
          >
            Isi Laporan Pertangung Jawaban
            <i className="ri-arrow-right-s-line mr-2"></i>
          </CustomButton>
        </Fragment>
      ) : data?.status == "pelatihan" && data?.trivia && data?.midtest ? (
        <Fragment>
          <CustomButton
            click={() => {
              router.push(
                `/peserta/mid-test/panduan-mid-test?id_pelatihan=${data?.id}&id_tema=${data?.tema_id}`
              );
              Cookies.set("id_pelatihan", data?.id);
              Cookies.set("id_tema", data?.tema_id);
            }}
          >
            Kerjakan Mid Test
            <i className="ri-arrow-right-s-line mr-2"></i>
          </CustomButton>
          <CustomButton
            click={() => {
              router.push(`/peserta/trivia`);
              Cookies.set("id_pelatihan", data?.id);
              Cookies.set("id_tema", data?.tema_id);
            }}
          >
            Kerjakan Trivia <i className="ri-arrow-right-s-line mr-2"></i>
          </CustomButton>
        </Fragment>
      ) : data?.status == "pelatihan" && data?.midtest ? (
        <Fragment>
          <CustomButton
            click={() => {
              router.push(
                `/peserta/mid-test/panduan-mid-test?id_pelatihan=${data?.id}&id_tema=${data?.tema_id}`
              );
              Cookies.set("id_pelatihan", data?.id);
              Cookies.set("id_tema", data?.tema_id);
            }}
          >
            Kerjakan Mid Test
            <i className="ri-arrow-right-s-line mr-2"></i>
          </CustomButton>
        </Fragment>
      ) : data?.status == "pelatihan" && data?.trivia ? (
        <Fragment>
          <CustomButton
            click={() => {
              router.push(`/peserta/trivia`);
              Cookies.set("id_pelatihan", data?.id);
              Cookies.set("id_tema", data?.tema_id);
            }}
          >
            Kerjakan Trivia <i className="ri-arrow-right-s-line mr-2"></i>
          </CustomButton>
        </Fragment>
      ) : data?.status == "pelatihan" ? (
        <Fragment>
          <CustomButton
            outline
            click={() => handleClick("download", data?.id_pendaftaran)}
          >
            <i className="ri-download-2-fill mr-2"></i>
            Bukti Pendaftaran
          </CustomButton>
        </Fragment>
      ) : data?.status == "menunggu" ? (
        <Fragment>
          <CustomButton
            click={() => handleClick("download", data?.id_pendaftaran)}
          >
            <i className="ri-download-2-fill mr-2"></i>
            Bukti Pendaftaran
          </CustomButton>
        </Fragment>
      ) : data?.status == "lulus pelatihan" ||
        data?.status == "Lulus Pelatihan" ? (
        <Fragment>
          {data?.sertifikasi == "1" && (
            <CustomButton outline click={() => setShowModalSertifikasi(true)}>
              <i className="ri-upload-2-fill mr-2"></i>
              Unggah Sertifikasi
            </CustomButton>
          )}
          <CustomButton
            click={() => {
              router.push(
                `/peserta/riwayat-pelatihan/${data?.name
                  .split(" ")
                  .join("-")
                  .toLowerCase()}/sertifikat/${data?.id}`
              );
            }}
          >
            <i className="ri-download-2-fill mr-2"></i>
            Lihat Sertifikat
          </CustomButton>
        </Fragment>
      ) : data?.status == "tes substansi" ? (
        <Fragment>
          <CustomButton
            outline
            click={() => handleClick("download", data?.id_pendaftaran)}
          >
            <i className="ri-download-2-fill mr-2"></i>
            Bukti Pendaftaran
          </CustomButton>
          <CustomButton
            click={() => {
              Cookies.set("id_pelatihan", data?.id);
              Cookies.set("id_tema", data?.tema_id);
              router.push(
                `/peserta/test-substansi/panduan-substansi?id_pelatihan=${data?.id}&id_tema=${data?.tema_id}`
              );
            }}
            disabled={!data?.tes_subtansi}
          >
            Test Substansi <i className="ri-arrow-right-s-line mr-2"></i>
          </CustomButton>
        </Fragment>
      ) : data?.status == "diterima" ? (
        <Fragment>
          {data?.sertifikasi == "1" && (
            <CustomButton outline click={() => setShowModalSertifikasi(true)}>
              <i className="ri-upload-2-fill mr-2"></i>
              Unggah Sertifikasi
            </CustomButton>
          )}
          <CustomButton
            click={() => handleClick("download", data?.id_pendaftaran)}
          >
            <i className="ri-download-2-fill mr-2"></i>
            Bukti Pendaftaran
          </CustomButton>
        </Fragment>
      ) : data?.status.includes("seleksi administrasi") ||
        data?.status.includes("seleksi") ? (
        <Fragment>
          <CustomButton
            outline
            click={() => handleClick("download", data?.id_pendaftaran)}
          >
            <i className="ri-download-2-fill mr-2"></i>
            Bukti Pendaftaran
          </CustomButton>
        </Fragment>
      ) : data?.status.includes("menunggu") ? (
        <Fragment>
          <CustomButton
            outline
            click={() => handleClick("download", data?.id_pendaftaran)}
          >
            <i className="ri-download-2-fill mr-2"></i>
            Bukti Pendaftaran
          </CustomButton>
        </Fragment>
      ) : data?.status.includes("belum tersedia") ? (
        <Fragment>
          <CustomButton
            outline
            click={() => handleClick("download", data?.id_pendaftaran)}
          >
            <i className="ri-download-2-fill mr-2"></i>
            Bukti Pendaftaran
          </CustomButton>
        </Fragment>
      ) : data?.status === "lpj belum mengerjakan" ? (
        <Fragment>
          <CustomButton
            disabled
            outline
            click={() => handleClick("download", data?.id_pendaftaran)}
          >
            <i className="ri-file-text-line mr-2"></i>
            Isi Laporan Pertangungjawaban
          </CustomButton>
        </Fragment>
      ) : (
        ""
      )}

      {/* Modal Start Disini */}
      <Modal
        show={showModalSertifikasi}
        onHide={() => setShowModalSertifikasi(false)}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <Modal.Header>
          <Modal.Title>Tambah Sertifikasi</Modal.Title>
          <button
            type="button"
            className="close"
            onClick={() => setShowModalSertifikasi(false)}
          >
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group row mb-4">
            <label className="col-form-label font-weight-bold col-sm-3 pr-0 text-center">
              Status Sertifikasi
            </label>
            <div className="col-sm-9 mt-3">
              <div className="form-check ">
                <input
                  type="radio"
                  name="status"
                  className="form-check-input"
                  value={statusSertifikasi}
                  onChange={() => {
                    setStatusSertifikasi(1);
                  }}
                  defaultChecked
                />
                <label className="form-check-label">
                  Lulus / Certifed / Kompeten
                </label>
              </div>
              <div className="form-check ">
                <input
                  type="radio"
                  name="status"
                  value={statusSertifikasi}
                  onChange={() => {
                    setStatusSertifikasi(0);
                  }}
                  className="form-check-input"
                />
                <label className="form-check-label">
                  Tidak Lulus / Not Certifed / Belum Kompeten
                </label>
              </div>
            </div>
          </div>

          <div className="form-group mb-3 px-11">
            <label className="col-form-label font-weight-bold">
              Upload Sertifikasi (Optional)
            </label>
            <div className="d-flex">
              <div className="custom-file">
                <input
                  type="file"
                  className="custom-file-input"
                  accept="image/png, image/jpeg , image/jpg"
                  onChange={(e) => {
                    onChangeFile(e);
                  }}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  {fileName ? fileName : "Pilih File"}
                </label>
              </div>
            </div>
            <small className="text-muted">
              Format File (.pdf/.jpg) & Max size 5 mb
            </small>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary-rounded-full"
            type="button"
            onClick={() => {
              uploadSertifikasi(imageSertifikasi, data?.id_pendaftaran);
            }}
          >
            Upload
          </button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}
