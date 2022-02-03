import dynamic from "next/dynamic";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../redux/store";
import { middlewareAuthAdminSession } from "../../../utils/middleware/authMiddleware";

import {
  getDigitalentTotalPengguna,
  getDigitalentTotalDataPendaftar,
  getDetailAkademiPendaftar,
  getDetailAkademiPeserta,
} from "../../../redux/actions/dashboard-kabadan/dashboard/digitalent.actions";

const DashboardDetailTema = dynamic(
  () =>
    import(
      "../../../components/content/pelatihan/dashboard/dashboard-detail-tema"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function Dashboard(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DashboardDetailTema token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });
      const token_permission = req.cookies.token_permission;
      const middleware = middlewareAuthAdminSession(session);

      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }

      // await store.dispatch(
      //   getDetailAkademiPendaftar(
      //     session.user.user.data.token,
      //     token_permission,
      //     query.akademi_id
      //   )
      // );
      // await store.dispatch(
      //   getDetailAkademiPeserta(
      //     session.user.user.data.token,
      //     token_permission,
      //     query.akademi_id
      //   )
      // );
      // await store.dispatch(
      //   getDigitalentTotalDataPendaftar(
      //     session.user.user.data.token,
      //     token_permission
      //   )
      // );
      // await store.dispatch(
      //   getDigitalentTotalPengguna(
      //     session.user.user.data.token,
      //     token_permission
      //   )
      // );

      return {
        props: { session, title: "Dashboard - Pelatihan" },
      };
    }
);
