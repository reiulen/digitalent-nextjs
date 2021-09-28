import Preview from "../../../../components/content/publikasi/artikel/preview";
import Footer from "../../../../components/templates/footer.component";

import { getSession } from "next-auth/client";

import { getDetailArtikel } from "../../../../redux/actions/publikasi/artikel.actions";
import { wrapper } from "../../../../redux/store";
// import { getSession } from "next-auth/client";


export default function PreviewArtikel (props) {
    const session = props.session.user.user.data;
    return (
        <div style={{minHeight: "100%", position:"absolute", left: "0", right: "0", marginLeft:"auto", marginRight:"auto"}}>
          <div className="d-flex flex-column flex-root" style={{ paddingBottom: "400px", width: "100%", }}>
              <Preview token={session.token}/>
          </div>
      
          <div style={{position:"absolute", width: "100%", bottom:"0", left: "0", height: "400px"}}>
            <Footer/>
          </div>
        </div>

        // <div className="d-flex flex-column flex-root">
        //     <Preview token={session.token}/>
        //     <Footer/>
        // </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
  store =>
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
      await store.dispatch(
        getDetailArtikel(params.id, session.user.user.data.token)
      );

      return {
        props: { session, title: "Preview Artikel - Publikasi", data: "auth", },
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
