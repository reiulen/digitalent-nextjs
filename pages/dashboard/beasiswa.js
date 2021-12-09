import { getSession } from "next-auth/client";
import dynamic from "next/dynamic";
import { middlewareAuthAdminSession } from "../../utils/middleware/authMiddleware";

import {
  getBeasiswaTotalPengguna,
  getBeasiswaTotalPendaftar,
  getBeasiswaStatistikDalam,
  getBeasiswaStatistikLuar,
  getBeasiswaPendaftarWilayah,
  getBeasiswaProvinsiPendaftar,
  getBeasiswaProvinsiAwardee,
  getBeasiswaUniversitasDalam,
  getBeasiswaUniversitasLuar,
  getBeasiswaAlumni,
  getBeasiswaAwardee,
  getBeasiswaYear,
} from "../../redux/actions/dashboard-kabadan/dashboard/beasiswa.actions";
import { getDigitalentTotalPengguna } from "../../redux/actions/dashboard-kabadan/dashboard/digitalent.actions";

import { wrapper } from "../../redux/store";

export default function DashboardBeasiswaPage(props) {
  const DashboardBeasiswa = dynamic(
    () =>
      import(
        "../../components/content/dashboard-kabadan/beasiswa/dashboard-beasiswa"
      ),
    { ssr: false }
  );
  const MyMap = dynamic(
    () =>
      import(
        "../../components/content/dashboard-kabadan/component/map-beasiswa.component"
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
        <DashboardBeasiswa token={session.token} />
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

      await store.dispatch(
        getDigitalentTotalPengguna(session.user.user.data.token)
      );

      await store.dispatch(
        getBeasiswaTotalPengguna(session.user.user.data.token)
      );
      await store.dispatch(
        getBeasiswaTotalPendaftar(session.user.user.data.token)
      );
      await store.dispatch(
        getBeasiswaStatistikDalam(session.user.user.data.token)
      );
      await store.dispatch(
        getBeasiswaStatistikLuar(session.user.user.data.token)
      );
      await store.dispatch(
        getBeasiswaPendaftarWilayah(session.user.user.data.token)
      );
      await store.dispatch(
        getBeasiswaProvinsiPendaftar(session.user.user.data.token)
      );
      await store.dispatch(
        getBeasiswaProvinsiAwardee(session.user.user.data.token)
      );
      await store.dispatch(
        getBeasiswaUniversitasDalam(session.user.user.data.token)
      );
      await store.dispatch(
        getBeasiswaUniversitasLuar(session.user.user.data.token)
      );
      await store.dispatch(getBeasiswaAlumni(session.user.user.data.token));
      await store.dispatch(getBeasiswaAwardee(session.user.user.data.token));
      await store.dispatch(getBeasiswaYear(session.user.user.data.token));

      return {
        props: { session, title: "Dashboard - Beasiswa" },
      };
    }
);
