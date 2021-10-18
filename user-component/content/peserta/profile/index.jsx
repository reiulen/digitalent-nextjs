import React, { useState, useEffect } from "react";
import { Row, Col, Card, Figure, Button, ButtonGroup } from "react-bootstrap";
import Image from "next/image";
import dynamic from "next/dynamic";
import style from "../../../../styles/peserta/profile.module.css";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import PesertaWrapper from "../../../components/wrapper/Peserta.wrapper";
import ProfileWrapper from "../components/wrapper/Profile.wapper";

const Informasi = dynamic(() => import("./informasi/informasi"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});
const Alamat = dynamic(() => import("./alamat/alamat"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});
const Pendidikan = dynamic(() => import("./pendidikan/pendidikan"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});
const Keterampilan = dynamic(() => import("./keterampilan/keterampilan"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});
const Pekerjaan = dynamic(() => import("./pekerjaan/pekerjaan"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});

const InformasiEdit = dynamic(() => import("./informasi/informasi.edit"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});
const AlamatEdit = dynamic(() => import("./alamat/alamat.edit"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});
const PendidikanEdit = dynamic(() => import("./pendidikan/pendidikan.edit"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});
const KeterampilanEdit = dynamic(
  () => import("./keterampilan/keterampilan.edit"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);
const PekerjaanEdit = dynamic(() => import("./pekerjaan/pekerjaan.edit"), {
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
        return viewEdit ? <InformasiEdit /> : <Informasi />;
        break;
      case 2:
        return viewEdit ? <AlamatEdit /> : <Alamat />;
        break;
      case 3:
        return viewEdit ? <PendidikanEdit /> : <Pendidikan />;
        break;
      case 4:
        return viewEdit ? <KeterampilanEdit /> : <Keterampilan />;
        break;
      case 5:
        return viewEdit ? <PekerjaanEdit /> : <Pekerjaan />;
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
            propsViewProfile={viewProfile}
            funcViewEdit={(val) => setViewEdit(val)}
            funcViewProfile={(val) => setViewProfile(val)}
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
