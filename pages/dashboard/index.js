import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import { middlewareAuthAdminSession } from "../../utils/middleware/authMiddleware";
import { wrapper } from "../../redux/store";
import {
  getDigitalentTotalDataPendaftar,
  getDigitalentTotalPengguna,
  getDigitalentStatistikAkademiPeserta,
  getDigitalentStatistikAkademiPendaftar,
  getDigitalentStatistikMitraPeserta,
  getDigitalentStatistikMitraPendaftar,
  getDigitalentTablePendaftaran,
  getDigitalentPesertaWilayah,
  getDigitalentProvinsiPeserta,
  getDigitalentProvinsiPendaftar,
  getDigitalentDataPribadi,
} from "../../redux/actions/dashboard-kabadan/dashboard/digitalent.actions";

export default function DashboardPage(props) {
  const DashboardDigitalent = dynamic(
    () =>
      import(
        "../../components/content/dashboard-kabadan/digitalent/dashboard-digitalent"
      ),
    { ssr: false }
  );
  const MyMap = dynamic(
    () =>
      import(
        "../../components/content/dashboard-kabadan/component/map-digitalent.component"
      ),
    { ssr: false }
  );
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div id="map" style={{ display: "none" }}>
          <MyMap />
        </div>
        <DashboardDigitalent token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });
      const middleware = middlewareAuthAdminSession(session);
      const yearNow = new Date().getFullYear();
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getDigitalentTotalDataPendaftar(session.user.user.data.token)
      );
      await store.dispatch(
        getDigitalentTotalPengguna(session.user.user.data.token)
      );
      await store.dispatch(
        getDigitalentStatistikAkademiPeserta(
          session.user.user.data.token,
          yearNow
        )
      );
      await store.dispatch(
        getDigitalentStatistikAkademiPendaftar(
          session.user.user.data.token,
          yearNow
        )
      );
      await store.dispatch(
        getDigitalentStatistikMitraPeserta(session.user.user.data.token)
      );
      await store.dispatch(
        getDigitalentStatistikMitraPendaftar(session.user.user.data.token)
      );
      await store.dispatch(
        getDigitalentTablePendaftaran(session.user.user.data.token)
      );
      await store.dispatch(
        getDigitalentPesertaWilayah(session.user.user.data.token)
      );
      await store.dispatch(
        getDigitalentProvinsiPeserta(session.user.user.data.token)
      );
      await store.dispatch(
        getDigitalentProvinsiPendaftar(session.user.user.data.token)
      );
      await store.dispatch(
        getDigitalentDataPribadi(session.user.user.data.token)
      );

      return {
        props: { session, title: "Dashboard - Digitalent" },
      };
    }
);
