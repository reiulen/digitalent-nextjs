import React, { useEffect } from "react";

import { getSession } from "next-auth/client";

import LoadingSkeleton from "../../../components/LoadingSkeleton";
import dynamic from "next/dynamic";

import { wrapper } from "../../../redux/store";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions";
import { getDashboardPeserta } from "../../../redux/actions/pelatihan/dashboard-peserta.actions";

import { middlewareAuthPesertaSession } from "../../../utils/middleware/authMiddleware";

const FormLpj = dynamic(
  () => import("../../../user-component/content/form-lpj/index"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

const Layout = dynamic(() =>
  import("../../../user-component/components/template/Layout.component")
);

export default function FormLPJ(props) {
  const session = props.session.user.user.data.user;

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Form LPJ" session={session}>
          <FormLpj />
        </Layout>
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });

      const middleware = middlewareAuthPesertaSession(session);

      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }
      await store.dispatch(getDataPribadi(session?.user.user.data.user.token));

      return {
        props: { data: "auth", session, title: "Form LPJ" },
      };
    }
);
