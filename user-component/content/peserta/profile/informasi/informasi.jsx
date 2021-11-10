import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { getDataPribadi } from "../../../../../redux/actions/pelatihan/function.actions";

const Informasi = ({ funcViewEdit, token }) => {
  const dispatch = useDispatch();
  const { error: errorDataPribadi, dataPribadi } = useSelector(
    (state) => state.getDataPribadi
  );

  useEffect(() => {
    dispatch(getDataPribadi(token));
  }, [dispatch, token]);

  return (
    <>
      <div className="informasi-pribadi">
        <h3 className="font-weight-bolder mb-5">Data Pribadi</h3>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Nama Lengkap</p>
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
            <p>{(dataPribadi && dataPribadi.nomor_handphone) || "-"}</p>
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
                moment(dataPribadi.tanggal_lahir).format("DD MMM YYYY")) ||
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
            <p>{(dataPribadi && dataPribadi.File_ktp.split("/ktp/")) || "-"}</p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Informasi;
