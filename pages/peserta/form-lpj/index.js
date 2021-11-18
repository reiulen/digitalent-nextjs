import React, { useEffect } from "react";

import { getSession } from "next-auth/client";

import LoadingSkeleton from "../../../components/LoadingSkeleton";
import dynamic from "next/dynamic";

import { wrapper } from "../../../redux/store";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions";
import { getDashboardPeserta } from "../../../redux/actions/pelatihan/dashboard-peserta.actions";

import { middlewareAuthPesertaSession } from "../../../utils/middleware/authMiddleware";
import { getPelatihan } from "../../../redux/actions/pelatihan/register-training.actions";
import { useDispatch, useSelector } from "react-redux";
import { getFormLPJ } from "../../../redux/actions/pelatihan/training.actions";

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
  const dispatch = useDispatch();
  const session = props.session.user.user.data.user;

  const { error: errorDashboard, dataDashboard } = useSelector(
    (state) => state.dashboardPeserta
  );

  const { pelatihan } = dataDashboard;

  useEffect(() => {
    if (pelatihan) {
      dispatch(getPelatihan(session.token, pelatihan.pelatihan_berjalan.id));
      dispatch(getFormLPJ(session.token, pelatihan.pelatihan_berjalan.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pelatihan, session]);

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Form LPJ" session={session}>
          <FormLpj token={session.token} />
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
      await store.dispatch(
        getDashboardPeserta(session?.user.user.data.user.token)
      );

      return {
        props: { data: "auth", session, title: "Form LPJ" },
      };
    }
);
