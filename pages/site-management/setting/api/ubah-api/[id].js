import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
// import { getAllArtikel } from "../../../redux/actions/publikasi/artikel.actions";
import { wrapper } from "../../../../../redux/store";
import LoadingPage from "../../../../../components/LoadingPage";

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

      // await store.dispatch(
      //   getAllArtikel(
      //     query.page,
      //     query.keyword,
      //     query.limit,
      //     query.publish,
      //     query.startdate,
      //     query.enddate,
      //     session.user.user.data.token
      //   )
      // );
      return {
        props: { session, title: "Ubah API - Site Management" },
      };
    }
);