import React from "react";

const StepInput = ({ step }) => {
  let stepBg1 = "bg-light";
  let stepBg2 = "bg-light";
  let stepBg3 = "bg-light";
  let stepNumber1 = "text-primary";
  let stepNumber2 = "text-primary";
  let stepNumber3 = "text-primary";

  if (step == 1) {
    stepBg1 = "bg-white";
    stepNumber1 = "bg-primary text-white";
  } else if (step == 2) {
    stepBg2 = "bg-white";
    stepNumber2 = "bg-primary text-white";
  } else if (step == 3) {
    stepBg3 = "bg-white";
    stepNumber3 = "bg-primary text-white";
  }
  return (
    <div className="col-12">
      <div className="row bg-secondary">
        <div className={`col-4 d-flex rounded-top ${stepBg1}`}>
          <div className="my-5 mx-3">
            <h1 className={`badge badge-secondary h1 ${stepNumber1}`}>1</h1>
          </div>
          <div className="my-5">
            <h5>Buat Soal</h5>
            <p>Masukan Informasi Soal</p>
          </div>
        </div>
        <div className="col-4">
          <div className={`d-flex rounded-top ${stepBg2}`}>
            <div className="my-5 mx-3">
              <h1 className={`badge badge-secondary h1 ${stepNumber2}`}>2</h1>
            </div>
            <div className="my-5">
              <h5>Bank Soal</h5>
              <p>Masukan Soal</p>
            </div>
          </div>
        </div>
        <div className={`col-4 d-flex rounded-top ${stepBg3}`}>
          <div className="my-5 mx-3">
            <h1 className={`badge badge-secondary h1 ${stepNumber3}`}>3</h1>
          </div>
          <div className="my-5">
            <h5>Publish</h5>
            <p>Tentukan Publishnya</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepInput;
