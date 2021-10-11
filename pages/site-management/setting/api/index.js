import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { getAllApi } from "../../../../redux/actions/site-management/settings/api.actions";
import { wrapper } from "../../../../redux/store";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";

const API = dynamic(
  () =>
    import("../../../../components/content/site-management/settings/api/api"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function Api(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <API token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ query, req }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "/login/admin",
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getAllApi(
          query.page,
          query.cari,
          query.limit,
          session.user.user.data.token
        )
      );
      return {
        props: { session, title: "API - Site Management" },
      };
    }
);
