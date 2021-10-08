import React from "react";
import { Row, Col, Card, Figure, Button } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import style from "../../../../styles/peserta/dashboard.module.css";

const Profile = () => {
  return (
    <>
      <div className="container-fluid p-6">
        <Row>
          <Col md={3}>
            <Card className="card-custom card-stretch gutter-b">
              <Card.Body className="mx-auto">
                <Figure>
                  <Image
                    width={237}
                    height={256}
                    src="/assets/media/mitra-icon/laravel-1.svg"
                    objectFit="cover"
                    className={style.figure_img}
                  />
                </Figure>
                <Button
                  className="btn-outline-primary rounded-pill btn-block font-weight-bold"
                  size="lg"
                >
                  Ubah Data
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col md={9} className="order-1">
            <Card className="card-custom card-stretch gutter-b">
              <Card.Body></Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Profile;
