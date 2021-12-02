import React, { useEffect } from "react";

import { getSession } from "next-auth/client";

import LoadingSkeleton from "../../../components/LoadingSkeleton";
import dynamic from "next/dynamic";
import { useSelector, useDispatch } from "react-redux";
import { wrapper } from "../../../redux/store";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions";
import { getDashboardPeserta } from "../../../redux/actions/pelatihan/dashboard-peserta.actions";
import { getPelatihan } from "../../../redux/actions/pelatihan/register-training.actions";
import { middlewareAuthPesertaSession } from "../../../utils/middleware/authMiddleware";

const DoneSurvey = dynamic(
  () => import("../../../user-component-new/content/peserta/done-survey/index"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

const Layout = dynamic(() =>
  import(
    "../../../user-component-new/components/template/Layout-peserta.component"
  )
);

export default function SubvitDone(props) {
  const dispatch = useDispatch();
  const session = props.session.user.user.data.user;

  const { error: errorDashboard, dataDashboard } = useSelector(
    (state) => state.dashboardPeserta
  );

  const { count, pelatihan, subvit } = dataDashboard;

  useEffect(() => {
    if (pelatihan) {
      dispatch(getPelatihan(session.token, pelatihan.pelatihan_berjalan.id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pelatihan, session]);

  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Selesai Survey - Subvit" session={session}>
          <DoneSurvey />
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
        props: { data: "auth", session, title: "Selesai Survey" },
      };
    }
);
