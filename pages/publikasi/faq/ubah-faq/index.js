import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

// import Layout from "../../../components/templates/layout.component";
// import EditFaq from "../../../components/content/publikasi/faq/edit";

import { getDetailFaq } from "../../../../redux/actions/publikasi/faq.actions";
import { getAllKategoriInput } from "../../../../redux/actions/publikasi/kategori.actions";
import { wrapper } from "../../../../redux/store";
import { getAllRolePermission } from "../../../../redux/actions/publikasi/role-permissions.action"

import LoadingPage from "../../../../components/LoadingPage";

const EditFaq = dynamic(
  () => import("../../../../components/content/publikasi/faq/edit"),
  {
    loading: function loadingNow() {
      return <LoadingPage />;
    },
    ssr: false,
  }
);

export default function EditFaqPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditFaq token={session.token} />
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

      await store.dispatch(
        getDetailFaq(query.id, session.user.user.data.token)
      );
      await store.dispatch(
        getAllKategoriInput("Faq", session.user.user.data.token)
      );
      await store.dispatch(getAllRolePermission(session.user.user.data.token));

      return {
        props: { session, title: "Ubah Faq - Publikasi" },
      };
    }
);