import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import { middlewareAuthAdminSession } from "../../utils/middleware/authMiddleware";
import { wrapper } from "../../redux/store";
import {
  getDigitalentTotalPengguna,
  getDigitalentStatistikAkademiPeserta,
  getDigitalentStatistikAkademiPendaftar,
  getDigitalentStatistikMitraPeserta,
  getDigitalentStatistikMitraPendaftar,
  getDigitalentTablePendaftaran,
  getDigitalentPesertaWilayah,
  getDigitalentProvinsiPeserta,
  getDigitalentProvinsiPendaftar,
  getDigitalentUmurPeserta,
  getDigitalentUmurPendaftar,
  getDigitalentJenisKelaminPeserta,
  getDigitalentJenisKelaminPendaftar,
  getDigitalentPendidikanPeserta,
  getDigitalentPendidikanPendaftar,
} from "../../redux/actions/dashboard-kabadan/dashboard/digitalent.actions";

export default function DashboardPage() {
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
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <div id="map" style={{ display: "none" }}>
          <MyMap />
        </div>
        <DashboardDigitalent />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });
      const middleware = middlewareAuthAdminSession(session);
      // console.log(session.user.user.data);
      if (!middleware.status) {
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getDigitalentTotalPengguna(session.user.user.data.token)
      );
      await store.dispatch(
        getDigitalentStatistikAkademiPeserta(session.user.user.data.token)
      );
      await store.dispatch(
        getDigitalentStatistikAkademiPendaftar(session.user.user.data.token)
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
        getDigitalentUmurPeserta(session.user.user.data.token)
      );
      await store.dispatch(
        getDigitalentUmurPendaftar(session.user.user.data.token)
      );
      await store.dispatch(
        getDigitalentJenisKelaminPeserta(session.user.user.data.token)
      );
      await store.dispatch(
        getDigitalentJenisKelaminPendaftar(session.user.user.data.token)
      );
      await store.dispatch(
        getDigitalentPendidikanPeserta(session.user.user.data.token)
      );
      await store.dispatch(
        getDigitalentPendidikanPendaftar(session.user.user.data.token)
      );

      return {
        props: { session, title: "Dashboard - Digitalent" },
      };
    }
);
