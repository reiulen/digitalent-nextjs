import React, { useState } from "react";
import { Row, Col, Card, Figure, Button, ButtonGroup } from "react-bootstrap";
import Image from "next/image";
import dynamic from "next/dynamic";
import Link from "next/link";
import style from "../../../../styles/peserta/profile.module.css";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";

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
const Alamat = dynamic(() => import("./alamat"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});
const Pendidikan = dynamic(() => import("./pendidikan"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});
const Pekerjaan = dynamic(() => import("./pekerjaan"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});

//edit information
// import InformasiEdit from "./edit/informasi.edit";
// import AlamatEdit from "./edit/alamat.edit";
// import PendidikanEdit from "./edit/pendidikan.edit";
// import PekerjaanEdit from "./edit/pekerjaan.edit";
const InformasiEdit = dynamic(() => import("./edit/informasi.edit"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});
const AlamatEdit = dynamic(() => import("./edit/alamat.edit"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});
const PendidikanEdit = dynamic(() => import("./edit/pendidikan.edit"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});
const PekerjaanEdit = dynamic(() => import("./edit/pekerjaan.edit"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});

const Profile = () => {
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
        return viewEdit ? <PekerjaanEdit /> : <Pekerjaan />;
        break;
      default:
        return <Informasi />;
        break;
    }
  };
  return (
    <>
      <div className="container-fluid p-6">
        <Row>
          <Col md={3}>
            <Card className="card-custom gutter-b">
              <Card.Body className="mx-auto">
                <Figure>
                  <Image
                    width={237}
                    height={256}
                    src="/assets/media/mitra-icon/laravel-1.svg"
                    objectFit="cover"
                    className={style.figure_img}
                  />
                </Figure>
                <Button
                  className={`${
                    viewEdit
                      ? "btn-primary-rounded-full bg-blue-primary"
                      : "btn-outline-primary"
                  } rounded-pill btn-block font-weight-bold`}
                  size="lg"
                  onClick={() => setViewEdit(!viewEdit)}
                >
                  Ubah Data
                </Button>

                <ButtonGroup vertical className="mt-4 btn-block ">
                  <Button
                    className={`mb-2 font-weight-bold text-left py-4 ${
                      viewProfile === 1
                        ? style.btn_profile_active
                        : style.btn_profile
                    }`}
                    variant="transparent"
                    onClick={() => setViewProfile(1)}
                  >
                    <i
                      className={`ri-user-3-fill mr-3 ${
                        viewProfile === 1 ? style.icon_active : ""
                      }`}
                    ></i>
                    Informasi Pribadi
                  </Button>
                  <Button
                    className={`mb-2 font-weight-bold text-left py-4 ${
                      viewProfile === 2
                        ? style.btn_profile_active
                        : style.btn_profile
                    }`}
                    variant="transparent"
                    onClick={() => setViewProfile(2)}
                  >
                    <i
                      className={`ri-map-pin-line mr-3 ${
                        viewProfile === 2 ? style.icon_active : ""
                      }`}
                    ></i>
                    Alamat
                  </Button>
                  <Button
                    className={`mb-2 font-weight-bold text-left py-4 ${
                      viewProfile === 3
                        ? style.btn_profile_active
                        : style.btn_profile
                    }`}
                    variant="transparent"
                    onClick={() => setViewProfile(3)}
                  >
                    <i
                      className={`ri-book-open-fill mr-3 ${
                        viewProfile === 3 ? style.icon_active : ""
                      }`}
                    ></i>
                    Pendidikan
                  </Button>
                  <Button
                    className={`mb-2 font-weight-bold text-left py-4 ${
                      viewProfile === 4
                        ? style.btn_profile_active
                        : style.btn_profile
                    }`}
                    variant="transparent"
                    onClick={() => setViewProfile(4)}
                  >
                    <i
                      className={`ri-handbag-fill mr-3 ${
                        viewProfile === 4 ? style.icon_active : ""
                      }`}
                    ></i>
                    Pekerjaan
                  </Button>
                </ButtonGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={9} className="order-1">
            <Card className="card-custom gutter-b">
              <Card.Body>{handleViewProfile()}</Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Profile;
