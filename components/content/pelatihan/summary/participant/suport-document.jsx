import React from "react";

const SuportDocument = ({ commitment, lpj, saran }) => {
  return (
    <>
      {commitment && commitment.komitment === "1" && (
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header pb-0">
            <h1
              className="card-title text-dark mt-2"
              style={{ fontSize: "24px" }}
            >
              Form Komitmen
            </h1>
          </div>

          <div className="card-body">
            <p className="text-neutral-body my-0">Komitmen Peserta</p>
            <p className="text-dark">
              <div
                dangerouslySetInnerHTML={{ __html: commitment.deskripsi }}
                style={{ overflowWrap: "break-word" }}
              ></div>
            </p>

            <h6 className="font-weight-bolder pb-5 pt-4">
              Telah Menyatakan Menyetujui dengan sebenarnya secara sadar dan
              tanpa paksaan
            </h6>

            <div className="row">
              <div className="col-md-6">
                <p className="text-neutral-body my-0">Tanggal Menyatakan</p>
                <p className="text-dark">{commitment.date}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body my-0">Waktu</p>
                <p className="text-dark">{commitment.waktu}</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {lpj && lpj.form_lpj && lpj.form_lpj.length !== 0 && (
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-header pb-0">
            <h1
              className="card-title text-dark mt-2"
              style={{ fontSize: "24px" }}
            >
              Form LPJ
            </h1>
          </div>

          <div className="card-body">
            <h5 className="font-weight-bolder pb-5">Pelaksanaan Kegiatan</h5>
            {lpj.form_lpj.map((row, i) => (
              <div className="row mb-3" key={i}>
                {/* <div className="col-md-10">
                <p className="text-neutral-body my-0">Uraian {i + 1}</p>
                <p className="text-dark">{row.uraian}</p>
              </div>
              <div className="col-md-2">
                <p className="text-dark my-0">Checklis</p>
                <div className="form-check mt-2">
                  <input
                    type="checkbox"
                    name="reminder"
                    className="form-check-input"
                    value={true}
                    checked={row.value === true}
                    disabled
                  />
                </div>
              </div> */}
              </div>
            ))}

            <h5 className="font-weight-bolder pb-5">
              Saran / Rekomendasi Pelaksanaan Kegiatan
            </h5>

            <p className="text-neutral-body my-0">Detail Saran</p>
            <p className="text-dark">{lpj.saran || "-"}</p>

            {lpj.menyetujui === "1" ? (
              <h5 className="font-weight-bolder py-5">
                Telah Menyatakan Menyetujui dengan sebenarnya secara sadar dan
                tanpa paksaan dan telah menerima segala hak yang telah disetujui
              </h5>
            ) : (
              "-"
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SuportDocument;
