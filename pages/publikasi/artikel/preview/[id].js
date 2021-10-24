import Preview from "../../../../components/content/publikasi/artikel/preview";
import Footer from "../../../../components/templates/footer.component";

import { getSession } from "next-auth/client";
import { middlewareAuthAdminSession } from "../../../../utils/middleware/authMiddleware";

import { getDetailArtikel } from "../../../../redux/actions/publikasi/artikel.actions";
import { wrapper } from "../../../../redux/store";
// import { getSession } from "next-auth/client";

export default function PreviewArtikel(props) {
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
        getDetailArtikel(params.id, session.user.user.data.token)
      );

      return {
        props: { session, title: "Preview Artikel - Publikasi", data: "auth" },
      };
    }
);
//   await store.dispatch(getDetailArtikel(params.id,  session.user.user.data.token));
//   return {
//     props: { session, title: "Pratinjau Artikel - Publikasi", data: "auth", },
// };

// export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params }) => {
//     await store.dispatch(getDetailArtikel(params.id))
// })
