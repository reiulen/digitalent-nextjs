import React from "react";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";
import { Row, Col, Container, Card } from "react-bootstrap";
import Image from "next/image";
import { useSelector } from "react-redux";
export default function Bookmark() {
  const { artikel, loading: loadingArtikel } = useSelector(
    (state) => state.allBerandaArtikel
  );

  return (
    <PesertaWrapper>
      <Row>
        <Col lg={6} className="p-0">
          <Card className="h-100">
            <div>
              <Image
                src={
                  process.env.END_POINT_API_IMAGE_PUBLIKASI +
                  "publikasi/images/" +
                  artikel.artikel[0].foto
                }
                layout="fill"
                objectFit="cover"
              />
              <div className="d-flex justify-content-between position-relative h-100">
                <div className="m-6">Pelatihan Daring</div>
                <div className="m-6 d-flex">
                  <div className="mr-3">logo share</div>
                  <div>logo love</div>
                </div>
              </div>
            </div>
            <div>
              tes 123 tes 123tes 123tes 123tes 123tes 123tes 123tes 123tes
              123tes 123tes 123tes 123 tes 123tes 123tes 123tes 123tes 123tes
              123tes 123tes 123{" "}
            </div>
          </Card>
          <Card className="bg-dark text-white">
            <Card.Img
              src={
                process.env.END_POINT_API_IMAGE_PUBLIKASI +
                "publikasi/images/" +
                artikel.artikel[0].foto
              }
              alt="Card image"
            />
            <Card.ImgOverlay>
              <div className="d-flex justify-content-between">
                <div>tes</div>
                <div>tes</div>
              </div>
            </Card.ImgOverlay>
          </Card>
        </Col>
        <Col lg={6}>tes</Col>
      </Row>
    </PesertaWrapper>
  );
}
