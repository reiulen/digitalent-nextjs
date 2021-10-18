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

const ProfileWrapper = ({
  propsEdit,
  propsViewProfile,
  funcViewEdit,
  funcViewProfile,
}) => {
  const router = useRouter();
  const [viewEdit, setViewEdit] = useState(propsEdit);
  const [viewProvile, setViewProfile] = useState(propsViewProfile);

  return (
    <>
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
                    className={`${
                      viewEdit
                        ? style.button_profile_edit
                        : style.button_profile_wrapper
                    } rounded-xl btn-block`}
                    onClick={() => {
                      setViewEdit(!viewEdit);
                      funcViewEdit(!viewEdit);
                    }}
                  >
                    {viewEdit ? "Simpan" : "Ubah Data"}
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
                  <Nav.Link
                    className={`mr-9 ${
                      viewProvile === 1 && style.navbar_profile_active
                    }`}
                    onClick={() => {
                      funcViewProfile(1);
                      setViewProfile(1);
                    }}
                  >
                    Informasi Pribadi
                  </Nav.Link>
                  <Nav.Link
                    className={`mr-9 ${
                      viewProvile === 2 && style.navbar_profile_active
                    }`}
                    onClick={() => {
                      funcViewProfile(2);
                      setViewProfile(2);
                    }}
                  >
                    Alamat
                  </Nav.Link>
                  <Nav.Link
                    className={`mr-9 ${
                      viewProvile === 3 && style.navbar_profile_active
                    }`}
                    onClick={() => {
                      funcViewProfile(3);
                      setViewProfile(3);
                    }}
                  >
                    Pendidikan
                  </Nav.Link>
                  <Nav.Link
                    className={`mr-9 ${
                      viewProvile === 4 && style.navbar_profile_active
                    }`}
                    onClick={() => {
                      funcViewProfile(4);
                      setViewProfile(4);
                    }}
                  >
                    Keterampilan
                  </Nav.Link>
                  <Nav.Link
                    className={`mr-9 ${
                      viewProvile === 5 && style.navbar_profile_active
                    }`}
                    onClick={() => {
                      funcViewProfile(5);
                      setViewProfile(5);
                    }}
                  >
                    Pekerjaan
                  </Nav.Link>
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
