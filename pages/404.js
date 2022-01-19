import { Router, useRouter } from "next/router";
import Image from "next/image";

export default function Custom404() {
  const router = useRouter();

  return (
    <div className="not-found-page">
      <div className="center-absolute">
        <Image
          src="/assets/media/image-404.png"
          width={700}
          height={500}
          objectFit="cover"
          alt="image-404"
        />
        <div className="text-center">
          <h1 className="font-weight-bolder">404:Not Found</h1>
          <button
            className="btn btn-primary rounded-xl font-weight-bolder text-center mt-2"
            onClick={() => router.back()}
          >
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
