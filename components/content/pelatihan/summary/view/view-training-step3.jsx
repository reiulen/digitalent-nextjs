import React from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import ViewStep3Component from "../../training/components/view-training/view-step3.component";

import PageWrapper from "../../../../wrapper/page.wrapper";
import StepViewPelatihan from "../../../../StepViewPelatihan";

const ViewTrainingStep3 = () => {
  const router = useRouter();

  const { error: errorReview, review } = useSelector(
    (state) => state.getReviewStep3
  );

  const { id } = router.query;

  return (
    <PageWrapper>
      <StepViewPelatihan
        step={3}
        title1="Data Pelatihan"
        title2="Form Pendaftaran"
        title3="Form Komitmen"
        title4="Parameter"
        link1={`/pelatihan/rekap-pendaftaran/view-rekap-pendaftaran/${id}`}
        link2={`/pelatihan/rekap-pendaftaran/view-rekap-pendaftaran/view-form-pendaftaran/${id}`}
        link3={`/pelatihan/rekap-pendaftaran/view-rekap-pendaftaran/view-komitmen/${id}`}
        link4={`/pelatihan/rekap-pendaftaran/view-rekap-pendaftaran/view-parameter/${id}`}
      />

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-body py-4">
            <ViewStep3Component review={review} />
            <div className="button my-5">
              <div className="text-right">
                <button
                  className="btn btn-primary-rounded-full mr-2"
                  type="button"
                  onClick={() => router.push(`/pelatihan/rekap-pendaftaran`)}
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
