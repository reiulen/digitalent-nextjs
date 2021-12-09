import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getProfileAlamat } from "../../../../../redux/actions/pelatihan/profile.actions";

const Alamat = ({ token }) => {
  const dispatch = useDispatch();

  const { error: errorAlamat, alamat } = useSelector(
    (state) => state.dataAlamat
  );

  useEffect(() => {
    // if (errorAlamat) {
    //   toast.error(errorAlamat);
    // }
    dispatch(getProfileAlamat(token));
  }, [dispatch]);

  return (
    <>
      <div className="mt-5 alamat">
        <h3 className="font-weight-bolder mb-5">Alamat</h3>
        <Row>
          <Col md={12}>
            <p className="text-neutral-body my-1">Alamat</p>
            <p>{(alamat && alamat.address_ktp) || "-"}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Provinsi</p>
            <p>{(alamat && alamat.provinsi_ktp) || "-"}</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Kota</p>
            <p>{(alamat && alamat.kota_ktp) || "-"}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Kecamatan</p>
            <p>{(alamat && alamat.kecamatan_ktp) || "-"}</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Desa / Kelurahan</p>
            <p>{(alamat && alamat.kelurahan_ktp) || "-"}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Kode Pos</p>
            <p>{(alamat && alamat.kode_pos) || "-"}</p>
          </Col>
        </Row>
        <hr />
        <h3 className="font-weight-bolder mb-3">Alamat Domisili</h3>
        <Row>
          <Col md={12}>
            <p className="text-neutral-body my-1">Alamat Domisili </p>
            <p>{(alamat && alamat.address) || "-"}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Provinsi</p>
            <p>{(alamat && alamat.provinsi) || "-"}</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Kota</p>
            <p>{(alamat && alamat.kota) || "-"}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Kecamatan</p>
            <p>{(alamat && alamat.kecamatan) || "-"}</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Desa / Kelurahan</p>
            <p>{(alamat && alamat.kelurahan) || "-"}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Kode Pos</p>
            <p>{(alamat && alamat.kode_pos) || "-"}</p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Alamat;
