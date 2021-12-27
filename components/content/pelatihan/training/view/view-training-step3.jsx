import React from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import PageWrapper from "../../../../wrapper/page.wrapper";
import StepViewPelatihan from "../../../../StepViewPelatihan";
import ViewStep3Component from "../components/view-training/view-step3.component";

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
        link1={`/pelatihan/pelatihan/view-pelatihan/${id}`}
        link2={`/pelatihan/pelatihan/view-pelatihan/view-form-pendaftaran/${id}`}
        link3={`/pelatihan/pelatihan/view-pelatihan/view-komitmen/${id}`}
        link4={`/pelatihan/pelatihan/view-pelatihan/view-parameter/${id}`}
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
