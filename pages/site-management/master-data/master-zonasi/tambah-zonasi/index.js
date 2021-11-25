import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../../../utils/middleware/authMiddleware";
import { wrapper } from "../../../../../redux/store";
import LoadingPage from "../../../../../components/LoadingPage";
import { getAllOptionProvinces } from "../../../../../redux/actions/site-management/option/option-provinces.actions";

const DetailRole = dynamic(
  () =>
    import(
      "../../../../../components/content/site-management/master-data/master-zonasi/tambah"
    ),
  {
    loading: function loadingNow() {
      return <LoadingPage />;
    },
    ssr: false,
  }
);

export default function DetailRoles(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <DetailRole token={session.token} />
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

      await store.dispatch(getAllOptionProvinces(session.user.user.data.token));
      return {
        props: { session, title: "Tambah Zonasi - Site Management" },
      };
    }
);
