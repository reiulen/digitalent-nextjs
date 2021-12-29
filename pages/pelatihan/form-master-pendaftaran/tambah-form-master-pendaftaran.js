import React from "react";
import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

const Insert = dynamic(
  () =>
    import(
      "../../../components/content/pelatihan/master-pendaftaran/insert-master-pelatihan"
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
  dropdownPenyelenggara,
} from "../../../redux/actions/pelatihan/function.actions";
import { getAllDataReference } from "../../../redux/actions/site-management/data-reference.actions";

import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";
import { wrapper } from "../../../redux/store";

export default function AddTrainingPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Insert token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
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
      const token_permission = req.cookies.token_permission;

      await store.dispatch(getRegistrationStep2());
      await store.dispatch(
        getAllDataReference(
          session.user.user.data.token,
          true,
          token_permission
        )
      );

      return {
        props: { session, title: "Tambah Pelatihan - Pelatihan" },
      };
    }
);
