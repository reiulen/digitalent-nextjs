import React from "react";
import { Col } from "react-bootstrap";

const PesertaWrapper = ({ children }) => {
  return (
    <>
      <Col md={12} lg={9} style={{ marginTop: "-5%" }}>
        {children}
      </Col>
    </>
  );
};

export default PesertaWrapper;
