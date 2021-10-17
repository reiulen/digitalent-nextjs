import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  Col,
  Card,
  Navbar,
  Nav,
  Container,
  Button,
  Row,
} from "react-bootstrap";
import style from "./style.module.css";

const ProfileWrapper = ({ propsEdit, funcViewEdit }) => {
  const router = useRouter();
  const [viewEdit, setViewEdit] = useState(propsEdit);
  return (
    <>
      {console.log(router.pathname)}
      <Col md={12} className="mb-5">
        <Card>
          <Card.Body>
            <Row>
              <Col md={2} className="text-center">
                <Image
                  className={`${style.image_profile_wrapper}`}
                  src="/assets/media/logos/default.png"
                  width={90}
                  height={90}
                  objectFit="cover"
                />
              </Col>
              <Col md={8}>
                <div className="information">
                  <p className={`${style.name_profile_wrapper} my-0`}>
                    Dendy Juliano Juanda
                  </p>
                  <p className={`${style.muted_profile_wrapper} my-0`}>
                    NIK : 3207012307030002
                  </p>
                  <p className={`${style.muted_profile_wrapper}`}>
                    Email : dendy@gmail.com
                  </p>
                </div>
              </Col>
              <Col md={2}>
                <div className="button ml-auto">
                  <Button
                    className={`${style.button_profile_wrapper} rounded-xl btn-block`}
                    onClick={() => {
                      setViewEdit(!viewEdit);
                      funcViewEdit(!viewEdit);
                    }}
                  >
                    Ubah Data
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Body>
          <Card.Footer className="bg-transparent border-0 px-2 pb-0 pt-2">
            <Navbar
              bg="transparent"
              variant="transparent"
              className={`pb-0 ${style.navbar_responsive}`}
            >
              <Container>
                <Nav className={`${style.navbar_profile_wrapper}`}>
                  <Link href="/peserta/profile" passHref>
                    <Nav.Link
                      className={`mr-9 ${
                        router.pathname === "/peserta/profile" &&
                        style.navbar_profile_active
                      }`}
                    >
                      Informasi Pribadi
                    </Nav.Link>
                  </Link>
                  <Link href="/peserta/profile/alamat" passHref>
                    <Nav.Link
                      className={`mr-9 ${
                        router.pathname === "/peserta/profile/alamat" &&
                        style.navbar_profile_active
                      }`}
                    >
                      Alamat
                    </Nav.Link>
                  </Link>
                  <Link href="/peserta/profile/pendidikan" passHref>
                    <Nav.Link
                      className={`mr-9 ${
                        router.pathname === "/peserta/profile/pendidikan" &&
                        style.navbar_profile_active
                      }`}
                    >
                      Pendidikan
                    </Nav.Link>
                  </Link>
                  <Link href="/peserta/profile/keterampilan" passHref>
                    <Nav.Link
                      className={`mr-9 ${
                        router.pathname === "/peserta/profile/keterampilan" &&
                        style.navbar_profile_active
                      }`}
                    >
                      Keterampilan
                    </Nav.Link>
                  </Link>
                  <Link href="/peserta/profile/pekerjaan" passHref>
                    <Nav.Link
                      className={`mr-9 ${
                        router.pathname === "/peserta/profile/pekerjaan" &&
                        style.navbar_profile_active
                      }`}
                    >
                      Pekerjaan
                    </Nav.Link>
                  </Link>
                </Nav>
              </Container>
            </Navbar>
          </Card.Footer>
        </Card>
      </Col>
    </>
  );
};

export default ProfileWrapper;
