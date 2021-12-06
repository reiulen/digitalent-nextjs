import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Card } from "react-bootstrap";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { Stepper, Step } from "react-form-stepper";
import Steppers from "./stepper";

const PekerjaanEdit = dynamic(
  () => import("../profile/pekerjaan/pekerjaan.edit"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

const Pendidikan = ({ session }) => {
  const [viewProfile, setViewProfile] = useState(4);
  const [viewEdit, setViewEdit] = useState(true);

  const [step, setStep] = useState([1, 2, 3, 4]);

  const [label, setLabel] = useState([
    "Informasi Pribadi",
    "Alamat",
    "Pendidikan",
    "Pekerjaan",
  ]);

  return (
    <>
      <Col md={12} style={{ marginTop: "-2%" }}>
        <Row>
          <Col md={12}>
            <Card className="mb-8 mt-n12 mt-md-n8">
              <div className=" d-flex justify-content-center align-items-center d-md-none ">
                {step.map((el, i) => {
                  return (
                    <Steppers
                      no={el}
                      finish={i >= viewProfile}
                      selected={i == viewProfile - 1}
                      label={label[i]}
                      key={i}
                    ></Steppers>
                  );
                })}
              </div>
              <Card.Body className="p-0">
                <div className="d-none d-md-block">
                  <Stepper
                    activeStep={viewProfile - 1}
                    connectorStateColors="#0063CC"
                    connectorStyleConfig={{
                      activeColor: "#0063CC",
                      size: "3px",
                      completedColor: "#0063CC",
                    }}
                    style={{
                      fontFamily: "poppins",
                      marginTop: "10px",
                      fontSize: "20px",
                    }}
                    className="d-flex align-item-center overflow-auto"
                  >
                    {step.map((el, i) => {
                      return (
                        <Step
                          key={i}
                          label={label[i]}
                          styleConfig={{
                            activeBgColor: "white",
                            activeTextColor: "#0063CC",
                            size: "28px",
                            inactiveBgColor: "#FFFFFF",
                            inactiveTextColor: "grey",
                            completedBgColor: "#0063CC",
                            completedTextColor: "white",
                            circleFontSize: "20px",
                            labelFontSize: "14px",
                          }}
                          style={{
                            fontFamily: "poppins",
                            color: "#0063CC",
                            border:
                              i < viewProfile
                                ? "2px solid #0063CC"
                                : "2px solid grey",
                            width: "40px",
                            height: "40px",
                            marginTop: "-5px",
                            fontWeight: "bolder",
                          }}
                        ></Step>
                      );
                    })}
                  </Stepper>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={12}>
            <Card className="card-custom gutter-b">
              <Card.Body>
                {/* {handleViewProfile()} */}
                <PekerjaanEdit wizzard={true} token={session.token} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Pendidikan;
