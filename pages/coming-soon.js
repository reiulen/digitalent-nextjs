import { Router, useRouter } from "next/router";
import Image from "next/image";

export default function CustomComingSoon() {
  const router = useRouter();

  return (
    <div className="not-found-page">
      <div>
        <div className="d-flex justify-content-center">
          <Image
            src="/assets/media/mainlogo.svg"
            width={100}
            height={100}
            objectFit="contain"
            className="h-100"
            alt="image-500"
          />
          <Image
            src="/assets/media/logo-kominfo.svg"
            width={70}
            height={70}
            objectFit="contain"
            className="h-100"
            alt="image-500"
          />
        </div>
        <div className="d-flex justify-content-center">
          <Image
            src="/assets/media/coming-soon.svg"
            width={700}
            height={500}
            objectFit="contain"
            alt="image-500"
          />
          <div className="position-absolute top-0">
            <Image
              src="/assets/media/coming-soon-logo.svg"
              width={500}
              height={500}
              objectFit="contain"
              alt="image-500"
            />
          </div>
        </div>

        <div className="text-center">
          <p>Copyright © 2021 | Kementerian Komunikasi dan Informatika</p>
        </div>
      </div>
    </div>
  );
}
