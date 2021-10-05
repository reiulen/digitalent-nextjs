import React, { useState } from "react";
import PageWrapper from "../../../../wrapper/page.wrapper";
import StepInputPelatihan from "../../../../StepInputPelatihan";

import AddTrainingStep1 from "./add-training-step1";
import AddRegistrationStep2 from "./add-registration-step2";
import AddCommitmentStep3 from "./add-commitment-step3";

const IndexInsert = () => {
  const [view, setView] = useState(1);

  const stepView = () => {
    switch (view) {
      case 1:
        return <AddTrainingStep1 propsStep={(value) => setView(value)} />;
        break;
      case 2:
        return <AddRegistrationStep2 propsStep={(value) => setView(value)} />;
        break;
      case 3:
        return <AddCommitmentStep3 propsStep={(value) => setView(value)} />;
        break;
      default:
        return <AddTrainingStep1 propsStep={(value) => setView(value)} />;
        break;
    }
  };
  return (
    <PageWrapper>
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
