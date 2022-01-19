import React, { useState } from "react";
import { useRouter } from "next/router";

import PageWrapper from "../../../wrapper/page.wrapper";
import { useSelector } from "react-redux";
import OptionsReference from "../training/components/option-reference.component";
import CheckboxReference from "../training/components/checkbox-reference.component";
import RadioReference from "../training/components/radio-reference.component";
import ViewStep2Component from "../training/components/view-training/view-step2.component";

const ViewTrainingStep2 = ({ token }) => {
  const router = useRouter();

  const { form } = useSelector((state) => state.getDetailMasterPelatihan);
  const [titleForm] = useState(form.data.judul_form);

  return (
    <PageWrapper>
      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-body py-4">
            <ViewStep2Component
              titleForm={titleForm}
              formBuilder={form.data.formBuilder}
              token={token}
            />
            <div className="button my-5">
              <div className="text-right">
                <button
                  className="btn btn-primary-rounded-full mr-2"
                  type="button"
                  onClick={() => router.back()}
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

export default ViewTrainingStep2;
