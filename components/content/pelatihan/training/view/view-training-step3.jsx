import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import PageWrapper from "../../../../wrapper/page.wrapper";
import StepViewPelatihan from "../../../../StepViewPelatihan";

const ViewTrainingStep3 = () => {
  const router = useRouter();

  const { error: errorReview, review } = useSelector(
    (state) => state.getReviewStep3
  );

  const { id } = router.query;

  const [komitmenPeserta] = useState(review.komitmen === "1" ? "Ya" : "Tidak");
  const [formKomitmen] = useState(review.deskripsi || "-");

  return (
    <PageWrapper>
      <StepViewPelatihan
        step={3}
        title1="Data Pelatihan"
        title2="Form Pendaftaran"
        title3="Form Komitmen"
        title4="Parameter"
        link1={`/pelatihan/pelatihan/view-pelatihan/${id}`}
        link2={`/pelatihan/pelatihan/view-pelatihan/view-form-pendaftaran/${id}`}
        link3={`/pelatihan/pelatihan/view-pelatihan/view-komitmen/${id}`}
        link4={`/pelatihan/pelatihan/view-pelatihan/view-parameter/${id}`}
      />

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-body py-4">
            <h3 className="font-weight-bolder pb-5 pt-4">Form Komitmen</h3>

            <div className="row">
              <div className="col-md-12">
                <p className="text-neutral-body mb-2 fz-14">Komitmen Peserta</p>
                <p className="fz-16" style={{ color: "#1f1f1f" }}>
                  {komitmenPeserta}
                </p>
              </div>
              {review.komitmen === "1" && (
                <div className="col-md-12 mt-4">
                  <p className="text-neutral-body mb-2 fz-14">Form Komitmen</p>
                  <div
                    className="border px-4 py-4 rounded text-gray"
                    dangerouslySetInnerHTML={{ __html: formKomitmen }}
                  />
                </div>
              )}
            </div>

            <div className="button my-5">
              <div className="text-right">
                <button
                  className="btn btn-primary-rounded-full mr-2"
                  type="button"
                  onClick={() =>
                    router.push(
                      `/pelatihan/pelatihan/view-pelatihan/view-form-pendaftaran/${id}`
                    )
                  }
                >
                  Kembali
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default ViewTrainingStep3;
