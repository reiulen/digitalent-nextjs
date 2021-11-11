import { Router, useRouter } from "next/router";
import Image from "next/image";

export default function Custom500() {
  const router = useRouter();

  return (
    <div className="not-found-page">
      <div className="center-absolute">
        <Image
          src="/assets/media/image-500.png"
          width={700}
          height={500}
          objectFit="cover"
          alt="image-500"
        />
        <div className="text-center">
          <h1 className="font-weight-bolder">500:Internal Server Error</h1>
        </div>
      </div>
    </div>
  );
}
