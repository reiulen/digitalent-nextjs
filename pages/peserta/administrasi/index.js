import dynamic from "next/dynamic";

// import Layout from "../../../components/templates/layout.component";

import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { useRouter } from "next/router";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions";
import { middlewareAuthPesertaSession } from "../../../utils/middleware/authMiddleware";

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
      "../../../user-component/content/peserta/administrasi/belum-tersedia.jsx"
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
  const router = useRouter();
  console.log(router, "ini router ");
  return (
    <>
      <Layout title="Administrasi" session={session}>
        {router.query.status ? <SeleksiAdministrasi /> : <BelumTersedia />}
      </Layout>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });

<<<<<<< HEAD
      if (!session) {
        return {
          redirect: {
            destination: "/login",
            permanent: false,
          },
        };
      }
      const data = session.user.user.data;
      if (data.user.roles[0] !== "user") {
=======
      const middleware = middlewareAuthPesertaSession(session);

      if (!middleware.status) {
>>>>>>> 807b4a7de637fc677572fdc6da5861f3727a8ddd
        return {
          redirect: {
            destination: middleware.redirect,
            permanent: false,
          },
        };
      }
      await store.dispatch(getDataPribadi(session.user.user.data.user.token));

      return {
        props: { data: "auth", session, title: "Riwayat Pelatihan - Peserta" },
      };
    }
);
