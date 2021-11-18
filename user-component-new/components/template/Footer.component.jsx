import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getBerandaFooter } from "../../../redux/actions/beranda/beranda.actions";

import Link from "next/link";
import ImageWhiteLogo from "../../../components/assets/icon-dashboard-peserta/whitelogo.png";

export default function Footer() {
  const dispatch = useDispatch();
  const { footer, loading } = useSelector((state) => state.berandaFooter);

  useEffect(() => {
    dispatch(getBerandaFooter());
  }, [dispatch]);
  return (
    <div style={{ backgroundColor: "#203E80" }}>
      <div className="container-fluid">
        <div className="row w-100 px-0 mx-0 mb-0">
          <div className="col-12 col-sm-3">
            <div>
              <Image
                src={
                  (footer &&
                    process.env.END_POINT_API_IMAGE_PUBLIKASI +
                      "site-management/images/" +
                      footer.footer_logo) ||
                  ImageWhiteLogo
                }
                width={120}
                height={120}
                alt="brand-navbar"
              />
            </div>
          </div>
          <div className="col-12 col-sm-6">
            <div className="h-100 d-flex align-items-center mt-md-2">
              <p className="fw-500 text-white">
                {(footer && footer.logo_description) ||
                  "Program Digital Talent Scholarship bertujuan untuk meningkatkan keterampilan dan daya saing, produktivitas, profesionalisme SDM bidang teknologi informasi dan komunikasi bagi angkatan kerja muda Indonesia, masyarakat umum, dan aparatur sipil negara"}
              </p>
            </div>
          </div>
          <div className="col-12 col-sm-2 my-5">
            <div className="h-100 w-100">
              <div className="pl-md-10 d-flex border-left-md align-items-md-center justify-content-md-between  h-100 w-100">
                {footer &&
                  footer.social_media &&
                  footer.social_media.length !== 0 &&
                  footer.social_media.map((row, i) => (
                    <Link href={row.link_social_media}>
                      <div className="cursor-pointer mx-md-0 mx-2">
                        <Image
                          key={i}
                          src={
                            (footer &&
                              process.env.END_POINT_API_IMAGE_PUBLIKASI +
                                "site-management/images/" +
                                row.image_logo) ||
                            "/assets/media/logo-default.png"
                          }
                          alt={row.name}
                          width={20}
                          height={20}
                          objectFit="cover"
                        />
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <hr style={{ backgroundColor: "white" }} />
        <div className="row py-10 px-0">
          <div className="col-12 col-sm-4">
            <div>
              <h1 className="fw-700 fz-20 text-white">Alamat</h1>
              <p className="text-white fw-500">
                {(footer && footer.alamat) ||
                  "Kementerian Komunikasi dan Informatika RI Jl. Medan Merdeka Barat No. 9 Jakarta Pusat, 10110"}
              </p>
            </div>
          </div>
          <div className="col-12 col-sm-8">
            <h1 className="fw-700 fz-20 text-white">Pranala Luar</h1>
            <div
              className={
                footer &&
                footer.external_link &&
                footer.external_link.length > 5 &&
                `row ml-0`
              }
            >
              {footer &&
                footer.external_link &&
                footer.external_link.length > 0 &&
                footer.external_link.map((row, i) => (
                  <div
                    className={
                      footer.external_link.length > 5
                        ? `col-md-6 pl-0`
                        : `col-md-12 pl-0`
                    }
                  >
                    <Link href={row.link}>
                      <a className="text-white fw-500">{row.name}</a>
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <hr style={{ backgroundColor: "white" }} />
        <p className="text-white fw-500 text-center py-10 mb-0">
          Copyright © 2021 | Kementerian Komunikasi dan Informatika
        </p>
      </div>
    </div>
  );
}
