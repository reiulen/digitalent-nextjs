import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import AuthWrapper from "../../../wrapper/auth.wrapper";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import SimpleReactValidator from "simple-react-validator";
import { SweatAlert } from "../../../../utils/middleware/helper";
import axios from "axios";
import LoadingTable from "../../../LoadingTable";

const ForgotPassword = () => {
  const router = useRouter();

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));

  const [emailCode, setEmailCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [, forceUpdate] = useState();
  const [success, setSuccess] = useState(false);
  const [count, setCount] = useState(1);

  const submit = async (e) => {
    e.preventDefault();
    if (simpleValidator.current.allValid()) {
      Swal.fire({
        title: "Apakah anda yakin ?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        cancelButtonText: "Batal",
        confirmButtonText: "Ya !",
        dismissOnDestroy: false,
      }).then(async (result) => {
        if (result.value) {
          setLoading(true);
          const data = {
            email: emailCode,
          };
          await axios
            .post(
              process.env.END_POINT_API_PELATIHAN +
                "api/v1/auth/request-forgot-password",
              data
            )
            .then((res) => {
              setLoading(false);
              setCount(count + 1);
              setSuccess(true);
              console.log(res);
            })
            .catch((err) => {
              setLoading(false);
              SweatAlert("Gagal", err.response.data.message, "error");
              console.log(err.response);
            });
        }
      });
    } else {
      setLoading(false);
      simpleValidator.current.showMessages();
      forceUpdate(1);
      SweatAlert("Gagal", "Email Tidak Boleh Kosong", "error");
    }
  };

  return (
    <>
      <AuthWrapper image="bg-user-2.png" title="Reset Password">
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
              <form onSubmit={submit}>
                <div className="form-group mb-2">
                  <label className="form-auth-label">E-mail Pemulihan</label>
                  <div className="position-relative">
                    <input
                      id="input-password"
                      onChange={(e) => setEmailCode(e.target.value)}
                      type="email"
                      className="form-control form-control-auth"
                      placeholder="Masukan email anda"
                      onBlur={() =>
                        simpleValidator.current.showMessageFor("Email")
                      }
                    />
                    {simpleValidator.current.message(
                      "Email",
                      emailCode,
                      "required|email",
                      {
                        className: "text-danger",
                      }
                    )}
                  </div>
                </div>
                {loading ? (
                  <div className="mt-5">
                    <LoadingTable loading={loading} />
                  </div>
                ) : (
                  <>
                    <button
                      type="submit"
                      className="btn btn-primary-rounded-full bg-secondary btn-block mt-5"
                    >
                      Kirim E-mail
                    </button>

                    <div className="mt-10 fz-16">
                      {success && (
                        <center>
                          {count === 2 && (
                            <p
                              className="mt-3 "
                              style={{ fontSize: "16px", color: "#fff" }}
                            >
                              Sukses Mengirim Email, Silahkan Cek Email Anda !
                            </p>
                          )}
                        </center>
                      )}
                      <p className="text-white text-center">
                        Belum menerima e-mail?
                        <span>
                          <Link href="/">
                            <a className="ml-3" style={{ color: "#4CBDE2" }}>
                              Kirim Ulang
                            </a>
                          </Link>
                        </span>
                      </p>
                    </div>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </AuthWrapper>
    </>
  );
};

export default ForgotPassword;
