import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Container, Row, Col } from "react-bootstrap";

const LoadingDetailPelatihan = () => {
  return (
    <>
      <Container className="text-center my-5" fluid>
        <SkeletonTheme color="#ecebeb" highlightColor="ffffff">
          <Row className="my-5">
            <Col md={8}>
              <Skeleton height="500px" width="100%" />
            </Col>
            <Col md={4}>
              <Skeleton height="500px" width="100%" />
            </Col>
          </Row>
        </SkeletonTheme>
      </Container>
    </>
  );
};

export default LoadingDetailPelatihan;
