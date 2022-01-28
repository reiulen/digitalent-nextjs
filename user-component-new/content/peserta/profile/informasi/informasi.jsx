import React, { useEffect, useState } from "react";
import { Row, Col, Button, Modal } from "react-bootstrap";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getDataPribadi } from "../../../../../redux/actions/pelatihan/function.actions";
import Image from "next/image";
import { PDFReader } from "react-read-pdf";
const Informasi = ({ funcViewEdit, token }) => {
  const dispatch = useDispatch();
  const { error: errorDataPribadi, dataPribadi } = useSelector(
    (state) => state.getDataPribadi
  );
  useEffect(() => {
    dispatch(getDataPribadi(token));
  }, [dispatch, token]);

  const [showModalKtp, setShowModalKtp] = useState(false);
  const handleClose = () => {
    setShowModalKtp(false);
  };

  const [provider, setProvider] = useState(dataPribadi?.phone_provider || "");

  const [providerImage, setProviderImage] = useState(
    "/assets/icon/phone_provider/default.png"
  );

  useEffect(() => {
    if (provider.includes("axis"))
      return setProviderImage(`/assets/icon/phone_provider/Axis.png`);
    if (provider.includes("byu"))
      return setProviderImage(`/assets/icon/phone_provider/Byu.png`);
    if (provider.includes("im3"))
      return setProviderImage(`/assets/icon/phone_provider/im3.png`);
    if (provider.includes("indosat"))
      return setProviderImage(`/assets/icon/phone_provider/Indosat.png`);
    if (provider.includes("smartfren"))
      return setProviderImage(`/assets/icon/phone_provider/Smartfren.png`);
    if (provider.includes("telkomsel"))
      return setProviderImage(`/assets/icon/phone_provider/Telkomsel.png`);
    if (provider.includes("tri"))
      return setProviderImage(`/assets/icon/phone_provider/Tri.png`);
    if (provider.includes("xl"))
      return setProviderImage(`/assets/icon/phone_provider/XL.png`);
  }, [provider]);

  return (
    <>
      <div className="informasi-pribadi">
        <h3 className="font-weight-bolder mb-5">Data Pribadi</h3>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Nama Lengkap (Sesuai KTP)</p>
            <p>{(dataPribadi && dataPribadi.name) || "-"}</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Email</p>
            <p>{(dataPribadi && dataPribadi.email) || "-"}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Nomor Identitas (KTP)</p>
            <p>{(dataPribadi && dataPribadi.nik) || "-"}</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Jenis Kelamin</p>
            <p>{(dataPribadi && dataPribadi.jenis_kelamin) || "-"}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">No Handphone</p>
            <div className="d-flex align-items-center position-relative">
              <Image
                src={providerImage}
                width={40}
                height={50}
                alt="provider"
                objectFit="contain"
              />
              <p className="m-0 ml-5">
                {(dataPribadi && dataPribadi.nomor_handphone) || "-"}
              </p>
            </div>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Agama</p>
            <p>{(dataPribadi && dataPribadi.agama) || "-"}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Tempat Lahir</p>
            <p>{(dataPribadi && dataPribadi.tempat_lahir) || "-"}</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Tanggal lahir</p>
            <p>
              {(dataPribadi &&
                moment(dataPribadi.tanggal_lahir).format("LL")) ||
                "-"}
            </p>
          </Col>
        </Row>
        <hr />
      </div>
      <div className="mt-5 kontak-darurat">
        <h3 className="font-weight-bolder mb-3">Kontak Darurat</h3>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Nama Kontak Darurat</p>
            <p>{(dataPribadi && dataPribadi.Nama_kontak_darurat) || "-"}</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Nomor Kontak Darurat</p>
            <p>{(dataPribadi && dataPribadi.nomor_handphone_darurat) || "-"}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Hubungan</p>
            <p>{(dataPribadi && dataPribadi.hubungan) || "-"}</p>
          </Col>
        </Row>
        <hr />
      </div>
      <div className="mt-5 berkas-darurat">
        <h3 className="font-weight-bolder mb-3">Berkas Pribadi</h3>
        <Row>
          <Col md={12}>
            <p className="text-neutral-body my-1">KTP</p>
            {dataPribadi && dataPribadi.File_ktp ? (
              <a
                className="text-primary cursor-pointer"
                onClick={() => {
                  setShowModalKtp(true);
                }}
              >
                Lihat KTP
              </a>
            ) : (
              <p>-</p>
            )}
          </Col>
        </Row>
      </div>

      <Modal show={showModalKtp} onHide={handleClose} centered>
        <Modal.Header>
          <Modal.Title>KTP</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center">
            {dataPribadi.File_ktp.includes("pdf") ? (
              <div
                className="overflow-auto mx-auto px-auto"
                style={{
                  height: 250,
                }}
              >
                <PDFReader
                  url={`${dataPribadi.file_path}${dataPribadi.File_ktp}`}
                  scale={0.9}
                />
              </div>
            ) : (
              <img
                src={`${dataPribadi.file_path}${dataPribadi.File_ktp}`}
                alt="file ktp"
                className="img-fluid"
              />
            )}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Informasi;
