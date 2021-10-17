import React, { useState } from "react";
import { Row, Col, Card, Figure, Button, ButtonGroup } from "react-bootstrap";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import PesertaWrapper from "../../../../components/wrapper/Peserta.wrapper";
import ProfileWrapper from "../../components/wrapper/Profile.wapper";

//information
// import Informasi from "./informasi";
// import Alamat from "./alamat";
// import Pendidikan from "./pendidikan";
// import Pekerjaan from "./pekerjaan";
const Informasi = dynamic(() => import("./informasi"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});
// const Alamat = dynamic(() => import("./alamat"), {
//   loading: function loadingNow() {
//     return <LoadingSkeleton />;
//   },
//   ssr: false,
// });
// const Pendidikan = dynamic(() => import("./pendidikan"), {
//   loading: function loadingNow() {
//     return <LoadingSkeleton />;
//   },
//   ssr: false,
// });
// const Pekerjaan = dynamic(() => import("./pekerjaan"), {
//   loading: function loadingNow() {
//     return <LoadingSkeleton />;
//   },
//   ssr: false,
// });

//edit information
// import InformasiEdit from "./edit/informasi.edit";
// import AlamatEdit from "./edit/alamat.edit";
// import PendidikanEdit from "./edit/pendidikan.edit";
// import PekerjaanEdit from "./edit/pekerjaan.edit";
const InformasiEdit = dynamic(() => import("./informasi.edit"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});
// const AlamatEdit = dynamic(() => import("./edit/alamat.edit"), {
//   loading: function loadingNow() {
//     return <LoadingSkeleton />;
//   },
//   ssr: false,
// });
// const PendidikanEdit = dynamic(() => import("./edit/pendidikan.edit"), {
//   loading: function loadingNow() {
//     return <LoadingSkeleton />;
//   },
//   ssr: false,
// });
// const PekerjaanEdit = dynamic(() => import("./edit/pekerjaan.edit"), {
//   loading: function loadingNow() {
//     return <LoadingSkeleton />;
//   },
//   ssr: false,
// });

const Profile = ({ session }) => {
  const [viewProfile, setViewProfile] = useState(1);
  const [viewEdit, setViewEdit] = useState(false);

  const handleViewProfile = () => {
    switch (viewProfile) {
      case 1:
        return viewEdit ? <InformasiEdit /> : <Informasi />;
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
