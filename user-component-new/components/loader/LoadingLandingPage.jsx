import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Container, Row, Col } from "react-bootstrap";

const LoadingLandingPage = () => {
  return (
    <>
      <Container className="text-center my-5" fluid>
        <SkeletonTheme color="#ecebeb" highlightColor="ffffff">
          <Skeleton height="360px" width="100%" />
          <div className="my-5">
            <Skeleton height="100px" width="90%" />
          </div>
          <Row className="mb-5">
            <Col md={4}>
              <Skeleton height="400px" width="90%" />
            </Col>
            <Col md={4}>
              <Skeleton height="400px" width="90%" />
            </Col>
            <Col md={4}>
              <Skeleton height="400px" width="90%" />
            </Col>
          </Row>
          <Row>
            <Col md={4}>
              <Skeleton height="400px" width="90%" />
            </Col>
            <Col md={4}>
              <Skeleton height="400px" width="90%" />
            </Col>
            <Col md={4}>
              <Skeleton height="400px" width="90%" />
            </Col>
          </Row>
        </SkeletonTheme>
      </Container>
    </>
  );
};

export default LoadingLandingPage;
