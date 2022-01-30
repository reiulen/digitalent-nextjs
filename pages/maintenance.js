import { Router, useRouter } from "next/router";
import Image from "next/image";

export default function Custom500() {
  const router = useRouter();

  return (
    <div className="not-found-page">
      <div className="center-absolute">
        <div className="d-flex justify-content-center">
          <Image
            src="/assets/media/mainlogo.svg"
            width={100}
            height={100}
            objectFit="contain"
            alt="image-500"
          />
        </div>

        <Image
          src="/assets/media/maintenance.svg"
          width={700}
          height={500}
          objectFit="contain"
          alt="image-500"
        />
        <div className="text-center">
          <h1 className="font-weight-bolder">SITUS DALAM PEMELIHARAAN</h1>
          <p className="font-weight-bolder">
            Mohon akses kembali beberapa saat lagi
          </p>
        </div>
      </div>
    </div>
  );
}
