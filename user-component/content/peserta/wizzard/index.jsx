import React, { useState, useEffect, Fragment } from "react";
import { Row, Col, Card } from "react-bootstrap";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
// import style from "../../../../styles/peserta/profile.module.css";
import style from "./wizzard.module.css";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";
import ProfileWrapper from "../components/wrapper/Profile.wapper";
import { Stepper, Step } from "react-form-stepper";
import StepZilla from "react-stepzilla";
import Steppers from "./stepper";
// const Informasi = dynamic(() => import("./informasi/informasi"), {
const Informasi = dynamic(() => import("../profile/informasi/informasi"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});

const InformasiEdit = dynamic(
  () => import("../profile/informasi/informasi.edit"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);
const AlamatEdit = dynamic(() => import("../profile/alamat/alamat.edit"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});
const PendidikanEdit = dynamic(
  () => import("../profile/pendidikan/pendidikan.edit"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

const PekerjaanEdit = dynamic(
  () => import("../profile/pekerjaan/pekerjaan.edit"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

const Profile = ({ session }) => {
  const router = useRouter();

  const [viewProfile, setViewProfile] = useState(1);
  const [viewEdit, setViewEdit] = useState(true);

  const handleViewProfile = () => {
    switch (viewProfile) {
      case 1:
        return (
          <InformasiEdit
            funcViewEdit={(val) => setViewProfile(val)}
            token={session.token}
            wizzard={true}
          />
        );
      case 2:
        return (
          <AlamatEdit
            funcViewEdit={(val) => setViewProfile(val)}
            token={session.token}
            wizzard={true}
          />
        );
      case 3:
        return (
          <PendidikanEdit
            funcViewEdit={(val) => setViewProfile(val)}
            token={session.token}
            wizzard={true}
          />
        );
        break;
      case 4:
        return (
          <PekerjaanEdit
            funcViewEdit={(val) => setViewProfile(val)}
            wizzard={true}
            token={session.token}
          />
        );
      default:
        return <Informasi token={session.token} />;
        break;
    }
  };
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
            <Card>
              <div className="d-flex justify-content-center align-items-center d-md-none ">
                {step.map((el, i) => {
                  return (
                    <Steppers
                      no={el}
                      finish={i >= viewProfile}
                      selected={i == viewProfile - 1}
                      label={label[i]}
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
              <Card.Body>{handleViewProfile()}</Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Profile;
