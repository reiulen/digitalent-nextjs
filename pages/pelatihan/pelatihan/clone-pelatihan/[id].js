import React from "react";

import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { useRouter } from "next/router";

import { wrapper } from "../../../../redux/store";
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
  dropdownPenyelenggara,
  drowpdownFormBuilder,
} from "../../../../redux/actions/pelatihan/function.actions";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";
import {
  getEditTrainingStep1,
  getEditTrainingStep2,
  getEditTrainingStep3,
} from "../../../../redux/actions/pelatihan/training.actions";

const IndexEdit = dynamic(
  () =>
    import("../../../../components/content/pelatihan/training/clone/index-clone"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function EditTrainingPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <IndexEdit token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req, params }) => {
      const session = await getSession({ req });

      const middleware = middlewareAuthAdminSession(session);
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }
      await store.dispatch(
        dropdownLevelPelatihan(session.user.user.data.token)
      );
      await store.dispatch(dropdownPenyelenggara(session.user.user.data.token));
      await store.dispatch(dropdownMitra(session.user.user.data.token));
      await store.dispatch(dropdownZonasi(session.user.user.data.token));
      await store.dispatch(dropdownProvinsi(session.user.user.data.token));
      await store.dispatch(
        getEditTrainingStep1(query.id, session.user.user.data.token)
      );
      await store.dispatch(
        getEditTrainingStep2(query.id, session.user.user.data.token)
      );
      await store.dispatch(
        getEditTrainingStep3(query.id, session.user.user.data.token)
      );
      await store.dispatch(
        dropdownLevelPelatihan(session.user.user.data.token)
      );
      await store.dispatch(dropdownAkademi(session.user.user.data.token));
      await store.dispatch(drowpdownFormBuilder(session.user.user.data.token));
      return {
        props: { session, title: "Clone Pelatihan - Pelatihan" },
      };
    }
);
