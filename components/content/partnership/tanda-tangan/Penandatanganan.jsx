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
      <div className="col-lg-12 col-xxl-4 order-1 order-xxl-2 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark">
              Tambah Tanda Tangan Digital
            </h3>
          </div>
          <div className="d-flex justify-content-center">
            <div
              style={{
                border: "1px solid black",
                width: "47rem",
                height: "36rem",
              }}
            >
              <div
                style={{
                  border: "1px solid red;",
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
                    background: "#f3f6f9",
                    border: " 1px dashed #3699FF",
                    minHeight: "10rem",
                    width: "30rem",
                  }}
                >
                  <input {...getInputProps()} />
                  <div className="text-center">
                    Click or drag file to this area to upload <br />
                    Support for a single upload. Strictly prohibit from
                    uploading <br /> company data or other band files
                  </div>
                  <div className="text-center"></div>
                </div>
                <aside style={thumbsContainer}>{/* {thumbs} */}</aside>
              </div>
            </div>
          </div>

          {/* <div className="card-body">
            <div class="card mx-auto" style={{ width: "60%", height: "35rem" }}>
              <div
                {...getRootProps({ className: "dropzone" })}
                style={{
                  background: "#f3f6f9",
                  border: " 1px dashed #3699FF",
                  height: "200px",
                  margin: "20%",
                }}
              >
                <input {...getInputProps()} />
                <div>
                  <Image
                    src="/file-dragNdrop.svg"
                    alt="Picture of the author"
                    width={500}
                    height={500}
                  />
                </div>
                <span className="text-center">
                  Support for a single upload. Strictly prohibit from uploading
                  company data or other band files
                </span>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Penandatanganan;
