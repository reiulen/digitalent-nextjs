import React from "react";
import { Container } from "react-bootstrap";

const HomeWrapper = ({ children }) => {
  return (
    <>
      <Container fluid className="padding-content-home">
        {children}
      </Container>
    </>
  );
};

export default HomeWrapper;
