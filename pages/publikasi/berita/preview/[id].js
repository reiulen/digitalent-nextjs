import dynamic from "next/dynamic";

import Preview from "../../../../components/content/publikasi/berita/preview";
import Footer from "../../../../components/templates/footer.component";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

import { getDetailBerita } from "../../../../redux/actions/publikasi/berita.actions";
import { getTagBerandaBerita } from "../../../../redux/actions/beranda/berita.actions"

import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

const Layout = dynamic(
  () => import("../../../../user-component-new/components/template/Layout.component")
)

export default function PreviewBerita(props) {
  const session = props.session.user.user.data;
  return (
    <div className="wrapper-preview" style={{ background: '#fff' }}>
      <Layout title="Pratinjau Berita - Publikasi" token={session.token} >
        <Preview />
      </Layout>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req }) => {
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
        getDetailBerita(params.id, session.user.user.data.token)
      );

      await store.dispatch(
        getTagBerandaBerita(session.user.user.data.token)
      )

      return {
        props: { session, title: "Pratinjau Berita - Publikasi", data: "auth" },
      };
    }
);