import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
// import { getAllArtikel } from "../../../redux/actions/publikasi/artikel.actions";
import { wrapper } from "../../../../redux/store";
import LoadingPage from "../../../../components/LoadingPage";
import { getDetailDataReference } from "../../../../redux/actions/site-management/data-reference.actions";

const UbahRole = dynamic(
  () =>
    import(
      "../../../../components/content/site-management/data-refrence/detail-data-refrence"
    ),
  {
    loading: function loadingNow() {
      return <LoadingPage />;
    },
    ssr: false,
  }
);

export default function UbahRoles(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <UbahRole token={session.token} />
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
            destination: "/",
            permanent: false,
          },
        };
      }

      await store.dispatch(
        getDetailDataReference(query.id, session.user.user.data.token, req.cookies.token_permission)
      );
      return {
        props: {
          session,
          title: "Detail Reference - Site Management",
        },
      };
    }
);
