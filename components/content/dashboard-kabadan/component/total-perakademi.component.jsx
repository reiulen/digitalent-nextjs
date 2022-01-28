import React from "react";
import { useRouter } from "next/router";
import { helperFormatMoney } from "../../../../utils/middleware/helper";

const TotalPerAkademi = ({
  group,
  link,
  pendaftar,
  peserta,
  lulus,
  sertifikasi,
}) => {
  const router = useRouter();
  return (
    <div
      className="card"
      onClick={() => router.push(link)}
      style={{ cursor: "pointer" }}
    >
      <div className="card-body">
        <div className="text-center">
          <p className="text-dashboard-neutral fw-500">{group}</p>
        </div>
        <div className="row">
          <div className="col-md-6 text-center border-right-lg border-light-dark">
            <h2 className="fw-700 fz-32">{helperFormatMoney(pendaftar)}</h2>
            <p className="text-dashboard-neutral-body fz-14">Pendaftar</p>
          </div>
          <div className="col-md-6 text-center">
            <h2 className="fw-700 fz-32">{helperFormatMoney(peserta)}</h2>
            <p className="text-dashboard-neutral-body fz-14">Peserta</p>
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-md-6 text-center border-right-lg border-light-dark">
            <h2 className="fw-700 fz-32">{helperFormatMoney(lulus)}</h2>
            <p className="text-dashboard-neutral-body fz-14">Lulus</p>
          </div>
          <div className="col-md-6 text-center">
            <h2 className="fw-700 fz-32">{helperFormatMoney(sertifikasi)}</h2>
            <p className="text-dashboard-neutral-body fz-14">Sertifikasi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalPerAkademi;
