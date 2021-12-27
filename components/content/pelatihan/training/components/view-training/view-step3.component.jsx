import React, { useState } from "react";

const ViewStep3Component = ({ review }) => {
  const [komitmenPeserta] = useState(review.komitmen);
  const [formKomitmen] = useState(review.deskripsi);
  return (
    <>
      <h3 className="font-weight-bolder pb-5 pt-4">Form Komitmen</h3>

      <div className="row">
        <div className="col-md-12">
          <p className="text-neutral-body mb-2 fz-14">Komitmen Peserta</p>
          <p className="text-dark">
            {komitmenPeserta === "1" ? "Ya" : "Tidak"}
          </p>
        </div>
        {komitmenPeserta === "1" && (
          <div className="col-md-12">
            <p className="text-neutral-body mb-2 fz-14">Form Komitmen</p>
            <div
              dangerouslySetInnerHTML={{
                __html: formKomitmen,
              }}
              style={{ overflowWrap: "break-word" }}
            ></div>
            {/* <textarea rows="6" className="form-control" disabled>
                    {formKomitmen}
                  </textarea> */}
          </div>
        )}
      </div>
    </>
  );
};

export default ViewStep3Component;
