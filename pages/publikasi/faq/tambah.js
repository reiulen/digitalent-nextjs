import Layout from "../../../components/templates/layout.component";
import Tambah from "../../../components/content/publikasi/faq/tambah";

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