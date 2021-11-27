import React from "react";
import BreadcrumbComponent from "../../../components/global/Breadcrumb.component";

import { Container, Card, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";

import HomeWrapper from "../../../components/wrapper/Home.wrapper";

export default function Kontak() {
  const router = useRouter();
  return (
    <>
      <HomeWrapper>
        <BreadcrumbComponent data={[{ link: router.asPath, name: "Kontak" }]} />
        <div className="mt-5">
          <h1 className="fw-700 fz-40">Kontak</h1>
          <p className="mr-6 fz-18 text-muted fw-400">
            Layanan Contact Center Digital Talent Scholarship
          </p>
        </div>
        <div className="my-10 w-100">
          <Card className="rounded-xl">
            <Row>
              <Col
                lg={6}
                className="d-flex align-items-center px-20 py-lg-0 py-md-20 py-10"
              >
                <div className="max-w-200px max-w-sm-100 pr-10 pr-md-0">
                  <p className="fw-600 fz-20">Alamat</p>
                  <div className="fz-16">
                    <div>Kementrian Komunikasi dan Informatika RI</div>
                    <div>Jl. Medan Merdeka Barat No. 9</div>
                    <div>Jakarta Pusat, 10110</div>
                    <br />
                    <div>digitalent@mail.kominfo.go.id</div>
                  </div>
                </div>
              </Col>
              <Col lg={6} className="align-self-center">
                <div className="d-flex align-item-center">
                  <iframe
                    width="100%"
                    height="270px"
                    id="gmap_canvas"
                    src="https://maps.google.com/maps?q=kementrian%20komunikasi%20dan%20informatika&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    scrolling="no"
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="-"
                  />
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </HomeWrapper>
    </>
  );
}
