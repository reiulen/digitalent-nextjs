import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getBerandaFooter } from "../../../redux/actions/beranda/beranda.actions";
import { Row, Col, Container } from "react-bootstrap";

import Link from "next/link";
import ImageWhiteLogo from "../../../components/assets/icon-dashboard-peserta/whitelogo.png";

export default function Footer({ session }) {
  const dispatch = useDispatch();
  const { footer, loading } = useSelector((state) => state.berandaFooter);
  const [warna, setWarna] = useState("secondary");

  useEffect(() => {
    if (
      !localStorage.getItem("footer_data") ||
      !localStorage.getItem("footer") ||
      !localStorage.getItem("footer_logo")
    ) {
      dispatch(getBerandaFooter());
    }

    if (localStorage.getItem("footer") == "1") {
      setWarna("primary");
    } else if (localStorage.getItem("footer") == "2") {
      setWarna("secondary");
    } else if (localStorage.getItem("footer") == "3") {
      setWarna("extras");
    }
  }, []);

  const [statusFooter, setStatusFooter] = useState(false);

  useEffect(() => {
    if (footer && Object.keys(footer).length !== 0) {
      localStorage.setItem("footer", footer?.color[1]?.color);
      localStorage.setItem("footer_logo", footer?.footer_logo);
      localStorage.setItem("footer_data", JSON.stringify(footer));
      setStatusFooter(true);
    }
  }, [footer]);

  return (
    <div className={`color-secondary-${warna}`}>
      <Container fluid className="padding-content-footer">
        <Row>
          <Col md={2} sm={12}>
            <div className="mt-5">
              <Image
                src={
                  localStorage.getItem("footer_data")
                    ? process.env.END_POINT_API_IMAGE_SITE_MANAGEMENT +
                      "site-management/images/" +
                      JSON.parse(localStorage.getItem("footer_data"))
                        .footer_logo
                    : ImageWhiteLogo
                }
                width={120}
                height={120}
                alt="brand-navbar"
              />
            </div>
          </Col>
          <Col lg={8} md={12} sm={12}>
            <div className="h-100 d-flex align-items-center mt-md-2">
              <p className="fw-500 text-white">
                {(localStorage.getItem("footer_data") &&
                  JSON.parse(localStorage.getItem("footer_data"))
                    .logo_description) ||
                  "Program Digital Talent Scholarship bertujuan untuk meningkatkan keterampilan dan daya saing, produktivitas, profesionalisme SDM bidang teknologi informasi dan komunikasi bagi angkatan kerja muda Indonesia, masyarakat umum, dan aparatur sipil negara"}
              </p>
            </div>
          </Col>
          <Col lg={2} md={12} sm={12} className="p-lg-0">
            <div className="h-100 w-100">
              <div className="pl-xl-20 mt-lg-0 mt-8  d-flex border-left-lg align-items-md-center justify-content-lg-end h-100 w-100">
                {localStorage.getItem("footer_data") &&
                  JSON.parse(localStorage.getItem("footer_data"))
                    .social_media &&
                  JSON.parse(localStorage.getItem("footer_data")).social_media
                    .length != 0 &&
                  JSON.parse(
                    localStorage.getItem("footer_data")
                  ).social_media.map((row, i) => (
                    <a
                      href={row.link_social_media}
                      target="_blank"
                      key={i}
                      rel="noreferrer"
                    >
                      <div className="cursor-pointer mx-md-0 px-2">
                        <img
                          key={i}
                          src={
                            (localStorage.getItem("footer_data") &&
                              process.env.END_POINT_API_IMAGE_SITE_MANAGEMENT +
                                "site-management/images/" +
                                row.image_logo) ||
                            "/assets/media/logo-default.png"
                          }
                          alt={row.name}
                          width={25}
                          height={25}
                          // objectFit="cover"
                        />
                      </div>
                    </a>
                  ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <hr style={{ backgroundColor: "white" }} />
      <Container fluid className="padding-content-footer">
        <Row>
          <Col md={4} sm={12}>
            <div>
              <h1 className="fw-700 fz-20 text-white">Alamat</h1>
              <p className="text-white fw-500">
                {(
                  localStorage.getItem("footer_data") &&
                  JSON.parse(localStorage.getItem("footer_data"))
                )?.alamat ||
                  "Kementerian Komunikasi dan Informatika RI Jl. Medan Merdeka Barat No. 9 Jakarta Pusat, 10110"}
              </p>
            </div>
          </Col>
          <Col
            md={8}
            sm={12}
            className={
              localStorage.getItem("footer_data") &&
              JSON.parse(localStorage.getItem("footer_data")).external_link <
                5 &&
              `d-flex justify-content-md-center`
            }
          >
            <div className="content-pranala">
              <h1 className="fw-700 fz-20 text-white">Pranala Luar</h1>
              <div
                className={
                  localStorage.getItem("footer_data") &&
                  JSON.parse(localStorage.getItem("footer_data")).external_link
                    ?.length > 5
                    ? `row ml-0`
                    : undefined
                }
              >
                {localStorage.getItem("footer_data") &&
                  JSON.parse(
                    localStorage.getItem("footer_data")
                  ).external_link?.map((row, i) => (
                    <div
                      className={
                        localStorage.getItem("footer_data") &&
                        JSON.parse(localStorage.getItem("footer_data"))
                          .external_link?.length > 5
                          ? `col-md-6 pl-0`
                          : `col-md-12 pl-0`
                      }
                      key={i}
                    >
                      <Link href={row.link}>
                        <a className="text-white fw-500" target="_blank">
                          {row.name}
                        </a>
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <hr style={{ backgroundColor: "white" }} />
      <div className="px-10">
        <p className="text-white fw-500 text-center py-9 mb-0">
          Copyright © 2021 | Kementerian Komunikasi dan Informatika
        </p>
      </div>
    </div>
  );
}
