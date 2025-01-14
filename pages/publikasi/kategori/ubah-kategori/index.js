import dynamic from "next/dynamic";
import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

import Layout from "../../../../components/templates/layout.component";

import { getDetailKategori } from "../../../../redux/actions/publikasi/kategori.actions";
import { wrapper } from "../../../../redux/store";

import LoadingSkeleton from "../../../../components/LoadingSkeleton";

const EditKategori = dynamic(
  () => import("../../../../components/content/publikasi/kategori/edit"),
  {
    loading: function loadingNow() {
      return <LoadingSkeleton />;
    },
    ssr: false,
  }
);

export default function EditKategoriPage(props) {
  const session = props.session.user.user.data;
  return (
    <>
      <div className="d-flex flex-column flex-root">
        <EditKategori token={session.token} />
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
        getDetailKategori(query.id, session.user.user.data.token, req.cookies.token_permission)
      );
      return {
        props: { session, title: "Ubah Kategori - Publikasi" },
      };
    }
);