import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import PageWrapper from "../../../wrapper/page.wrapper";
import dynamic from "next/dynamic";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

const Penandatanganan = () => {
  const importSwitch = () => import("bootstrap-switch-button-react");
  const SwitchButton = dynamic(importSwitch, {
    ssr: false,
  });

  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 16,
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Tambah Tanda Tangan Digital
            </h3>
          </div>
          <h1
            className="text-center"
            style={{
              /* Heading 20 / bold */
              fontWeight: "500",
              fontSize: "20px",
              lineHeight: "28px",
              color: "rgba(0, 0, 0, 0.85)",
            }}
          >
            Dokumen Kerjasama
          </h1>
          <div
            className="d-flex justify-content-center"
            style={{ marginBottom: "7%" }}
          >
            <div
              style={{
                width: "47rem",
                height: "40rem",
                background: "#FFFFFF",
                boxShadow: "inset 10px 10px 40px rgba(0, 0, 0, 0.08)",
                borderRadius: "10px",
              }}
            >
              <div
                style={{
                  width: "auto",
                  position: "absolute",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div
                  {...getRootProps({ className: "dropzone" })}
                  style={{
                    marginTop: "13%",
                    background: "#f3f6f9",
                    border: " 1px dashed #3699FF",
                    MinHeight: "10rem",
                    Minwidth: "30rem",
                  }}
                >
                  <input {...getInputProps()} />
                  <div className="text-center">
                    <Image
                      src="/assets/icon/file-upload.svg"
                      height={40}
                      width={40}
                      alt="file-upload"
                    ></Image>
                  </div>
                  <div
                    className="text-center mt-5"
                    color={{ color: "rgba(0, 0, 0, 0.85)" }}
                  >
                    Click or drag file to this area to upload <br />
                    <span style={{ color: "rgba(0, 0, 0, 0.45)" }}>
                      Support for a single upload. Strictly prohibit from
                      uploading <br /> company data or other band files
                    </span>
                  </div>
                </div>
                <aside style={thumbsContainer}>{/* {thumbs} */}</aside>
              </div>
            </div>
          </div>
          <div
            style={{
              // border: "1px solid black",
              position: "relative",
              left: "50%",
              top: "50%",
              width: "62%",
              marginTop: "5%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              className="d-flex justify-content-start"
              // style={{ marginTop: "10%" }}
            >
              <label htmlFor="staticEmail" className=" col-form-label">
                Pihak 1
              </label>
              <div className="col-sm-4 ml-3">
                <select name="" id="" className="form-control">
                  <option value="Kategori" selected>
                    Dqlab
                  </option>
                  <option value="Kategori">Microsoft</option>
                  <option value="Kategori">Google</option>
                </select>
              </div>
              <button
                className="text-center ml-5"
                type="submit"
                style={{
                  backgroundColor: "#FFE2E6",
                  color: "#F65464",
                  border: "none",
                  padding: "5px 16px",
                  borderRadius: "4px",
                }}
              >
                Batalkan
              </button>
              <button
                className="text-center ml-3"
                type="submit"
                style={{
                  backgroundColor: "#C7F9C9",
                  color: "#52A655",
                  border: "none",
                  padding: "5px 16px",
                  borderRadius: "4px",
                }}
              >
                Sisipkan
              </button>
            </div>
            <div className="d-flex justify-content-start mt-5">
              <label htmlFor="staticEmail" className=" col-form-label">
                Pihak 2
              </label>
              <div className="col-md-4 ml-3">
                <select name="" id="" className="form-control">
                  <option value="Kategori" selected>
                    Dqlab
                  </option>
                  <option value="Kategori">Microsoft</option>
                  <option value="Kategori">Google</option>
                </select>
              </div>
              <button
                className="text-center ml-5"
                type="submit"
                style={{
                  backgroundColor: "#FFE2E6",
                  color: "#F65464",
                  border: "none",
                  padding: "5px 16px",
                  borderRadius: "4px",
                }}
              >
                Batalkan
              </button>
              <button
                className="text-center ml-3"
                type="submit"
                style={{
                  backgroundColor: "#C7F9C9",
                  color: "#52A655",
                  border: "none",
                  padding: "5px 16px",
                  borderRadius: "4px",
                }}
              >
                Sisipkan
              </button>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Penandatanganan;
