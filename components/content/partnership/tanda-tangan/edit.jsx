import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import SignaturePad from "react-signature-pad-wrapper";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageWrapper from "../../../wrapper/page.wrapper";
import Image from 'next/image'

const EditTandaTangan = () => {
  const signCanvas = useRef({});
  const clear = () => {
    Swal.fire({
      title: "Apakah anda yakin ingin reset tanda tangan ?",
      // text: "Data ini tidak bisa dikembalikan !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      cancelButtonText: "Batal",
      confirmButtonText: "Ya !",
      dismissOnDestroy: false,
    }).then((result) => {
      if (result.isConfirmed) {
        signCanvas.current.clear();
        setSignature("");
      }
    });
  };
  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const router = useRouter();
  const [signature, setSignature] = useState("");

  const dataTandaTangan = () => {
    const data = signCanvas.current.toDataURL();
    if (!signature) {
      Swal.fire({
        icon: "success",
        title: "Tanda Tangan Berhasil di Buat",
        // text: "Berhasil",
      });
      setSignature(data);
    }
    if (signature) {
      Swal.fire({
        icon: "error",
        title: "Tanda Tangan Sudah dibuat",
        // text: "Berhasil",
      });
    }
  };

  const [isUpdate, setIsUpdate] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    if (signCanvas.current.isEmpty()) {
      Swal.fire({
        title: "Apakah anda yakin ingin simpan ?",
        // text: "Data ini tidak bisa dikembalikan !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Batal",
        confirmButtonText: "Ya !",
        dismissOnDestroy: false,
      }).then(async (result) => {
        if (result.value) {
          try {
            let sendData = {
              name: nama,
              position: jabatan,
              signature_image: signature !== "" ? signature : "",
            };
            let { data } = await axios.put(
              `${process.env.END_POINT_API_PARTNERSHIP}/api/signatures/${router.query.id}`,
              sendData
            );

            router.push({
              pathname: `/partnership/tanda-tangan`,
              query: { update: true },
            });
          } catch (error) {
            console.log("error put api ttd", error.response);
          }
        }
      });
    } else {
      if (signature !== "") {
        Swal.fire({
          title: "Apakah anda yakin ingin simpan ?",
          // text: "Data ini tidak bisa dikembalikan !",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          cancelButtonText: "Batal",
          confirmButtonText: "Ya !",
          dismissOnDestroy: false,
        }).then(async (result) => {
          if (result.value) {
            try {
              let sendData = {
                name: nama,
                position: jabatan,
                signature_image: signature !== "" ? signature : "",
              };
              let { data } = await axios.put(
                `${process.env.END_POINT_API_PARTNERSHIP}/api/signatures/${router.query.id}`,
                sendData
              );

              router.push({
                pathname: `/partnership/tanda-tangan`,
                query: { update: true },
              });
            } catch (error) {
              console.log("error put api ttd", error.response);
            }
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title:
            "Tekan button buat tanda tangan untuk menyimpat update tanda tangan anda",
        });
      }
    }
  };

  const imgSignature = process.env.END_POINT_API_IMAGE_PARTNERSHIP;
  const myLoader = ({ src }) => {
    return `${imgSignature}/partnership/images/signatures/${tandaTangan}`;
  };

  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [tandaTangan, setTandaTangan] = useState("");

  const setDataSingle = async (id) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP}/api/signatures/${id}`
      );

      setNama(data.data.name);
      setJabatan(data.data.position);
      setTandaTangan(data.data.signature_image);
    } catch (error) {
      console.log("error get single");
    }
  };

  useEffect(() => {
    setDataSingle(router.query.id);
  }, [router.query.id]);

  return (
    <PageWrapper>
      <div className="col-lg-12 col-xxl-12 order-1 order-xxl-2 px-0">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header border-0">
            <h3
              className="card-title font-weight-bolder text-dark"
              style={{ fontSize: "24px" }}
            >
              Edit Tanda Tangan Digital
            </h3>
          </div>
          <div className="card-body">
            <form>
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Nama
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  placeholder="Masukkan Nama"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label
                  htmlFor="staticEmail"
                  className="col-sm-2 col-form-label"
                >
                  Jabatan
                </label>
                <input
                  required
                  type="text"
                  className="form-control"
                  placeholder="Masukkan Jabatan"
                  value={jabatan}
                  onChange={(e) => setJabatan(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Buat Tanda Tangan
                </label>
                <div className="row">
                  <div className="col-sm-2 ">
                    <Image
                      loader={myLoader}
                      src={`${imgSignature}/partnership/images/signatures/${tandaTangan}`}
                      width={500}
                      height={500}
                      alt="imageSignature"
                    />
                  </div>
                  <div className="col-sm-12">
                    <div
                      style={{
                        background: "#FFFFFF",
                        boxShadow: "inset 10px 10px 40px rgba(0, 0, 0, 0.08)",
                        borderRadius: "10px",
                      }}
                    >
                      <SignaturePad
                        ref={signCanvas}
                        options={{
                          minWidth: 1,
                          maxWidth: 3,
                          penColor: "rgb(66, 133, 244)",
                        }}
                        onBlur={() =>
                          simpleValidator.current.showMessageFor("tandaTangan")
                        }
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center mt-5">
                    <a
                      className="btn btn-sm btn-rounded-full text-blue-primary border-primary text-blue-primary mr-5"
                      onClick={() => dataTandaTangan()}
                    >
                      Buat Tanda Tangan Baru
                    </a>
                    {/* </Link> */}
                    <button
                      type="button"
                      onClick={clear}
                      className="btn btn-sm btn-rounded-full bg-yellow-primary text-white"
                    >
                      Buat Ulang Tanda Tangan
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/partnership/tanda-tangan">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary">
                      Kembali
                    </a>
                  </Link>
                  <button
                    type="button"
                    className="btn btn-sm btn-rounded-full bg-blue-primary text-white"
                    onClick={(e) => submit(e)}
                  >
                    Simpan
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default EditTandaTangan;
