import Preview from "../../../../components/content/publikasi/berita/preview";
import Footer from "../../../../components/templates/footer.component"

import { getDetailBerita } from '../../../../redux/actions/publikasi/berita.actions'
import { wrapper } from '../../../../redux/store'
import { getSession } from "next-auth/client";


export default function PreviewBerita(props) {
    const session = props.session.user.user.data;
    return (
        // <div className="d-flex flex-column flex-root">
        //     <Preview />
        //     <Footer />
        // </div>
        <div style={{minHeight: "100%", position:"absolute", left: "0", right: "0", marginLeft:"auto", marginRight:"auto"}}>
          <div className="d-flex flex-column flex-root" style={{ paddingBottom: "400px", width: "100%", }}>
              <Preview token={session.token}/>
          </div>
      
          <div style={{position:"absolute", width: "100%", bottom:"0", left: "0", height: "400px"}}>
            <Footer/>
          </div>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params, req }) => {
    const session = await getSession({ req });
    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    await store.dispatch(getDetailBerita(params.id, session.user.user.data.token))
    return {
        props: { session, title: "Pratinjau Berita - Publikasi", data: "auth", },
    };
})