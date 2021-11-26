import React from "react";
import { Container } from "react-bootstrap";

const HomeWrapper = ({ children }) => {
  return (
    <>
      <Container fluid className="px-xl-17 px-lg-10 px-10 py-10">
        {children}
      </Container>
    </>
  );
};

export default HomeWrapper;
