import { Router, useRouter } from "next/router";
import Image from "next/image";

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="success-register-page bg-white px-10 pt-10">
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
            }}
          >
            Akun Anda dapat digunakan pada 3 platform
          </p>
          <div className="mt-4">
            <Image
              src="/assets/icon/mainlogo.svg"
              width={155}
              height={137}
              objectFit="fill"
              alt="image-404"
            />
            <Image
              src="/assets/media/logo-simonas.svg"
              width={155}
              height={137}
              objectFit="fill"
              alt="image-404"
            />
            <Image
              src="/assets/media/mitra-icon/bg-beasiswa-2.svg"
              width={155}
              height={137}
              objectFit="fill"
              alt="image-404"
            />
          </div>
            <button
              className="btn btn-primary rounded-xl font-weight-bolder text-center my-7"
              onClick={() => router.push("/login")}
              style={{
                width: "20%"
              }}
            >
              Masuk
            </button>
        </div>
    </div>
  );
}
