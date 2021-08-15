import Preview from "../../../../components/content/publikasi/artikel/preview";

import { getDetailArtikel } from '../../../../redux/actions/publikasi/artikel.actions'
import { wrapper } from '../../../../redux/store'


export default function PreviewArtikel () {
    return (
        <div className="d-flex flex-column flex-root">
            <Preview/>
        </div>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ params }) => {
    await store.dispatch(getDetailArtikel(params.id))
})