import Preview from "../../../../components/content/publikasi/artikel-peserta/preview";
import Footer from "../../../../components/templates/footer.component";

import { getDetailArtikelPeserta } from "../../../../redux/actions/publikasi/artikel-peserta.actions";
import { wrapper } from "../../../../redux/store";
import { getSession } from "next-auth/client";

export default function PreviewArtikel(props) {
  const session = props.session.user.user.data;
  return (
    <div className="wrapper-preview">
      <div className="d-flex flex-column flex-root content-preview">
        <Preview token={session.token} />
      </div>

      <div className="footer-preview">
        <Footer />
      </div>
    </div>
    // <div className="d-flex flex-column flex-root">
    //     <Preview />
    //     <Footer />
    // </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ params, req }) => {
      const session = await getSession({ req });
      if (!session) {
        return {
          redirect: {
            destination: "http://dts-dev.majapahit.id/",
            permanent: false,
          },
        };
      }
      await store.dispatch(
        getDetailArtikelPeserta(params.id, session.user.user.data.token)
      );

      return {
        props: {
          session,
          title: "Preview Artikel Peserta - Publikasi",
          data: "auth",
        },
      };
    }
);

// export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params, req }) => {
//     const session = await getSession({ req });
//     if (!session) {
//         return {
//             redirect: {
//                 destination: "http://dts-dev.majapahit.id/",
//                 permanent: false,
//             },
//         };
//     }
//     await store.dispatch(getDetailArtikelPeserta(params.id, session.user.user.data.token))
// })
