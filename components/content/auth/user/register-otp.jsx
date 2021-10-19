import React, { useState, useRef, useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import SimpleReactValidator from "simple-react-validator";
import axios from "axios";
import Swal from "sweetalert2";

import AuthWrapper from "../../../wrapper/auth.wrapper";
import LoadingTable from "../../../LoadingTable";

const RegisterUser = () => {
  const router = useRouter();

  const simpleValidator = useRef(new SimpleReactValidator({ locale: "id" }));
  const { email, services } = router.query;

  const [token, setToken] = useState("");
  const [count, setCount] = useState(60);
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);

  const [loading, setLoading] = useState(false);
  const [, forceUpdate] = useState();

  useEffect(() => {
    if (count >= 0) {
      const secondsLeft = setInterval(() => {
        setCount((c) => c - 1);
        let timeLeftVar = secondsToTime(count);
        setHour(timeLeftVar.h);
        setMinute(timeLeftVar.m);
        setSecond(timeLeftVar.s);
      }, 1000);
      return () => clearInterval(secondsLeft);
    } else {
      console.log("time out");
    }
  }, [count]);

  const secondsToTime = (secs) => {
    var hours = Math.floor(secs / (60 * 60));
    var divisor_for_minutes = secs % (60 * 60);
    var minutes = Math.floor(divisor_for_minutes / 60);
    var divisor_for_seconds = divisor_for_minutes % 60;
    var seconds = Math.ceil(divisor_for_seconds);
    return {
      h: hours,
      m: minutes,
      s: seconds,
    };
  };

  const handleResend = () => {
    const data = {
      email,
      services,
    };
    axios
      .post(
        process.env.END_POINT_API_PELATIHAN + `api/v1/auth/request-ulang-token`,
        data
      )
      .then((res) => {
        if (res.data.status) {
          setCount(60);
        }
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handlerSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (simpleValidator.current.allValid()) {
      const data = {
        email,
        token,
      };

      axios
        .post(
          process.env.END_POINT_API_PELATIHAN +
            `api/v1/auth/request-verifikasi`,
          data
        )
        .then((res) => {
          setLoading(false);
          if (res.data.status) {
            setLoading(false);
            Swal.fire({
              icon: "success",
              html:
                '<h3 style="white-space: nowrap"><b>Selamat,akun Anda Terdaftar!</b></h3>' +
                '<p style="margin-bottom:10px">1 akun Kamu Terintegrasi Dengan 3 Platform </p>' +
                '<img  src="/assets/icon/mainlogo.svg" />' +
                '<img height="70" width="125" style="margin-left:20px;margin-right:20px"  src="/assets/media/logo-simonas.svg" />' +
                '<img height="68" width="68"  src="/assets/media/mitra-icon/bg-beasiswa-2.svg" />',
              showCloseButton: false,
              showCancelButton: false,
              showConfirmButton: false,
              focusConfirm: false,
            }).then((result) => {
              router.push({
                pathname: "/login",
              });
            });
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error(err.response.data.message);
        });
    } else {
      setLoading(false);
      simpleValidator.current.showMessages();
      forceUpdate(1);
    }
  };

  return (
    <>
      <AuthWrapper image="bg-user-2.png" title="Register">
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
                Daftar Baru
              </h3>
            </div>

            <div
              className="title-form col-lg-6 p-0 mx-auto"
              style={{ marginTop: "30px" }}
            >
              <form onSubmit={handlerSubmit}>
                <div className="form-group mb-2">
                  <label className="form-auth-label">OTP</label>
                  <input
                    type="text"
                    className="form-control form-control-auth"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="Masukkan OTP Disini"
                    onBlur={() => simpleValidator.current.showMessageFor("otp")}
                  />
                  {simpleValidator.current.message("otp", token, "required", {
                    className: "text-danger",
                  })}
                </div>

                {loading ? (
                  <div className="mt-5">
                    <LoadingTable loading={loading} />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="btn btn-primary-rounded-full bg-secondary btn-block mt-5"
                  >
                    Daftar
                  </button>
                )}
              </form>
              <div className="bottom mt-9 text-center mb-7">
                <p style={{ fontSize: "12px", color: "#ffffff" }}>
                  Sisa waktu OTP :
                  <span
                    className={`${
                      second <= 5 && minute <= 0
                        ? "text-danger"
                        : "text-primary"
                    } ml-2`}
                  >
                    {minute < 9 ? "0" + minute : minute} :{" "}
                    {second < 9 ? "0" + second : second}
                  </span>
                </p>

                {count < 1 && (
                  <p
                    style={{ fontSize: "12px", cursor: "pointer" }}
                    className="text-warning"
                    onClick={() => handleResend()}
                  >
                    Kirim Ulang Kode OTP
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </AuthWrapper>
    </>
  );
};

export default RegisterUser;
