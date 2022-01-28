import { Router, useRouter } from "next/router";
import Image from "next/image";

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="success-register-page bg-white pt-10">
      <div className="d-flex justify-content-center">
        <Image
          src="/assets/media/Success-register.png"
          width={320}
          height={335}
          objectFit="fill"
          alt="image-404"
        />
      </div>
      <div className="text-center mt-10">
        <h2
          className="font-weight-bolder"
          style={{
            fontWeight: "700 !important",
            fontSize: "40px",
          }}
        >
          Selamat, akun Anda Terdaftar!
        </h2>
        <p
          className="text-gray"
          style={{
            marginTop: "24px",
            fontSize: "20px",
            fontWeight: "500",
            marginBottom: "60px",
          }}
        >
          Akun Anda dapat digunakan pada 3 platform
        </p>
        <div className="mt-4">
          <div className="row">
            <div
              className="col-md-4"
              style={{
                backgroundColor: "#007CFF",
                paddingTop: "153px",
                paddingBottom: "103px",
              }}
            >
              <Image
                src="/assets/logo/logodts.png"
                width={120}
                height={120}
                objectFit="fill"
                alt="image-404"
              />
              <h3
                style={{
                  fontWeight: "bolder",
                  fontSize: "20px",
                  color: "white",
                  marginTop: "20px",
                }}
              >
                Digital Talent Scholarship
              </h3>
              <button
                className="btn btn-primary rounded-full font-weight-bolder text-center my-7"
                onClick={() => router.push("/login")}
                style={{
                  width: "50%",
                  backgroundColor: "white",
                  color: "#007CFF",
                  marginTop: "53px",
                  marginBottom: "53px",
                }}
              >
                Masuk
              </button>
            </div>
            <div
              className="col-md-4"
              style={{
                backgroundColor: "#0D285F",
                paddingTop: "153px",
                paddingBottom: "103px",
              }}
            >
              <Image
                src="/assets/logo/logobeasiswa.png"
                width={120}
                height={120}
                objectFit="fill"
                alt="image-404"
              />
              <h3
                style={{
                  fontWeight: "bolder",
                  fontSize: "20px",
                  color: "white",
                  marginTop: "20px",
                }}
              >
                Beasiswa Kominfo
              </h3>
              <button
                className="btn btn-primary rounded-full font-weight-bolder text-center my-7"
                onClick={() =>
                  (window.location = "https://beasiswa-dev.majapahit.id/login")
                }
                style={{
                  width: "50%",
                  backgroundColor: "white",
                  color: "#0D285F",
                  marginTop: "53px",
                  marginBottom: "53px",
                }}
              >
                Masuk
              </button>
            </div>
            <div
              className="col-md-4"
              style={{
                backgroundColor: "#24A1DA",
                paddingTop: "153px",
                paddingBottom: "103px",
              }}
            >
              <Image
                src="/assets/logo/logosimonas1.png"
                width={120}
                height={120}
                objectFit="fill"
                alt="image-404"
              />
              <h3
                style={{
                  fontWeight: "bolder",
                  fontSize: "20px",
                  color: "white",
                  marginTop: "20px",
                }}
              >
                SIMONAS
              </h3>
              <button
                className="btn btn-primary rounded-full font-weight-bolder text-center my-7"
                onClick={() => (window.location = PATH_SIMONAS + "/login")}
                style={{
                  width: "50%",
                  backgroundColor: "white",
                  color: "#24A1DA",
                  marginTop: "53px",
                  marginBottom: "53px",
                }}
              >
                Masuk
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
