import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
// import { getAllArtikel } from "../../../redux/actions/publikasi/artikel.actions";
import { wrapper } from "../../../../redux/store";
import LoadingPage from "../../../../components/LoadingPage";
import { getDetailPages } from "../../../../redux/actions/site-management/settings/page.actions";
const UbahPage = dynamic(
  () =>
    import(
      "../../../../components/content/site-management/settings/page/ubah-page"
    ),
  {
    loading: function loadingNow() {
      return <LoadingPage />;
    },
    ssr: false,
  }
);

export default function TambahPages(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <UbahPage token={session.token} />
      </div>
    </>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req }) => {
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
        getDetailPages(params.id, session.user.user.data.token)
      );
      return {
        props: { session, title: "Ubah Page - Site Management" },
      };
    }
);
