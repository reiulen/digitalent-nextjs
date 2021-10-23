import dynamic from "next/dynamic";
import React, { useState } from "react";
import PageWrapper from "../../../../wrapper/page.wrapper";
import StepInputPelatihan from "../../../../StepInputPelatihan";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import { useDispatch, useSelector } from "react-redux";

// import AddTrainingStep1 from "./add-training-step1";
// import AddRegistrationStep2 from "./add-registration-step2";
// import AddCommitmentStep3 from "./add-commitment-step3";

const AddTrainingStep1 = dynamic(() => import("./add-training-step1"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});
const AddRegistrationStep2 = dynamic(() => import("./add-registration-step2"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});
const AddCommitmentStep3 = dynamic(() => import("./add-commitment-step3"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});

import { clearErrors } from "../../../../../redux/actions/pelatihan/training.actions";

const IndexInsert = ({ token }) => {
  const dispatch = useDispatch();

  const [view, setView] = useState(1);

  const { training, loading, success, error } = useSelector(
    (state) => state.newTraining
  );

  const stepView = () => {
    switch (view) {
      case 1:
        return (
          <AddTrainingStep1
            propsStep={(value) => setView(value)}
            token={token}
          />
        );
        break;
      case 2:
        return <AddRegistrationStep2 propsStep={(value) => setView(value)} />;
        break;
      case 3:
        return (
          <AddCommitmentStep3
            propsStep={(value) => setView(value)}
            token={token}
          />
        );
        break;
      default:
        return (
          <AddTrainingStep1
            propsStep={(value) => setView(value)}
            token={token}
          />
        );
        break;
    }
  };

  const handleResetError = () => {
    if (error) {
      dispatch(clearErrors());
    }
  };

  return (
    <PageWrapper>
      {error && (
        <div
          className="alert alert-custom alert-light-danger fade show mb-5"
          role="alert"
        >
          <div className="alert-icon">
            <i className="flaticon-warning"></i>
          </div>
          <div className="alert-text">{error}</div>
          <div className="alert-close">
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
              onClick={handleResetError}
            >
              <span aria-hidden="true">
                <i className="ki ki-close"></i>
              </span>
            </button>
          </div>
        </div>
      )}
      <StepInputPelatihan
        step={view}
        title1="Tambah Pelatihan"
        title2="Tambah Form Pendaftaran"
        title3="Tambah Form Komitmen"
      />
      <div className="col-lg-12 order-1 px-0">{stepView()}</div>
    </PageWrapper>
  );
};

export default IndexInsert;
