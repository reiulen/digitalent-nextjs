import { useRouter } from "next/router";
import React, { Fragment, useState, useEffect } from "react";
import CustomButton from "../../../content/peserta/riwayat-pelatihan/card/Buttons/CustomButton";
import axios from "axios";
import { Col, Row, Card, Button, Modal } from "react-bootstrap";
import Cookies from "js-cookie";
import { SweatAlert } from "../../../../utils/middleware/helper";
import { getAllRiwayatPelatihanPeserta } from "../../../../redux/actions/pelatihan/riwayat-pelatihan.actions";
import { useDispatch } from "react-redux";

export default function ButtonStatusPeserta({
  data,
  token,
  setCountButton,
  countButton,
}) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [imageSertifikasi, setImageSertifikasi] = useState();
  const [statusSertifikasi, setStatusSertifikasi] = useState(1);
  const [fileName, setFileName] = useState();

  const config = {
    headers: {
      Authorization: "Bearer " + token,
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
        setShowModalSertifikasi(false);
        SweatAlert("Berhasil", "Berhasil upload sertifikasi", "success");
        dispatch(getAllRiwayatPelatihanPeserta(token));
      }
    } catch (error) {
      SweatAlert("Gagal", `${error.response.data?.message}`, "error");
    }
  };

  const onChangeFile = (e) => {
    setFileName(e.target.files[0].name);
    if (e.target.files[0].size > 5000000) {
      e.target.value = null;
      Swal.fire("Oops !", "PDF maksimal 5 MB.", "error");
    } else {
      const type = ["application/pdf"];
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
          "Data yang bisa dimasukkan hanya berupa data PDF.",
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

  useEffect(() => {
    if (setCountButton) {
      if (data?.lpj) return setCountButton(2);

      if (data?.survei || data?.status == "survey belum tersedia")
        return setCountButton(2);

      if (data?.lpj || data?.status == "lpj belum tersedia")
        return setCountButton(2);

      if (data?.status.includes("tidak")) return setCountButton(1);

      if (data?.status == "pelatihan" && data?.trivia && data?.midtest)
        return setCountButton(2);

      if (data?.status == "pelatihan" && data?.midtest)
        return setCountButton(1);

      if (data?.status == "pelatihan" && data?.trivia) return setCountButton(1);

      if (data?.status == "pelatihan") return setCountButton(1);

      if (data?.status == "menunggu") return setCountButton(1);

      if (
        data?.status == "lulus pelatihan" ||
        data?.status == "Lulus Pelatihan"
      ) {
        data?.sertifikasi != 0 ? setCountButton(2) : setCountButton(1);
      }

      if (data?.status == "tes substansi") return setCountButton(2);
      if (data?.status == "diterima") {
        data?.sertifikasi != 0 ? setCountButton(2) : setCountButton(1);
      }
      if (
        data?.status.includes("seleksi administrasi") ||
        data?.status.includes("seleksi")
      )
        return setCountButton(1);

      if (data?.status.includes("belum tersedia")) return setCountButton(1);
      if (data?.status === "lpj belum mengerjakan") return setCountButton(2);
      if (data?.status.includes("lulus")) return setCountButton(2);
    }
  }, [countButton, data]);

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
              router.push(`/peserta/form-lpj?id_pelatihan=${data?.id}`);
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
              router.push(
                `/peserta/survey/panduan-survey?no=${data?.id}&id_pelatihan=${data?.id}&id_tema=${data?.tema_id}`
              );
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
            click={() => {
              router.push(`/peserta/form-lpj?id_pelatihan=${data?.id}`);
            }}
          >
            Isi Laporan Pertangungjawaban
            <i className="ri-arrow-right-s-line mr-2"></i>
          </CustomButton>
        </Fragment>
      ) : data?.status.includes("tidak") ? (
        <Fragment>
          <CustomButton
            outline
            disabled
            click={() => handleClick("download", data?.id_pendaftaran)}
          >
            <i className="ri-download-2-fill mr-2"></i>
            Bukti Pendaftaran
          </CustomButton>
        </Fragment>
      ) : data?.status == "pelatihan" && data?.trivia && data?.midtest ? (
        <Fragment>
          <CustomButton
            click={() => {
              router.push(
                `/peserta/mid-test/panduan-mid-test?no=${data?.id}&id_pelatihan=${data?.id}&id_tema=${data?.tema_id}`
              );
            }}
          >
            Kerjakan Mid Test
            <i className="ri-arrow-right-s-line mr-2"></i>
          </CustomButton>
          <CustomButton
            click={() => {
              router.push(
                `/peserta/trivia/panduan-trivia?no=${data?.id}&id_pelatihan=${data?.id}&id_tema=${data?.tema_id}`
              );
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
                `/peserta/mid-test/panduan-mid-test?no=${data?.id}&id_pelatihan=${data?.id}&id_tema=${data?.tema_id}`
              );
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
              router.push(
                `/peserta/trivia/panduan-trivia?no=${data?.id}&id_pelatihan=${data?.id}&id_tema=${data?.tema_id}`
              );
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
          {data?.sertifikasi != "0" && (
            <CustomButton
              outline
              click={() => setShowModalSertifikasi(true)}
              disabled={data?.upload_sertifikasi ? true : false}
            >
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
              router.push(
                `/peserta/test-substansi/panduan-substansi?no=${data?.id}&id_pelatihan=${data?.id}&id_tema=${data?.tema_id}`
              );
            }}
            disabled={!data?.tes_subtansi}
          >
            Test Substansi <i className="ri-arrow-right-s-line mr-2"></i>
          </CustomButton>
        </Fragment>
      ) : data?.status == "diterima" ? (
        <Fragment>
          {data?.sertifikasi != "0" && (
            <CustomButton
              outline
              click={() => setShowModalSertifikasi(true)}
              disabled={data?.upload_sertifikasi ? true : false}
            >
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
            outline
            click={() => handleClick("download", data?.id_pendaftaran)}
          >
            <i className="ri-download-2-fill mr-2"></i>
            Bukti Pendaftaran
          </CustomButton>
          <CustomButton
            disabled={data?.lpj ? false : true}
            outline
            click={() => {
              router.push(`/peserta/form-lpj?id_pelatihan=${data?.id}`);
            }}
          >
            <i className="ri-file-text-line mr-2"></i>
            Isi Laporan Pertangungjawaban
          </CustomButton>
        </Fragment>
      ) : (
        <Fragment>
          <CustomButton
            outline
            click={() => handleClick("download", data?.id_pendaftaran)}
          >
            <i className="ri-download-2-fill mr-2"></i>
            Bukti Pendaftaran
          </CustomButton>
        </Fragment>
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
          <Modal.Title className="text-capitalize">
            Tambah Sertifikasi {data?.sertifikasi}
          </Modal.Title>
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
                  accept="application/pdf"
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
              Format File (.pdf) & Max size 5 mb
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
