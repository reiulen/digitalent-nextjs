import React from "react";
import BreadcrumbComponent from "../../../components/global/Breadcrumb.component";

import { Container, Card, Row, Col } from "react-bootstrap";
import { useRouter } from "next/router";

export default function Kontak() {
  const router = useRouter();
  return (
    <>
      <Container fluid className="px-md-30 px-10 py-10">
        <BreadcrumbComponent data={[{ link: router.asPath, name: "kontak" }]} />
        <div className="col-12 mt-5">
          <h1 className="fw-700 fz-36">Kontak</h1>
          <p className="mr-6 fz-18 text-muted fw-500">
            Layanan Contact Center Digital Talent Scholarship
          </p>
        </div>
        <div className="my-10 w-100">
          <Card className="rounded-xl">
            <Row>
              <Col lg={6} className="d-flex align-items-center">
                <div>
                  <p className="fw-600 px-10 fz-20">Alamat</p>
                  <div className="px-10 fz-16">
                    <div>Kementrian Komunikasi dan Informatika RI</div>
                    <div>Jl. Medan Merdeka Barat No. 9</div>
                    <div>Jakarta Pusat, 10110</div>
                    <br />
                    <div>digitalent@mail.kominfo.go.id</div>
                  </div>
                </div>
              </Col>
              <Col lg={6} className="align-self-center">
                <div>
                  <iframe
                    width="100%"
                    height="270px"
                    id="gmap_canvas"
                    src="https://maps.google.com/maps?q=kementrian%20komunikasi%20dan%20informatika&t=&z=15&ie=UTF8&iwloc=&output=embed"
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                  ></iframe>
                </div>
              </Col>
            </Row>
          </Card>
        </div>
      </Container>
    </>
  );
}
