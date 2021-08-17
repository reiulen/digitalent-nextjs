import Layout from "../../../components/templates/layout.component";
import EditKategori from "../../../components/content/publikasi/kategori/edit";

import { getDetailKategori } from "../../../redux/actions/publikasi/kategori.actions";
import { wrapper } from "../../../redux/store";

export default function EditKategoriPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title="Update Kategori">
                    <EditKategori />
                </Layout>
            </div>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
    await store.dispatch(getDetailKategori(params.id));
});
