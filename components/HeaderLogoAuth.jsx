import React from "react";
import Image from "next/image";
import Link from "next/link";

const HeaderLogoAuth = ({ type = "" }) => {
  return (
    <div className="d-flex justify-content-center">
      <div className="mx-2" style={{ cursor: "pointer" }}>
        <Link
          href={`https://dts-dev.majapahit.id${
            type === "register" ? "/register" : "/login"
          }`}
          passHref
        >
          <Image
            src="/assets/logo/platform/dts.svg"
            width={100}
            height={80}
            alt="Logo-5"
          />
        </Link>
      </div>
      <div className="mx-2" style={{ cursor: "pointer" }}>
        <Link
          href={`http://simonas-dev.majapahit.id${
            type === "register" ? "/register" : "/login"
          }`}
          passHref
        >
          <Image
            src="/assets/logo/platform/simonas.svg"
            width={100}
            height={80}
            alt="Logo-5"
          />
        </Link>
      </div>
      <div className="mx-2" style={{ cursor: "pointer" }}>
        <Link
          href={`https://beasiswa-dev.majapahit.id${
            type === "register" ? "/register" : "/login"
          }`}
          passHref
        >
          <Image
            src="/assets/logo/platform/beasiswa.svg"
            width={100}
            height={80}
            alt="Logo-5"
          />
        </Link>
      </div>
      <div className="mx-2">
        <Link href="https://digileader.kominfo.go.id/pendaftaran/">
          <Image
            src="/assets/logo/platform/dla.svg"
            width={100}
            height={80}
            alt="Logo-5"
          />
        </Link>
      </div>
    </div>
  );
};

export default HeaderLogoAuth;
