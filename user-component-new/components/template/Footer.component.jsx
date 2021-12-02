import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getBerandaFooter } from "../../../redux/actions/beranda/beranda.actions";
import { Row, Col, Container } from "react-bootstrap";

import Link from "next/link";
import ImageWhiteLogo from "../../../components/assets/icon-dashboard-peserta/whitelogo.png";

export default function Footer() {
  const dispatch = useDispatch();
  const { footer, loading } = useSelector((state) => state.berandaFooter);

  const [secondary, setSecondary] = useState("1");
  const [warna, setWarna] = useState("secondary");

  useEffect(() => {
    dispatch(getBerandaFooter());
  }, [dispatch]);

  const getDataGeneral = async (token) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting/general/get`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      if (data) {
        localStorage.setItem("footer", data.data.color[1].color);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (!localStorage.getItem("footer")) {
      getDataGeneral();
    }
    if (localStorage.getItem("footer") === "1") {
      setWarna("primary");
    } else if (localStorage.getItem("footer") === "2") {
      setWarna("secondary");
    } else if (localStorage.getItem("footer") === "3") {
      setWarna("extras");
    }
  }, []);

  return (
    <div className={`color-secondary-${warna}`}>
      <Container fluid className="padding-content-footer">
        <Row className="w-100 px-0 mx-0 mb-0">
          <Col md={2} sm={12}>
            <div className="mt-5">
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
          </Col>
          <Col md={8} sm={12}>
            <div className="h-100 d-flex align-items-center mt-md-2">
              <p className="fw-500 text-white">
                {(footer && footer.logo_description) ||
                  "Program Digital Talent Scholarship bertujuan untuk meningkatkan keterampilan dan daya saing, produktivitas, profesionalisme SDM bidang teknologi informasi dan komunikasi bagi angkatan kerja muda Indonesia, masyarakat umum, dan aparatur sipil negara"}
              </p>
            </div>
          </Col>
          <Col md={2} sm={12}>
            <div className="h-100 w-100">
              <div className="pl-xl-20 mt-md-0 mt-8  d-flex border-left-md align-items-md-center justify-content-md-end h-100 w-100">
                {footer &&
                  footer.social_media &&
                  footer.social_media.length !== 0 &&
                  footer.social_media.map((row, i) => (
                    <a
                      href={row.link_social_media}
                      target="_blank"
                      key={i}
                      rel="noreferrer"
                    >
                      <div className="cursor-pointer mx-md-0 px-2">
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
                          width={25}
                          height={25}
                          objectFit="cover"
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
                {(footer && footer.alamat) ||
                  "Kementerian Komunikasi dan Informatika RI Jl. Medan Merdeka Barat No. 9 Jakarta Pusat, 10110"}
              </p>
            </div>
          </Col>
          <Col md={8} sm={12}>
            <h1 className="fw-700 fz-20 text-white">Pranala Luar</h1>
            <div
              className={
                footer &&
                footer.external_link &&
                footer.external_link.length > 5
                  ? `row ml-0`
                  : undefined
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
