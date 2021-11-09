import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import AuthWrapper from "../../../wrapper/auth.wrapper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import { resetPassword } from "../../../../redux/actions/partnership/user/authentication.actions";
import { RESET_STATUS } from "../../../../redux/types/partnership/user/authentication.type";

const ForgotPassword = () => {
  const router = useRouter();
  let dispatch = useDispatch();
  const allAuthentication = useSelector((state) => state.allAuthentication);
  const [emailCode, setEmailCode] = useState("");

  const [error, setError] = useState({
    emailCode: "",
  });

  

  // const submit = (e) => {
  //   e.preventDefault();
  //   if (emailCode === "") {
  //     setError({
  //       ...error,
  //       newPassword: "Email tidak boleh kosong",
  //     });
  //   } 
  //   else {
  //     Swal.fire({
  //       title: "Apakah anda yakin ?",
  //       icon: "warning",
  //       showCancelButton: true,
  //       confirmButtonColor: "#3085d6",
  //       cancelButtonColor: "#d33",
  //       cancelButtonText: "Batal",
  //       confirmButtonText: "Ya !",
  //       dismissOnDestroy: false,
  //     }).then(async (result) => {
  //       if (result.value) {
  //         // here axios action reset password
  //         let formData = new FormData();
  //         formData.append("_method", "put");
  //         formData.append("email", emailCode);
  //         dispatch(resetPassword(formData));
  //       }
  //     });
  //   }
  // };

  // const notify = (value) =>
  //   toast.info(`${value}`, {
  //     position: "top-right",
  //     autoClose: 5000,
  //     hideProgressBar: false,
  //     closeOnClick: true,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //   });

  // useEffect(() => {
  //   if (router.query.code && router.query.email) {
  //     setEmailCode(router.query.email);
  //     setPasswordCode(router.query.code);
  //   }
  //   if (allAuthentication.status === "error") {
  //     notify(allAuthentication.errorReset);
  //   } else if (allAuthentication.status === "success") {
  //     Swal.fire("Berhasil", "Password berhasil di reset", "success").then(
  //       () => {
  //         router.push("/login/mitra");
  //       }
  //     );
  //   } else {
  //     ("");
  //   }
  //   return () => {
  //     dispatch({
  //       type: RESET_STATUS,
  //     });
  //   };
  // }, [
  //   router.query.code,
  //   router.query.email,
  //   router,
  //   allAuthentication.status,
  //   allAuthentication.errorReset,
  //   dispatch,
  // ]);
  return (
    <>
      <AuthWrapper bgOpacity={<div className="bg-gradient-opacity">
        <div className="icon-digital-talentss">
          <Image src="/assets/media/forgot-bg-icon.png" alt="iconss" layout="fill" objectFit="cover"  />
      </div>

      </div>} image="bg-forgot-user.png" title="Reset Password">
        {/* <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        /> */}
        <div
          className="col-lg-7 d-flex flex-wrap align-content-center"
          style={{ background: "#0063CC" }}
        >
          <div className="container ">
            <div className="title-login text-center mt-6">
              <Image
                src="/assets/logo/logo-6.svg"
                width={320}
                height={124}
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
                Atur Ulang Password
              </h3>
            </div>

            <div
              className="title-form col-lg-6 p-0 mx-auto"
              style={{ marginTop: "30px" }}
            >
              <form>
                <div className="form-group mb-2">
                  <label className="form-auth-label">E-mail Pemulihan</label>
                  <div className="position-relative">
                  <input
                    id="input-password"
                    // onChange={(e) => setNewPassword(e.target.value)}
                    type="email"
                    className="form-control form-control-auth"
                    placeholder="Masukan email anda"
                    />
                  </div>
                  
                </div>

                <button
                  type="submit"
                  className="btn btn-primary-rounded-full bg-secondary btn-block mt-5"
                >
                  Kirim E-mail
                </button>
                <div className="mt-10 fz-16">
                  <p className="text-white text-center">Belum menerima e-mail?<span>
                    <Link href="/">
                    <a className="ml-3" style={{color:"#4CBDE2"}}>
                      Kirim Ulang
                    </a>
                    </Link>
                    </span></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </AuthWrapper>
    </>
  );
};

export default ForgotPassword;
