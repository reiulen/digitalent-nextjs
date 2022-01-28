import React from "react";
import Image from "next/image";
import Link from "next/link";

const HeaderLogoAuth = ({ type = "" }) => {
  return (
    <div className="d-flex col-lg-6 mx-auto p-0 justify-content-between">
      <div className="" style={{ cursor: "pointer" }}>
        <Link
          href={
            process.env.PATH_URL +
            `${type === "register" ? "/register" : "/login"}`
          }
          passHref
        >
          <Image
            src="/assets/logo/platform/dts.svg"
            width={90}
            height={80}
            alt="Logo-5"
          />
        </Link>
      </div>
      <div className="" style={{ cursor: "pointer" }}>
        <Link
          href={
            process.env.PATH_SIMONAS +
            `${type === "register" ? "/register" : "/login"}`
          }
          passHref
        >
          <Image
            src="/assets/logo/platform/simonas.svg"
            width={90}
            height={80}
            alt="Logo-5"
          />
        </Link>
      </div>
      <div className="" style={{ cursor: "pointer" }}>
        <Link
          href={`https://beasiswa-dev.majapahit.id${
            type === "register" ? "/register" : "/login"
          }`}
          passHref
        >
          <Image
            src="/assets/logo/platform/beasiswa.svg"
            width={90}
            height={80}
            alt="Logo-5"
          />
        </Link>
      </div>
      <div className="" style={{ marginRight: -20 }}>
        <Link href="https://digileader.kominfo.go.id/pendaftaran/">
          <Image
            src="/assets/logo/platform/dla.svg"
            width={90}
            height={80}
            alt="Logo-5"
          />
        </Link>
      </div>
    </div>
  );
};

export default HeaderLogoAuth;
