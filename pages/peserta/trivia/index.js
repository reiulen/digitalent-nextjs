import dynamic from "next/dynamic";

// import Layout from "../../../components/templates/layout.component";
import { wrapper } from "../../../redux/store";
import { getSession } from "next-auth/client";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import { middlewareAuthPesertaSession } from "../../../utils/middleware/authMiddleware";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions";
import {
  getAllRiwayatPelatihanPeserta,
  getDetailRiwayatPelatihan,
} from "../../../redux/actions/pelatihan/riwayat-pelatihan.actions";

const TriviaPage = dynamic(
  () => import("../../../user-component-new/content/peserta/trivia"),
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

const BelumTersedia = dynamic(
  () =>
    import(
      "../../../user-component-new/content/peserta/test-substansi/belum-tersedia.jsx"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function TestSubstansiPage(props) {
  const session = props.session.user.user.data.user;
  return (
    <>
      <Layout title="TRIVIA" session={session}>
        {props.success ? <TriviaPage session={session} /> : <BelumTersedia />}
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
      if (!req.cookies.id_pelatihan) {
        const { data } = await store.dispatch(
          getAllRiwayatPelatihanPeserta(session.user.user.data.user.token)
        );
        if (!data) {
          return (success = false);
        } else {
          const trivia = data.list.filter((item) => item.status === "trivia");
          if (trivia.length > 0) {
            await store.dispatch(
              getDetailRiwayatPelatihan(
                trivia[0].id,
                session.user.user.data.user.token
              )
            );
            success = true;
          } else {
            success = false;
          }
        }
      } else {
        await store.dispatch(
          getDetailRiwayatPelatihan(
            req.cookies.id_pelatihan,
            session.user.user.data.user.token
          )
        );
        success = true;
      }
      if (session) {
        await store.dispatch(
          getDataPribadi(session?.user.user.data.user.token)
        );
      }

      return {
        props: { data: "auth", session, title: "TRIVIA - Subvit", success },
      };
    }
);
