import React from "react";

import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";

import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { wrapper } from "../../../../redux/store";
import { getFormLPJ } from '../../../../redux/actions/pelatihan/training.actions'
const AddFormLpj = dynamic(
  () =>
    import("../../../../components/content/pelatihan/training/add-form-lpj"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function AddFormLpjPage(props) {
  const session = props.session.user.user.data;

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <AddFormLpj token={session.token} />
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
      await store.dispatch(getFormLPJ(session.user.user.data.token, query.id))
      return {
        props: { session, title: "Tambah Form LPJ - Pelatihan" },
      };
    }
);
