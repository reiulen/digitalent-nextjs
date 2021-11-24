import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getBerandaFooter } from "../../../redux/actions/beranda/beranda.actions";
import { Row, Col, Container } from "react-bootstrap";

import Link from "next/link";
import ImageWhiteLogo from "../../../components/assets/icon-dashboard-peserta/whitelogo.png";

export default function Footer() {
  const dispatch = useDispatch();
  const { footer, loading } = useSelector((state) => state.berandaFooter);

  useEffect(() => {
    dispatch(getBerandaFooter());
  }, [dispatch]);
  return (
    <div className="color-secondary-secondary">
      <Container fluid className="px-md-25">
        <Row className="w-100 px-0 mx-0 mb-0 py-5">
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
          <Col md={7} sm={12}>
            <div className="h-100 d-flex align-items-center mt-md-2">
              <p className="fw-500 text-white">
                {(footer && footer.logo_description) ||
                  "Program Digital Talent Scholarship bertujuan untuk meningkatkan keterampilan dan daya saing, produktivitas, profesionalisme SDM bidang teknologi informasi dan komunikasi bagi angkatan kerja muda Indonesia, masyarakat umum, dan aparatur sipil negara"}
              </p>
            </div>
          </Col>
          <Col md={3} sm={12} className="my-5">
            <div className="h-100 w-100">
              <div className="pl-md-10 d-flex border-left-md align-items-md-center justify-content-md-between  h-100 w-100">
                {footer &&
                  footer.social_media &&
                  footer.social_media.length !== 0 &&
                  footer.social_media.map((row, i) => (
                    <a href={row.link_social_media} target="_blank">
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
                    </a>
                  ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <hr style={{ backgroundColor: "white" }} />
      <Container fluid className="px-md-25 px-10">
        <Row className="py-10 ">
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
      <p className="text-white fw-500 text-center py-9 mb-0">
        Copyright © 2021 | Kementerian Komunikasi dan Informatika
      </p>
    </div>
  );
}
