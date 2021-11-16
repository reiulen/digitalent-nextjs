import React from "react";
import { Col } from "react-bootstrap";

const PesertaWrapper = ({ children, padding }) => {
  return (
    <>
      <Col
        md={12}
        lg={9}
        style={{ marginTop: "-5%" }}
        className={`${padding ? "pt-10 pt-lg-0" : ""}`}
      >
        {children}
      </Col>
    </>
  );
};

export default PesertaWrapper;
