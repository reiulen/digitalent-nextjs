import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
// import { getAllArtikel } from "../../../redux/actions/publikasi/artikel.actions";
import { wrapper } from "../../../../../redux/store";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import { getDetailApi } from "../../../../../redux/actions/site-management/settings/api.actions";
import { middlewareAuthAdminSession } from "../../../../../utils/middleware/authMiddleware";

const DetailApi = dynamic(
  () =>
    import(
      "../../../../../components/content/site-management/settings/api/detail-api"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function DetailApiPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DetailApi token={session.token} />
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
      await store.dispatch(
        getDetailApi(query.id, session.user.user.data.token, req.cookies.token_permission)
      );
      return {
        props: { session, title: "Detail Api - Site Management" },
      };
    }
);
