import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../../../utils/middleware/authMiddleware"
// import { getAllArtikel } from "../../../redux/actions/publikasi/artikel.actions";
import { wrapper } from "../../../../../redux/store";
import LoadingPage from "../../../../../components/LoadingPage";
import { getDetailLog } from "../../../../../redux/actions/site-management/settings/api.actions";
const TambahApi = dynamic(
  () =>
    import(
      "../../../../../components/content/site-management/settings/api/log-api"
    ),
  {
    loading: function loadingNow() {
      return <LoadingPage />;
    },
    ssr: false,
  }
);

export default function LogApiPage(props) {
  const session = props.session.user.user.data;
  
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <TambahApi token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req, query }) => {
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
      // if (!session) {
      //   return {
      //     redirect: {
      //       destination: "http://dts-dev.majapahit.id/login/admin",
      //       permanent: false,
      //     },
      //   };
      // }

      await store.dispatch(
        getDetailLog(query.id, session.user.user.data.token)
      );
      return {
        props: { session, title: "Log API - Site Management" },
      };
    }
);
