import Layout from "../../../components/templates/layout.component";
import Tambah from "../../../components/content/publikasi/artikel-peserta/tambah";

export default function TambahPage() {
    return (
        <>
            <div className="d-flex flex-column flex-root">
                <Layout title='Tambah Artikel'>
                    <Tambah />
                </Layout>
            </div>
        </>
    )
}