import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Pagination from "react-js-pagination";
import PageWrapper from "../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import LoadingTable from "../../../LoadingTable";
import Image from "next/image";
import useDraggable from "./useDraggable";
import { useDropzone } from "react-dropzone";
import {
  fetchOptionTtdAdmin,
  fetchTtdPartner,
} from "../../../../redux/actions/partnership/tandaTangan.actions";

const listStyle = {
  padding: "0",
  listStyle: "none",
};

const wrapperBox = {
  boxShadow: "inset 10px 10px 40px rgba(0, 0, 0, 0.08)",
  borderRadius: "10px",
  maxWidth: "80%",
  height: "max-content",
  padding:"2rem 0"
};

const DraggableCard = () => {
  const cardRef = useRef(null);
  useDraggable(cardRef);

  return <div className="cardss" ref={cardRef}></div>;
};

const choiceTtdAdmin = (e) => {
  console.log(e.target.value);
};

export default function PenandatanganVirtual() {
  const cardRef = useRef(null);
  useDraggable(cardRef);
  const router = useRouter();
  const dispatch = useDispatch();
  const allTandaTangan = useSelector((state) => state.allTandaTangan);
  console.log("allTandaTangan dd",allTandaTangan.ttdPartner)
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: ".pdf",
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

  const images = files.map((file) => (
    <div className="h-100 w-100" key={file.name}>
      {/* <img src={file.preview} className="w-100 h-100" alt="preview" /> */}
      <iframe
      className="w-100"
        style={{ border: "1px solid black",minHeight:"100vh" }}
        src={file.preview}
        // frameBorder="0"
        // scrolling="auto"
        // height={file.preview ? "500px" : ""}
        // width="100%"
      ></iframe>
    </div>
  ));

  useEffect(() => {
    dispatch(fetchOptionTtdAdmin());
    dispatch(fetchTtdPartner(router.query.id));
  }, [dispatch, router.query.id]);

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
              Penandatangan Virtual
            </h3>
          </div>

          <div>
            <h1 className="fw-500 fz-20 text-center">Dokumen Kerjasama</h1>
            {/* start container sub */}
            <div
              style={wrapperBox}
              className="mx-auto border my-10 d-flex align-items-center justify-content-center"
            >
              {images}
              {/* card ttd */}
              <div className="cardss" ref={cardRef}>
                {(allTandaTangan.ttdPartner.length === 0) || (allTandaTangan.ttdPartner.data.length === 0)  ? (
                  ""
                ) : (
                  <div className="image-card-1">
                    <Image
                      src={
                        process.env.END_POINT_API_IMAGE_PARTNERSHIP +
                        "partnership/images/signatures/" +
                        allTandaTangan.ttdPartner.data[0].signature_image
                      }
                      width={400}
                      height={400}
                      alt="logo"
                    />
                  </div>
                  
                )}
              </div>
              {images.length === 0 ? 
              <div>
                {/* btn upload */}

                <div className="border px-5 py-8 d-flex flex-column align-items-center justify-content-center">
                  {/* icon */}
                  <Image
                    src="/assets/icon/uploadDrag.svg"
                    alt="upload"
                    width="40"
                    height="40"
                  />

                  <div className="position-relative" {...getRootProps()}>
                    <input
                      type="file"
                      className="position-absolute w-100 h-100 cursor-pointer"
                      style={{ zIndex: 1, opacity: "0" }}
                      {...getInputProps()}
                    />
                    <button
                      className="fw-400 fz-16 btn label-dark mt-5"
                      style={{ color: "#000000" }}
                    >
                      Click or drag file to this area to upload
                    </button>
                  </div>

                  <p className="fw-400 fz-14 mb-0" style={{ color: "gray" }}>
                    Support for a single upload. Strictly prohibit from
                    uploading
                  </p>
                  <p className="fw-400 fz-14" style={{ color: "gray" }}>
                    company data or other band files
                  </p>
                </div>
              </div>
           :""}
           </div>
            {/* end container sub */}

            <div className="mx-auto" style={{ maxWidth: "80%" }}>
              <ul style={listStyle}>
                <li>
                  <div className="d-flex aling-items-end justify-content-between">
                    <div className="form-group">
                      <label>Pihak 1 Admin</label>
                      {/* <input
                        type="email"
                        className="form-control form-control-lg"
                        placeholder="Nanang Ismail"
                      /> */}
                      <select
                        className="form-control form-control-lg"
                        onChange={(e) => choiceTtdAdmin(e)}
                      >
                        {allTandaTangan.optionTtdAdmin.length === 0
                          ? ""
                          : allTandaTangan.optionTtdAdmin.data.map(
                              (items, index) => {
                                return (
                                  <option
                                    value={items.signature_image}
                                    key={index}
                                  >
                                    {items.name}
                                  </option>
                                );
                              }
                            )}
                      </select>
                    </div>
                    <div className="d-flex align-items-center">
                      <button className="btn btn-rounded-full bg-red-primary text-white mr-3">
                        Batalkan
                      </button>
                      <button className="btn btn-rounded-full bg-green-primary text-white">
                        Sisipkan
                      </button>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex aling-items-end justify-content-between">
                    <div className="form-group">
                      <label>Pihak 1 Mitra</label>

                      {(allTandaTangan.ttdPartner.length === 0) || (allTandaTangan.ttdPartner.data.length === 0) ? <p className="fw-700">Belom ada data ttd mitra !</p> :
                      
                      <input
                        readOnly
                        value={allTandaTangan.ttdPartner.data[0].name
                        }
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Nanang Ismail"
                      />
                      }
                    </div>
                    <div className="d-flex align-items-center">
                      <button className="btn btn-rounded-full bg-red-primary text-white mr-3">
                        Batalkan
                      </button>
                      <button className="btn btn-rounded-full bg-green-primary text-white">
                        Sisipkan
                      </button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="form-group row mt-10">
            <div className="col-sm-12 d-flex justify-content-end">
              <Link href="/partnership/kerjasama">
                <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
                  Kembali
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
