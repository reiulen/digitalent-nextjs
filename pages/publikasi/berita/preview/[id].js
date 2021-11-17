import Preview from "../../../../components/content/publikasi/berita/preview";
import Footer from "../../../../components/templates/footer.component";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

import { getDetailBerita } from "../../../../redux/actions/publikasi/berita.actions";
import { getTagBerandaBerita } from "../../../../redux/actions/beranda/berita.actions"

import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

export default function PreviewBerita(props) {
  const session = props.session.user.user.data;
  return (
    <div className="wrapper-preview" style={{ background: '#fff' }}>
      <div className="d-flex flex-column flex-root content-preview">
        <Preview token={session.token} />
      </div>

      <div className="footer-preview">
        <Footer />
      </div>
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