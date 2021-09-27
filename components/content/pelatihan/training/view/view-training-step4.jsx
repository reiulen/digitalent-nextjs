import React, { useState } from "react";
import { useRouter } from "next/router";

import PageWrapper from "../../../../wrapper/page.wrapper";
import StepViewPelatihan from "../../../../StepViewPelatihan";

const ViewTrainingStep4 = () => {
  const router = useRouter();

  const [substansi] = useState({
    value: "Tersedia",
    date: "1 Oktober 2021 - 5 Oktober 2021",
  });
  const [midTest] = useState({
    value: "Tidak Tersedia",
    date: "-",
  });
  const [survey] = useState({
    value: "Tersedia",
    date: "1 Oktober 2021 - 5 Oktober 2021",
  });
  const [sertifikat] = useState({
    value: "Tidak Tersedia",
    date: "-",
  });

  return (
    <PageWrapper>
      <StepViewPelatihan
        step={4}
        title1="Data Pelatihan"
        title2="Form Pendaftaran"
        title3="Form Komitmen"
        title4="Parameter"
        link1={`/pelatihan/pelatihan/view-pelatihan/${1}`}
        link2={`/pelatihan/pelatihan/view-pelatihan/view-form-pendaftaran/${1}`}
        link3={`/pelatihan/pelatihan/view-pelatihan/view-komitmen/${1}`}
        link4={`/pelatihan/pelatihan/view-pelatihan/view-parameter/${1}`}
      />

      <div className="col-lg-12 order-1 px-0">
        <div className="card card-custom card-stretch gutter-b">
          <div className="card-body py-4">
            <h3 className="font-weight-bolder pb-5 pt-4">Parameter</h3>
            <div className="row">
              <div className="col-md-6">
                <p className="text-neutral-body">Test Substansi</p>
                <p>{substansi.value}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Tanggal</p>
                <p className="text-success">{substansi.date}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <p className="text-neutral-body">Mid Test</p>
                <p>{midTest.value}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Tanggal</p>
                <p className="text-success">{midTest.date}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <p className="text-neutral-body">Survey</p>
                <p>{survey.value}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Tanggal</p>
                <p className="text-success">{survey.date}</p>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <p className="text-neutral-body">Sertifikat</p>
                <p>{sertifikat.value}</p>
              </div>
              <div className="col-md-6">
                <p className="text-neutral-body">Tanggal</p>
                <p className="text-success">{sertifikat.date}</p>
              </div>
            </div>

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

export default ViewTrainingStep4;
