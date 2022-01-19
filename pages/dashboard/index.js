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
import { dropdownAkademi } from "../../redux/actions/pelatihan/function.actions";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import { getAllPermission } from "../../redux/actions/utils/utils.actions";

export default function DashboardPage(props) {
  const DashboardDigitalent = dynamic(
    () =>
      import(
        "../../components/content/dashboard-kabadan/digitalent/dashboard-digitalent"
      ),
    {
      loading: function loadingNow() {
        return <LoadingSkeleton />;
      },
      ssr: false,
    }
  );
  const MyMap = dynamic(
    () =>
      import(
        "../../components/content/dashboard-kabadan/component/map-digitalent.component"
      ),
    { ssr: false }
  );
  const session = props.session.user.user.data;
<<<<<<< HEAD
=======

>>>>>>> 3c80f1339543dfb371138ebe28b6f69fd4638a13
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
      const token_permission = req.cookies.token_permission;
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
      const data = await store.dispatch(
        getAllPermission(session.user.user.data.token)
      );

      const url = data?.data?.redirect;
      if (url && url != "/dashboard") {
        return {
          redirect: {
            destination: url,
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getDigitalentTotalDataPendaftar(
          session.user.user.data.token,
          token_permission
        )
      );
      await store.dispatch(
        getDigitalentTotalPengguna(
          session.user.user.data.token,
          token_permission
        )
      );
      await store.dispatch(
        getDigitalentStatistikAkademiPeserta(
          session.user.user.data.token,
          token_permission,
          yearNow
        )
      );
      await store.dispatch(
        getDigitalentStatistikAkademiPendaftar(
          session.user.user.data.token,
          token_permission,
          yearNow
        )
      );
      await store.dispatch(
        getDigitalentStatistikMitraPeserta(
          session.user.user.data.token,
          token_permission
        )
      );
      await store.dispatch(
        getDigitalentStatistikMitraPendaftar(
          session.user.user.data.token,
          token_permission
        )
      );
      await store.dispatch(
        getDigitalentTablePendaftaran(
          session.user.user.data.token,
          token_permission
        )
      );
      await store.dispatch(
        getDigitalentPesertaWilayah(
          session.user.user.data.token,
          token_permission
        )
      );
      await store.dispatch(
        getDigitalentProvinsiPeserta(
          session.user.user.data.token,
          token_permission
        )
      );
      await store.dispatch(
        getDigitalentProvinsiPendaftar(
          session.user.user.data.token,
          token_permission
        )
      );
      await store.dispatch(
        getDigitalentDataPribadi(session.user.user.data.token, token_permission)
      );
      await store.dispatch(
        dropdownAkademi(session.user.user.data.token, token_permission)
      );

      return {
        props: { session, title: "Dashboard - Digitalent" },
      };
    }
);
