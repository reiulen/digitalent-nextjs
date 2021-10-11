import React, { Suspense } from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
// import AddTraining from "../../../../components/content/pelatihan/training/insert/add-training-step1";
// import IndexInsert from "../../../../components/content/pelatihan/training/insert/index-insert";
const IndexInsert = dynamic(
  () =>
    import(
      "../../../../components/content/pelatihan/training/insert/index-insert"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

import {
  getTrainingStep1,
  getRegistrationStep2,
  getCommitmentStep3,
  dropdownAkademi,
  dropdownTema,
  dropdownLevelPelatihan,
  dropdownMitra,
  dropdownZonasi,
  dropdownProvinsi,
  dropdownKabupaten,
} from "../../../../redux/actions/pelatihan/function.actions";

import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

export default function AddTrainingPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <IndexInsert token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "/login/admin",
            permanent: false,
          },
        };
      }

      await store.dispatch(getTrainingStep1());
      await store.dispatch(getRegistrationStep2());
      await store.dispatch(getCommitmentStep3());
      await store.dispatch(dropdownAkademi(session.user.user.data.token));
      await store.dispatch(dropdownTema(session.user.user.data.token));
      await store.dispatch(
        dropdownLevelPelatihan(session.user.user.data.token)
      );
      await store.dispatch(dropdownMitra(session.user.user.data.token));
      await store.dispatch(dropdownZonasi(session.user.user.data.token));
      await store.dispatch(dropdownProvinsi(session.user.user.data.token));
      await store.dispatch(dropdownKabupaten(session.user.user.data.token));

      return {
        props: { session, title: "Tambah Pelatihan - Pelatihan" },
      };
    }
);
