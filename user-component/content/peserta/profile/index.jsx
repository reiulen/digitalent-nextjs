import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
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
  const router = useRouter();

  const [viewProfile, setViewProfile] = useState(1);
  const [viewEdit, setViewEdit] = useState(false);

  localStorage.setItem("viewEdit", viewEdit);

  const handleViewProfile = () => {
    switch (viewProfile) {
      case 1:
        return viewEdit
          ? (localStorage.setItem("btn", 0),
            (
              <InformasiEdit
                funcViewEdit={val => setViewEdit(val)}
                token={session.token}
              />
            ))
          : (localStorage.setItem("btn", 0),
            (
              <Informasi
                funcViewEdit={val => setViewEdit(val)}
                token={session.token}
              />
            ));
        break;
      case 2:
        return viewEdit
          ? (localStorage.setItem("btn", 1),
            (
              <AlamatEdit
                funcViewEdit={val => setViewEdit(val)}
                token={session.token}
              />
            ))
          : (localStorage.setItem("btn", 1),
            (<Alamat token={session.token} />));
        break;
      case 3:
        return viewEdit
          ? (localStorage.setItem("btn", 2),
            (
              <PendidikanEdit
                funcViewEdit={val => setViewEdit(val)}
                token={session.token}
              />
            ))
          : (localStorage.setItem("btn", 2),
            (<Pendidikan token={session.token} />));
        break;
      case 4:
        return viewEdit ? (
          <KeterampilanEdit funcViewEdit={val => setViewEdit(val)} />
        ) : (
          <Keterampilan />
        );
        break;
      case 5:
        return viewEdit
          ? (localStorage.setItem("btn", 3),
            (
              <PekerjaanEdit
                funcViewEdit={val => setViewEdit(val)}
                token={session.token}
              />
            ))
          : (localStorage.setItem("btn", 3),
            (<Pekerjaan token={session.token} />));
        break;
      default:
        return <Informasi token={session.token} />;
        break;
    }
  };
  const condition = localStorage.getItem("viewEdit");
  useEffect(() => {
    if (condition === "false") {
      setViewEdit(false);
    }
  }, [viewEdit, condition]);

  return (
    <>
      <PesertaWrapper>
        <Row>
          {viewEdit ? (
            <ProfileWrapper
              key={1}
              propsEdit={true}
              propsViewProfile={viewProfile}
              funcViewEdit={val => setViewEdit(val)}
              funcViewProfile={val => setViewProfile(val)}
              token={session.token}
            />
          ) : (
            <ProfileWrapper
              key={2}
              propsEdit={false}
              propsViewProfile={viewProfile}
              funcViewEdit={val => setViewEdit(val)}
              funcViewProfile={val => setViewProfile(val)}
              token={session.token}
            />
          )}
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
