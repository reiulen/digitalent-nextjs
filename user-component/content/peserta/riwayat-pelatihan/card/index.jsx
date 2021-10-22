import React, { Fragment, useState } from "react";
import { Card, Col, Row, Badge, Button } from "react-bootstrap";
import Link from "next/link";
import Image from "next/image";
import AdministrasiMenungguJadwal from "./substansi-menunggu-jadwal";
import TestSubstansi from "./substansi-test-substansi";
import LolosSubstansi from "./substansi-lolos-substansi";
import TidakLulus from "./tidak-lulus";
import SeleksiAdministrasi from "./administrasi-seleksi-administrasi";
import LolosAdministrasi from "./administrasi-lolos-administrasi";
import IkutiPelatihan from "./pelatihan-ikuti-pelatihan";
import MidTest from "./pelatihan-kerjakan-mid-test";
import Trivia from "./pelatihan-kerjakan-trivia";
import LulusPelatihan from "./pelatihan-lulus-pelatihan";
import IsiSurvey from "./survey-isi-survey";
import IsiLpj from "./survey-isi-lpj";
import style from "../style.module.css";
import TestCardTemplate from "./testCardTemplate";

const Administrasi = props => {
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
    case "lolos substansi":
      return (
        <Fragment>
          <LolosSubstansi />
        </Fragment>
      );
    case "seleksi administrasi":
      return (
        <Fragment>
          <SeleksiAdministrasi />
        </Fragment>
      );
    case "lolos administrasi":
      return (
        <Fragment>
          <LolosAdministrasi />
        </Fragment>
      );
    case "ikuti pelatihan":
      return (
        <Fragment>
          <IkutiPelatihan />
        </Fragment>
      );
    case "kerjakan mid test":
      return (
        <Fragment>
          <MidTest />
        </Fragment>
      );
    case "kerjakan trivia":
      return (
        <Fragment>
          <Trivia />
        </Fragment>
      );
    case "lulus pelatihan":
      return (
        <Fragment>
          <LulusPelatihan />
        </Fragment>
      );
    case "isi survey":
      return (
        <Fragment>
          <IsiSurvey />
        </Fragment>
      );
    case "isi lpj":
      return (
        <Fragment>
          <IsiLpj />
        </Fragment>
      );
    case "test":
      return (
        <Fragment>
          <TestCardTemplate data={props} />
        </Fragment>
      );
    default:
      return (
        <Fragment>
          <TidakLulus />
        </Fragment>
      );
  }
};

export default Administrasi;
