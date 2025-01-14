import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
// import { getAllArtikel } from "../../../redux/actions/publikasi/artikel.actions";
import { wrapper } from "../../../../redux/store";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { getDataGeneral } from "../../../../redux/actions/site-management/settings/general.actions"
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

const General = dynamic(
  () =>
    import(
      "../../../../components/content/site-management/settings/page/general"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function LogApiPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <General token={session.token} />
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

      await store.dispatch(getDataGeneral(session.user.user.data.token, req.cookies.token_permission));

      return {
        props: { session, title: "General - Site Management" },
      };
    }
);
