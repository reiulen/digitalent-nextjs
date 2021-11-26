import React, { useState } from "react";
import PageWrapper from "../../../wrapper/page.wrapper";
import { Card, Form, Col, Row, Button } from "react-bootstrap";
import { SweatAlert } from "../../../../utils/middleware/helper/index";
import EditTTEP12 from "./edit";

export default function TTEP12({ token }) {
  const [ubah, setUbah] = useState(false);
  const [data, setData] = useState("");

  const handleUbah = () => {
    setUbah(true);
  };
  return (
    <PageWrapper>
      {!ubah ? (
        <EditTTEP12 setUbah={setUbah} data={data} />
      ) : (
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
                    <p className="fz-16">Ahmad Firaz</p>
                  </Form.Group>
                </Form>
              </Col>
              <Col>
                <Form>
                  <Form.Group className="mb-8 text-capitalize">
                    <Form.Label>Jabatan</Form.Label>
                    <p className="fz-16">Direktur</p>
                  </Form.Group>
                </Form>
              </Col>
            </Row>
            <Form>
              <Form.Group className="mb-8 text-capitalize">
                <Form.Label className="fz-14">File p12</Form.Label>
                <p className="fz-16">fileKominfo.p12</p>
              </Form.Group>
            </Form>
            <Form>
              <Form.Group className="mb-8 text-capitalize">
                <Form.Label className="fz-16">Tasnggal Unggah File</Form.Label>
                <p className="fz-14">22 November 2012</p>
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
      )}
    </PageWrapper>
  );
}
