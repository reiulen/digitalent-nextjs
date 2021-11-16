import { Fragment } from "react";
import { Button, Col } from "react-bootstrap";

export default function CustomButton({ children, click }) {
  return (
    <Fragment>
      <Col className="d-flex justify-content-center ">
        <Button
          className={`btn-rounded-full font-weight-bold btn-block justify-content-center mt-5 `}
          style={{ height: "40px", fontSize: "14px" }}
          onClick={click}
        >
          {children}
        </Button>
      </Col>
    </Fragment>
  );
}
