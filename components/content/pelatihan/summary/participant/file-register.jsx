import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { PDFReader } from "react-read-pdf";
import Image from "next/image";

const FileRegister = ({ file }) => {
  const [show, setShow] = useState(false);
  const [path, setPath] = useState(null);
  const handleClose = () => setShow(false);
  const handleDownload = (row) => {
    if (
      row.type.includes("file_doc") ||
      row.type.includes("file_image") ||
      row.type.includes("upload_document")
    ) {
      // window.location.href =
      //   process.env.END_POINT_API_IMAGE_PELATIHAN + row.value;

      const data = {
        name: row.name,
        link: process.env.END_POINT_API_IMAGE_PELATIHAN + row.value,
        type: row.type,
      };
      setPath(data);
      setShow(true);
    }
  };
  return (
    <>
      <div className="card card-custom card-stretch gutter-b">
        <div className="card-body">
          <div className="row">
            {file &&
              file.map(
                (row, i) =>
                  row.value !== "" && (
                    <div className="col-md-6" key={i}>
                      <p className="text-neutral-body my-0">{row.name}</p>

                      <p
                        className={
                          row.type.includes("file_doc") ||
                          row.type.includes("file_image") ||
                          row.type.includes("upload_document")
                            ? `text-primary`
                            : "text-dark"
                        }
                        style={
                          row.type.includes("file_doc") ||
                          row.type.includes("file_image") ||
                          row.type.includes("upload_document")
                            ? { textDecoration: "underline", cursor: "pointer" }
                            : {}
                        }
                        onClick={() => {
                          handleDownload(row);
                        }}
                      >
                        {row.value}
                      </p>
                    </div>
                  )
              )}
          </div>
        </div>
      </div>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>{path?.name}</Modal.Title>
          <button type="button" className="close" onClick={() => handleClose()}>
            <i className="ri-close-fill" style={{ fontSize: "25px" }}></i>
          </button>
        </Modal.Header>
        <Modal.Body>
          {path?.type === "file_doc" && (
            <div style={{ overflow: "scroll", height: 600 }}>
              <PDFReader url={path?.link} />
            </div>
          )}
          {path?.type === "file_image" && (
            <img
              src={path?.link || "/assets/media/default.jpg"}
              width={400}
              alt="ktp-modal"
            />
          )}
          {path?.type === "upload_document" &&
            (path.link.includes(".pdf") ? (
              <div style={{ overflow: "scroll", height: 600 }}>
                <PDFReader url={path?.link} />
              </div>
            ) : (
              <img
                src={path?.link || "/assets/media/default.jpg"}
                width={400}
                alt="ktp-modal"
              />
            ))}
        </Modal.Body>
        <Modal.Footer>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => window.open(path?.link, "_blank")}
          >
            Download
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default FileRegister;
