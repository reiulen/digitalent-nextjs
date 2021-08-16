import Layout from "../../../components/templates/layout.component";
import Tambah from "../../../components/content/publikasi/faq/tambah";

import { getAllKategoriInput } from '../../../redux/actions/publikasi/kategori.actions'
import { wrapper } from '../../../redux/store'

export default function TambahPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Tambah FAQ'>
                    <Tambah />
                </Layout>
            </div>
        </>
    )
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
    await store.dispatch(getAllKategoriInput("Faq"));
});