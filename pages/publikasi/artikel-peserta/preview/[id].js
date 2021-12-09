import dynamic from "next/dynamic";

import Preview from "../../../../components/content/publikasi/artikel-peserta/preview";
import Footer from "../../../../components/templates/footer.component";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

import { getDetailArtikelPeserta } from "../../../../redux/actions/publikasi/artikel-peserta.actions";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";
import { getTagBerandaArtikel } from "../../../../redux/actions/beranda/artikel.actions"

const Layout = dynamic(
  () => import("../../../../user-component-new/components/template/Layout.component")
)

export default function PreviewArtikel(props) {
  const session = props.session.user.user.data;
  return (
    <div className="wrapper-preview" style={{ background: '#fff' }}>
      <Layout title="Pratinjau Artikel Peserta - Publikasi" token={session.token}>
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
        getDetailArtikelPeserta(params.id, session.user.user.data.token, req.cookies.token_permission)
      );
      
      await store.dispatch(
        getTagBerandaArtikel(session.user.user.data.token, req.cookies.token_permission)
      )

      return {
        props: {
          session,
          title: "Preview Artikel Peserta - Publikasi",
          data: "auth",
        },
      };
    }
);