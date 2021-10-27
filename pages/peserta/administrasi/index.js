import dynamic from "next/dynamic";

// import Layout from "../../../components/templates/layout.component";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions";
import { middlewareAuthPesertaSession } from "../../../utils/middleware/authMiddleware";
import {
  getAllRiwayatPelatihanPeserta,
  getDetailRiwayatPelatihan,
} from "../../../redux/actions/pelatihan/riwayat-pelatihan.actions";

const SeleksiAdministrasi = dynamic(
  () =>
    import(
      "../../../user-component/content/peserta/administrasi/seleksiAdmin.jsx"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

const BelumTersedia = dynamic(
  () =>
    import(
      "../../../user-component/content/peserta/administrasi/administrasi-belum-tersedia.jsx"
    ),
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

export default function RiwayatPelatihanPage(props) {
  const session = props.session.user.user.data.user;

  return (
    <>
      <Layout title="Administrasi" session={session}>
        {props.success ? (
          <SeleksiAdministrasi session={session} />
        ) : (
          <BelumTersedia />
        )}
      </Layout>
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

      let success = false;

      if (req.cookies.id_pelatihan) {
        await store.dispatch(
          getDetailRiwayatPelatihan(
            req.cookies.id_pelatihan,
            session.user.user.data.user.token
          )
        );
        success = true;
      } else {
        const { data } = await store.dispatch(
          getAllRiwayatPelatihanPeserta(session.user.user.data.user.token)
        );
        if (data) {
          const administrasi = data.list.filter((item) =>
            item.status.includes("administrasi")
          );
          if (administrasi) {
            await store.dispatch(
              getDetailRiwayatPelatihan(
                administrasi[0].id,
                session.user.user.data.user.token
              )
            );
            success = true;
          } else {
            success = false;
          }
        } else {
          success = false;
        }
      }

      await store.dispatch(getDataPribadi(session?.user.user.data.user.token));

      return {
        props: {
          data: "auth",
          session,
          title: "Administrasi Pelatihan - Peserta",
          success,
        },
      };
    }
);
