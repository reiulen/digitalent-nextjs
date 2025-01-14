import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import PageWrapper from "../../../wrapper/page.wrapper";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import useDraggable from "./useDraggable";
import { useDropzone } from "react-dropzone";
import { fetchOptionTtdAdmin, fetchTtdPartner } from "../../../../redux/actions/partnership/tandaTangan.actions";

const listStyle = {
  padding: "0",
  listStyle: "none",
};

const wrapperBox = {
  boxShadow: "inset 10px 10px 40px rgba(0, 0, 0, 0.08)",
  borderRadius: "10px",
  maxWidth: "80%",
  height: "max-content",
  padding: "2rem 0",
};

export default function PenandatanganVirtual({ token }) {
  const [ttdAdmin, setTtdAdmin] = useState("");
  const [tempTtdAdmin, setTempTtdAdmin] = useState("");

  const [ttdMitra, setTtdMitra] = useState("");
  const [tempTtdMitra, setTempTtdMitra] = useState("");

  // pertama set dulu terus show lewat btn sisipkan
  const choiceTtdAdmin = (e) => {
    setTempTtdAdmin(e.target.value);
  };
  const showTtd = () => {
    setTtdAdmin(tempTtdAdmin);
  };

  const choiceTtdMitra = (e) => {
    setTempTtdMitra(e.target.value);
  };
  const showTtdMitra = () => {
    setTtdMitra(tempTtdMitra);
  };

  const cardRef = useRef(null);
  useDraggable(cardRef);

  const cardRef2 = useRef(null);
  useDraggable(cardRef2);
  const router = useRouter();
  const dispatch = useDispatch();
  const allTandaTangan = useSelector((state) => state.allTandaTangan);
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
      <iframe className="w-100" style={{ border: "1px solid black", minHeight: "100vh" }} src={file.preview}></iframe>
    </div>
  ));

  useEffect(() => {
    dispatch(fetchOptionTtdAdmin(token));
    dispatch(fetchTtdPartner(token, router.query.id));
  }, [dispatch, router.query.id, token]);

  return (
    <PageWrapper>
      {/* <PDFtoIMG file={file}> */}
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3 className="card-title font-weight-bolder text-dark" style={{ fontSize: "24px" }}>
              Penandatangan Virtual
            </h3>
          </div>

          <div>
            <h1 className="fw-500 fz-20 text-center">Dokumen Kerjasama</h1>
            {/* start container sub */}
            <div style={wrapperBox} className="mx-auto border my-10 d-flex align-items-center justify-content-center">
              {images}
              {images.length === 0 ? (
                <div>
                  {/* btn upload */}
                  <div className="border px-5 py-8 d-flex flex-column align-items-center justify-content-center">
                    {/* icon */}
                    <Image src="/assets/icon/uploadDrag.svg" alt="upload" width="40" height="40" />

                    <div className="position-relative" {...getRootProps()}>
                      <input type="file" className="position-absolute w-100 h-100 cursor-pointer" style={{ zIndex: 1, opacity: "0" }} {...getInputProps()} />
                      <button className="fw-400 fz-16 btn label-dark mt-5" style={{ color: "#000000" }}>
                        Click or drag file to this area to upload
                      </button>
                    </div>

                    <p className="fw-400 fz-14 mb-0" style={{ color: "gray" }}>
                      Support for a single upload. Strictly prohibit from uploading
                    </p>
                    <p className="fw-400 fz-14" style={{ color: "gray" }}>
                      company data or other band files
                    </p>
                  </div>
                </div>
              ) : (
                ""
              )}
              {/* card ttd admin */}
              {ttdAdmin === "" ? (
                <div className="cardss d-none" ref={cardRef}>
                  <div className="image-card-1 d-none"></div>
                </div>
              ) : (
                <div className="cardss" style={{ border: "1px solid #b8b8b8" }} ref={cardRef}>
                  <div className="image-card-1">
                    <Image src={process.env.END_POINT_API_IMAGE_PARTNERSHIP + ttdAdmin} width={400} height={400} alt="logo" />
                  </div>
                </div>
              )}
              {/* end card ttd admin */}
              {/* card ttd mitra */}
              {ttdMitra === "" ? (
                <div className="cardss d-none" ref={cardRef2}>
                  <div className="image-card-1 d-none"></div>
                </div>
              ) : (
                <div className="cardss" style={{ border: "1px solid #b8b8b8" }} ref={cardRef2}>
                  <div className="image-card-1">
                    <Image src={process.env.END_POINT_API_IMAGE_PARTNERSHIP + ttdMitra} width={400} height={400} alt="logo" />
                  </div>
                </div>
              )}
              {/* end card ttd mitra */}
            </div>
            {/* end container sub */}

            <div className="mx-auto" style={{ maxWidth: "80%" }}>
              <ul style={listStyle}>
                <li>
                  <div className="d-flex aling-items-end justify-content-between">
                    <div className="form-group">
                      <label>Pihak 1 Admin</label>
                      <select className="form-control form-control-lg" onChange={(e) => choiceTtdAdmin(e)}>
                        <option>Pilih tanda tangan</option>
                        {allTandaTangan?.optionTtdAdmin.length === 0
                          ? ""
                          : allTandaTangan?.optionTtdAdmin?.data?.map((items, index) => {
                              return (
                                <option value={items?.signature_image} key={index}>
                                  {items?.name}
                                </option>
                              );
                            })}
                      </select>
                    </div>
                    <div className="d-flex align-items-center">
                      {ttdAdmin === "" ? (
                        ""
                      ) : (
                        <button className="btn btn-rounded-full bg-red-primary text-white mr-3" onClick={() => setTtdAdmin("")}>
                          Batalkan
                        </button>
                      )}

                      <button className="btn btn-rounded-full bg-green-primary text-white" onClick={() => showTtd()}>
                        Sisipkan
                      </button>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="d-flex aling-items-end justify-content-between">
                    <div className="form-group">
                      <label>Pihak 2 Mitra</label>

                      {allTandaTangan?.ttdPartner.length === 0 || allTandaTangan?.ttdPartner?.data?.length === 0 ? (
                        <p className="fw-700">Belom ada data ttd mitra !</p>
                      ) : (
                        <select className="form-control form-control-lg" onChange={(e) => choiceTtdMitra(e)}>
                          <option>Pilih tanda tangan</option>
                          {allTandaTangan?.ttdPartner?.data?.map((items, index) => {
                            return (
                              <option value={items?.signature_image} key={index}>
                                {items?.name}
                              </option>
                            );
                          })}
                        </select>
                      )}
                    </div>
                    <div className="d-flex align-items-center">
                      {ttdMitra === "" ? (
                        ""
                      ) : (
                        <button className="btn btn-rounded-full bg-red-primary text-white mr-3" onClick={() => setTtdMitra("")}>
                          Batalkan
                        </button>
                      )}

                      <button className="btn btn-rounded-full bg-green-primary text-white" onClick={() => showTtdMitra()}>
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
                <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">Kembali</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}
