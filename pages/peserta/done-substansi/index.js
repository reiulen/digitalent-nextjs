import { getSession } from "next-auth/client";

import LoadingSkeleton from "../../../components/LoadingSkeleton";
import dynamic from "next/dynamic";
import { wrapper } from "../../../redux/store";
import { getDataPribadi } from "../../../redux/actions/pelatihan/function.actions";
import { middlewareAuthPesertaSession } from "../../../utils/middleware/authMiddleware";

const Done = dynamic(() => import("../../../user-component/content/done"), {
  loading: function loadingNow() {
    return <LoadingSkeleton />;
  },
  ssr: false,
});

const Layout = dynamic(() =>
  import("../../../user-component/components/template/Layout.component")
);

export default function SubvitDone(props) {
  const session = props.session.user.user.data.user;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <Layout title="Selesai Test Substansi - Subvit" session={session}>
          <Done />
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
      await store.dispatch(getDataPribadi(session.user.user.data.user.token));

      return {
        props: { data: "auth", session, title: "Selesai Test Substansi" },
      };
    }
);
