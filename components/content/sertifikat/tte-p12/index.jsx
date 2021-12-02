import React, { Fragment, useEffect, useState } from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import { Card, Form, Col, Row, Button } from "react-bootstrap";
import { SweatAlert } from "../../../../utils/middleware/helper/index";
import EditTTEP12 from "./edit";
import { useSelector } from "react-redux";
import moment from "moment";

export default function TTEP12({ token }) {
  const [ubah, setUbah] = useState(false);
  const { ttep12 } = useSelector((state) => state.TTEP12Data);

  useEffect(() => {
    if (!ttep12?.data) {
      setUbah(true);
    }
  }, [ttep12]);

  const handleUbah = () => {
    setUbah(true);
  };

  return (
    <PageWrapper>
      {ubah ? (
        <Fragment>
          <EditTTEP12 setUbah={setUbah} data={ttep12?.data} token={token} />
        </Fragment>
      ) : (
        <Fragment>
          <Card>
            <Card.Title className="mx-10 my-8">
              <p>
                <h1 className="fz-24">TTE P12</h1>
              </p>
            </Card.Title>
            <Card.Body>
              <Row className=" fz-14">
                <Col>
                  <Form>
                    <Form.Group className="mb-8 text-capitalize">
                      <Form.Label>Nama</Form.Label>
                      <p className="fz-16">{ttep12?.data?.name}</p>
                    </Form.Group>
                  </Form>
                </Col>
                <Col>
                  <Form>
                    <Form.Group className="mb-8 text-capitalize">
                      <Form.Label>Jabatan</Form.Label>
                      <p className="fz-16">{ttep12?.data?.position}</p>
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <Form>
                <Form.Group className="mb-8 text-capitalize">
                  <Form.Label className="fz-14">File p12</Form.Label>
                  <p className="fz-16">{ttep12?.data?.p12}</p>
                </Form.Group>
              </Form>
              <Form>
                <Form.Group className="mb-8 text-capitalize">
                  <Form.Label className="fz-16">Tanggal Unggah File</Form.Label>
                  <p className="fz-14">
                    {moment(ttep12?.data?.created_at).format("DD MMMM YYYY")}
                  </p>
                </Form.Group>
              </Form>
              <div className="d-flex justify-content-end">
                <Button
                  className="rounded-full px-10 py-4"
                  variant="outline-primary"
                  onClick={handleUbah}
                >
                  Ubah File
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Fragment>
      )}
    </PageWrapper>
  );
}
