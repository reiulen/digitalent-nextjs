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
import PageWrapper from "../../../../wrapper/page.wrapper";
import Image from 'next/image'

const EditTandaTangan = ({token}) => {
  const signCanvas = useRef({});

  const [nama, setNama] = useState("");
  const [jabatan, setJabatan] = useState("");
  const [tandaTangan, setTandaTangan] = useState("");

  const [error, setError] = useState({
    nama: "",
    jabatan: "",
    tandaTangan: "",
  });
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

  const submit =  (e) => {
    e.preventDefault();

    if (nama === "") {
      setError({ ...error, nama: "Harus isi nama" });
   
    } else if (jabatan === "") {
      setError({ ...error, jabatan: "Harus isi jabatan" });
  
    } 
   
    
    else if (signCanvas.current.isEmpty()){

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
              _method:"PUT",
              name: nama,
              position: jabatan,
              signature_image: signature !== "" ? signature : "",
            };
            let { data } = await axios.post(
              `${process.env.END_POINT_API_PARTNERSHIP_MITRA}api/signatures/${router.query.id}`,
              sendData,
              {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
            );

            router.push({
              pathname: `/partnership/tanda-tangan`,
              query: { update: true },
            });
            console.log("asjnaskjnsajk asjknsajknsajk")
          } catch (error) {
            notify(error.response.data.message);
            console.log("errorrrrrrrr wswdwwdwd")
          }
        }
      });


    }

     else {
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
                _method:"PUT",
                name: nama,
                position: jabatan,
                signature_image: signature !== "" ? signature : "",
              };
              let { data } = await axios.post(
                `${process.env.END_POINT_API_PARTNERSHIP_MITRA}api/signatures/${router.query.id}`,
                sendData,
                {
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
              );

              router.push({
                pathname: `/partnership/user/tanda-tangan-digital`,
                query: { update: true },
              });
              console.log("asjnaskjnsajk asjknsajknsajk mnnmnmnm")
            } catch (error) {
              
              notify(error.response.data.message);
              console.log("errorrrrrrrr")
            }
          }
        });
      } else {
        console.log("asjnaskjnsajk bbbbbbbbbb")
        Swal.fire({
          icon: "error",
          title:
            "Tekan button buat tanda tangan untuk menyimpat update tanda tangan anda",
        });
      }
    }





  };

 

  

  useEffect(() => {
    async function setDataSingle(id) {
      try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_PARTNERSHIP_MITRA}api/signatures/${id}`,{
                headers: {
                  authorization: `Bearer ${token}`,
                },
              }
      );

      setNama(data.data.name);
      setJabatan(data.data.position);
      setTandaTangan(data.data.signature_image);
    } catch (error) {
      notify(error.response.data.message);
    }
      
    }
    setDataSingle(router.query.id);
  }, [router.query.id,token]);

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
              Ubah Tanda Tangan Digital
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
                  onFocus={() => setError({ ...error, nama: "" })}
                  type="text"
                  className="form-control"
                  placeholder="Masukkan Nama"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                />
                {error.nama ? <p className="error-text">{error.nama}</p> : ""}
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
                  onFocus={() => setError({ ...error, jabatan: "" })}
                  type="text"
                  className="form-control"
                  placeholder="Masukkan Jabatan"
                  value={jabatan}
                  
                  onChange={(e) => setJabatan(e.target.value)}
                />
                 {error.jabatan ? (
                  <p className="error-text">{error.jabatan}</p>
                ) : (
                  ""
                )}
              </div>
              <div className="form-group">
                <label htmlFor="staticEmail" className="col-form-label">
                  Buat Tanda Tangan
                </label>
                <div className="row">
                  <div className="col-sm-2 ">
                    <div className="border my-3">
                  {!tandaTangan ? "":
                      <Image
                        unoptimized={process.env.ENVIRONMENT !== "PRODUCTION"}
                        src={
                          process.env.END_POINT_API_IMAGE_PARTNERSHIP +
                          tandaTangan
                        }
                        width={400}
                        height={400}
                        alt="logo"
                      />
                      }</div>
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
                  <div className="d-flex flex-wrap align-items-center">
                    <a
                      className="btn btn-sm btn-rounded-full text-blue-primary border-primary text-blue-primary mr-5 mt-5"
                      onClick={() => dataTandaTangan()}
                    >
                      Buat Tanda Tangan Baru
                    </a>
                    {/* </Link> */}
                    <button
                      type="button"
                      onClick={clear}
                      className="btn btn-sm btn-rounded-full bg-yellow-primary text-white mt-5"
                    >
                      Buat Ulang Tanda Tangan
                    </button>
                  </div>
                </div>
              </div>

              <div className="form-group row">
                <div className="col-sm-12 d-flex justify-content-end">
                  <Link href="/partnership/user/tanda-tangan-digital">
                    <a className="btn btn-sm btn-white btn-rounded-full text-blue-primary mr-5">
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
