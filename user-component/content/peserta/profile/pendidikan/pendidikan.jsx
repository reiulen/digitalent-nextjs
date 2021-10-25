import React, { useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { getProfilePendidikan } from "../../../../../redux/actions/pelatihan/profile.actions";

const Pendidikan = ({ token }) => {
  const dispatch = useDispatch();

  const { error: errorPendidikan, pendidikan } = useSelector(
    (state) => state.dataPendidikan
  );

  useEffect(() => {
    // if (errorPendidikan) {
    //   toast.error(errorPendidikan);
    // }
    dispatch(getProfilePendidikan(token));
  }, [dispatch, token]);

  console.log(pendidikan, "<<<<< data");

  return (
    <>
      <div className="mt-5 pendidikan">
        <h3 className="font-weight-bolder mb-5">Pendidikan Terakhir</h3>
        <Row>
          <Col md={12}>
            <p className="text-neutral-body my-1">Jenjang Pendidikan</p>
            <p>{(pendidikan && pendidikan.jenjang) || "-"}</p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">
              Asal Sekolah / Perguruan Tinggi
            </p>
            <p>
              {(pendidikan !== undefined && pendidikan.asal_pendidikan === "0"
                ? "-"
                : pendidikan !== undefined && pendidikan.asal_pendidikan) ||
                "-"}
            </p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Program Studi</p>
            <p>
              {(pendidikan &&
              pendidikan !== undefined &&
              pendidikan.program_studi === "0"
                ? "-"
                : pendidikan !== undefined && pendidikan.program_studi) || "-"}
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="text-neutral-body my-1">IPK</p>
            <p>
              {(pendidikan &&
              pendidikan !== undefined &&
              pendidikan !== undefined &&
              pendidikan.ipk === "0"
                ? "-"
                : pendidikan !== undefined && pendidikan.ipk) || "-"}
            </p>
          </Col>
          <Col md={6}>
            <p className="text-neutral-body my-1">Tahun Masuk</p>
            <p>
              {((pendidikan &&
                pendidikan !== undefined &&
                pendidikan.tahun_masuk === 0) ||
              (pendidikan !== undefined && pendidikan.tahun_masuk === 1)
                ? "-"
                : pendidikan !== undefined && pendidikan.tahun_masuk) || "-"}
            </p>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <p className="text-neutral-body my-1">Unggah Ijazah</p>
            <p>
              {(pendidikan !== undefined &&
                pendidikan &&
                pendidikan !== undefined &&
                pendidikan.ijasah) ||
                "-"}
            </p>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Pendidikan;
