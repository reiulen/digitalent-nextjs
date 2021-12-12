import { Fragment } from "react";
import { Button, Col } from "react-bootstrap";
import style from "../../style.module.css";
export default function CustomButton({ children, click, outline, disabled }) {
  return (
    <Fragment>
      <Col className="d-flex justify-content-center ">
        <Button
          className={`btn-rounded-full font-weight-bold btn-block justify-content-center mt-5 ${
            outline && style.background_outline_primary
          }`}
          style={
            disabled
              ? { height: "40px", fontSize: "14px", cursor: "not-allowed" }
              : { height: "40px", fontSize: "14px" }
          }
          onClick={click}
          disabled={disabled}
        >
          {children}
        </Button>
      </Col>
    </Fragment>
  );
}
