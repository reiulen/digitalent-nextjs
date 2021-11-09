import React from "react";
import { useRouter } from "next/router";

const StepReviewPelatihan = (props) => {
  const router = useRouter();

  let stepBg1 = "bg-neutral";
  let stepBg2 = "bg-neutral";
  let stepBg3 = "bg-neutral";
  let stepNumber1 = "btn-secondary text-white";
  let stepNumber2 = "btn-secondary text-white";
  let stepNumber3 = "btn-secondary text-white";
  let textHeader1 = "text-neutral-shade";
  let textHeader2 = "text-neutral-shade";
  let textHeader3 = "text-neutral-shade";
  let textDesc1 = "text-neutral-shade";
  let textDesc2 = "text-neutral-shade";
  let textDesc3 = "text-neutral-shade";

  let responsiveStep1 = "d-none d-md-block";
  let responsiveStep2 = "d-none d-md-block";
  let responsiveStep3 = "d-none d-md-block";

  if (props.step == 1) {
    stepBg1 = "bg-white";
    stepNumber1 = "btn-primary text-white";
    textHeader1 = "text-primary";
    textDesc1 = "text-dark";
    responsiveStep1 = "d-block";
  } else if (props.step == 2) {
    stepBg2 = "bg-white";
    stepNumber2 = "btn-primary text-white";
    textHeader2 = "text-primary";
    textDesc2 = "text-dark";
    responsiveStep2 = "d-block";
  } else if (props.step == 3) {
    stepBg3 = "bg-white";
    stepNumber3 = "btn-primary text-white";
    textHeader3 = "text-primary";
    textDesc3 = "text-dark";
    responsiveStep3 = "d-block";
  }
  return (
    <div className="col-12">
      <div className="row row-eq-height bg-gray-shade">
        <div
          className={`col-md-4 ${responsiveStep1}`}
          style={{ cursor: "pointer" }}
          onClick={() => router.push(`${props.link1}`)}
        >
          <div className="container-fluid py-0 pr-md-1 pr-0 pl-0">
            <div className="row row-eq-height h-100">
              <div className={`col-12 d-flex rounded-top h-100 ${stepBg1}`}>
                <div className="my-6 mx-3">
                  <button className={`btn ${stepNumber1} my-auto`}>
                    1
                  </button>
                </div>
                <div className="d-flex align-items-center mt-2">
                  <h6 className={`${textHeader1}`}>{props.title1}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`col-md-4 ${responsiveStep2}`}
          style={{ cursor: "pointer" }}
          onClick={() => router.push(`${props.link2}`)}
        >
          <div className="container-fluid py-0 px-md-1 px-0">
            <div className="row row-eq-height h-100">
              <div className={`col-12 d-flex rounded-top h-100 ${stepBg2}`}>
                <div className="my-6 mx-3">
                  <button className={`btn ${stepNumber2} my-auto`}>
                    2
                  </button>
                </div>
                <div className="d-flex align-items-center mt-2">
                  <h6 className={`${textHeader2}`}>{props.title2}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={`col-md-4 ${responsiveStep3}`}
          style={{ cursor: "pointer" }}
          onClick={() => router.push(`${props.link3}`)}
        >
          <div className="container-fluid py-0 pr-0 pl-0 pl-md-1">
            <div className="row row-eq-height h-100">
              <div className={`col-12 d-flex rounded-top h-100 ${stepBg3}`}>
                <div className="my-6 mx-3">
                  <button className={`btn ${stepNumber3} my-auto`}>
                    3
                  </button>
                </div>
                <div className="d-flex align-items-center mt-2">
                  <h6 className={`${textHeader3}`}>{props.title3}</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepReviewPelatihan;
