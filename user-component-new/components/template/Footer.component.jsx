import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getBerandaFooter } from "../../../redux/actions/beranda/beranda.actions";
import { Row, Col, Container } from "react-bootstrap";

import Link from "next/link";
import ImageWhiteLogo from "../../../components/assets/icon-dashboard-peserta/whitelogo.png";

export default function Footer({ session }) {
  const dispatch = useDispatch();
  const { footer, loading } = useSelector((state) => state.berandaFooter);
  const [secondary, setSecondary] = useState("1");
  const [warna, setWarna] = useState("secondary");
  const [footerLogo, setFooterLogo] = useState("");
  const [sosmed, setSosmed] = useState([]);
  const [externalLink, setExternalLink] = useState([]);

  useEffect(() => {
    if (footer?.footer_logo) {
      setFooterLogo(footer?.footer_logo);
    }
    if (footer?.social_media) {
      setSosmed(footer?.social_media);
    }
    if (footer?.external_link) {
      setExternalLink(footer?.external_link);
    }
  }, [footer]);

  const getDataGeneral = async (token) => {
    try {
      let { data } = await axios.get(
        `${process.env.END_POINT_API_SITE_MANAGEMENT}api/setting/general/get`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data) {
        localStorage.setItem("footer", data.data.color[1].color);
        localStorage.setItem("footer_logo", data.data.footer_logo);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (
      !localStorage.getItem("footer") ||
      !localStorage.getItem("footer_logo")
    ) {
      getDataGeneral(session?.token);
    }

    if (localStorage.getItem("footer") == "1") {
      setWarna("primary");
    } else if (localStorage.getItem("footer") == "2") {
      setWarna("secondary");
    } else if (localStorage.getItem("footer") == "3") {
      setWarna("extras");
    }
    dispatch(getBerandaFooter());
  }, []);

  return (
    <div className={`color-secondary-${warna}`}>
      <Container fluid className="padding-content-footer">
        <Row>
          <Col md={2} sm={12}>
            <div className="mt-5">
              <Image
                src={
                  footerLogo
                    ? process.env.END_POINT_API_IMAGE_PUBLIKASI +
                      "site-management/images/" +
                      footerLogo
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
                {(footer && footer.logo_description) ||
                  "Program Digital Talent Scholarship bertujuan untuk meningkatkan keterampilan dan daya saing, produktivitas, profesionalisme SDM bidang teknologi informasi dan komunikasi bagi angkatan kerja muda Indonesia, masyarakat umum, dan aparatur sipil negara"}
              </p>
            </div>
          </Col>
<<<<<<< HEAD
          <Col lg={2} md={12} sm={12}>
=======
          <Col lg={2} md={12} sm={12} className="p-lg-0">
>>>>>>> 3c80f1339543dfb371138ebe28b6f69fd4638a13
            <div className="h-100 w-100">
              <div className="pl-xl-20 mt-lg-0 mt-8  d-flex border-left-lg align-items-md-center justify-content-lg-end h-100 w-100">
                {sosmed &&
                  sosmed.length != 0 &&
                  sosmed.map((row, i) => (
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
                            (footer &&
                              process.env.END_POINT_API_IMAGE_PUBLIKASI +
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
                {(footer && footer.alamat) ||
                  "Kementerian Komunikasi dan Informatika RI Jl. Medan Merdeka Barat No. 9 Jakarta Pusat, 10110"}
              </p>
            </div>
          </Col>
          <Col
            md={8}
            sm={12}
            className={
              externalLink &&
              externalLink?.length < 5 &&
              `d-flex justify-content-md-center`
            }
          >
            <div className="content-pranala">
              <h1 className="fw-700 fz-20 text-white">Pranala Luar</h1>
              <div
                className={
                  externalLink && externalLink?.length > 5
                    ? `row ml-0`
                    : undefined
                }
              >
                {externalLink &&
                  externalLink?.length > 0 &&
                  externalLink?.map((row, i) => (
                    <div
                      className={
                        externalLink?.length > 5
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
