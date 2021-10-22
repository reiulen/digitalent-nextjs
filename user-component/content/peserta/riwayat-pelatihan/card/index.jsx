import React, { Fragment, useState } from "react";
import { Card, Col, Row, Badge, Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import AdministrasiMenungguJadwal from "./substansi-menunggu-jadwal";
import TestSubstansi from "./substansi-test-substansi";
import style from "../style.module.css";

const Administrasi = (props) => {
  console.log(props);
  switch (props.status) {
    case "menunggu jadwal":
      return (
        <Fragment>
          <AdministrasiMenungguJadwal />
        </Fragment>
      );
    case "tes substansi":
      return (
        <Fragment>
          <TestSubstansi />
        </Fragment>
      );
    default:
      return <div>mask default</div>;
  }
};

export default Administrasi;
