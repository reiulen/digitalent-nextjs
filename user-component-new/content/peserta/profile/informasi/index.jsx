import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import PesertaWrapper from "../../../../components/wrapper/Peserta.wrapper";
import ProfileWrapper from "../../components/wrapper/Profile.wapper";

const Informasi = dynamic(() => import("./informasi"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});

const InformasiEdit = dynamic(() => import("./informasi.edit"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});

const Profile = ({ session }) => {
  const [viewProfile, setViewProfile] = useState(1);
  const [viewEdit, setViewEdit] = useState(false);

  const handleViewProfile = () => {
    switch (viewProfile) {
      case 1:
        return viewEdit ? <InformasiEdit updated={viewEdit} /> : <Informasi />;
        break;
      default:
        return <Informasi />;
        break;
    }
  };
  return (
    <>
      <PesertaWrapper>
        <Row>
          <ProfileWrapper
            propsEdit={viewEdit}
            funcViewEdit={(val) => setViewEdit(val)}
          />
          <Col md={12}>
            <Card className="card-custom gutter-b">
              <Card.Body>{handleViewProfile()}</Card.Body>
            </Card>
          </Col>
        </Row>
      </PesertaWrapper>
    </>
  );
};

export default Profile;
