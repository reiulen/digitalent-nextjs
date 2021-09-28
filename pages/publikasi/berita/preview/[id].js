import Preview from "../../../../components/content/publikasi/berita/preview";
import Footer from "../../../../components/templates/footer.component"

import { getDetailBerita } from '../../../../redux/actions/publikasi/berita.actions'
import { wrapper } from '../../../../redux/store'
import { getSession } from "next-auth/client";


export default function PreviewBerita() {
    return (
        <div className="d-flex flex-column flex-root">
            <Preview />
            <Footer />
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