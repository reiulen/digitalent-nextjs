import Layout from "../../../components/templates/layout.component";
import EditFaq from "../../../components/content/publikasi/faq/edit";

import { getDetailFaq } from "../../../redux/actions/publikasi/faq.actions";
import { getAllKategoriInput } from '../../../redux/actions/publikasi/kategori.actions'
import { wrapper } from "../../../redux/store";

export default function EditFaqPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title="Update FAQ">
                    <EditFaq />
                </Layout>
            </div>
        </>
    );
}

export const getServerSideProps = wrapper.getServerSideProps((store) => async ({ params }) => {
    await store.dispatch(getDetailFaq(params.id));
    await store.dispatch(getAllKategoriInput("Faq"));
});
