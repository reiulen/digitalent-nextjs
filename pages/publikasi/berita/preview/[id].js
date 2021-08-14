import Preview from "../../../../components/content/publikasi/berita/preview";

import { getDetailBerita } from '../../../../redux/actions/publikasi/berita.actions'
import { wrapper } from '../../../../redux/store'


export default function PreviewBerita () {
    return (
        <div className="d-flex flex-column flex-root">
            <Preview/>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params }) => {
    await store.dispatch(getDetailBerita(params.id))
})