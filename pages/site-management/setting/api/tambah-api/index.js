import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../../redux/store";
import LoadingSkeleton from "../../../../../components/LoadingSkeleton";
import { getListApi } from "../../../../../redux/actions/site-management/settings/api.actions";
import { middlewareAuthAdminSession } from "../../../../../utils/middleware/authMiddleware";

const TambahApi = dynamic(
  () =>
    import(
      "../../../../../components/content/site-management/settings/api/tambah-api"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function TambahPage(props) {
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
    async ({ req }) => {
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

      await store.dispatch(getListApi(session.user.user.data.token));
      return {
        props: { session, title: "Tambah API - Site Management" },
      };
    }
);
