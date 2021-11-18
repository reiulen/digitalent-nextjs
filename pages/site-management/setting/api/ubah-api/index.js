import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { wrapper } from "../../../../../redux/store";
import LoadingPage from "../../../../../components/LoadingPage";
import {
  getDetailApi,
  getListApi,
} from "../../../../../redux/actions/site-management/settings/api.actions";
const UbahApi = dynamic(
  () =>
    import(
      "../../../../../components/content/site-management/settings/api/ubah-api"
    ),
  {
    loading: function loadingNow() {
      return <LoadingPage />;
    },
    ssr: false,
  }
);

export default function UbahPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <UbahApi token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req, query }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "http://dts-dev.majapahit.id/login/admin",
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getDetailApi(query.id, session.user.user.data.token)
      );
      await store.dispatch(getListApi(session.user.user.data.token));
      return {
        props: { session, title: "Ubah API - Site Management" },
      };
    }
);
