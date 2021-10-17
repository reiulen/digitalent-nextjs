import React, { useState } from "react";
import { Row, Col, Card, Figure, Button, ButtonGroup } from "react-bootstrap";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import PesertaWrapper from "../../../../components/wrapper/Peserta.wrapper";
import ProfileWrapper from "../../components/wrapper/Profile.wapper";

const Alamat = dynamic(() => import("./alamat"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});

const AlamatEdit = dynamic(() => import("./alamat.edit"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});

const Profile = ({ session }) => {
  const [viewProfile, setViewProfile] = useState(2);
  const [viewEdit, setViewEdit] = useState(false);

  const handleViewProfile = () => {
    switch (viewProfile) {
      case 2:
        return viewEdit ? <AlamatEdit /> : <Alamat />;
        break;
      default:
        return <Alamat />;
        break;
    }
  };
  return (
    <>
      <PesertaWrapper>
        <Row>
          <ProfileWrapper />
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
