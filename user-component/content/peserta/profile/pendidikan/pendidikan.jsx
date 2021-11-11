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

  if (pendidikan !== undefined) {
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
              {pendidikan.jenjang === "Tidak Sekolah" && <p>-</p>}
              {pendidikan.jenjang === "TK" && (
                <p>
                  {pendidikan !== undefined && pendidikan.lainnya === "0"
                    ? "-"
                    : pendidikan.lainya}
                </p>
              )}
              {pendidikan.jenjang === "SD/Sederajat" && (
                <p>
                  {pendidikan !== undefined && pendidikan.lainnya === "0"
                    ? "-"
                    : pendidikan.lainya}
                </p>
              )}
              {pendidikan.jenjang === "SMP/Sederajat" && (
                <p>
                  {pendidikan !== undefined && pendidikan.lainnya === "0"
                    ? "-"
                    : pendidikan.lainya}
                </p>
              )}
              {pendidikan && pendidikan.jenjang === "D3" && (
                <p>
                  {pendidikan.asal_pendidikan === "0"
                    ? "-"
                    : pendidikan.asal_pendidikan}
                </p>
              )}
              {pendidikan && pendidikan.jenjang === "SMA/Sederajat" && (
                <p>
                  {pendidikan.asal_pendidikan === "0"
                    ? "-"
                    : pendidikan.asal_pendidikan}
                </p>
              )}
              {pendidikan && pendidikan.jenjang === "S1" && (
                <p>
                  {pendidikan.asal_pendidikan === "0"
                    ? "-"
                    : pendidikan.asal_pendidikan}
                </p>
              )}
              {pendidikan && pendidikan.jenjang === "S3" && (
                <p>
                  {pendidikan.asal_pendidikan === "0"
                    ? "-"
                    : pendidikan.asal_pendidikan}
                </p>
              )}
              {pendidikan && pendidikan.jenjang === "S2" && (
                <p>
                  {pendidikan.asal_pendidikan === "0"
                    ? "-"
                    : pendidikan.asal_pendidikan}
                </p>
              )}
            </Col>
            {pendidikan.jenjang === "TK" && (
              <Col md={6}>
                <p className="text-neutral-body my-1">Tahun Masuk</p>
                <p>
                  {((pendidikan &&
                    pendidikan !== undefined &&
                    pendidikan.tahun_masuk === 0) ||
                  (pendidikan !== undefined && pendidikan.tahun_masuk === 1)
                    ? "-"
                    : pendidikan !== undefined && pendidikan.tahun_masuk) ||
                    "-"}
                </p>
              </Col>
            )}
            {pendidikan.jenjang === "SD/Sederajat" && (
              <Col md={6}>
                <p className="text-neutral-body my-1">Tahun Masuk</p>
                <p>
                  {((pendidikan &&
                    pendidikan !== undefined &&
                    pendidikan.tahun_masuk === 0) ||
                  (pendidikan !== undefined && pendidikan.tahun_masuk === 1)
                    ? "-"
                    : pendidikan !== undefined && pendidikan.tahun_masuk) ||
                    "-"}
                </p>
              </Col>
            )}
            {pendidikan.jenjang === "SMP/Sederajat" && (
              <Col md={6}>
                <p className="text-neutral-body my-1">Tahun Masuk</p>
                <p>
                  {((pendidikan &&
                    pendidikan !== undefined &&
                    pendidikan.tahun_masuk === 0) ||
                  (pendidikan !== undefined && pendidikan.tahun_masuk === 1)
                    ? "-"
                    : pendidikan !== undefined && pendidikan.tahun_masuk) ||
                    "-"}
                </p>
              </Col>
            )}
            {pendidikan.jenjang === "SMA/Sederajat" && (
              <Col md={6}>
                <p className="text-neutral-body my-1">Tahun Masuk</p>
                <p>
                  {((pendidikan &&
                    pendidikan !== undefined &&
                    pendidikan.tahun_masuk === 0) ||
                  (pendidikan !== undefined && pendidikan.tahun_masuk === 1)
                    ? "-"
                    : pendidikan !== undefined && pendidikan.tahun_masuk) ||
                    "-"}
                </p>
              </Col>
            )}

            {pendidikan.jenjang === "D3" && (
              <Col md={6}>
                <p className="text-neutral-body my-1">Program Studi</p>
                <p>
                  {(pendidikan &&
                  pendidikan !== undefined &&
                  pendidikan.program_studi === "0"
                    ? "-"
                    : pendidikan !== undefined && pendidikan.program_studi) ||
                    "-"}
                </p>
              </Col>
            )}
            {pendidikan.jenjang === "S1" && (
              <Col md={6}>
                <p className="text-neutral-body my-1">Program Studi</p>
                <p>
                  {(pendidikan &&
                  pendidikan !== undefined &&
                  pendidikan.program_studi === "0"
                    ? "-"
                    : pendidikan !== undefined && pendidikan.program_studi) ||
                    "-"}
                </p>
              </Col>
            )}
            {pendidikan.jenjang === "S2" && (
              <Col md={6}>
                <p className="text-neutral-body my-1">Program Studi</p>
                <p>
                  {(pendidikan &&
                  pendidikan !== undefined &&
                  pendidikan.program_studi === "0"
                    ? "-"
                    : pendidikan !== undefined && pendidikan.program_studi) ||
                    "-"}
                </p>
              </Col>
            )}
            {pendidikan.jenjang === "S3" && (
              <Col md={6}>
                <p className="text-neutral-body my-1">Program Studi</p>
                <p>
                  {(pendidikan &&
                  pendidikan !== undefined &&
                  pendidikan.program_studi === "0"
                    ? "-"
                    : pendidikan !== undefined && pendidikan.program_studi) ||
                    "-"}
                </p>
              </Col>
            )}
          </Row>
          {pendidikan.jenjang === "D3" && (
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
                    : pendidikan !== undefined && pendidikan.tahun_masuk) ||
                    "-"}
                </p>
              </Col>
            </Row>
          )}
          {pendidikan.jenjang === "S1" && (
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
                    : pendidikan !== undefined && pendidikan.tahun_masuk) ||
                    "-"}
                </p>
              </Col>
            </Row>
          )}
          {pendidikan.jenjang === "S2" && (
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
                    : pendidikan !== undefined && pendidikan.tahun_masuk) ||
                    "-"}
                </p>
              </Col>
            </Row>
          )}
          {pendidikan.jenjang === "S3" && (
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
                    : pendidikan !== undefined && pendidikan.tahun_masuk) ||
                    "-"}
                </p>
              </Col>
            </Row>
          )}
          <Row>
            <Col md={12}>
              <p className="text-neutral-body my-1">Unggah Ijazah</p>
              <p>
                {(pendidikan !== undefined &&
                  pendidikan &&
                  pendidikan !== undefined &&
                  pendidikan.ijasah.split("/ijasah/")) ||
                  "-"}
              </p>
            </Col>
          </Row>
        </div>
      </>
    );
  } else {
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
              <p>-</p>
            </Col>
            <Col md={6}>
              <p className="text-neutral-body my-1">Program Studi</p>
              <p>-</p>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <p className="text-neutral-body my-1">IPK</p>
              <p>-</p>
            </Col>
            <Col md={6}>
              <p className="text-neutral-body my-1">Tahun Masuk</p>
              <p>-</p>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <p className="text-neutral-body my-1">Unggah Ijazah</p>
              <p>-</p>
            </Col>
          </Row>
        </div>
      </>
    );
  }
};

export default Pendidikan;
