import Preview from "../../../../components/content/publikasi/berita/preview";
import Footer from "../../../../components/templates/footer.component"

import { getDetailBerita } from '../../../../redux/actions/publikasi/berita.actions'
import { wrapper } from '../../../../redux/store'


export default function PreviewBerita () {
    return (
        <div className="d-flex flex-column flex-root">
            <Preview/>
            <Footer/>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params }) => {
    await store.dispatch(getDetailBerita(params.id))
})