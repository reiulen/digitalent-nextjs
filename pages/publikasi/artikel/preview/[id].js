import Preview from "../../../../components/content/publikasi/artikel/preview";
import Footer from "../../../../components/templates/footer.component"

import { getSession } from "next-auth/client";

import { getDetailArtikel } from '../../../../redux/actions/publikasi/artikel.actions'
import { wrapper } from '../../../../redux/store'


export default function PreviewArtikel (props) {
    const session = props.session.user.user.data;
    return (
        <div className="d-flex flex-column flex-root">
            <Preview token={session.token}/>
            <Footer/>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
    async ({ params, req }) => {
        const session = await getSession({ req });
        if (!session) {
          return {
            redirect: {
              destination: "/",
              permanent: false,
            },
          };
        }
        await store.dispatch(getDetailArtikel(params.id,  session.user.user.data.token));
  
        return {
          props: { session, title: "Preview Artikel - Publikasi" },
      };
    }
);

// export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params }) => {
//     await store.dispatch(getDetailArtikel(params.id))
// })