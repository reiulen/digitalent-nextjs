import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
// import { getAllArtikel } from "../../../redux/actions/publikasi/artikel.actions";
import { wrapper } from "../../../../redux/store";
import LoadingSkeleton from "../../../../components/LoadingSkeleton";
import { getDetailDataReference } from "../../../../redux/actions/site-management/data-reference.actions";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";
const UbahRole = dynamic(
  () =>
    import(
      "../../../../components/content/site-management/data-refrence/ubah-data-refrence-tanpa-relasi"
    ),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
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
        getDetailDataReference(query.id, session.user.user.data.token, req.cookies.token_permission)
      );
      return {
        props: {
          session,
          title: "Ubah Reference tanpa relasi - Site Management",
        },
      };
    }
);
