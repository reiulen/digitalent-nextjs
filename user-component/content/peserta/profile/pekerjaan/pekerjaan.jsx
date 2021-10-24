import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getProfilePekerjaan } from "../../../../../redux/actions/pelatihan/profile.actions";

const Pekerjaan = ({ token }) => {
  const dispatch = useDispatch();

  const { error: errorPekerjaan, pekerjaan } = useSelector(
    (state) => state.dataPekerjaan
  );

  useEffect(() => {
    if (errorPekerjaan) {
      toast.error(errorPekerjaan);
    }
    dispatch(getProfilePekerjaan(token));
  }, [errorPekerjaan, dispatch]);

  return (
    <>
      <div className="mt-5 pekerjaan">
        <h3 className="font-weight-bolder mb-5">Pekerjaan</h3>
        <Row>
          <Col md={12}>
            <p className="text-neutral-body my-1">Status Pekerjaan</p>
            <p>{(pekerjaan && pekerjaan.status_pekerjaan) || "-"}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">Pekerjaan</p>
            <p>{(pekerjaan && pekerjaan.pekerjaan) || "-"}</p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">
              Perusahaan / Institusi Tempat Kerja
            </p>
            <p>{(pekerjaan && pekerjaan.perusahaan) || "-"}</p>
          </Col>
        </Row>

        <Row>
          <Col md={12}>
            <p className="text-neutral-body my-1">Penghasilan</p>
            <p>{(pekerjaan && pekerjaan.penghasilan === "1" ? "-" : pekerjaan.penghasilan) || "-"}</p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Pekerjaan;
