import React from "react";
import { Col } from "react-bootstrap";

const PesertaWrapper = ({ children }) => {
  return (
    <>
      <Col md={9} style={{ marginTop: "-5%" }}>
        {children}
      </Col>
    </>
  );
};

export default PesertaWrapper;
