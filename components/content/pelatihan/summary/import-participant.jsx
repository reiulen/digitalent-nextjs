import React, { useState } from "react";

import { useRouter } from "next/router";

import { SweatAlert } from "../../../../utils/middleware/helper/index";
import PageWrapper from "../../../wrapper/page.wrapper";
import axios from "axios";
import LoadingTable from "../../../LoadingTable";

const ImportParticipant = ({ token }) => {
  const router = useRouter();

  const { pelatihan, id } = router.query;

  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("Belum ada File");
  const [loading, setLoading] = useState(false);

  const handleDownloadTemplate = () => {
    window.location.href =
      process.env.END_POINT_API_PELATIHAN + "storage/csv/import.csv";
  };

  const handleSelectFile = (e) => {
    const type = ["application/vnd.ms-excel"];
    if (e.target.files[0]) {
      if (type.includes(e.target.files[0].type)) {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      } else {
        SweatAlert("Oops...", "File hanya boleh CSV", "error");
      }
    }
  };

  const handleUploadFile = async () => {
    const formdata = new FormData();
    formdata.append("pelatihan_id", id);
    formdata.append("file", file);

    const config = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };

    setLoading(true);

    await axios
      .post(
        process.env.END_POINT_API_PELATIHAN +
          "api/v1/pelatihan/import-pelatihan",
        formdata,
        config
      )
      .then((res) => {
        setLoading(false);
        Swal.fire({
          icon: "success",
          title: res.data.message,
          text: res.data.data,
          confirmButtonText: "Tutup",
        }).then((result) => {
          router.back();
        });
      })
      .catch((err) => {
        setLoading(false);
        SweatAlert("Gagal", err, "success");
      });
  };

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header mt-3">
            <h1
              className="card-title text-dark mt-2"
              style={{ fontSize: "24px" }}
            >
              Import Peserta Pelatihan / {pelatihan}
            </h1>
          </div>

          <div className="card-body pb-0">
            <div className="form-group row mb-2">
              <div className="col-sm-6 col-md-4">
                <label className="col-form-label">
                  Untuh Template Form Peserta
                </label>
                <button
                  className="btn btn-rounded-full bg-blue-secondary text-white"
                  type="button"
                  onClick={() => handleDownloadTemplate()}
                >
                  Unduh
                  <i className="ri-arrow-down-s-line ml-3 mt-1 text-white"></i>
                </button>
              </div>
              <div className="col-sm-6 col-md-8">
                <label className="col-form-label">Upload Data Peserta</label>
                <button
                  className="btn btn-rounded-full bg-success text-white"
                  type="button"
                  onClick={() => {
                    document.getElementById("upload-file").click();
                  }}
                >
                  <i className="ri-download-2-line mr-2 mt-1 text-white"></i>
                  Upload
                </button>
                <label className="mt-2">{fileName}</label>
                <input
                  type="file"
                  name="gambar"
                  className="custom-file-input"
                  id="upload-file"
                  accept=".csv"
                  style={{ display: "none" }}
                  onChange={(e) => handleSelectFile(e)}
                />
              </div>
            </div>

            <div className="form-group mt-7">
              <div className="text-right">
                {loading ? (
                  <LoadingTable />
                ) : (
                  <>
                    <button
                      className="btn btn-light-ghost-rounded-full mr-2"
                      type="button"
                      onClick={() => router.back()}
                    >
                      Batal
                    </button>
                    <button
                      className="btn btn-primary-rounded-full"
                      type="button"
                      onClick={() => handleUploadFile()}
                    >
                      Tambahkan
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ImportParticipant;
