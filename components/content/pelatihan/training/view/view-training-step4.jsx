import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import PageWrapper from "../../../../wrapper/page.wrapper";
import StepViewPelatihan from "../../../../StepViewPelatihan";

const ViewTrainingStep4 = () => {
  const router = useRouter();

  const { id } = router.query;

  const getReviewStep4 = useSelector((state) => state.getReviewStep4);

  const [substansi] = useState({
    value: getReviewStep4 ? getReviewStep4?.data.status_test_substansi : "",
    date:
      getReviewStep4.data.tanggal_test_substansi.start_at !== ""
        ? moment(getReviewStep4?.data.tanggal_test_substansi?.start_at).format(
            "DD MMMM YYYY"
          ) +
          " - " +
          moment(getReviewStep4?.data.tanggal_test_substansi?.end_at).format(
            "DD MMMM YYYY"
          )
        : "-",
  });
  const [midTest] = useState({
    value: getReviewStep4 ? getReviewStep4?.data.status_mid_test : "",
    date:
      getReviewStep4.data.tanggal_mid_test.start_at !== ""
        ? moment(getReviewStep4?.data.tanggal_mid_test?.start_at).format(
            "DD MMMM YYYY"
          ) +
          " - " +
          moment(getReviewStep4?.data.tanggal_mid_test?.end_at).format(
            "DD MMMM YYYY"
          )
        : "-",
  });
  const [survey] = useState({
    value: getReviewStep4 ? getReviewStep4?.data.status_survei : "",
    date:
      getReviewStep4.data.tanggal_survei.start_at !== ""
        ? moment(getReviewStep4?.data.tanggal_survei?.start_at).format(
            "DD MMMM YYYY"
          ) +
          " - " +
          moment(getReviewStep4?.data.tanggal_survei?.end_at).format(
            "DD MMMM YYYY"
          )
        : "-",
  });
  const [sertifikat] = useState({
    value: getReviewStep4 ? getReviewStep4?.data.status_sertifikat : "",
    date:
      getReviewStep4.data.tanggal_sertifikat.length > 0
        ? moment(getReviewStep4?.data.tanggal_sertifikat?.start_at).format(
            "DD MMMM YYYY"
          )
        : "-",
  });

  return (
    <PageWrapper>
      <StepViewPelatihan
        step={4}
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
            <h3 className="font-weight-bolder pb-5 pt-4">Parameter</h3>
            <div className="row">
              <div className="col-md-6">
                <p className="text-neutral-body">Test Substansi</p>
                <p
                  className={
                    substansi.value.includes("Telah") ? "text-success" : ""
                  }
                >
                  {substansi.value}
                </p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Tanggal</p>
                <p
                  className={
                    substansi.value.includes("Telah") ? "text-success" : ""
                  }
                >
                  {substansi.date}
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <p className="text-neutral-body">Mid Test</p>
                <p
                  className={
                    midTest.value.includes("Telah") ? "text-success" : ""
                  }
                >
                  {midTest.value}
                </p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Tanggal</p>
                <p
                  className={
                    midTest.value.includes("Telah") ? "text-success" : ""
                  }
                >
                  {midTest.date}
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <p className="text-neutral-body">Survey</p>
                <p
                  className={
                    survey.value.includes("Telah") ? "text-success" : ""
                  }
                >
                  {survey.value}
                </p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Tanggal</p>
                <p
                  className={
                    survey.value.includes("Telah") ? "text-success" : ""
                  }
                >
                  {survey.date}
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <p className="text-neutral-body">Sertifikat</p>
                <p
                  className={
                    sertifikat.value.includes("Telah") ? "text-success" : ""
                  }
                >
                  {sertifikat.value}
                </p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Tanggal</p>
                <p
                  className={
                    sertifikat.value.includes("Telah") ? "text-success" : ""
                  }
                >
                  {sertifikat.date}
                </p>
              </div>
            </div>

            <div className="button my-5">
              <div className="text-right">
                <button
                  className="btn btn-primary-rounded-full mr-2"
                  type="button"
                  onClick={() =>
                    router.push(
                      `/pelatihan/pelatihan/view-pelatihan/view-komitmen/${id}`
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

export default ViewTrainingStep4;
