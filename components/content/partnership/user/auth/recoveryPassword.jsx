import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import AuthWrapper from "../../../../wrapper/auth.wrapper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { vericationEmail } from "../../../../../redux/actions/partnership/user/authentication.actions";
import { RESET_STATUS } from "../../../../../redux/types/partnership/user/authentication.type";
const RegisterMitra = () => {
  const router = useRouter();
  let dispatch = useDispatch();
  const allAuthentication = useSelector((state) => state.allAuthentication);
  const [email, setEmail] = useState("");

  const [error, setError] = useState({
    email: "",
  });

  const notify = (value) =>
    toast.info(`${value}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const submit = (e) => {
    e.preventDefault();
    if (email === "") {
      setError({ ...error, email: "Email tidak boleh kosong" });
      notify("Email tidak boleh kosong");
    } else {
      Swal.fire({
        title: "Apakah anda yakin ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Batal",
        confirmButtonText: "Ya !",
        dismissOnDestroy: false,
      }).then((result) => {
        if (result.value) {
          let formData = new FormData();
          formData.append("email", email);
          dispatch(vericationEmail(formData));
        }
      });
    }
  };

  useEffect(() => {
    if (allAuthentication.status === "error") {
      notify(allAuthentication.errorRegister);
    } else if (allAuthentication.status === "success"){
      // jika sukses
      Swal.fire("Berhasil", "Link reset password telah dikirm, silahkan cek email anda", "success")
    }else{
      ""
    }
    return () => {
      dispatch({
        type:RESET_STATUS
      })
    }

  }, [allAuthentication.status, allAuthentication.errorRegister,dispatch,router]);

  return (
    <>
      <AuthWrapper image="multiethnic-businesswoman.svg" title="Register">
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
        <div
          className="col-lg-7 d-flex flex-wrap align-content-center"
          style={{ background: "#1A4367" }}
        >
          {/* Email pemulihan */}
          <div className="container ">
            <div className="title-login text-center mt-6">
              <Image
                src="/assets/logo/logo-6.svg"
                width={246}
                height={96}
                alt="Logo-5"
              />

              <h3
                className="align-middle mt-8"
                style={{
                  fontSize: "32px",
                  color: "#ffffff",
                  fontWeight: "700",
                  fontFamily: "Rubik",
                  lineHeight: "38px",
                }}
              >
                Atur Ulang Password Mitra
              </h3>
            </div>

            <div
              className="title-form col-lg-6 p-0 mx-auto"
              style={{ marginTop: "30px" }}
            >
              <form onSubmit={submit}>
                <div className="form-group mb-2">
                  <label className="form-auth-label">E-mail Pemulihan</label>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                    value={email}
                    className="form-control form-control-auth"
                    placeholder="Masukkan Email Anda"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary-rounded-full bg-secondary btn-block mt-5"
                >
                  Kirim E-mail
                </button>
              
              <div className="bottom mt-9 text-center">
                <p style={{ fontSize: "12px", color: "#ffffff" }}>
                  Belum menerima e-mail?



                  {/* <Link href="/partnership/user/auth/login" passHref> */}
                  <button
                  type="submit"
                  className="text-primary ml-2 bg-transparent btn"
                >
                  Kirim E-mail
                </button>

                    {/* <a className="text-primary ml-2">Kirim Ulang</a> */}

                  {/* </Link> */}
                </p>
              </div>

              </form>


            </div>
          </div>
        </div>
      </AuthWrapper>
    </>
  );
};

export default RegisterMitra;
