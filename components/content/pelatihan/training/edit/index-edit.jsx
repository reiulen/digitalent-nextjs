import dynamic from "next/dynamic";
import React, { useState } from "react";
import PageWrapper from "../../../../wrapper/page.wrapper";
import StepInputPelatihan from "../../../../StepInputPelatihan";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import { useDispatch, useSelector } from "react-redux";

// import AddTrainingStep1 from "./add-training-step1";
// import AddRegistrationStep2 from "./add-registration-step2";
// import AddCommitmentStep3 from "./add-commitment-step3";

const EditTrainingStep1 = dynamic(() => import("./edit-training-step1"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});
const EditRegistrationStep2 = dynamic(
  () => import("./edit-registration-step2"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);
const EditCommitmentStep3 = dynamic(() => import("./edit-commitment-step3"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});

import { clearErrors } from "../../../../../redux/actions/pelatihan/training.actions";

const IndexEdit = ({ token }) => {
  const dispatch = useDispatch();

  const [view, setView] = useState(1);

  const { loading, error, isUpdated } = useSelector(
    (state) => state.updateTraining
  );

  const stepView = () => {
    switch (view) {
      case 1:
        return (
          <EditTrainingStep1
            propsStep={(value) => setView(value)}
            token={token}
          />
        );
        break;
      case 2:
        return (
          <EditRegistrationStep2
            token={token}
            propsStep={(value) => setView(value)}
          />
        );
        break;
      case 3:
        return (
          <EditCommitmentStep3
            propsStep={(value) => setView(value)}
            token={token}
          />
        );
        break;
      default:
        return (
          <EditTrainingStep1
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
      <StepInputPelatihan
        step={view}
        title1="Edit Pelatihan"
        title2="Edit Form Pendaftaran"
        title3="Edit Form Komitmen"
      />
      <div className="col-lg-12 order-1 px-0">{stepView()}</div>
    </PageWrapper>
  );
};

export default IndexEdit;
