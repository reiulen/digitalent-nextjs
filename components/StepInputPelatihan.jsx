import React from "react";

const StepInputPelatihan = ({ step, title1, title2, title3 }) => {
  let stepBg1 = "bg-neutral";
  let stepBg2 = "bg-neutral";
  let stepBg3 = "bg-neutral";
  let stepNumber1 = "text-white";
  let stepNumber2 = "text-white";
  let stepNumber3 = "text-white";
  let textHeader1 = "text-neutral-shade";
  let textHeader2 = "text-neutral-shade";
  let textHeader3 = "text-neutral-shade";
  let textDesc1 = "text-neutral-shade";
  let textDesc2 = "text-neutral-shade";
  let textDesc3 = "text-neutral-shade";

  let responsiveStep1 = "d-none d-md-block";
  let responsiveStep2 = "d-none d-md-block";
  let responsiveStep3 = "d-none d-md-block";

  if (step == 1) {
    stepBg1 = "bg-white";
    stepNumber1 = "bg-secondary text-white";
    textHeader1 = "text-primary";
    textDesc1 = "text-dark";
    responsiveStep1 = "d-block";
  } else if (step == 2) {
    stepBg2 = "bg-white";
    stepNumber2 = "bg-secondary text-white";
    textHeader2 = "text-primary";
    textDesc2 = "text-dark";
    responsiveStep2 = "d-block";
  } else if (step == 3) {
    stepBg3 = "bg-white";
    stepNumber3 = "bg-secondary text-white";
    textHeader3 = "text-primary";
    textDesc3 = "text-dark";
    responsiveStep3 = "d-block";
  }
  return (
    <div className="col-12">
      <div className="row row-eq-height bg-gray-shade">
        <div className={`col-md-4 ${responsiveStep1}`}>
          <div className="container-fluid py-0 pr-md-1 pr-0 pl-0">
            <div className="row row-eq-height h-100">
              <div className={`col-12 d-flex rounded-top h-100 ${stepBg1}`}>
                <div className="my-5 mx-3">
                  <h1 className={`badge badge-secondary h1 ${stepNumber1}`}>
                    1
                  </h1>
                </div>
                <div className="my-5">
                  <h5 className={`${textHeader1}`}>{title1}</h5>
                  <p className={`${textDesc1}`}>Masukan Informasi Pelatihan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`col-md-4 ${responsiveStep2}`}>
          <div className="container-fluid py-0 px-md-1 px-0">
            <div className="row row-eq-height h-100">
              <div className={`col-12 d-flex rounded-top h-100 ${stepBg2}`}>
                <div className="my-5 mx-3">
                  <h1 className={`badge badge-secondary h1 ${stepNumber2}`}>
                    2
                  </h1>
                </div>
                <div className="my-5">
                  <h5 className={`${textHeader2}`}>{title2}</h5>
                  <p className={`${textDesc2}`}>Buat Form Pendaftaran</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`col-md-4 ${responsiveStep3}`}>
          <div className="container-fluid py-0 pr-0 pl-0 pl-md-1">
            <div className="row row-eq-height h-100">
              <div className={`col-12 d-flex rounded-top h-100 ${stepBg3}`}>
                <div className="my-5 mx-3">
                  <h1 className={`badge badge-secondary h1 ${stepNumber3}`}>
                    3
                  </h1>
                </div>
                <div className="my-5">
                  <h5 className={`${textHeader3}`}>{title3}</h5>
                  <p className={`${textDesc3}`}>Buat Form Komitmen</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepInputPelatihan;
